setTimeout(function(){
    if (permisosLectura){
        estructuraGrid();
        loadData();
        showDivs(0);
    } else{
        $("#btmDivs").addClass("hide");
        sendMessage("error", "Autorizacion", mensajeNoPermisoLectura);
    }
},800)


lstMenuOriginal = [];
dataSelected = {};
var idmenu = "-1";

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
            return params.data.idconfig;
        },
        onRowClicked: (event) => {
            dataSelected = event.data;
            idSelect = event.data.idconfig;
            idSelectName = event.data.variable;
            habilitarBotones(true);
        },
        // groupDisplayType: 'groupRows',
        // groupRowRendererParams: {
        //     order: '01',
        // },
        columnDefs: [
            {
                headerName: "ID",
                flex: 1, 
                field: "idconfig",
                filter: false,
                cellClass: "text-start",
            },
            {
                headerName: "Order",
                flex: 1, 
                field: "order",
                filter: true,
                cellClass: "text-start",
                sort: "asc",
                sortIndex: 1, 
            },
            {
                headerName: "Variable",
                flex: 2, 
                field: "variable",
                filter: true,
                cellClass: "text-start",
            },
            {
                headerName: "Etiqueta",
                flex: 1, 
                field: "label",
                filter: true,
                cellClass: "text-start",
            },
            {
                headerName: "Valor",
                flex: 1, 
                field: "vvalue",
                filter: true,
                cellClass: "text-start",
            },
            
        ]
    }

    const myGridElement = document.querySelector("#myGrid");
    gridApi = agGrid.createGrid(myGridElement, gridOptions);
    gridApi.sizeColumnsToFit();
}
async function loadData(params){
    showLoading("Cargando");

    habilitarBotones(false);

    let metodo = "GET";
    let url = "config";
    await consumirApi(metodo, url, params)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {
                lstconfig = [];

                if (resp.message){
                    resp.message.forEach( e => {
                        e["idconfig"] = e.idconfig.toString();
                        lstconfig.push(e)    
                    });
                }
                
                gridApi.setGridOption("rowData", lstconfig);
                gridApi.sizeColumnsToFit();

                // console.log(lstconfig)
                // parent();

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
function habilitarBotones(opc = false){
    if (opc ){
        $("#btmEdit").removeClass("disabled");
        $("#btmEdit").removeClass("btn-secondary");
        $("#btmEdit").addClass("btn-info");

        $("#btmReset").removeClass("disabled");
        $("#btmReset").removeClass("btn-secondary");
        $("#btmReset").addClass("btn-info");
        
    } else {
        $("#btmEdit").addClass("disabled");
        $("#btmEdit").removeClass("btn-info");
        $("#btmEdit").addClass("btn-secondary");
        
    }
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

    let idconfig = parseInt($("#idconfig").val());
    let order = $("#order").val();
    let variable = $("#variable").val();
    let label = $("#label").val();
    let vvalue = $("#vvalue").val();

    let error = false;
    let errMsg = "";
    
    if (order == "") {
        error = true;
        errMsg = "Debe ingresar el orden";
    }

    if (!error && variable == "") {
        error = true;
        errMsg = "Debe ingresar la variable";
    }

    if (!error && label == "") {
        error = true;
        errMsg = "Debe ingresar la etiqueta";
    }

    if (!error && vvalue == "") {
        error = true;
        errMsg = "Debe ingresar el valor";
    }
    
    if (error){
        sendMessage("error", title, errMsg);
        return;
    }

    showLoading("Guardando");


    let params = {
        order, 
        label, 
        variable , 
        vvalue
    };

    let method = "PUT";
    if (idconfig == -1){
        method = "POST";
    }
    let url = `saveconfig&id=${idconfig}`;
    //console.log(url, params, method);
    await consumirApi(method, url, params)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp){
                if (resp.status && resp.status == 'ok') {
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

$("#btmCancel").on("click", function(){
    showDivs(0);
});

$("#btmEdit").on("click", function(){
    cleanRecords(dataSelected);
    showDivs(1);
});

$("#btmRefresh").on("click", function(){
    loadData();
});

function cleanRecords(record = null){

    let idconfig = -1;
    let order = "";
    let variable = "";
    let label = "";
    let vvalue = "";

    if(record){
        //TODO: Edicion
        idconfig=record.idconfig;
        order=record.order;
        variable=record.variable;
        label=record.label;
        vvalue=record.vvalue;

    }

    $("#idconfig").val(idconfig);
    $("#order").val(order);
    $("#variable").val(variable);
    $("#label").val(label);
    $("#vvalue").val(vvalue);    
}