
setTimeout(function(){
    if (permisosLectura){
        estructuraGrid();
        loadData();
        // loadRoles();
        showDivs(0);
    } else{
        $("#btmDivs").addClass("hide");
        sendMessage("error", "Autorizacion", mensajeNoPermisoLectura);
    }
},800)

//TODO: Variables enceradas
lstUsers = [];
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

async function loadData(){
    showLoading("Cargando");

    habilitarBotones(false);
    
    let metodo = "GET";
    let url = "users";
    await consumirApi(metodo, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {
                lstUsers = resp.message;
                gridApi.setGridOption("rowData", lstUsers);
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
        // TODO: DEterminar el indice de la tabla que viene, normalment el campo ID 
        getRowId: (params) => {
            return params.data.iduser;
        },
        //TODO: Cuando se da click sobre una fila, asigna vairables para tener y poder operar como el id y toda la fila en userSelected
        onRowClicked: (event) => {
            userSelected = event.data;
            idSelect = event.data.iduser;
            idSelectName = event.data.username;
            habilitarBotones(true);
        },
        //TODO: DEFINICION DE COLUMNAS
        columnDefs: [
            {
                headerName: "ID",
                flex: 1, 
                field: "iduser",
                filter: false,
                cellClass: "text-start",
            },
            {
                headerName: "Usuario",
                flex: 1, 
                field: "username",
                filter: true,
                cellClass: "text-start",
            },
            {
                headerName: "Nombre Completo",
                flex: 2, 
                field: "fullname",
                filter: true,
                cellClass: "text-start",
                sort: "asc",
                sortIndex: 1, 
            },
            {
                headerName: "Rol",
                flex: 2, 
                field: "rolename",
                filter: false,
                cellClass: "text-start",
            },
            {
                headerName: "Permisos",
                flex: 1, 
                field: "scope",
                filter: false,
                cellClass: "text-start",
                // pinned: "left"
                cellRenderer: (params) => {
                    let scope = params.data.scope;
                    // let arr = [...scope];
                    let html = "";

                    title_r = "Lectura";
                    if (scope.includes("R")){
                        color_r = "bg-success";
                    }else{
                        color_r = "bg-light";
                    }

                    title_w = "Escritura";
                    if (scope.includes("W")){
                        color_w = "bg-warning";
                    }else{
                        color_w = "bg-light";
                    }

                    title_d = "Borrado";
                    if (scope.includes("D")){
                        color_d = "bg-danger";
                    }else{
                        color_d = "bg-light";
                    }

                
                    html += `<kbd class="${color_r}" title="${title_r}">R</kbd> `;
                    html += `<kbd class="${color_w}" title="${title_w}">W</kbd> `;
                    html += `<kbd class="${color_d}" title="${title_d}">D</kbd> `;
                    return html;
                }
            },
            
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
            // {
            //     headerName: "Actualizado",
            //     flex: 1, 
            //     field: "udated_at",
            //     filter: false,
            //     cellClass: "text-start",
            // },
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




$("#btmRefresh").on("click", function(){
    loadData();
});

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

$("#PDF").on("click", function(event){
    event.preventDefault();
    imprimir("Listado de Usuarios", prepararArray(), 'l');
});

//TODO:EXPORTAR PDF Y CSV
$("#PDF").on("click", function(event){
    event.preventDefault();
    imprimir("Listado de Usuarios", prepararArray(), 'l');
});
$("#CSV").on("click", function(event){
    event.preventDefault();
    exportarCSV("Listado de Usuarios", prepararArray());
});

function prepararArray(){
    let lstR = [];
    lstUsers.forEach(e=>{
        lstR.push({
            "Usuario": e.username,
            "Nombre Completo": e.fullname,
            "Rol": e.rolename,
            "Permisos": e.scope,
            "Idioma": e.lang,
            "Estado": e.status == 0 ? "Inactivo" : "Activo",
            "Eliminado": e.deleted_at == null ? "" : "Eliminado",
        })
    })
    return lstR;
}
