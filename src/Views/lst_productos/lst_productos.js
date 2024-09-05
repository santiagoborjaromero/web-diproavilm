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


lstProductos = [];
dataSelected = null;
var idproduct = "-1";

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
    let url = "productos";
    await consumirApi(metodo, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {
                lstProductos = [];
                resp.message.forEach( e => {
                    e["idproduct"] = e.idproduct.toString();
                    lstProductos.push(e)    
                });

                // console.log(lstProductos)
                
                gridApi.setGridOption("rowData", lstProductos);
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


function estructuraGrid(){
    gridOptions = {
        rowStyle: { background: 'white' },
        getRowStyle: params => {
            if (params.data.deleted_at == null){
                if (params.node.rowIndex % 2 !== 0) {
                    return { background: '#f9f9f9' };
                }
            } else{
                return { background: '#FFE2E2'};
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
        getRowId: (params) => {
            return params.data.idproduct;
        },
        onRowClicked: (event) => {
            dataSelected = event.data;
            idSelect = event.data.idproduct;
            idSelectName = event.data.name;
            habilitarBotones(true);
        },
        columnDefs: [
            // {
            //     headerName: "ID",
            //     flex: 1, 
            //     field: "idproduct",
            //     filter: false,
            //     cellClass: "text-start",
            // },
            // {
            //     headerName: "Código",
            //     flex: 1, 
            //     field: "productcode",
            //     filter: false,
            //     cellClass: "text-start",
            // },
            {
                headerName: "Código Barras",
                flex: 1, 
                field: "barcode",
                filter: true,
                cellClass: "text-start",
            },
            {
                headerName: "Nombre",
                flex: 2, 
                field: "name",
                filter: true,
                cellClass: "text-start",
                sort: "asc",
                sortIndex: 2, 
            },
            {
                headerName: "Categoria",
                flex: 2, 
                field: "category",
                filter: true,
                cellClass: "text-start",
            },
            {
                headerName: "linea",
                flex: 2, 
                field: "line",
                filter: true,
                cellClass: "text-start",
            },
            // {
            //     headerName: "Costo",
            //     flex: 1, 
            //     field: "cost",
            //     filter: false,
            //     cellClass: "text-start",
            // },
            {
                headerName: "Existencia",
                flex: 1, 
                field: "stock",
                filter: true,
                cellClass: "text-start",
            },
            // {
            //     headerName: "PVP",
            //     flex: 1, 
            //     field: "price",
            //     filter: false,
            //     cellClass: "text-start",
            // },
            {
                headerName: "Estado",
                flex: 1, 
                field: "status",
                filter: false,
                // cellClass: "text-start",
                cellClass: "ag-header-cell-label-center", 
                cellRenderer: (params) => {
                    let status = params.data.status;
                    let html = "";
                    let cls = "";
                    let color = "";
                    if (status == 1){
                        cls = "fa fa-check";
                        color = "bg-success";
                    }else{
                        cls = "fa fa-times";
                        color = "bg-danger";
                    }
                    html += `<kbd class='${color}'><i class="${cls}"></i></kbd>`;
                    return html;
                },
            },
            {
                headerName: "Eliminado",
                flex: 1, 
                field: "deleted_at",
                filter: true,
                cellClass: "text-start",
                sort: "asc",
                sortIndex: 1, 
                cellRenderer: (params) => {
                    let html="";
                    let inactivo = params.data.deleted_at ? 1 : 0;
                    if (inactivo == 1){
                        cls = "fa fa-check";
                        color = "bg-danger";
                    }else{
                        cls = "fas fa-minus";
                        color = "bg-light text-dark";
                    }
                    html += `<kbd class='${color}'><i class="${cls}"></i></kbd>`;
                    return html;
                },
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
            $("#btmReestablecer").removeClass("hide");
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
            $("#btmReestablecer").addClass("hide");
            $("#btmSave").removeClass("hide");
            $("#btmCancel").removeClass("hide");

            $("#GridDiv").addClass("hide");
            $("#FormDiv").removeClass("hide");
            break;
        case 2:
            break;
    }
}

$("#btmRefresh").on("click", function(){
    dataSelected = null;
    loadData();
});

function habilitarBotones(opc = false){

    
    if (opc && !dataSelected.deleted_at ){
        $("#btmEdit").removeClass("disabled");
        $("#btmEdit").removeClass("btn-secondary");
        $("#btmEdit").addClass("btn-info");
        
        $("#btmDelete").removeClass("disabled");
        $("#btmDelete").removeClass("btn-secondary");
        $("#btmDelete").addClass("btn-danger");

        if (dataSelected && dataSelected.deleted_at){
            $("#btmReestablecer").removeClass("disabled");
            $("#btmReestablecer").removeClass("btn-secondary");
            $("#btmReestablecer").addClass("btn-info");
        }else{
            $("#btmReestablecer").addClass("disabled");
            $("#btmReestablecer").removeClass("btn-info");
            $("#btmReestablecer").addClass("btn-secondary");
        }
        
    } else {
        $("#btmEdit").addClass("disabled");
        $("#btmEdit").removeClass("btn-info");
        $("#btmEdit").addClass("btn-secondary");

        $("#btmDelete").addClass("disabled");
        $("#btmDelete").removeClass("btn-danger");
        $("#btmDelete").addClass("btn-secondary");
        
        if (dataSelected &&  dataSelected.deleted_at){
            $("#btmReestablecer").removeClass("disabled");
            $("#btmReestablecer").removeClass("btn-secondary");
            $("#btmReestablecer").addClass("btn-info");
        }else{
            $("#btmReestablecer").addClass("disabled");
            $("#btmReestablecer").removeClass("btn-info");
            $("#btmReestablecer").addClass("btn-secondary");

        }
        
    }
}



//TODO:EXPORTAR PDF Y CSV
$("#PDF").on("click", function(event){
    event.preventDefault();
    imprimir(title, prepararArray(1), 'l', "");
});
$("#CSV").on("click", function(event){
    event.preventDefault();
    exportarCSV(title, prepararArray(2), "");
});

function prepararArray(opc){
    let lstR = [];
    lstProductos.forEach(e=>{
        if (opc == 1){
            lstR.push({
                "Codigo Barras": e.barcode,
                "Categoria": e.category,
                "Linea": e.line,
                "Nombre": e.name,
                "Presentacion": e.presentation,
                "Costo": e.cost,
                "Stock": e.stock,
                "Precio": e.price,
                "Estado": e.status == 0 ? 'Inactivo' : 'Activo',
            })
        }else{
            lstR.push({
                "ID": e.idproduct,
                "Codigo": e.productcode,
                "Codigo Barras": e.barcode,
                "Categoria": e.category,
                "Linea": e.line,
                "Nombre": e.name,
                "Descripcion": e.description,
                "Presentacion": e.presentation,
                "Costo": e.cost,
                "Stock": e.stock,
                "Precio": e.price,
                "Stock Min": e.stock_min,
                "Stock Max": e.stock_max,
                "Estado": e.status == 0 ? 'Inactivo' : 'Activo',
            })
        }
    })
    return lstR;
}

