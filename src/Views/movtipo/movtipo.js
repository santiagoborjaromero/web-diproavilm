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


lstMovTipo = [];
dataSelected = {};
var idmovementtype = "-1";

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
    let url = "movtiposSinFiltro";
    await consumirApi(metodo, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}


            if (resp.status && resp.status == 'ok') {
                lstMovTipo = [];
                resp.message.forEach( e => {
                    e["idmovementtype"] = e.idmovementtype.toString();
                    lstMovTipo.push(e)    
                });
                
                gridApi.setGridOption("rowData", lstMovTipo);
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
        // getRowStyle: params => {
        //     if (params.data.submenu == 1) {
        //         return { background: '#e7f1f7'};
        //     }
        // },
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
            return params.data.idmovementtype;
        },
        onRowClicked: (event) => {
            dataSelected = event.data;
            idSelect = event.data.idmovementtype;
            idSelectName = event.data.name;
            habilitarBotones(true);
        },
        columnDefs: [
            {
                headerName: "ID",
                flex: 1, 
                field: "idmovementtype",
                filter: false,
                cellClass: "text-start",
            },
            {
                headerName: "Nombre",
                flex: 2, 
                field: "name",
                filter: true,
                cellClass: "text-start",
            },
            {
                headerName: "Siglas",
                flex: 1, 
                field: "acronym",
                filter: true,
                cellClass: "text-start",
            },
            {
                headerName: "Secuencial",
                flex: 1, 
                field: "sequential",
                filter: true,
                type: "rightAligned",
                cellClass: "text-end",
            },
            {
                headerName: 'Permisos e informacion requerida para cada caso',
                headerClass: "ag-header-cell-label-center text-center bg-header", 
                type: "rightAligned",
                cellClass: "text-end",
                groupId: "Comp",
                children:[
                    {
                        headerName: "Beneficiario",
                        // headerToolTip: "Beneficiario",
                        flex: 1, 
                        field: "beneficiarytype",
                        filter: false,
                        cellClass: "text-start",
                        cellRenderer: (params) => {
                            let type = params.data.beneficiarytype;
                            let cls = "";
                            let html = "";
                            let text = "";
                            if (type == "C"){
                                text = "Cliente"
                                cls  = "bg-success";
                            } else if (type == "P"){
                                text = "Proveedor"
                                cls  = "bg-warning";
                            } else if (type == "A"){
                                text = "Proveedor/Cliente"
                                cls  = "bg-info";
                            } else if (type == "E"){
                                text = "Empresa"
                                cls  = "bg-primary";
                            }
                            // return `<span class='${cls}'>${type}<span>`;
                            return `<kbd class='${cls}'>${text}<kbd>`;
                        }
                    },
                    {
                        headerName: "Asiento",
                        flex: 1, 
                        field: "entry",
                        filter: false,
                        cellClass: "text-start",
                        cellRenderer: (params) => {
                            let type = params.data.entry;
                            let cls = "";
                            let html = "";
                            let text = "";
                            if (type == "I"){
                                text = "Ingreso"
                                cls  = "bg-success";
                            } else if (type == "E"){
                                text = "Egreso"
                                cls  = "bg-warning";
                            } else if (type == "A"){
                                text = "Ambos"
                                cls  = "bg-info";
                            } 
                            // return `<span class='${cls}'>${type}<span>`;
                            return `<kbd class='${cls}'>${text}<kbd>`;
                        }
                    },
                    {
                        headerName: "Costo/PVP",
                        // headerToolTip: "Valor que presenta",
                        flex: 1, 
                        field: "typevalue",
                        filter: false,
                        cellClass: "text-start",
                        cellRenderer: (params) => {
                            let type = params.data.typevalue;
                            let cls = "";
                            let html = "";
                            let text = "";
                            if (type == "C"){
                                text = "Costo"
                                cls  = "bg-success";
                            } else if (type == "P"){
                                text = "PVP"
                                cls  = "bg-warning";
                            } 
                            // return `<span class='${cls}'>${type}<span>`;
                            return `<kbd class='${cls}'>${text}<kbd>`;
                        }
                    },
                    {
                        headerName: "Calcula NumDoc",
                        // headerToolTip: "Permite ingresar numero de documento",
                        flex: 1, 
                        field: "calculatenumdoc",
                        filter: false,
                        cellClass: "text-start",
                        cellRenderer: (params) => {
                            let type = params.data.calculatenumdoc;
                            let cls = "";
                            let html = "";
                            let text = "";
                            if (type == "1"){
                                text = "<i class='fa fa-check'></i>"
                                cls  = "bg-success";
                            } else if (type == "0"){
                                text = "<i class='fa fa-minus'></i>"
                                cls  = "bg-warning";
                            } 
                            return `<kbd class='${cls}'>${text}<kbd>`;
                        }
                    },
                ]
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





function cleanRecords(record = null){

    let idmovementtype = -1;
    let acronym = "";
    let name = "";
    let sequential = "0";
    let beneficiarytype = "P";
    let entry = "I";
    let typevalue = "C";
    let calculatenumdoc = "0";

    if(record){
        //TODO: Edicion
        
        idmovementtype = record.idmovementtype;
        acronym = record.acronym;
        name = record.name;
        sequential = record.sequential;
        beneficiarytype = record.beneficiarytype;
        entry = record.entry;
        typevalue = record.typevalue;
        calculatenumdoc = record.calculatenumdoc;
        
    }

    $("#idmovementtype").val(idmovementtype);
    $("#acronym").val(acronym);
    $("#name").val(name);
    $("#sequential").val(sequential);
    $("#beneficiarytype").val(beneficiarytype);
    $("#entry").val(entry);
    $("#typevalue").val(typevalue);
    $("#calculatenumdoc").val(calculatenumdoc);

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
            $("#btmReestablecer").addClass("hide");
            $("#btmSave").removeClass("hide");
            $("#btmCancel").removeClass("hide");

            $("#myGrid").addClass("hide");
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
 

    let idmovementtype = parseInt($("#idmovementtype").val());
    let acronym = $("#acronym").val();
    let name = $("#name").val();
    let sequential = parseInt($("#sequential").val());
    let beneficiarytype = $("#beneficiarytype").val();
    let entry = $("#entry").val();
    let typevalue = $("#typevalue").val();
    let calculatenumdoc = $("#calculatenumdoc").val();

    let error = false;
    let errMsg = "";
    
    if (acronym == "") {
        error = true;
        errMsg = "Debe ingresar las siglas del tipo de movimiento";
    }

    if (!error && name == "") {
        error = true;
        errMsg = "Debe ingresar el nombre del tipo de movimiento";
    }


    if (error){
        sendMessage("error", title, errMsg);
        return;
    }

    showLoading("Guardando");

    
    let params = {
        acronym,
        name,
        sequential,
        beneficiarytype,
        entry,
        typevalue,
        calculatenumdoc
    };


    let method = "PUT";
    if (idmovementtype == -1){
        method = "POST";
    }
    let url = `saveMovTipo&id=${idmovementtype}`;

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
    hacerPregunta("Eliminar Tipo de Movimiento", "eliminar", "movtipoDelete");
});

$("#btmReestablecer").on("click", function(){
    hacerPregunta("Recuperar un tipo de movimiento eliminado", "recuperar", "movtipoRecuperar");
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
    let method = ruta == "movtipoDelete" ? "DELETE" : "POST";
    let url = `${ruta}&id=${idSelect}`;

    await consumirApi(method, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            // console.log(resp)

            if (resp.status && resp.status == 'ok') {
                if (method == "DELETE"){
                    sendMessage("success", title, `Registro ${resp.message} eliminado con éxito`);
                } else {
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
