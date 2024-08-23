//TODO: FALTA - POPUP para seleccionar producto o buscar por nombre
//TODO: OK - Que cuando elijan tipo de comprobante y luego ingresen productos se disabled para que no cambien de documento los pilas
//TODO: FALTA - Revisar los stocks
//TODO: FALTA - Poner stock anterior o actual frente a lo que tiene

setTimeout(function(){
    if (permisosLectura){
        estructuraGrid();
        showDivs(0);
        loadTypes();
        loadProductos()
        loadBeneficiarios();

        $("#date").val( moment().format("YYYY-MM-DD") );
        $("#fechadesde").val( moment().format("YYYY-MM") + "-01" );
        $("#fechahasta").val( moment().format("YYYY-MM-DD") );

        loadData();
        
    } else{
        $("#btmDivs").addClass("hide");
        sendMessage("error", "Autorizacion", mensajeNoPermisoLectura);
    }
},800)

lstTransacciones = [];
lstTypes = [];
rsType = {};
lstBeneficiarios = [];
lstProductos = [];
lstPresentacion = [];
lstItems = [];
dataSelected = {};
var idtransaction = "-1";

cnf = sessionGet("config");

//TODO: Determinar titulo e icono que viene del menu
ruta = JSON.parse(sessionGet("current_route"));
title = ruta.name;
$("#Title").html(title);
$("#TitleIcon").addClass(ruta.icon);

//TODO: Determina los permisos de RWD 
if (permisosEscritura){
    $("#divW").removeClass("hide");
} else {
    $("#divW").addClass("hide");
}
if (permisosBorrado){
    $("#divD").removeClass("hide");
} else{
    $("#divD").addClass("hide");
}

$("#btnBuscar").on("click", function(){
    loadData();
});


async function loadData(){
    showLoading("Cargando");

    habilitarBotones(false);

    let dini = $("#fechadesde").val();
    let dfin  = $("#fechahasta").val();

    let params = {
        fecha_ini: dini,
        fecha_fin: dfin
    }
    
    let metodo = "GET";
    let url = "transaccionesFiltro";
    await consumirApi(metodo, url, params)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            // console.log(resp)

            if (resp.status && resp.status == 'ok') {
                lstTransacciones = [];

                if (resp.message){
                    resp.message.forEach( e => {
                        e["idtransaction"] = e.idtransaction.toString();
                        lstTransacciones.push(e)    
                        // transaction = { add: [e] };
                        // gridApi.applyTransactionAsync(transaction);
                    });
                }
                // lstTransacciones.sort((a, b) =>
                //     b.date.localeCompare(a.date)
                // );
                gridApi.setGridOption("rowData", lstTransacciones);
                gridApi.sizeColumnsToFit();

            } else {
                sendMessage("error", title, resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            closeLoading();
            console.log("ERR", err);
            sendMessage("error", title, JSON.stringify(err.responseText));
        });
}

async function loadTypes(){
    let metodo = "GET";
    let url = "movtipos";

    await consumirApi(metodo, url)
        .then( resp=>{
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            // console.log(resp);

            if (resp.status && resp.status == 'ok') {
                if (resp.message){

                    lstTypes = [];
                    resp.message.forEach(e=>{
                        lstTypes.push(e);
                        $("#idmovementtype").append(`<option value='${e.idmovementtype}'>${e.name}</option>`)
                    });

                    rsType = lstTypes[0];
                    seleccionTipoMovimiento(rsType.idmovementtype);

                }
            } else {
                sendMessage("error", title, resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            console.log("ERR", err);
            sendMessage("error", title, JSON.stringify(err.responseText));
        });
}

async function loadBeneficiarios(){
    let metodo = "GET";
    let url = `bene`;
    
    await consumirApi(metodo, url)
        .then( resp=>{
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            // console.log(resp)
            if (resp.status && resp.status == 'ok') {
                if (resp.message){
                    lstBeneficiarios = resp.message;
                }
            } else {
                sendMessage("error", title, resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            console.log("ERR", err);
            sendMessage("error", title, JSON.stringify(err.responseText));
        });
}

async function loadPresentacion(){
    
    $("#idpresentation").html("");
    
    let metodo = "GET";
    let url = `presentacion`;
    
    await consumirApi(metodo, url)
        .then( resp=>{
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {
                if (resp.message){
                    resp.message.forEach(e=>{
                        lstPresentacion.push(e);
                        $("#idpresentation").append(`<option value='${e.idpresentation}'>${e.acronym}</option>`);
                    });
                }
            } else {
                sendMessage("error", title, resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            console.log("ERR", err);
            sendMessage("error", title, JSON.stringify(err.responseText));
        });
}

async function loadProductos(){
    
    $("#idproduct").html("");
    $("#idproduct").append(`<option value='-'>-- Seleccione un producto --</option>`);

    let metodo = "GET";
    let url = `productos`;
    
    await consumirApi(metodo, url)
        .then( resp=>{
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {
                if (resp.message){
                    resp.message.forEach(e=>{
                        lstProductos.push(e);
                        $("#idproduct").append(`<option value='${e.idproduct}'>${e.name}</option>`);
                    });
                }
            } else {
                sendMessage("error", title, resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            console.log("ERR", err);
            sendMessage("error", title, JSON.stringify(err.responseText));
        });
}

function estructuraGrid(){
    gridOptions = {
        rowStyle: { background: 'white' },
        getRowStyle: params => {
            if (params.node.rowIndex % 2 !== 0) {
                return { background: '#f9f9f9' };
            }
        },
        rowData: [],
        deltaSort: true,
        pagination: true,
        paginationPageSize: 50,
        paginationPageSizeSelector: [5, 10,20, 30, 40, 50, 100, 200, 300, 1000],
        rowSelection: 'single',
        rowHeight: 40,
        tooltipInteraction: true,
        defaultColDef: {
            flex: 1,
            minWidth: 50,
            filter: true,
            sortable: false,
            resizable: false,
            floatingFilter: false,
            wrapText: true,
            suppressSizeToFit: true,
            autoHeaderHeight: true,
            suppressAutoSize: true,
            enableCellChangeFlash: true,
            autoHeight: true,
        },
        autoSizeStrategy: {
            // type: 'fitCellContents'
        },
        getRowId: (params) => {
            return params.data.idtransaction;
        },
        onRowClicked: (event) => {
            dataSelected = event.data;
            idSelect = event.data.idtransaction;
            idSelectName = event.data.numberdocument;
            habilitarBotones(true);
        },
        columnDefs: [
            {
                headerName: "ID",
                headerTooltip: "ID",
                flex: 1, 
                field: "idtransaction",
                filter: false,
                sortable: true, 
                cellClass: "text-start",
            },
            {
                headerName: "Fecha",
                headerTooltip: "Fecha Transaccion",
                flex: 1, 
                field: "date",
                filter: true,
                cellClass: "text-start",
                sort: "desc",
                sortIndex: 1, 
                sortable: true, 
            },
            {
                headerName: "Beneficiario",
                headerTooltip: "Beneficiari",
                flex: 2, 
                field: "beneficiary_name",
                filter: true,
                cellClass: "text-start",
                sortable: true, 
            },
            {
                headerName: "Tipo",
                headerTooltip: "Tipo de Transaccion",
                flex: 1, 
                field: "type",
                filter: true,
                cellClass: "text-start",
                sortable: true, 
            },
            {
                headerName: "NDocumento",
                headerTooltip: "Numero de Documento",
                flex: 1, 
                field: "numberdocument",
                filter: true,
                cellClass: "text-start",
                sortable: true, 
            },
            {
                headerName: "Total",
                headerTooltip: "Total Transaccion",
                flex: 1, 
                field: "total",
                filter: false,
                type: "rightAligned",
                cellClass: "text-end",
                sortable: true, 
                valueFormatter: params => numero(params.data.total,2)
            },
            {
                headerName: "Items",
                headerTooltip: "Numero de Items",
                flex: 1, 
                field: "nitems",
                filter: false,
                // cellClass: "text-start",
                cellClass: "ag-header-cell-label-right", 
                sortable: true, 
            },
        ]
    }

    const myGridElement = document.querySelector("#myGrid");
    gridApi = agGrid.createGrid(myGridElement, gridOptions);
    gridApi.sizeColumnsToFit();
}

function cleanRecords(record=null){

    let idmovementtype =  $("#idmovementtype").val();
    seleccionTipoMovimiento(idmovementtype);

    limpiarIngresoProducto();
    lstItems = [];
    refreshItemData();
    
    $("#date").val( moment().format("YYYY-MM-DD") );

    let idtransaction = "-1";
}

showDivs = (que = 0) => {
    switch(que){
        case 0:
            //Grid o listado 
            $("#Title").html(title);
            $("#btmNew").removeClass("hide");
            $("#btmEdit").removeClass("hide");
            $("#btmDelete").removeClass("hide");
            $("#btmRefresh").removeClass("hide");
            $("#btmSave").addClass("hide");
            $("#btmCancel").addClass("hide");
            habilitarBotones(false);

            $("#GridDiv").removeClass("hide");
            $("#FormDiv").addClass("hide");
            break;
        case 1:
            //Formulario de edicion o nuevo
            $("#Title").html("Edición de " + title);
            $("#btmNew").addClass("hide");
            $("#btmEdit").addClass("hide");
            $("#btmDelete").addClass("hide");
            $("#btmRefresh").addClass("hide");
            $("#btmSave").removeClass("hide");
            $("#btmCancel").removeClass("hide");

            $("#GridDiv").addClass("hide");
            $("#FormDiv").removeClass("hide");
            break;
        case 2:
            break;
    }
}

$("#btmNew").on("click", function(){
    cleanRecords();
    showDivs(1);
});

$("#btmSave").on("click", function(){
    saveData();
});


async function saveData(){
    
    let date = $("#date").val();
    let idmovementtype = $("#idmovementtype").val();
    let numberdocument = $("#numberdocument").val();
    let idbeneficiary = $("#idbeneficiary").val();
    let reference = $("#reference").val();

    let error = false;
    let errMsg = "";
    
    if (date == "") {
        error = true;
        errMsg = "Debe ingresar la fecha de la transacción";
    }

    if (!error && moment(date) > moment()) {
        error = true;
        errMsg = "La fecha debe ser menor o igual a la del dia de hoy.";
    }
    
    if (!error && numberdocument == ""){
        error = true;
        errMsg = "Debe ingresar el numero de documento";
    }

    if (!error && (idbeneficiary == "" || idbeneficiary == "-") ){
        error = true;
        errMsg = "Debe seleccionar el beneficiario";
    }

    if (!error && lstItems.length==0){
        error = true;
        errMsg = "Debe ingresar por lo menos un producto para guardar la transacción.";
    }
    
    if (error){
        sendMessage("error", title, errMsg);
        return;
    }

    let lstSave = [];
    let subtotal = 0;
    let discount = parseFloat($("#desc").val());
    let ttotal = 0;


    lstItems.forEach(e=>{
        lstSave.push({
            idproduct: e.idproduct,
            entry: e.entry,
            qty: e.qty,
            price: e.price,
            total: e.total
        })
        subtotal += e.total;
    });

    ttotal = subtotal - discount;

    let params = {
        idbeneficiary,
        idmovementtype,
        date: date + " " + moment().format("HH:mm:ss") ,
        numberdocument,
        subtotal,
        discount,
        total: ttotal,
        reference,
        items: lstSave
    };

    let method = "PUT";
    // let method = "POST";
    if (idtransaction == -1){
        method = "POST";
    }
    let url = `saveTransaction&id=${idtransaction}`;
    
    await consumirApi(method, url, params)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp){
                if (resp.status && resp.status == 'ok') {
                    if (method == "POST"){
                        idtransaction = resp.message;
                    }
                    showDivs(0);
                    loadData();
                } else {
                    sendMessage("error", title, resp.message || JSON.stringify(resp));
                }
            } else {
                sendMessage("error", title, "La respuesta es nula");
            }

        })
        .catch( err => {
            closeLoading();
            console.log("ERR", err);
            sendMessage("error", title, JSON.stringify(err.responseText));
        });
}


$("#btmRefresh").on("click", function(){
    loadData();
});

function habilitarBotones(opc = false){
    // console.log(opc, dataSelected.deleted_at);
    if (opc && !dataSelected.deleted_at ){
        $("#btmEdit").removeClass("disabled");
        $("#btmEdit").removeClass("btn-secondary");
        $("#btmEdit").addClass("btn-info");
        
        if (dataSelected.nusuarios==0){
            $("#btmDelete").removeClass("disabled");
            $("#btmDelete").removeClass("btn-secondary");
            $("#btmDelete").addClass("btn-danger");
        } else {
            $("#btmDelete").addClass("disabled");
            $("#btmDelete").removeClass("btn-danger");
            $("#btmDelete").addClass("btn-secondary");
        }

        $("#btmReset").removeClass("disabled");
        $("#btmReset").removeClass("btn-secondary");
        $("#btmReset").addClass("btn-info");
        
    } else {
        $("#btmEdit").addClass("disabled");
        $("#btmEdit").removeClass("btn-info");
        $("#btmEdit").addClass("btn-secondary");

        $("#btmDelete").addClass("disabled");
        $("#btmDelete").removeClass("btn-danger");
        $("#btmDelete").addClass("btn-secondary");
        
        $("#btmReset").addClass("disabled");
        $("#btmReset").removeClass("btn-info");
        $("#btmReset").addClass("btn-secondary");
        
    }
}


function seleccionTipoMovimiento(idmovementtype){

    lstTypes.forEach( e=>{
        if (e.idmovementtype == parseInt(idmovementtype)){
            rsType = e;
            $("#tipoSiglas").html(e.acronym);
        }
    });
    
    if (rsType.entry == "A"){
        $("#entry").prop("disabled", false);
    } else{
        $("#entry").prop("disabled", true);
        $("#entry").val(rsType.entry)
    }
    
    //TODO: Calculo si permite edicion de numdoc o no 
    if (rsType.calculatenumdoc == '1'){
        //TODO: Calculo de numero de documento
        let seq = rsType.sequential + 1;
        $("#numberdocument").val(cnf.prefijo_documentacion + seq.toString().padStart(7, "0"));
        $("#numberdocument").prop("disabled", true);
    } else{
        $("#numberdocument").val("");
        $("#numberdocument").prop("disabled", false);
    }

    //TODO: Calculo de Beneficiarios ya sean proveedores o clientes
    $("#idbeneficiary").html("");
    lstBeneficiarios.forEach(e=>{
        if (e.type == rsType.beneficiarytype || (rsType.beneficiarytype!="E" && e.type == "A")){
            $("#idbeneficiary").append(`<option value='${e.idbeneficiary}'>${e.nombre}</option>`);        
        }
    });
}


$("#idmovementtype").on("change", function(){
    let idmovementtype =  $(this).val();
    seleccionTipoMovimiento(idmovementtype);
});

$("#searchProduct").on("keypress", function($event){
    let textoBuscar = $(this).val();
    let lstprod= []
    if ($event.charCode == 13){
        lstProductos.forEach(e=>{
            if (e.name.indexOf(textoBuscar)>-1 || e.description.indexOf(textoBuscar)>-1 || e.productcode.indexOf(textoBuscar)>-1 || e.barcode.indexOf(textoBuscar)>-1){
                lstprod.push(e)
            }
        });
    
        let barcode = "";
        let idproduct = "";
        let qty = 0;
        let price = 0;
        let total = 0;
    
        if (lstprod.length==1){
            barcode = lstprod[0].barcode;
            idproduct = lstprod[0].idproduct;
            qty = 1;
            price = rsType.typevalue == 'C' ? lstprod[0].cost :  lstprod[0].price ;
            total = 0;

            $("#searchProduct").val(barcode);
            $("#idproduct").val(idproduct);
            $("#entry").val(rsType.entry!="A" ? rsType.entry : 'I');
            $("#qty").val(qty);
            $("#price").val(price);
            $("#total").val(total);
            focus("qty");
        }
    
    }
    // console.log(lstprod)
})

function focus(obj, isText=true){
    var element = document.getElementById(obj);
    element.focus();
    if (isText){
        element.setSelectionRange(0, ($(`#${obj}`).val()).length);
    }
}

$("#qty").keypress(function( event ){
    if ( event.which == 13 ) {
        totalItem();
        focus("price");
        return false;
    }
});

$("#price").keypress(function( event ){
    if ( event.which == 13 ) {
        totalItem();
        focus("btmAddItem", false);
        return false;
    }
});

$("#btmAddItem").on("click", function(){
    let idproduct =  $("#idproduct").val();
    let barcode = "";
    let name = "";

    lstProductos.forEach(e=>{
        if (e.idproduct == idproduct){
            barcode = e.barcode;
            name = e.name;
        }
    })

    let record = {
        idproduct: idproduct,
        barcode: barcode,
        name:  name,
        entry:  $("#entry").val(),
        qty:  parseFloat($("#qty").val()),
        price:  parseFloat($("#price").val()),
        total:  parseFloat($("#total").val())
    }

    // updateItem(record);

    let found = false;
    lstItems.forEach( (e, idx)=>{
        if (e.idproduct == record.idproduct){
            found = true;
            lstItems[idx] = record;
        }
    });

    if (!found){
        lstItems.push(record);
    }
    refreshItemData();

    limpiarIngresoProducto();
    focus("searchProduct",false);

});

function checkTipoComprobante(){
    if (lstItems.length>0){
        $("#idmovementtype").prop("disabled", true);
    }else{
        $("#idmovementtype").prop("disabled", false);
    }
}

function limpiarIngresoProducto(){
    $("#searchProduct").val("");
    $("#idproduct").val("-");
    $("#entry").val(rsType.entry!="A" ? rsType.entry : 'I');
    $("#qty").val(0);
    $("#price").val(0);
    $("#total").val(0);
}

function totalItem(){
    let qty = parseFloat($("#qty").val());
    let price = parseFloat($("#price").val());
    total = qty * price;
    $("#total").val(total);
}


function fillItem(record){
    $("#searchProduct").val(record.barcode);
    $("#idproduct").val(record.idproduct);
    $("#entry").val(record.entry);
    $("#qty").val(record.qty);
    $("#price").val(record.price);
    $("#total").val(record.total);
}

function editItem(idproduct, action){
    lstItems.forEach( (e, idx)=>{
        if (e.idproduct == idproduct){
            if (action == "E"){
                fillItem(e)
            } else{
                lstItems.splice(idx, 1);
            }
        }
    });
    refreshItemData();

}

function refreshItemData(){

    $("#tblbody").html("");

    lstItems.forEach(e=>{
        $("#tblbody").append(`
            <tr>
                <td>${e.idproduct}</td>
                <td>${e.barcode}</td>
                <td>${e.name}</td>
                <td class='text-center'>${e.entry}</td>
                <td class='text-end'>${numero(e.qty,2)}</td>
                <td class='text-end'>${numero(e.price,2)}</td>
                <td class='text-end'>${numero(e.total,2)}</td>
                <td class='text-center'>
                    <button id="btmEditItem" onclick="javascript:editItem(${e.idproduct}, 'E')" class="btn btn-info mr-1" title="Editar">
                        <i class="far fa-edit"></i>
                    </button>
                    <button id="btmDeleteItem" onclick="javascript:editItem(${e.idproduct}, 'D')" class="btn btn-danger mr-1" title="Eliminar">
                        <i class="far fa-trash-alt"></i>
                    </button>
                </td>
            </tr>    
        `);
    })

    totalizar();
    checkTipoComprobante();

}

function totalizar(){

    let desc = parseFloat($("#desc").val());
    let subtotal = 0;
    let ttotal = 0;

    if (lstItems.length>0){
        lstItems.forEach( e=>{
            subtotal += parseFloat(e.total);
        });
    }

    ttotal = subtotal - desc;

    $("#subtotal").val(numero(subtotal,2));
    $("#desc").val(numero(desc,2));
    $("#totalg").val(numero(ttotal,2));

    let numlet = numeroALetras(ttotal) + " DOLARES DE ESTADOS UNIDOS DE AMERICA";

    $("#nitems").html(lstItems.length);
    $("#son").html(numlet);
}


$("#btmCancel").on("click", function(){
    showDivs(0);
});


$("#desc").keypress(function( event ){
    if ( event.which == 13 ) {
        totalizar();
        return false;
    }
});



function imprimir( record ){
    var doc = new jsPDF()

    doc.text('Hello world!', 10, 10)
    doc.save('a4.pdf')


}