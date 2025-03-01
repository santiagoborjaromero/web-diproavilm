setTimeout(function(){
    if (permisosLectura){
        estructuraGrid();
        loadData();
        loadLineas();
        loadCategorias();
        loadPresentacion();
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

async function loadLineas(){
    let metodo = "GET";
    let url = "productoLineas";
    await consumirApi(metodo, url)
        .then( resp=>{
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {
                if (resp.message){
                    resp.message.forEach(e=>{
                        if (e.deleted_at === null){
                            $("#idproductline").append(`<option value="${e.idproductline}">${e.description}</option>`)
                        }
                    })
                }

            } else {
                sendMessage("error", title + " - Lineas", resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            console.log("ERR", err);
            sendMessage("error", title + " - Lineas", JSON.stringify(err.responseText));
        });
}

async function loadCategorias(){
    let metodo = "GET";
    let url = "productoCategorias";
    await consumirApi(metodo, url)
        .then( resp=>{
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}
            if (resp.status && resp.status == 'ok') {
                if (resp.message){
                    resp.message.forEach(e=>{
                        if (e.deleted_at === null){
                            $("#idproductcategory").append(`<option value="${e.idproductcategory}">${e.description}</option>`)
                        }
                    })
                }

            } else {
                sendMessage("error", title + " - Categorias", resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            console.log("ERR", err);
            sendMessage("error", title + " - Categorias", JSON.stringify(err.responseText));
        });
}

async function loadPresentacion(){
    let metodo = "GET";
    let url = "presentacion";
    await consumirApi(metodo, url)
        .then( resp=>{
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {
                if (resp.message){
                    resp.message.forEach(e=>{
                        $("#idpresentation").append(`<option value="${e.idpresentation}">${e.name}</option>`)
                    })
                }

            } else {
                sendMessage("error", title + " - Categorias", resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            console.log("ERR", err);
            sendMessage("error", title + " - Categorias", JSON.stringify(err.responseText));
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
        rowSelection: { mode: 'singleRow', checkboxes: false, enableClickSelection: true, },
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

function cleanRecords(record=null){


    let idproduct = -1;
    let name = "";
    let description = "";
    let productcode = "";
    let barcode = "";
    let idpresentation = "-";
    let idproductline = "-";
    let idproductcategory = "-";
    let price = "0.00";
    let status = "0";
    let accountcost = "";
    let accountsales = "";
    let accountinv = "";

    if(record){
        idproduct = record.idproduct;
        name = record.name;
        description = record.description;
        productcode = record.productcode;
        barcode = record.barcode;
        idpresentation = record.idpresentation;
        idproductline = record.idproductline;
        idproductcategory = record.idproductcategory;
        price = record.price;
        status = record.status;
        accountcost = record.accountcost;
        accountsales = record.accountsales;
        accountinv = record.accountinv;
    }
    
    $("#idproduct").val(idproduct);
    $("#name").val(name);
    $("#description").val(description);
    $("#productcode").val(productcode);
    $("#barcode").val(barcode);
    $("#idpresentation ").val(idpresentation );
    $("#idproductline").val(idproductline);
    $("#idproductcategory").val(idproductcategory);
    $("#price").val(price);
    $("#status").val(status);
    $("#accountcost").val(accountcost);
    $("#accountsales").val(accountsales);
    $("#accountinv").val(accountinv);
    
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

$("#btmNew").on("click", function(){
    cleanRecords();
    showDivs(1);
});

$("#btmSave").on("click", function(){
    saveData();
});

async function saveData(){

    let idproduct = parseInt($("#idproduct").val());
    let name = $.trim($("#name").val());
    let description = $.trim($("#description").val());
    let productcode = $.trim($("#productcode").val());
    let barcode = $.trim($("#barcode").val());
    let idpresentation = $("#idpresentation").val();
    let idproductline = $("#idproductline").val();
    let idproductcategory = $("#idproductcategory").val();
    let price = parseFloat($("#price").val());
    let status = parseInt($("#status").val());
    let accountcost = $("#accountcost").val();
    let accountsales = $("#accountsales").val();
    let accountinv = $("#accountinv").val();

    let error = false;
    let errMsg = "";
    
    if (name == "") {
        error = true;
        errMsg = "Debe ingresar el nombre del producto";
    }

    if (!error && productcode == "") {
        error = true;
        errMsg = "Debe ingresar el codigo de producto";
    }

    if (!error && barcode == "") {
        error = true;
        errMsg = "Debe ingresar el codigo de barras del producto";
    }

    if (!error && idpresentation == "-") {
        error = true;
        errMsg = "Debe seleccionar la presentacion del producto";
    }

    if (!error && idproductline == "-") {
        error = true;
        errMsg = "Debe seleccionar la línea del producto";
    }

    if (!error && idproductcategory == "-") {
        error = true;
        errMsg = "Debe seleccionar la categoría del producto";
    }

    if (!error && price <= 0) {
        error = true;
        errMsg = "Debe establecer el precio de venta del producto";
    }

    if (error){
        sendMessage("error", title, errMsg);
        return;
    }

    showLoading("Guardando");

    idpresentation = parseInt(idpresentation);
    idproductline = parseInt(idproductline);
    idproductcategory = parseInt(idproductcategory);

    let params = {
        name,
        description,
        productcode,
        barcode,
        idpresentation,
        idproductline,
        idproductcategory,
        price,
        status,
        accountcost,
        accountsales,
        accountinv
    };

    // console.log(params)

    let method = "PUT";
    if (idproduct == -1){
        method = "POST";
    }
    let url = `saveProducto&id=${idproduct}`;

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
    $("#username").addClass("disabled");
    showDivs(1);
});

$("#btmDelete").on("click", function(){
    hacerPregunta("Eliminar Producto", "eliminar", "deleteProducto");
});

$("#btmReestablecer").on("click", function(){
    hacerPregunta("Recuperar un producto eliminado", "recuperar", "recuperarProducto");
});

function hacerPregunta(action='', keyword='', queFuncionEjecuto=''){
    Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        icon: 'question',
        title: title,
        text: `Para ${action}, debe escribir ${keyword}.`,
        input: "text",
        showCancelButton: true,
        inputPlaceholder: keyword,
        confirmButtonColor: '#f63c3a',
        confirmButtonText: formatoTitulo(keyword),
        cancelButtonColor: '#33a0d6',
        cancelButtonText: 'Cancelar',
        inputValidator: text => {
            return new Promise(resolve => {
              if (text.trim() !== '' && text.trim() ==  keyword) {
                resolve('');
              } else {
                resolve(
                  `Para ${action}, debe ingresar la palabra ${keyword}.`
                );
              }
            });
        }
    }).then(res => {
        if (res.isConfirmed) {
            if (queFuncionEjecuto!=''){
                eval(`realizarAccion('${queFuncionEjecuto}')`);
            }
        }
    });
}

async function realizarAccion(ruta=""){
    let method = ruta == "deleteProducto" ? "DELETE" : "POST";
    let url = `${ruta}&id=${idSelect}`;

    await consumirApi(method, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            // console.log(resp)

            if (resp.status && resp.status == 'ok') {
                if (ruta == "deleteProducto"){
                    sendMessage("success", title, `Registro ${resp.message} eliminado con éxito`);
                } else if (ruta == "recuperarProducto"){
                    sendMessage("success", title, `Registro ${resp.message} recuperado con éxito`);
                }
                showDivs(0);
                loadData();
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

    // if (dataSelected){
    let html = "<ul class='list-group'>";
    html += "<li class='list-group-item'>";
    if (dataSelected) html += `<span>${dataSelected.productcode}</span><br>`;
    if (!dataSelected) html += `<br>`;
    html += `<span class='t10'>CODIGO</span>`;
    html += "</li>";

    html += "<li class='list-group-item'>";
    if (dataSelected)  html += `<span>${dataSelected.barcode}</span><br>`;
    if (!dataSelected) html += `<br>`;
    html += `<span class='t10'>CODIGO DE BARRAS</span>`;
    html += "</li>";

    html += "<li class='list-group-item'>";
    if (dataSelected)  html += `<span>${dataSelected.description}</span><br>`;
    if (!dataSelected) html += `<br>`;
    html += `<span class='t10'>DESCRIPCION</span>`;
    html += "</li>";

    html += "<li class='list-group-item'>";
    if (dataSelected)  html += `<span>${dataSelected.presentation}</span><br>`;
    if (!dataSelected) html += `<br>`;
    html += `<span class='t10'>PRESENTACION</span>`;
    html += "</li>";

    html += "<li class='list-group-item'>";
    if (dataSelected)  html += `<span>${dataSelected.line}</span><br>`;
    if (!dataSelected) html += `<br>`;
    html += `<span class='t10'>LINEA</span>`;
    html += "</li>";

    html += "<li class='list-group-item'>";
    if (dataSelected)  html += `<span>${dataSelected.category}</span><br>`;
    if (!dataSelected) html += `<br>`;
    html += `<span class='t10'>CATEGORIA</span>`;
    html += "</li>";

    

    html += "<li class='list-group-item '>";
    html +=   "<div class='row'>";
    html +=     "<div class='col text-end'>";
    if (dataSelected)  html +=       `<span>${dataSelected.cost}</span><br>`;
    if (!dataSelected) html += `<br>`;
    html +=       `<span class='t10'>COSTO</span>`;
    html +=     "</div>";
    html +=     "<div class='col text-end'>";
    if (dataSelected)  html +=       `<span>${dataSelected.price}</span><br>`;
    if (!dataSelected) html += `<br>`;
    html +=       `<span class='t10'>PVP</span>`;
    html +=     "</div>";
    html +=     "<div class='col text-end'>";
    if (dataSelected)  html +=       `<span>${dataSelected.stock}</span><br>`;
    if (!dataSelected) html += `<br>`;
    html +=       `<span class='t10'>EXISTENCIA</span>`;
    html +=     "</div>";
    html +=   "</div>";
    html += "</li>";
    
    
    html += "</ul>";
    $("#info").html(html);
    // }

}
