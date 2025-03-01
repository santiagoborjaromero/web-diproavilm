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

lstDict = [];
dataSelected = {};
var idbotdic = "-1";

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
    let url = "botdics";
    await consumirApi(metodo, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}


            if (resp.status && resp.status == 'ok') {
                lstDict = [];
                resp.message.forEach( e => {
                    e["idbotdic"] = e.idbotdic.toString();
                    lstDict.push(e)    
                });
                
                gridApi.setGridOption("rowData", lstDict);
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

//TODO: Estructura para definir el grid o tabla de datos
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
            filter: true,
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
            return params.data.idbotdic;
        },
        onRowClicked: (event) => {
            dataSelected = event.data;
            idSelect = event.data.idbotdic;
            idSelectName = event.data.menu;
            habilitarBotones(true);
            habilitarContenido();
        },
        columnDefs: [
            {
                headerName: "ID",
                flex: 1, 
                field: "idbotdic",
                filter: false,
                cellClass: "text-start text-underline",
            },
            {
                headerName: "Opcion",
                flex: 1, 
                field: "menu",
                filter: true,
                sortable: true,
            },
            {
                headerName: "Descripcion",
                flex: 2, 
                field: "description",
                filter: true,
                sortable: true,
            },
            {
                headerName: "Accion",
                flex: 1, 
                field: "action",
                filter: true,
                sortable: true,
                cellClass: "text-start",
                cellRenderer: (params) => {
                    let type = params.data.action;
                    let cls = "";
                    let html = "";
                    let text = "";
                    if (type == "T"){
                        text = "Texto"
                        cls  = "bg-success";
                    } else if (type == "Q"){
                        text = "SQL Cmd"
                        cls  = "bg-warning";
                    } else if (type == "F"){
                        text = "File"
                        cls  = "bg-info";
                    } else if (type == "M"){
                        text = "Lista Menu"
                        cls  = "bg-primary";
                    } else{
                        text = type
                        cls  = "bg-secondary";
                    }
                    return `<kbd class='${cls}'>${text}<kbd>`;
                }
            },
            {
                headerName: "Incluido Menu",
                flex: 1, 
                field: "ismenu",
                filter: true,
                sortable: true,
                cellClass: "text-start",
                cellRenderer: (params) => {
                    let ismenu = params.data.ismenu;
                    if (ismenu == 1){
                        cls = "fa fa-check";
                        color = "bg-success";
                    }else{
                        cls = "fas fa-minus";
                        color = "bg-light text-dark";
                    }
                    return `<kbd class='${color}'><i class="${cls}"></i></kbd>`;
                }
            },
            {
                headerName: "Eliminado",
                flex: 1, 
                field: "deleted_at",
                filter: true,
                cellClass: "text-start",
                cellRenderer: (params) => {
                    let html="";
                    let inactivo = params.data.deleted_at ? 1 : 0;
                    if (inactivo == 1){
                        cls = "fa fa-check";
                        // cls = "far fa-dor-circle";
                        color = "bg-danger";
                    }else{
                        // cls = "fa fa-times";
                        // cls = "far fa-circle";
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

function cleanRecords(record = null){
    let idbotdic = "-1";
    let menu = "";
    let description = "";
    let ismenu = "0";
    let action = "T";
    let txt = "";

    if(record){
        //TODO: Edicion
        
        idbotdic = record.idbotdic;
        menu = record.menu;
        description = record.description;
        ismenu = record.ismenu;
        action = record.action;
        txt = record.txt;

    }

    $("#idbotdic").val(idbotdic);
    $("#menu").val(menu);
    $("#description").val(description);
    $("#ismenu").val(ismenu);
    $("#action ").val(action);
    $("#txt").val(txt);

    if (action == "T"){
        $("#variables").removeClass("hide");
    }else{
        $("#variables").addClass("hide");
    }

    if (idbotdic == -1){
        $("#menu").prop("disabled", false);
        $("#menu").prop("readonly", false);
    }else{
        $("#menu").prop("disabled", true);
        $("#menu").prop("readonly", true);
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

$("#action").on("change", function(){
    let action = $(this).val();
    if (action == "T"){
        $("#variables").removeClass("hide");
    }else{
        $("#variables").addClass("hide");
    }
});


async function saveData(){
    let idbotdic = parseInt($("#idbotdic").val());
    let menu = $("#menu").val();
    let description = $("#description").val();
    let ismenu = parseInt($("#ismenu").val());
    let action = $("#action").val();
    let txt = $("#txt").val();

    let error = false;
    let errMsg = "";
    
    if (menu == "") {
        error = true;
        errMsg = "Debe ingresar la opcion ";
    }

    if (!error && description == "") {
        error = true;
        errMsg = "Debe ingresar la descripción";
    }

    if (!error && txt == "") {
        error = true;
        errMsg = "Debe ingresar el contenido de esta opcion";
    }

    if (error){
        sendMessage("error", title, errMsg);
        return;
    }

    showLoading("Guardando");

    let params = {
        menu,
        description,
        ismenu,
        action,
        txt
    };

    let method = "PUT";
    if (idbotdic == -1){
        method = "POST";
    }
    let url = `botdicSave&id=${idbotdic}`;

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
    hacerPregunta("Eliminar Beneficiario", "eliminar", "botdicsDelete");
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
    let method = ruta == "botdicsDelete" ? "DELETE" : "POST";
    let url = `${ruta}&id=${idSelect}`;

    await consumirApi(method, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            // console.log(resp)

            if (resp.status && resp.status == 'ok') {
                sendMessage("success", title, `Registro ${resp.message} eliminado con éxito`);
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

function habilitarContenido(){
    $("#contenido").html(dataSelected.txt);
}


$("#varNombre").on("click", function(){
    $("#txt").val( $("#txt").val() + "<nombre>");
});
$("#varTiempo").on("click", function(){
    $("#txt").val( $("#txt").val() + "<tiempo>");
});
$("#varFecha").on("click", function(){
    $("#txt").val( $("#txt").val() + "<fecha>");
});