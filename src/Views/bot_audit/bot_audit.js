setTimeout(function(){
    if (permisosLectura){
        estructuraGrid();
        showDivs(0);
        $("#fechadesde").val( moment().format("YYYY-MM-DD") )
        $("#fechahasta").val( moment().format("YYYY-MM-DD") )

    } else{
        $("#btmDivs").addClass("hide");
        sendMessage("error", "Autorizacion", mensajeNoPermisoLectura);
    }
},800)

lstAudit = [];
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

async function loadData(params){
    showLoading("Cargando");

    habilitarBotones(false);

    let metodo = "GET";
    let url = "botaudit";
    await consumirApi(metodo, url, params)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {
                lstAudit = [];

                if (resp.message){
                    resp.message.forEach( e => {
                        e["idbotaudit"] = e.idbotaudit.toString();
                        lstAudit.push(e)
                    });
                }

                gridApi.setGridOption("rowData", lstAudit);
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
        rowSelection: 'single',
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
            return params.data.idbotaudit;
        },
        onRowClicked: (event) => {
            dataSelected = event.data;
            idSelect = event.data.idbotaudit;
            idSelectName = event.data.textentered;
            habilitarBotones(true);
        },
        columnDefs: [
            {
                headerName: "ID",
                flex: 1,
                field: "idbotaudit",
                filter: false,
                cellClass: "text-start text-underline",
            },
            {
                headerName: "Usuario",
                flex: 2,
                field: "username",
                filter: true,
                sortable: true,
            },
            {
                headerName: "Texto Ingresado",
                flex: 3,
                field: "textentered",
                filter: true,
                sortable: true,
            },
            {
                headerName: "Pronostico",
                flex: 3,
                field: "keyresult",
                filter: true,
                sortable: true,
            },
            {
                headerName: "Data",
                flex: 1,
                field: "data",
                filter: true,
                sortable: true,
                cellClass: "text-start",
                cellRenderer: (params) => {
                    let data = params.data.data;
                    if (data != "" && data != null){
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
                headerName: "Creado",
                flex: 2,
                field: "created_at",
                filter: false,
                cellClass: "text-start",
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
            $("#btmVerMas").removeClass("hide");
            habilitarBotones(false);
            $("#myGrid").removeClass("hide");
            $("#FormDiv").addClass("hide");
            break;
        case 1:
            //Formulario de edicion o nuevo
            $("#Title").html("Edición de " + title);
            $("#btmVerMas").addClass("hide");
            $("#myGrid").addClass("hide");
            $("#FormDiv").removeClass("hide");
            break;
        case 2:
            break;
    }
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


$("#btmCancel").on("click", function(){
    showDivs(0);
});

$("#btmVerMas").on("click", function(){
    let html = `<andypf-json-viewer 
        indent="2"
        expanded="true"
        theme="default-light"
        show-data-types="true"
        show-toolbar="false"
        expand-icon-type="arrow"
        show-copy="true"
        show-size="true"
        data='${dataSelected.data}'></andypf-json-viewer>`;
    sendMessage("", "Auditor Bot", html, true);
    habilitarBotones(false);
});

$("#btmDelete").on("click", function(){
    hacerPregunta("Eliminar Beneficiario", "eliminar", "deleteBene");
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
    let method = ruta == "deleteBene" ? "DELETE" : "POST";
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
    if (opc && dataSelected.data!=null){
        $("#btmVerMas").removeClass("disabled");
        $("#btmVerMas").removeClass("btn-secondary");
        $("#btmVerMas").addClass("btn-info");
    } else {
        $("#btmVerMas").addClass("disabled");
        $("#btmVerMas").removeClass("btn-info");
        $("#btmVerMas").addClass("btn-secondary");
    }
}

