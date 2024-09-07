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
                let totalcosto = 0;
                let totalventa = 0;
                let acumcosto = 0;
                let acumventa = 0;
                let categoria = [];
                let linea = [];
                let found=false;
                resp.message.forEach( e => {
                    if (e.deleted_at==null && e.status==1){
                        e["idproduct"] = e.idproduct.toString();
    
                        totalcosto = parseFloat(e.cost) * parseFloat(e.stock);
                        totalventa = parseFloat(e.price) * parseFloat(e.stock);

                        acumcosto += totalcosto;
                        acumventa += totalventa;
                        
                        e["totalcost"] = totalcosto;
                        e["totalprice"] = totalventa;

                        /**CATEGORIA */
                        found = false;
                        categoria.forEach(c=>{
                            if (!found && e.category == c.category){
                                c.totalcost += totalcosto;
                                c.totalventa += totalventa;
                                found = true
                            }
                        });
                        if (!found){
                            categoria.push({
                                category: e.category, 
                                totalcost: totalcosto,
                                totalventa: totalventa
                            });
                        }

                        /**LINEA*/

                        found = false
                        linea.forEach(c=>{
                            if (!found && e.line == c.line){
                                found = true;
                                c.totalcost += totalcosto;
                                c.totalventa += totalventa;
                            }
                        });
                        if (!found){
                            linea.push({
                                line: e.line, 
                                totalcost: totalcosto,
                                totalventa: totalventa
                            });
                        }
    
                        lstProductos.push(e)
                    }
                });

                gridApi.setGridOption("rowData", lstProductos);
                gridApi.sizeColumnsToFit();
                
                // console.log(lstProductos)
                console.log(categoria)
                console.log(linea)

                // let acumcategoriacosto = 0;
                // let acumcategoriaventa = 0;
                // let acumlineacosto = 0;
                // let acumlineaventa = 0;

                let html =`
                    <span class="bold text-uppercase t12">Total por Categoria </span><hr>
                    <div class='row'>

                `;
                categoria.forEach(c=>{
                    html += `
                        <div class='col t12 '>
                            <span class="bold">${c.category}</span><br>
                            <div class='row'>
                                <span class="col ">Costo</span>
                                <span class="col bold text-primary text-end">$ ${numero(c.totalcost,2)}</span>
                            </div>
                            <div class='row'>
                                <span class="col ">Precio</span>
                                <span class="col bold text-success text-end">$ ${numero(c.totalventa,2)}</span>
                            </div>
       
                        </div>
                    `
                });
                html += `</div>
                    <hr>
                    <span class="bold text-uppercase t12">Total por Linea de Producto </span> 
                    <hr>
                    <div class='row'>

                `;
                linea.forEach(c=>{
                    html += `
                        <div class='col t12 '>
                            <span class="bold">${c.line}</span><br>
                            <div class='row'>
                                <span class="col ">Costo</span>
                                <span class="col bold text-primary text-end">$ ${numero(c.totalcost,2)}</span>
                            </div>
                            <div class='row'>
                                <span class="col ">Precio</span>
                                <span class="col bold text-success text-end">$ ${numero(c.totalventa,2)}</span>
                            </div>
       
                        </div>
                    `
                });
                html += `</div>`;

                $("#acumcosto").html("$ " + numero(acumcosto,2));
                $("#acumventa").html("$ " + numero(acumventa,2));
                // $("#acumcategoriacosto").html("$ " + numero(acumcategoriacosto,2));
                // $("#acumcategoriaventa").html("$ " + numero(acumcategoriaventa,2));
                // $("#acumlineacosto").html("$ " + numero(acumlineacosto,2));
                // $("#acumlineaventa").html("$ " + numero(acumlineaventa,2));

                /*
                <div class="card">
                    <div class="card-body text-end">
                        <div class="dash-title"><i class="far fa-chart-bar"></i> Costo y Categoria</div>
                        <div class="dash-valor" id="acumcategoriacosto">$ 0.00</div>
                        <div class="dash-subtitulo">Inventario valorado por costo y categoria del producto</div>
                        <!-- <kbd class="">KPI</kbd> -->
                    </div>
                </div>
                */


                $("#dataStats").html(html);
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
                flex: 2, 
                field: "barcode",
                filter: true,
                cellClass: "text-start",
            },
            {
                headerName: "Nombre",
                flex: 3, 
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
            {
                headerName: "Existencia",
                flex: 1, 
                field: "stock",
                filter: true,
                type: "rightAligned",
                cellClass: "text-end",
                valueFormatter: params => numero(params.value,4)
            },
            {
                headerName: "Costo",
                flex: 1, 
                field: "cost",
                filter: false,
                type: "rightAligned",
                cellClass: "text-end",
                valueFormatter: params => numero(params.value,4)
            },
            {
                headerName: "PVP",
                flex: 1, 
                field: "price",
                filter: false,
                type: "rightAligned",
                cellClass: "text-end",
                valueFormatter: params => numero(params.value,4)
            },
            {
                headerName: "Total Costo",
                flex: 1, 
                field: "totalcost",
                filter: false,
                type: "rightAligned",
                cellClass: "text-end",
                valueFormatter: params => numero(params.value,4)
            },
            {
                headerName: "Total Precio",
                flex: 1, 
                field: "totalprice",
                filter: false,
                type: "rightAligned",
                cellClass: "text-end",
                valueFormatter: params => numero(params.value,4)
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
                "Presentacion": e.presentation,
                "Costo": e.cost,
                "Stock": e.stock,
                "Precio": e.price,
                "Valor Costo": e.totalcost,
                "Valor Precio": e.totalprice,
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
                "Valor Costo": e.totalcost,
                "Valor Precio": e.totalprice,
            })
        }
    })
    return lstR;
}

