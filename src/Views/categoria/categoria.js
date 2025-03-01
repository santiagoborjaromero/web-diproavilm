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


lstData = [];
dataSelected = null;
var idproductcategory = "-1";

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
    let url = "productoCategorias";
    await consumirApi(metodo, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {
                lstData = [];
                resp.message.forEach( e => {
                    e["idproductcategory"] = e.idproductcategory.toString();
                    lstData.push(e)    
                });

                // console.log(lstData)
                
                gridApi.setGridOption("rowData", lstData);
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
            return params.data.idproductcategory;
        },
        onRowClicked: (event) => {
            dataSelected = event.data;
            idSelect = event.data.idproductcategory;
            idSelectName = event.data.description;
            habilitarBotones(true);
        },
        columnDefs: [
            {
                headerName: "ID",
                flex: 1, 
                field: "idproductcategory",
                filter: true,
                cellClass: "text-start",
            },
            {
                headerName: "Descripcion",
                flex: 2, 
                field: "description",
                filter: true,
                cellClass: "text-start",
                sort: "asc",
                sortIndex: 2, 
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
    let idproductcategory = -1;
    let description = "";

    if(record){
        idproductcategory = record.idproductcategory;
        description = record.description;
    }
    
    $("#idproductcategory").val(idproductcategory);
    $("#description").val(description);
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

    let idproductcategory = parseInt($("#idproductcategory").val());
    let description = $.trim($("#description").val());

    let error = false;
    let errMsg = "";
    
    if (description == "") {
        error = true;
        errMsg = "Debe ingresar la categoria del producto";
    }

    if (error){
        sendMessage("error", title, errMsg);
        return;
    }

    showLoading("Guardando");

    let params = {
        description: description.toUpperCase()
    };

    // console.log(params)

    let method = "PUT";
    if (idproductcategory == -1){
        method = "POST";
    }
    let url = `saveProductoCategorias&id=${idproductcategory}`;

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

$("#btmDelete").on("click", function(){
    hacerPregunta("Eliminar Producto", "eliminar", "deleteProductoCategorias");
});

$("#btmReestablecer").on("click", function(){
    hacerPregunta("Recuperar un producto eliminado", "recuperar", "recuperarProductoCategorias");
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
    let method = ruta == "deleteProductoCategorias" ? "DELETE" : "POST";
    let url = `${ruta}&id=${idSelect}`;
    
    // console.log(url);
    await consumirApi(method, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            // console.log(resp)

            if (resp.status && resp.status == 'ok') {
                if (ruta == "deleteProductoCategorias"){
                    sendMessage("success", title, `Registro ${resp.message} eliminado con éxito`);
                } else if (ruta == "recuperarProductoCategorias"){
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
}
