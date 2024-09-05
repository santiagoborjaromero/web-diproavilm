
setTimeout(function(){
    if (permisosLectura){
        estructuraGrid();
        $("#fechadesde").val( moment().format("YYYY") + "-01-01" );
        $("#fechahasta").val( moment().format("YYYY-MM-DD") );
        showDivs(0);
        $("#Anio").trigger("click");

    } else{
        $("#btmDivs").addClass("hide");
        sendMessage("error", "Autorizacion", mensajeNoPermisoLectura);
    }
},800)

//TODO: Variables enceradas
lstReport = [];
lstRoles = [];
userSelected = {};

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

$("#Anio").text(moment().format("Y"))

async function loadData(record, segmento="Anio"){
    showLoading("Cargando");

    habilitarBotones(false);

    let metodo = "GET";
    let url = "lstmovproductos";
    await consumirApi(metodo, url, record)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            lstReport = [];
            
            /*
            "mi1","me1","ms1","mi2","me2","ms2","mi3","me3","ms3",
            "mi4","me4","ms4","mi5","me5","ms5","mi6","me6","ms6",
            "mi7","me7","ms7","mi8","me8","ms8","mi9","me9","ms9",
            "mi10","me10","ms10","mi11","me11","ms11","mi12","me12","ms12"

            */

            gridApi.setColumnsVisible(
            [
                "mi1","me1","ms1","mi2","me2","ms2","mi3","me3","ms3",
                "mi4","me4","ms4","mi5","me5","ms5","mi6","me6","ms6",
                "mi7","me7","ms7","mi8","me8","ms8","mi9","me9","ms9",
                "mi10","me10","ms10","mi11","me11","ms11","mi12","me12","ms12",
                
            ], true)

            
            if (resp.status && resp.status == 'ok') {
                if (resp.message){
                    resp.message.forEach( e => {
                        e["id"] = e.id.toString();
                        switch (segmento){
                            case "T1":
                                gridApi.setColumnsVisible(
                                    [
                                        "mi4","me4","ms4","mi5","me5","ms5","mi6","me6","ms6",
                                        "mi7","me7","ms7","mi8","me8","ms8","mi9","me9","ms9",
                                        "mi10","me10","ms10","mi11","me11","ms11","mi12","me12","ms12",
                                     
                                    ], false)
                                break;
                            case "T2":
                                gridApi.setColumnsVisible(
                                    [
                                        "mi1","me1","ms1","mi2","me2","ms2","mi3","me3","ms3",
                                        "mi7","me7","ms7","mi8","me8","ms8","mi9","me9","ms9",
                                        "mi10","me10","ms10","mi11","me11","ms11","mi12","me12","ms12",
                                     
                                    ], false)
                                break;
                            case "T3":
                                gridApi.setColumnsVisible(
                                    [
                                        "mi1","me1","ms1","mi2","me2","ms2","mi3","me3","ms3",
                                        "mi4","me4","ms4","mi5","me5","ms5","mi6","me6","ms6",
                                        "mi10","me10","ms10","mi11","me11","ms11","mi12","me12","ms12",
                                     
                                    ], false)
                                break;
                            case "T4":
                                gridApi.setColumnsVisible(
                                    [
                                        "mi1","me1","ms1","mi2","me2","ms2","mi3","me3","ms3",
                                        "mi4","me4","ms4","mi5","me5","ms5","mi6","me6","ms6",
                                        "mi7","me7","ms7","mi8","me8","ms8","mi9","me9","ms9",
                                     
                                    ], false)
                                break;
                        }
    
                        lstReport.push(e)    
                    });
                }
                gridApi.setGridOption("rowData", lstReport);
                gridApi.sizeColumnsToFit();
                $("#btnPrint").removeClass("hide");
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

function estructuraGrid(){
    gridOptions = {
        rowStyle: { background: 'white' },
        //TODO: Para que pinte lineas con fondo blanco o grid es un striped
        getRowStyle: params => {
            if (params.data.deleted_at == null){
                if (params.node.rowIndex % 2 !== 0) {
                    return { background: '#f9f9f9' };
                }
            } else{
                return { background: '#FFE2E2'};
            }
        },
        //TODO: aqui se cargan los datos que inicialmente estan vacios
        rowData: [],
        deltaSort: true,
        //TODO: Configuracion de Paginacion
        pagination: true,
        paginationPageSize: 50,
        paginationPageSizeSelector: [5, 10,20, 30, 40, 50, 100, 200, 300, 1000],
        rowSelection: 'single',
        rowHeight: 40,
        tooltipInteraction: true,
        defaultColDef: {
            //TODO: VALORES POR DEFECTO DE TODAS LAS COLUMNAS
            flex: 1,
            minWidth: 50,
            filter: false,
            sortable: true,
            resizable: false,
            floatingFilter: false,
            wrapText: false,
            suppressSizeToFit: true,
            autoHeaderHeight: true,
            suppressAutoSize: true,
            enableCellChangeFlash: true,
            autoHeight: true,
        },
        autoSizeStrategy: {
            type: 'fitCellContents'
        },
        // TODO: DEterminar el indice de la tabla que viene, normalment el campo ID 
        getRowId: (params) => {
            return params.data.id;
        },
        //TODO: Cuando se da click sobre una fila, asigna vairables para tener y poder operar como el id y toda la fila en userSelected
        onRowClicked: (event) => {
            userSelected = event.data;
            idSelect = event.data.id;
            idSelectName = event.data.producto;
            habilitarBotones(true);
        },
        //TODO: DEFINICION DE COLUMNAS
        columnDefs: [
            {
                headerName: 'Producto',
                headerClass: "ag-header-cell-label-center text-center bg-header-1", 
                groupId: "Comp",
                children:[
                    // {
                    //     headerName: "ID",
                    //     flex: 1, 
                    //     field: "id",
                    //     filter: false,
                    //     cellClass: "text-start",
                    // },
                    {
                        headerName: "Codigo",
                        flex: 1, 
                        field: "codigo",
                        filter: true,
                        cellClass: "text-start",
                        // pinned: "left",
                    },
                    {
                        headerName: "Producto",
                        flex: 2, 
                        field: "producto",
                        filter: true,
                        cellClass: "text-start",
                        sort: "asc",
                        sortIndex: 1, 
                        // pinned: "left",
                    },
                ],
            },
            {
                headerName: 'Enero',
                headerClass: "ag-header-cell-label-center text-center bg-header", 
                groupId: "T1",
                children:[
                    {
                        headerName: "Ingreso",
                        headerTooltip: "Ingreso",
                        field: "mi1",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Egreso",
                        headerTooltip: "Egreso",
                        field: "me1",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Saldo",
                        headerTooltip: "Saldo",
                        field: "ms1",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                ]
            },
            {
                headerName: 'Febrero',
                headerClass: "ag-header-cell-label-center text-center bg-header-1", 
                groupId: "T2",
                children:[
                    {
                        headerName: "Ingreso",
                        headerTooltip: "Ingreso",
                        field: "mi2",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Egreso",
                        headerTooltip: "Egreso",
                        field: "me2",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Saldo",
                        headerTooltip: "Saldo",
                        field: "ms2",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                ]
            },
            {
                headerName: 'Marzo',
                headerClass: "ag-header-cell-label-center text-center bg-header", 
                groupId: "T3",
                children:[
                    {
                        headerName: "Ingreso",
                        headerTooltip: "Ingreso",
                        field: "mi3",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Egreso",
                        headerTooltip: "Egreso",
                        field: "me3",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Saldo",
                        headerTooltip: "Saldo",
                        field: "ms3",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                ]
            },
            {
                headerName: 'Abril',
                headerClass: "ag-header-cell-label-center text-center bg-header-1", 
                groupId: "T4",
                children:[
                    {
                        headerName: "Ingreso",
                        headerTooltip: "Ingreso",
                        field: "mi4",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Egreso",
                        headerTooltip: "Egreso",
                        field: "me4",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Saldo",
                        headerTooltip: "Saldo",
                        field: "ms4",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                ]
            },
            {
                headerName: 'Mayo',
                headerClass: "ag-header-cell-label-center text-center bg-header", 
                groupId: "T5",
                children:[
                    {
                        headerName: "Ingreso",
                        headerTooltip: "Ingreso",
                        field: "mi5",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Egreso",
                        headerTooltip: "Egreso",
                        field: "me5",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Saldo",
                        headerTooltip: "Saldo",
                        field: "ms5",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                ]
            },
            {
                headerName: 'Junio',
                headerClass: "ag-header-cell-label-center text-center bg-header-1", 
                groupId: "T6",
                children:[
                    {
                        headerName: "Ingreso",
                        headerTooltip: "Ingreso",
                        field: "mi6",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Egreso",
                        headerTooltip: "Egreso",
                        field: "me6",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Saldo",
                        headerTooltip: "Saldo",
                        field: "ms6",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                ]
            },
            {
                headerName: 'Julio',
                headerClass: "ag-header-cell-label-center text-center bg-header", 
                groupId: "T7",
                children:[
                    {
                        headerName: "Ingreso",
                        headerTooltip: "Ingreso",
                        field: "mi7",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Egreso",
                        headerTooltip: "Egreso",
                        field: "me7",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Saldo",
                        headerTooltip: "Saldo",
                        field: "ms7",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                ]
            },
            {
                headerName: 'Agosto',
                headerClass: "ag-header-cell-label-center text-center bg-header-1", 
                groupId: "T8",
                children:[
                    {
                        headerName: "Ingreso",
                        headerTooltip: "Ingreso",
                        field: "mi8",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Egreso",
                        headerTooltip: "Egreso",
                        field: "me8",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Saldo",
                        headerTooltip: "Saldo",
                        field: "ms8",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                ]
            },
            {
                headerName: 'Septiembre',
                headerClass: "ag-header-cell-label-center text-center bg-header", 
                groupId: "T9",
                children:[
                    {
                        headerName: "Ingreso",
                        headerTooltip: "Ingreso",
                        field: "mi9",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Egreso",
                        headerTooltip: "Egreso",
                        field: "me9",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Saldo",
                        headerTooltip: "Saldo",
                        field: "ms9",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                ]
            },
            {
                headerName: 'Octubre',
                headerClass: "ag-header-cell-label-center text-center bg-header-1", 
                groupId: "T10",
                children:[
                    {
                        headerName: "Ingreso",
                        headerTooltip: "Ingreso",
                        field: "mi10",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Egreso",
                        headerTooltip: "Egreso",
                        field: "me10",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Saldo",
                        headerTooltip: "Saldo",
                        field: "ms10",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                ]
            },
            {
                headerName: 'Noviembre',
                headerClass: "ag-header-cell-label-center text-center bg-header", 
                groupId: "T11",
                children:[
                    {
                        headerName: "Ingreso",
                        headerTooltip: "Ingreso",
                        field: "mi11",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Egreso",
                        headerTooltip: "Egreso",
                        field: "me11",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Saldo",
                        headerTooltip: "Saldo",
                        field: "ms11",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                ]
            },
            {
                headerName: 'Diciembre',
                headerClass: "ag-header-cell-label-center text-center bg-header-1", 
                groupId: "T12",
                children:[
                    {
                        headerName: "Ingreso",
                        headerTooltip: "Ingreso",
                        field: "mi12",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Egreso",
                        headerTooltip: "Egreso",
                        field: "me12",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Saldo",
                        headerTooltip: "Saldo",
                        field: "ms12",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                ]
            },
            {
                headerName: 'Totales',
                headerClass: "ag-header-cell-label-center text-center bg-header", 
                groupId: "Comp",
                children:[
                    {
                        headerName: "Meses",
                        headerTooltip: "Meses",
                        field: "meses",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,0)
                    },
                    {
                        headerName: "Ingreso",
                        headerTooltip: "Ingreso",
                        field: "totali",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Egreso",
                        headerTooltip: "Egreso",
                        field: "totale",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Saldo",
                        headerTooltip: "Saldo",
                        field: "totals",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                ]
            },
            {
                headerName: 'Promedio',
                headerClass: "ag-header-cell-label-center text-center bg-header-1", 
                groupId: "Comp",
                children:[
                    {
                        headerName: "Ingreso",
                        headerTooltip: "Ingreso",
                        field: "promedioi",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Egreso",
                        headerTooltip: "Egreso",
                        field: "promedioe",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Saldo",
                        headerTooltip: "Saldo",
                        field: "promedios",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                ]
            },
            // {
            //     headerName: "Ratio",
            //     headerTooltip: "Ratio",
            //     field: "ratio",
            //     type: "rightAligned",
            //     cellClass: "text-end",
            //     pinned: "left",
            //     valueFormatter: params => numero(params.value,2)
            // },
            

        ]
    }

    const myGridElement = document.querySelector("#myGrid");
    gridApi = agGrid.createGrid(myGridElement, gridOptions);
    // gridApi.sizeColumnsToFit();
}

function cleanRecords(record=null){
    let iduser = -1;
    let username = "";
    let fullname = "";
    let idrole = "-";
    let lang = "es";
    let status = "0";
    $("#username").prop("readonly", false);
    $("#username").prop("disabled", false);

    if(record){
        iduser = record.iduser;
        username = record.username;
        fullname = record.fullname;
        idrole = record.idrole;
        lang = record.lang;
        status = record.status.toString();
        $("#username").prop("readonly", true);
        $("#username").prop("disabled", true);
    }

    $("#iduser").val(iduser);
    $("#username").val(username);
    $("#fullname").val(fullname);
    $("#idrole").val(idrole);
    $("#lang").val(lang);
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
            $("#btmReset").removeClass("hide");
            $("#btmUpUser").removeClass("hide");
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
            $("#btmReset").addClass("hide");
            $("#btmUpUser").addClass("hide");
            $("#btmSave").removeClass("hide");
            $("#btmCancel").removeClass("hide");

            $("#myGrid").addClass("hide");
            $("#FormDiv").removeClass("hide");
            break;
        case 2:
            break;
    }
}

// $("#btmRefresh").on("click", function(){
//     loadData();
// });

function habilitarBotones(opc = false){
    if (opc && !userSelected.deleted_at ){

        $("#btmEdit").removeClass("disabled");
        $("#btmEdit").removeClass("btn-secondary");
        $("#btmEdit").addClass("btn-info");
        
        $("#btmDelete").removeClass("disabled");
        $("#btmDelete").removeClass("btn-secondary");
        $("#btmDelete").addClass("btn-danger");

        $("#btmReset").removeClass("disabled");
        $("#btmReset").removeClass("btn-secondary");
        $("#btmReset").addClass("btn-info");
        
        if (userSelected.deleted_at){
            $("#btmUpUser").removeClass("disabled");
            $("#btmUpUser").removeClass("btn-secondary");
            $("#btmUpUser").addClass("btn-info");
        }else{
            $("#btmUpUser").addClass("disabled");
            $("#btmUpUser").removeClass("btn-info");
            $("#btmUpUser").addClass("btn-secondary");
        }
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
        
        if (userSelected.deleted_at){
            $("#btmUpUser").removeClass("disabled");
            $("#btmUpUser").removeClass("btn-secondary");
            $("#btmUpUser").addClass("btn-info");
        }else{
            $("#btmUpUser").addClass("disabled");
            $("#btmUpUser").removeClass("btn-info");
            $("#btmUpUser").addClass("btn-secondary");

        }
    }
}

//TODO:EXPORTAR PDF Y CSV
$("#PDF").on("click", function(event){
    event.preventDefault();
    imprimir(title, prepararArray(1), 'l');
});
$("#CSV").on("click", function(event){
    event.preventDefault();
    exportarCSV(title, prepararArray(2));
});

function prepararArray(opc){
    let lstR = [];
    lstReport.forEach(e=>{
        if (opc==1){

            lstR.push({
                "ID": e.id,
                "Codigo": e.codigo,
                "Producto": e.producto,
                "Meses": e.meses,
                "Total Ingresos": e.totali,
                "Total Egresos": e.totale,
                "Total Saldo": e.totals,
                "Promedio ingresos": e.promedioi,
                "Promedio egresos": e.promedioe,
                "Promedio saldo": e.promedios,
            })
        }else{
            lstR.push({
                "id": e.id,
                "codigo": e.codigo,
                "producto": e.producto,
                "ingreso_enero": e.mi1,
                "egreso_enero": e.me1,
                "saldo_enero": e.ms1,
                "ingreso_febrero": e.mi2,
                "egreso_febrero": e.me2,
                "saldo_febrero": e.ms2,
                "ingreso_marzo": e.mi3,
                "egreso_marzo": e.me3,
                "saldo_marzo": e.ms3,
                "ingreso_abril": e.mi4,
                "egreso_abril": e.me4,
                "saldo_abril": e.ms4,
                "ingreso_mayo": e.mi5,
                "egreso_mayo": e.me5,
                "saldo_mayo": e.ms5,
                "ingreso_junio": e.mi6,
                "egreso_junio": e.me6,
                "saldo_junio": e.ms6,
                "ingreso_julio": e.mi7,
                "egreso_julio": e.me7,
                "saldo_julio": e.ms7,
                "ingreso_agosto": e.mi8,
                "egreso_agosto": e.me8,
                "saldo_agosto": e.ms8,
                "ingreso_septiembre": e.mi9,
                "egreso_septiembre": e.me9,
                "saldo_septiembre": e.ms9,
                "ingreso_octubre": e.mi10,
                "egreso_octubre": e.me10,
                "saldo_octubre": e.ms10,
                "ingreso_noviembre": e.mi11,
                "egreso_noviembre": e.me11,
                "saldo_noviembre": e.ms11,
                "ingreso_diciembre": e.mi12,
                "egreso_diciembre": e.me12,
                "saldo_diciembre": e.ms12,
                "meses": e.meses,
                "total_ingresos": e.totali,
                "total_egresos": e.totale,
                "total_saldo": e.totals,
                "promedio_ingresos": e.promedioi,
                "promedio_egresos": e.promedioe,
                "promedio_saldo": e.promedios,
            })

        }
    })
    return lstR;
}



$(".buscar").on("click", function(){

    let attr = $(this).attr("action");
    let dini;
    let dfin;
    
    switch(attr){
        case "Anio":
            dini = moment().format("Y") + "-01-01 00:00:00";
            dfin = moment().format("Y") + "-12-31 23:59:59";
            break;
        case "T1":
            dini = moment().format("Y") + "-01-01 00:00:00";
            dfin = moment().format("Y") + "-03-31 23:59:59";
            break;
        case "T2":
            dini = moment().format("Y") + "-04-01 00:00:00";
            dfin = moment().format("Y") + "-06-30 23:59:59";
            break;
        case "T3":
            dini = moment().format("Y") + "-07-01 00:00:00";
            dfin = moment().format("Y") + "-09-30 23:59:59";
            break;
        case "T4":
            dini = moment().format("Y") + "-10-01 00:00:00";
            dfin = moment().format("Y") + "-12-31 23:59:59";
            break;
    }
    $(".buscar").removeClass("active");
    $(this).addClass("active");

    let params = {
        fecha_ini: dini,
        fecha_fin: dfin
    }
    loadData(params, attr);
});
// $("#btnBuscar").on("click", function(){
//     let dini = $("#fechadesde").val();
//     let dfin  = $("#fechahasta").val();

//     let params = {
//         fecha_ini: dini,
//         fecha_fin: dfin
//     }
//     loadData(params);
// });