setTimeout(function(){
    if (permisosLectura){
        loadProductos();
        estructuraGrid();
        showDivs(0);
    } else{
        $("#btmDivs").addClass("hide");
        sendMessage("error", "Autorizacion", mensajeNoPermisoLectura);
    }
},800)

lstProductos  = [];
lstKardex = [];
dataSelected = {};
var id = "-1";

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

    let id = $("#idproduct").val();

    let error = false;
    let errMsg = "";
    
    if (!error && id == "-") {
        error = true;
        errMsg = "Debe seleccionar un producto";
    }

    if (error){
        sendMessage("error", title, errMsg);
        return;
    }

    showLoading("Cargando");

    lstProductos.forEach(e=>{
        if (e.idproduct == id){
            $("#descProd").html(`${e.barcode} | ${e.name} | ${e.category} | ${e.line} | ${e.presentation}`);
        }
    })

    habilitarBotones(false);

    let metodo = "POST";
    let url = "kardex&id=" + id;
    await consumirApi(metodo, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            // console.log(resp)

            if (resp.status && resp.status == 'ok') {
                lstKardex = [];

                if (resp.message){
                    resp.message.forEach( e => {
                        e["id"] = e.id.toString();
                        lstKardex.push(e)    
                    });
                    let last = lstKardex[lstKardex.length-1];   
                    // console.log(last)
                    let t = $("#descProd").html();
                    $("#descProd").html(`${t} <br>
                        <kbd class="bg-success mr-1">Stock actual: ${numero(last.sal_cant,4)}</kbd>
                        <kbd class="bg-success mr-1">Costo calculado: ${numero(last.sal_costo,4)}</kbd>
                    `);
                    
                }

                gridApi.setGridOption("rowData", lstKardex);
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


async function loadProductos(){
    let metodo = "GET";
    let url = "productos";
    await consumirApi(metodo, url)
        .then( resp=>{
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {
                lstProductos = resp.message;
                lstProductos.forEach( e => {
                    $("#idproduct").append(`<option value="${e.idproduct}">${e.name}</option>`);
                });

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
            filter: false,
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
            return params.data.id;
        },
        onRowClicked: (event) => {
            dataSelected = event.data;
            idSelect = event.data.id;
            idSelectName = event.data.idproducto_nombre;
            habilitarBotones(true);
        },
        columnDefs: [
            // {
            //     headerName: "ID",
            //     field: "id",
            //     cellClass: "text-start",
            //     hide: false, 
            // },
            {
                headerName: "Fecha",
                field: "fecha",
                cellClass: "text-start",
                // sort: "asc",
                // sortIndex: 1, 
            },
            {
                headerName: "AS",
                headerTooltip: "Asiento",
                field: "asiento",
                cellClass: "text-start",
            },
            {
                headerName: 'Comprobante',
                headerClass: "ag-header-cell-label-center text-center bg-header-1", 
                type: "rightAligned",
                cellClass: "text-end",
                groupId: "Comp",
                children:[
                    {
                        headerName: "Tipo",
                        field: "tipo_comprobante",
                        cellClass: "text-start",
                    },
                    {
                        headerName: "Número",
                        flex:2, 
                        field: "numero_documento",
                        cellClass: "text-start",
                    },
                ]
            },
  
            {
                headerName: 'Ingreso',
                groupId: "ing",
                headerClass: "ag-header-cell-label-center text-center bg-header-2", 
                children:[
                    {
                        headerName: "Cantidad",
                        field: "ing_cant",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.data.ing_cant,4)
                    },
                    {
                        headerName: "Costo",
                        field: "ing_costo",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.data.ing_costo,4)
                    },
                    {
                        headerName: "Total",
                        field: "ing_total",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.data.ing_total,4)
                    },
                ]
            },
            {
                headerName: 'Egreso',
                groupId: "egr",
                headerClass: "ag-header-cell-label-center text-center bg-header-1", 
                marryChildren: true,
                children:[
                    {
                        headerName: "Cantidad",
                        field: "egr_cant",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.data.egr_cant,4)
                    },
                    {
                        headerName: "Costo",
                        field: "egr_costo",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.data.egr_costo,4)
                    },
                    {
                        headerName: "Total",
                        field: "egr_total",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.data.egr_total,4)
                    },
                ]
            },
            {
                headerName: 'Saldo',
                headerClass: "ag-header-cell-label-center text-center bg-header-2", 
                groupId: "sal",
                children:[
                    {
                        headerName: "Cantidad",
                        field: "sal_cant",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.data.sal_cant,4)
                    },
                    {
                        headerName: "Costo",
                        field: "sal_costo",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.data.sal_costo,4)
                    },
                    {
                        headerName: "Total",
                        field: "sal_total",
                        type: "rightAligned",
                        cellClass: "text-end",
                        valueFormatter: params => numero(params.data.sal_total,4)
                    },
                ]
            },
        ]
    }

    const myGridElement = document.querySelector("#myGrid");
    gridApi = agGrid.createGrid(myGridElement, gridOptions);
    gridApi.sizeColumnsToFit();
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


$("#btnBuscar").on("click", function(){
    loadData();
});



$("#btmRefresh").on("click", function(){
    loadData();
});

function habilitarBotones(opc = false){
    if (opc ){
        $("#btmEdit").removeClass("disabled");
        $("#btmEdit").removeClass("btn-secondary");
        $("#btmEdit").addClass("btn-info");
        
        $("#btmDelete").removeClass("disabled");
        $("#btmDelete").removeClass("btn-secondary");
        $("#btmDelete").addClass("btn-danger");

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



