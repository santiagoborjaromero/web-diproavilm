/*
Valor por ventas en 2021=  $80.000.00.  
Promedio de inventarios 2021=  $20.000.000.
Tasa de rotación de inventario= Costo de mercancía vendida / promedio de inventario.
TRI = 80.000.000 / 20.000.000 = 4.
*/


setTimeout(function(){
    if (permisosLectura){
        estructuraGrid();
        $("#fechadesde").val( moment().format("YYYY") + "-01-01" );
        $("#fechahasta").val( moment().format("YYYY-MM-DD") );
        showDivs(0);
    } else{
        $("#btmDivs").addClass("hide");
        sendMessage("error", "Autorizacion", mensajeNoPermisoLectura);
    }
},800)

//TODO: Variables enceradas
lstMinMax = [];
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

async function loadData(record){
    $("#btnPrint").addClass("hide");
    showLoading("Cargando");

    habilitarBotones(false);

    let metodo = "GET";
    let url = "lstanalisisrotacion";
    await consumirApi(metodo, url, record)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            lstMinMax = [];
            
            if (resp.status && resp.status == 'ok') {
                resp.message.forEach( e => {
                    e["idproduct"] = e.idproduct.toString();
                    e["minimo"] = Math.round(e.rotacion);
                    e["maximo"] =  Math.round(e.stock < e.rotacion ? ((e.rotacion / e.rotaciondias) * e.dias) : e.stock);
                    // e["maximo"] =  Math.round((e.rotacion / e.rotaciondias) * e.dias);
                    lstMinMax.push(e)    
                });
                // console.log(lstMinMax)
                gridApi.setGridOption("rowData", lstMinMax);
                gridApi.sizeColumnsToFit();
                // $("#btnPrint").removeClass("hide");
                $("#btmAplicar").removeClass("hide");
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
        // TODO: DEterminar el indice de la tabla que viene, normalment el campo ID 
        getRowId: (params) => {
            return params.data.idproduct;
        },
        //TODO: Cuando se da click sobre una fila, asigna vairables para tener y poder operar como el id y toda la fila en userSelected
        onRowClicked: (event) => {
            userSelected = event.data;
            idSelect = event.data.idproduct;
            habilitarBotones(true);
            // verAnalisis()
        },
        //TODO: DEFINICION DE COLUMNAS
        columnDefs: [
            {
                headerName: 'Producto',
                headerClass: "ag-header-cell-label-center text-center bg-header-1", 
                groupId: "Comp",
                children:[
                    {
                        headerName: "ID",
                        flex: 1, 
                        field: "idproduct",
                        filter: false,
                        cellClass: "text-start",
                    },
                    {
                        headerName: "Codigo",
                        flex: 1, 
                        field: "codebar",
                        filter: true,
                        cellClass: "text-start",
                    },
                    {
                        headerName: "Producto",
                        flex: 2, 
                        field: "name",
                        filter: true,
                        cellClass: "text-start",
                        sort: "asc",
                        sortIndex: 1, 
                        // pinned: "left",
                    },
                ],
            },
            {
                headerName: 'Variables',
                headerClass: "ag-header-cell-label-center text-center bg-header-1", 
                groupId: "var",
                children:[
                    {
                        headerName: "Stock",
                        headerTooltip: "Stock actual",
                        field: "stock",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                 
                ]
            },
            {
                headerName: 'Rotacion',
                headerClass: "ag-header-cell-label-center text-center bg-header-1", 
                groupId: "var",
                children:[
                    // {
                    //     headerName: "Dias",
                    //     headerTooltip: "Dias muestra",
                    //     field: "dias",
                    //     type: "rightAligned",
                    //     cellClass: "text-end",
                    // },
                    {
                        headerName: "Rotacion",
                        headerTooltip: "Rotacion",
                        field: "rotacion",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Rotacion Dias",
                        headerTooltip: "Rotacion en dias",
                        field: "rotaciondias",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.value,2)
                    },
                ]
            },
            {
                headerName: 'Stock Calculado Sugerido',
                headerClass: "ag-header-cell-label-center text-center bg-header-1", 
                groupId: "var",
                children:[
                    {
                        headerName: "Minimo",
                        headerTooltip: "Minimo",
                        field: "minimo",
                        type: "rightAligned",
                        cellClass: "text-end bg-info",
                        editable: true,
                        valueFormatter: params => numero(params.value,2)
                    },
                    {
                        headerName: "Maximo",
                        headerTooltip: "Maximo",
                        field: "maximo",
                        type: "rightAligned",
                        cellClass: "text-end bg-info",
                        editable: true,
                        valueFormatter: params => numero(params.value,2)
                    },
                ]
            },
        ]
    }

    const myGridElement = document.querySelector("#myGrid");
    gridApi = agGrid.createGrid(myGridElement, gridOptions);
    gridApi.sizeColumnsToFit();
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




function verAnalisis(){
    userSelected

    let html = `
        <strong class="bold text-success">Rotación</strong> de <b>${userSelected.rotacion}</b> en <b>${userSelected.dias}</b> días.<br>
        Esto significa que, en un periodo de <b>${userSelected.dias}</b> días, el producto ha rotado (o se ha vendido y repuesto) 
        aproximadamente <b>${userSelected.rotacion}</b> veces. <br><br>
        
        <strong class="bold text-success">Rotación por días</strong> de <b>${userSelected.dias}</b><br>
        Este número sugiere que, al ritmo actual de ventas, el inventario tardaría aproximadamente <b>${userSelected.dias}</b> días en 
        agotarse por completo, lo que representa el tiempo que tomaría hacer una rotación completa del stock.
    `;
    $("#analisis").html(html)
}

//TODO:EXPORTAR PDF Y CSV
$("#PDF").on("click", function(event){
    event.preventDefault();
    imprimir(title, prepararArray(1), 'l');
});
$("#CSV").on("click", function(event){
    event.preventDefault();
    exportarCSV("Calculo de Minimos y Maximos", prepararArray(2), "");
});

function prepararArray(opc){
    let lstR = [];
    lstMinMax.forEach(e=>{
        lstR.push({
            "ID": e.id,
            "Codigo": e.codebar,
            "Producto": e.name,
            "Stock": e.stock,
            "Dias": e.dias,
            "Rotacion": e.rotacion,
            "Rotacion Dias": e.rotaciondias,
            "Stock Minimo": e.minimo,
            "Stock Maximo": e.maximo
        });
    })
    return lstR;
}


$("#btnBuscar").on("click", function(){
    let dini = $("#fechadesde").val();
    let dfin  = $("#fechahasta").val();

    let params = {
        fecha_ini: dini,
        fecha_fin: dfin
    }
    loadData(params);
});

$("#btnInfo").on("click", function(){
    let htmlAyuda = `
        Puede editar directamente stock minimo y máximo dando doble click sobre cada celda.
    `;
    help(htmlAyuda, true);
});


$("#btmAplicar").on("click", function(){
    save();
});


async function save(){
    showLoading("Guardando");

    let params = {data:[]};
    lstMinMax.forEach(e=>{
        if (isNaN(e.minimo)) e.minimo = 1;
        if (isNaN(e.maximo)) e.maximo = 1;
        params.data.push({
            idproduct: parseInt(e.idproduct),
            stock_min: e.minimo,
            stock_max: e.maximo
        });
    });

    let method = "POST";
    let url = `saveStockMinMax`;

    await consumirApi(method, url, params)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp){
                if (resp.status && resp.status == 'ok') {
                    sendMessage("success", title, resp.message);
                    $("#btmAplicar").addClass("hide");
                    $("#btnPrint").removeClass("hide");

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