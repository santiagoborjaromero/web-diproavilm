setTimeout(function(){
    if (permisosLectura){
        estructuraGrid();
        loadData();
        showDivs(0);
        loadTypes();
    } else{
        $("#btmDivs").addClass("hide");
        sendMessage("error", "Autorizacion", mensajeNoPermisoLectura);
    }
},800)


lstTransacciones = [];
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

async function loadData(){
    showLoading("Cargando");

    habilitarBotones(false);
    
    let metodo = "GET";
    let url = "transacciones";
    await consumirApi(metodo, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            // console.log(resp)

            if (resp.status && resp.status == 'ok') {
                lstTransacciones = [];
                resp.message.forEach( e => {
                    e["idtransaction"] = e.idtransaction.toString();
                    lstTransacciones.push(e)    
                    
                    // transaction = { add: [e] };
                    // gridApi.applyTransactionAsync(transaction);

                });

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

async function loadTypes(idmovementtype = 0){
    let metodo = "GET";
    let url = "movtipos";
    if (idmovementtype!=0){
        url = `movtipo&id=${idmovementtype}`;
    }
    // console.log(url);

    await consumirApi(metodo, url)
        .then( resp=>{
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            // console.log(resp.message[0])

            if (resp.status && resp.status == 'ok') {
                if (resp.message){

                    if (idmovementtype == 0){
                        resp.message.forEach(e=>{
                            // console.log(e.idmovementtype)
                            $("#idmovementtype").append(`<option value='${e.idmovementtype}'>${e.name}</option>`)
                        });
                    } else {
                        let obj = resp.message[0];
                        let seq = obj.sequential + 1;
                        $("#numberdocument").val(cnf.prefijo_documentacion + seq.toString().padStart(7, "0"));
                    }
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
                valueFormatter: params => params.data.total.toFixed(2),
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
    $("#btnSelectAll").text("Seleccionar Todo");
    
    let idtransaction = -1;
    let name = "";
    let scope = "";
    let status = "0";
    $("#name").prop("readonly", false);
    $("#name").prop("disabled", false);
    if ($('#scope_r').is(':checked')) $('#scope_r').trigger('click');
    if ($('#scope_w').is(':checked')) $('#scope_w').trigger('click');
    if ($('#scope_d').is(':checked')) $('#scope_d').trigger('click');

    if(record){
        idtransaction = record.idtransaction;
        name = record.name;
        scope = record.scope;

        if (scope.includes("R")) $('#scope_r').trigger('click');
        if (scope.includes("W")) $('#scope_w').trigger('click');
        if (scope.includes("D")) $('#scope_d').trigger('click');

        status = record.status.toString();
        $("#username").prop("readonly", true);
        $("#username").prop("disabled", true);
    }

    if (idtransaction == -1){
        $("#idrolDIV").addClass("hide");
    } else{
        $("#idrolDIV").removeClass("hide");
    }

    $("#idtransaction").val(idtransaction);
    $("#name").val(name);
    $("#scope").val(scope);
    $("#status").val(status);
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

            $("#myGrid").removeClass("hide");
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

            $("#myGrid").addClass("hide");
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
    let idtransaction = $("#idtransaction").val();

    let scope = "";

    if ($('#scope_r').is(':checked')) scope += "R";
    if ($('#scope_w').is(':checked')) scope += "W";
    if ($('#scope_d').is(':checked')) scope += "D";

    let name = $.trim($("#name").val());
    let status = parseInt($("#status").val());

    let error = false;
    let errMsg = "";
    
    if (name == "") {
        error = true;
        errMsg = "Debe ingresar el nombre del usuario";
    }
    
    if (error){
        sendMessage("error", title, errMsg);
        return;
    }

    let params = {
        name,
        scope,
        status
    };

    // console.log(params)

    let method = "PUT";
    // let method = "POST";
    if (idtransaction == -1){
        method = "POST";
        params["name"] = name;
    }
    let url = `saveRole&id=${idtransaction}`;
    
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
                    // loadData();
                    saveDataRoleMenu(idtransaction);
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


$("#idmovementtype").on("change", function(){
    let idmovementtype =  $(this).val();
    loadTypes(idmovementtype);  
})