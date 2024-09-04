
setTimeout(function(){
    if (permisosLectura){
        estructuraGrid();
        estructuraGridBusqueda();
        estructuraGridBusquedaBeneficiarios();
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
lstBeneficiariosSeleccion = [];
lstProductos = [];
lstPresentacion = [];
lstItems = [];
dataSelected = {};
gridApi2;
gridOptions2;
var gridApi3;
var gridOptions3;
var idtransaction = "-1";
dataSelected2 = {};
idSelect2 = "";
idSelectName2 = "";
dataSelected3 = {};
idSelect3 = "";
idSelectName3 = "";

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

            if (resp.status && resp.status == 'ok') {
                lstTransacciones = [];

                if (resp.message){
                    resp.message.forEach( e => {
                        e["idtransaction"] = e.idtransaction.toString();
                        lstTransacciones.push(e)    
                    });
                }
                gridApi.setGridOption("rowData", lstTransacciones);

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
                    resp.message.forEach(e=>{
                        if (!e.deleted_at){
                            e["idbeneficiary"] = e.idbeneficiary.toString();
                            lstBeneficiarios.push(e);
                        }
                    })
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
    $("#idproduct").append(`<option value='-'></option>`);

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
                headerTooltip: "Beneficiario",
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
    // gridApi.sizeColumnsToFit();
}

function estructuraGridBusqueda(){
    gridOptions2 = {
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
            return params.data.barcode;
        },
        onRowClicked: (event) => {
            dataSelected2 = event.data;
            idSelect2 = event.data.barcode;
            idSelectName2 = event.data.name;
            habilitarBotones2(true);
        },
        columnDefs: [
            {
                headerName: "Codigo",
                headerTooltip: "Codigo",
                flex: 1, 
                field: "barcode",
                sortable: true, 
                cellClass: "text-start",
            },
            {
                headerName: "Nombre",
                headerTooltip: "Nombre del Producto",
                flex: 3, 
                field: "name",
                cellClass: "text-start",
                sort: "desc",
                sortIndex: 1, 
                sortable: true, 
            },
            {
                headerName: "Linea",
                headerTooltip: "Linea",
                flex: 2, 
                field: "line",
                cellClass: "text-start",
                sortable: true, 
            },
            {
                headerName: "Categoria",
                headerTooltip: "Categoria",
                flex: 2, 
                field: "category",
                cellClass: "text-start",
                sortable: true, 
            },
            {
                headerName: "Stock",
                headerTooltip: "Stock",
                flex: 1, 
                field: "stock",
                headerClass: "ag-header-cell-label-center text-center bg-header-1", 
                type: "rightAligned",
            },
            {
                headerName: "Costo",
                headerTooltip: "Costo",
                flex: 1, 
                field: "cost",
                headerClass: "ag-header-cell-label-center text-center bg-header-1", 
                type: "rightAligned",
            },
            {
                headerName: "PVP",
                headerTooltip: "PVP",
                flex: 1, 
                field: "price",
                headerClass: "ag-header-cell-label-center text-center bg-header-1", 
                type: "rightAligned",
            }
        ]
    }

    const myGridElement1 = document.querySelector("#myGridP");
    gridApi2 = agGrid.createGrid(myGridElement1, gridOptions2);
    // gridApi2.sizeColumnsToFit();
}
function estructuraGridBusquedaBeneficiarios(){
    gridOptions3 = {
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
            return params.data.idbeneficiary;
        },
        onRowClicked: (event) => {
            dataSelected3 = event.data;
            idSelect3 = event.data.idbeneficiary;
            idSelectName3 = event.data.nombre;
            habilitarBotones3(true);
        },
        columnDefs: [
            {
                headerName: "ID",
                headerTooltip: "ID",
                flex: 1, 
                field: "idbeneficiary",
                sortable: true, 
                cellClass: "text-start",
            },
            {
                headerName: "Tipo",
                flex: 2, 
                field: "type",
                filter: true,
                cellClass: "text-start",
                cellRenderer: (params) => {
                    let type = params.data.type;
                    let cls = "";
                    let html = "";
                    let text = "";
                    if (type == "C"){
                        text = "Cliente"
                        cls  = "bg-success";
                    } else if (type == "P"){
                        text = "Proveedor"
                        cls  = "bg-warning";
                    } else if (type == "A"){
                        text = "Proveedor/Cliente"
                        cls  = "bg-info";
                    } else if (type == "E"){
                        text = "Empresa"
                        cls  = "bg-primary";
                    }
                    // return `<span class='${cls}'>${type}<span>`;
                    return `<kbd class='${cls}'>${text}<kbd>`;
                }
            },
            {
                headerName: "Identificacion",
                headerTooltip: "Identificacion",
                flex: 1, 
                field: "identification",
                cellClass: "text-start",
                sortable: true, 
            },
            {
                headerName: "Nombre",
                headerTooltip: "Nombre",
                flex: 3, 
                field: "nombre",
                cellClass: "text-start",
                sort: "desc",
                sortIndex: 1, 
                sortable: true, 
            },
            {
                headerName: "Nombre Comercial",
                headerTooltip: "Nombre Comercial",
                flex: 3, 
                field: "nombrecomercial",
                cellClass: "text-start",
                sortable: true, 
            },
        ]
    }

    const myGridElement3 = document.querySelector("#myGridP3");
    gridApi3 = agGrid.createGrid(myGridElement3, gridOptions3);
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
function habilitarBotones2(opc = false){
    if (opc ){
        $("#btnSeleccionar").removeClass("disabled");
        $("#btnSeleccionar").removeClass("btn-secondary");
        $("#btnSeleccionar").addClass("btn-info");
    } else {
        $("#btnSeleccionar").addClass("disabled");
        $("#btnSeleccionar").removeClass("btn-info");
        $("#btnSeleccionar").addClass("btn-secondary");
    }
}
function habilitarBotones3(opc = false){
    if (opc ){
        $("#btnSeleccionar3").removeClass("disabled");
        $("#btnSeleccionar3").removeClass("btn-secondary");
        $("#btnSeleccionar3").addClass("btn-info");
    } else {
        $("#btnSeleccionar3").addClass("disabled");
        $("#btnSeleccionar3").removeClass("btn-info");
        $("#btnSeleccionar3").addClass("btn-secondary");
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
    lstBeneficiariosSeleccion = [];
    lstBeneficiarios.forEach(e=>{
        if (e.type == rsType.beneficiarytype || (rsType.beneficiarytype!="E" && e.type == "A")){
            lstBeneficiariosSeleccion.push(e);
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
    if ($event.charCode == 13){
        buscarProd(textoBuscar, 1);
    }
});

$("#buscarP").on("keypress", function($event){
    let textoBuscar = $(this).val();
    if ($event.charCode == 13){
        buscarProd(textoBuscar, 0);
    }
})
$("#buscarP").on("blur", function($event){
    let textoBuscar = $(this).val();
    buscarProd(textoBuscar, 0);
})

$("#btnBuscarP").on("click", function(){
    let textoBuscar = $("#buscarP").val();
    buscarProd(textoBuscar, 0);
});

$("#btnBuscarTexto").on("click", function(){
    let textoBuscar = $("#searchProduct").val();
    buscarProd(textoBuscar, 1);
});

function buscarProd(textoBuscar = "", lugar = 0){
    // console.log(textoBuscar, lugar)
    textoBuscar = textoBuscar.toLowerCase();
    
    let lstprod = [];
    
    lstProductos.forEach(e=>{
        if ((e.name.toLowerCase()).indexOf(textoBuscar)>-1 || (e.description.toLowerCase()).indexOf(textoBuscar)>-1 || (e.productcode.toLowerCase()).indexOf(textoBuscar)>-1 || (e.barcode.toLowerCase()).indexOf(textoBuscar)>-1){
            lstprod.push(e);
        }
    });

    if (lugar == 1){
        let barcode = "";
        let idproduct = "";
        let qty = 0;
        let price = 0;
        let total = 0;
        let stock = 0;
    
        if (lstprod.length==1){
            barcode = lstprod[0].barcode;
            idproduct = lstprod[0].idproduct;
            stock = lstprod[0].stock;
            qty = 1;
            price = rsType.typevalue == 'C' ? lstprod[0].cost :  lstprod[0].price ;
            total = 0;
    
            $("#searchProduct").val(barcode);
            $("#idproduct").val(idproduct);
            $("#entry").val(rsType.entry!="A" ? rsType.entry : 'I');
            $("#qty").val(qty);
            $("#price").val(price);
            $("#total").val(total);
            $("#stock").val(stock);
            focus("qty");
        } else{
            gridApi2.setGridOption("rowData", lstprod);
            habilitarBusqueda(true);
        }
    } else {
        gridApi2.setGridOption("rowData", lstprod);
        habilitarBusqueda(true);
    }

}

$("#btnSeleccionar").on("click", function(){
    habilitarBusqueda(false);
    buscarProd(idSelect2, 1);
});

$("#btnCancelaBusqueda").on("click", function(){
    habilitarBusqueda(false)
});

function habilitarBusqueda(opc = false){
    if (opc){
        $("#formDivP1").addClass("hide");
        $("#formDivP2").removeClass("hide");
        $("#btmSave").addClass("hide");
        $("#btmCancel").addClass("hide");
    } else {
        $("#formDivP1").removeClass("hide");
        $("#formDivP2").addClass("hide");
        $("#btmSave").removeClass("hide");
        $("#btmCancel").removeClass("hide");
        $("#btnSeleccionar").addClass("disabled");
    }
}

function habilitarBusqueda3(opc = false){
    if (opc){
        $("#formDivP1").addClass("hide");
        $("#formDivP2").addClass("hide");
        $("#formDivP3").removeClass("hide");
        $("#btmSave").addClass("hide");
        $("#btmCancel").addClass("hide");
    } else {
        $("#formDivP1").removeClass("hide");
        $("#formDivP2").removeClass("hide");
        $("#formDivP3").addClass("hide");
        $("#btmSave").removeClass("hide");
        $("#btmCancel").removeClass("hide");
        $("#btnSeleccionar3").addClass("disabled");
    }
}

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
    let stock = parseFloat($("#stock").val());
    let qty = parseFloat($("#qty").val());
    let asiento = $("#entry").val();

    //TODO: Validaicion de stock vs venta o egreso
    if (asiento == "E"){
        if (qty > stock ){
            focus("qty");
            sendMessage("error", "Movimientos", "La cantidad de salida de mercaderia es mayor a la existente. Por favor corríjalo y vuelva a intentarlo.")
            return ;
        }
    }

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
    $("#stock").val(0);
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






$("#txtBuscarBene").on("keypress", function($event){
    let textoBuscar = $(this).val();
    if ($event.charCode == 13){
        buscarBene(textoBuscar, 0);
    }
});

$("#btnBuscarBeneficiario").on("click", function(){
    let textoBuscar = $("#txtBuscarBene").val();
    buscarBene(textoBuscar, 0);
});

function buscarBene(textoBuscar = "", lugar = 0){
    // console.log(textoBuscar, lugar)
    textoBuscar = textoBuscar.toLowerCase();
        
    let lstBene = [];

    lstBeneficiariosSeleccion.forEach(e=>{
        if (lugar == 0){
            if ((e.identification.toLowerCase()).indexOf(textoBuscar)>-1 || (e.nombre.toLowerCase()).indexOf(textoBuscar)>-1 || (e.nombrecomercial.toLowerCase()).indexOf(textoBuscar)>-1){
                lstBene.push(e);
            }
        } else{
            if (e.idbeneficiary == textoBuscar){
                lstBene.push(e);
            }
        }
    });

    // console.log(lstBene)

    if (lugar == 1){
        if (lstBene.length==1){
            idbeneficiary = lstBene[0].idbeneficiary;
            $("#idbeneficiary").val(idbeneficiary);
            focus("searchProduct");
        } else{
            gridApi3.setGridOption("rowData", lstBene);
            habilitarBusqueda3(true);
        }
    } else {
        gridApi3.setGridOption("rowData", lstBene);
        habilitarBusqueda3(true);
    }
}

$("#btnSeleccionar3").on("click", function(){
    habilitarBusqueda3(false);
    buscarBene(idSelect3, 1);
});

$("#btnCancelaBusqueda3").on("click", function(){
    habilitarBusqueda3(false)
});


$("#buscarP3").on("keypress", function($event){
    let textoBuscar = $(this).val();
    if ($event.charCode == 13){
        buscarBene(textoBuscar, 0);
    }
})
$("#buscarP3").on("blur", function($event){
    let textoBuscar = $(this).val();
    buscarBene(textoBuscar, 0);
})

$("#btnBuscarP3").on("click", function(){
    let textoBuscar = $("#buscarP").val();
    buscarBene(textoBuscar, 0);
});