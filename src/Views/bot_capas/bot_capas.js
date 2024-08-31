setTimeout(function(){
    if (permisosLectura){
        estructuraGrid();
        loadDiccionario();
        loadData();
        showDivs(0);
    } else{
        $("#btmDivs").addClass("hide");
        sendMessage("error", "Autorizacion", mensajeNoPermisoLectura);
    }
},800)

lstBotSpelling = [];
lstDictionario = [];
dataSelected = {};
var idbotspelling = "-1";

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
    let url = "botcapas";
    await consumirApi(metodo, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {
                lstBotSpelling = [];
                resp.message.forEach( e => {
                    e["idbotspelling"] = e.idbotspelling.toString();
                    lstBotSpelling.push(e)    
                });
                
                gridApi.setGridOption("rowData", lstBotSpelling);
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

async function loadDiccionario(){
    let metodo = "GET";
    let url = "botdiccionario";
    await consumirApi(metodo, url)
        .then( resp=>{
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {
                lstDictionario = resp.message;
                lstDictionario.forEach( e => {
                    $("#menurun").append(`<option selected value="${e.menu}">${e.menu}</option>`)
                });
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
                if (params.data.submenu == 1) {
                    return { background: '#e7f1f7'};
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
            return params.data.idbotspelling;
        },
        onRowClicked: (event) => {
            dataSelected = event.data;
            idSelect = event.data.idbotspelling;
            idSelectName = event.data.wordfind;
            habilitarBotones(true);
        },
        columnDefs: [
            {
                headerName: "ID",
                flex: 1, 
                field: "idbotspelling",
                filter: false,
                cellClass: "text-start",
                
                sortable: true,
            },
            {
                headerName: "Capa Entrada",
                flex: 3,
                field: "wordfind",
                filter: true,
                cellClass: "text-start",
                sortable: true,
            },
            {
                headerName: "Salida Esperada",
                flex: 3, 
                field: "menurun",
                filter: true,
                cellClass: "text-start",
                sortable: true,
            },
            {
                headerName: "Confirmado",
                flex: 2, 
                field: "confirmed",
                filter: false,
                cellClass: "text-start",
                sortable: true,
                cellRenderer: (params) => {
                    let sm = params.data.confirmed;
                    let cls = "";
                    let html = "";
                    if (sm == 1){
                        cls = "fa fa-check";
                        color = "bg-success";
                    }else{
                        cls = "fas fa-minus";
                        color = "bg-danger text-white";
                    }
                    html += `<kbd class="${color}"> <i class='${cls}'></i> </kbd> `;
                    return html;
                }
            },
            {
                headerName: "Creado",
                flex: 2, 
                field: "created_at",
                filter: true,
                cellClass: "text-start",
                sort: "desc",
                sortIndex: 1, 
                sortable: true,
            },
        ]
    }

    const myGridElement = document.querySelector("#myGrid");
    gridApi = agGrid.createGrid(myGridElement, gridOptions);
    gridApi.sizeColumnsToFit();
}

function cleanRecords(record=null){
    let idbotspelling = -1;
    let wordfind = "";
    let menurun = "";
    let confirmed = "0";

    if(record){
        idbotspelling = record.idbotspelling;
        wordfind = record.wordfind;
        menurun = record.menurun;
        confirmed = record.confirmed;
    }

    $("#idbotspelling").val(idbotspelling);
    $("#wordfind").val(wordfind);
    $("#menurun").val(menurun);
    $("#confirmed").val(confirmed);
    
}

function showDivs(que = 0){
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

    let idbotspelling = $("#idbotspelling").val();
    let wordfind = $("#wordfind").val();
    let menurun = $("#menurun").val();
    let confirmed = $("#confirmed").val();

    let error = false;
    let errMsg = "";
    
    if (wordfind == "") {
        error = true;
        errMsg = "Debe ingresar la capa de entrada";
    }

    if (error){
        sendMessage("error", title, errMsg);
        return;
    }
    

    
    let params = {
        wordfind,
        menurun,
        confirmed
    };

    // console.log(params);
    showLoading("Guardando");

    let method = "PUT";

    if (idbotspelling == -1){
        method = "POST";
    }
    let url = `botcapasSave&id=${idbotspelling}`;

    // console.log(method, url, params);

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

// $("#btmReestablecer").on("click", function(){
//     hacerPregunta("Recuperar opcion eliminada", "recuperar", "recuperarMenu");
// });


$("#btmDelete").on("click", function(){
    hacerPregunta("Eliminar Menu", "eliminar", "botcapasDelete");
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
    let method = ruta == "botcapasDelete" ? "DELETE" : "POST";
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