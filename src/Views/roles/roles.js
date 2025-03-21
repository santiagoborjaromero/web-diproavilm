setTimeout(function(){
    if (permisosLectura){
        estructuraGrid();
        estructuraGridMenu();
        loadData();
        showDivs(0);
        loadMenu();
    } else{
        $("#btmDivs").addClass("hide");
        sendMessage("error", "Autorizacion", mensajeNoPermisoLectura);
    }
},800)

lstRoles = [];
dataSelected = {};
lstMenuOriginal = [];

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
    let url = "roles";
    await consumirApi(metodo, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            // console.log(resp)

            if (resp.status && resp.status == 'ok') {
                lstRoles = [];
                resp.message.forEach( e => {
                    e["idrole"] = e.idrole.toString();
                    lstRoles.push(e)    
                });
                
                gridApi.setGridOption("rowData", lstRoles);
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

async function loadMenu(){
    
    let metodo = "GET";
    let url = "menus";
    await consumirApi(metodo, url)
        .then( resp=>{
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {
                lstMenuOriginal = [];
                resp.message.forEach( e => {
                    e["idmenu"] = e.idmenu.toString();
                    e["check"] = false;

                    lstMenuOriginal.push(e)    
                });

                lstMenuOriginal.sort((a, b) =>
                    a.order.localeCompare(b.order)
                );
                
                gridApi2.setGridOption("rowData", lstMenuOriginal);
                // gridApi2.sizeColumnsToFit();
            } else {
                sendMessage("error", title, resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            console.log("ERR", err);
            sendMessage("error", title, JSON.stringify(err.responseText));
        });
}


async function loadMenuPorRol(){
    
    let metodo = "GET";
    let url = "menubyrol";
    let idrole = $("#idrole").val();
    let params = {
        idrole
    }

    await consumirApi(metodo, url, params)
        .then( resp=>{
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {
                gridApi2.forEachNodeAfterFilterAndSort(function (rowNode, index) {
                    found = false;
                    let row = rowNode.data;
                    if (resp.message){
                        resp.message.forEach( r=>{
                            if ( !found && parseInt(row.idmenu) == r.idmenu ){
                                found = true;
                            }
                        });
                    }
                    row.check = found;
                    transaction = { update: [row] };
                    gridApi2.applyTransactionAsync(transaction);
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


function fillMenu(){
    let html = "<ul>";
    lstMenu.forEach(e=>{
        html += `<li>${e-name}</li>`
    })
    html += "</ul>";
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
        tooltipShowDelay: 0,
        tooltipHideDelay: 2000,
        autoSizeStrategy: {
            // type: 'fitCellContents'
        },
        getRowId: (params) => {
            return params.data.idrole;
        },
        onRowClicked: (event) => {
            dataSelected = event.data;
            idSelect = event.data.idrole;
            idSelectName = event.data.name;
            habilitarBotones(true);
        },
        columnDefs: [
            {
                headerName: "ID",
                flex: 1, 
                field: "idrole",
                filter: false,
                cellClass: "text-start",
            },
            {
                headerName: "Nombre",
                headerTooltip: "Nombre del rol",
                flex: 1, 
                field: "name",
                filter: true,
                cellClass: "text-start",
                sort: "asc",
                sortIndex: 2 
            },
            {
                headerName: "Permisos",
                flex: 1, 
                field: "scope",
                filter: false,
                cellClass: "text-start",
                cellRenderer: (params) => {
                    let scope = params.data.scope;
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
                headerName: "No. Usuarios",
                headerTooltip: "Numero de usuarios asignados al rol",
                flex: 1, 
                field: "nusuarios",
                filter: false,
                cellClass: "text-start",
            },
            {
                headerName: "No. Menus",
                headerTooltip: "Numero de opciones de menú asignados",
                flex: 1, 
                field: "nmenus",
                filter: false,
                cellClass: "text-start",
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
            //     field: "updated_at",
            //     filter: false,
            //     cellClass: "text-start",
            // },
            {
                headerName: "Elimiinado",
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


function estructuraGridMenu(){
    gridOptions2 = {
        rowStyle: { background: 'white' },
        getRowStyle: params => {
            if (params.data.submenu == 1) {
                return { background: '#e7f1f7'};
            }
        },
        rowData: [],
        deltaSort: true,
        pagination: false,
        paginationPageSize: 50,
        paginationPageSizeSelector: [5, 10,20, 30, 40, 50, 100, 200, 300, 1000],
        rowSelection: { mode: 'singleRow', checkboxes: false, enableClickSelection: true, },
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
            return params.data.idmenu;
        },
        onRowClicked: (event) => {
            dataSelected = event.data;
            idSelect = event.data.idmenu;
            idSelectName = event.data.name;
            habilitarBotones(true);
        },
        columnDefs: [
            {
                headerName: "ID",
                flex: 1, 
                field: "idmenu",
                filter: false,
                cellClass: "text-start",
            },
            {
                headerName: "Nombre",
                flex: 2, 
                field: "name",
                filter: false,
                cellClass: "text-start",
                cellRenderer: (params) => {
                    let sm = params.data.submenu;
                    let ico = params.data.icon;
                    let cls = "";
                    let html = "";
                    if (sm == 1){
                        cls  = "bold";
                        html = `<span class="${cls}"> <i class="${ico} t16"></i> ${params.data.name}</span>`;
                    } else{
                        html = `<span class="">└─ <i class="${ico} t16"></i> ${params.data.name}</span><span class="text-danger bold">${params.data.status==0 || params.data.deleted_at !== null ? '(Eliminado)' : ''}</span>`;
                    }
                    return  html;
                }
            },
            {
                headerName: "Seleccionado",
                flex: 1, 
                field: "check",
                filter: false,
                cellClass: "text-start",
                editable: true
            },
        ]
    }

    const myGridElement2 = document.querySelector("#myGridMenu");
    gridApi2 = agGrid.createGrid(myGridElement2, gridOptions2);
    // gridApi2.sizeColumnsToFit();
}

function cleanRecords(record=null){
    $("#btnSelectAll").text("Seleccionar Todo");
    
    let idrole = -1;
    let name = "";
    let scope = "";
    let status = "0";
    $("#name").prop("readonly", false);
    $("#name").prop("disabled", false);
    if ($('#scope_r').is(':checked')) $('#scope_r').trigger('click');
    if ($('#scope_w').is(':checked')) $('#scope_w').trigger('click');
    if ($('#scope_d').is(':checked')) $('#scope_d').trigger('click');

    if(record){
        idrole = record.idrole;
        name = record.name;
        scope = record.scope;

        if (scope.includes("R")) $('#scope_r').trigger('click');
        if (scope.includes("W")) $('#scope_w').trigger('click');
        if (scope.includes("D")) $('#scope_d').trigger('click');

        status = record.status.toString();
        $("#username").prop("readonly", true);
        $("#username").prop("disabled", true);
    }

    if (idrole == -1){
        $("#idrolDIV").addClass("hide");
        $("#nombreDiv").addClass("mt-5");
    } else{
        $("#idrolDIV").removeClass("hide");
        $("#nombreDiv").removeClass("mt-5");
    }

    $("#idrole").val(idrole);
    $("#name").val(name);
    $("#scope").val(scope);
    $("#status").val(status);
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
    setTimeout(function(){
        loadMenuPorRol();
    }, 300)
});

$("#btmSave").on("click", function(){
    saveData();
});


async function saveData(){
    let idrole = $("#idrole").val();

    let scope = "";

    if ($('#scope_r').is(':checked')) scope += "R";
    if ($('#scope_w').is(':checked')) scope += "W";
    if ($('#scope_d').is(':checked')) scope += "D";

    let name = $.trim($("#name").val());
    let status = parseInt($("#status").val());

    let error = false;
    let errMsg = "";
    
    if (name == "") {
        error = true;
        errMsg = "Debe ingresar el nombre del usuario";
    }

    if (!checkSoloLetrasNumerosEspacios(name)){
        error = true;
        errMsg = "Puede ingresar letras, numeros y espacios";
    }

    let dparams = [];
    lstMenuOriginal.forEach(e=>{
        if (e.check){
            dparams.push({
                idrole,
                idmenu: e.idmenu
            })
        }
    })

    if (!error && dparams.length==0){
        error = true;
        errMsg = "Debe seleccionar por lo menos una opcion en el menu";
    }
    
    if (error){
        sendMessage("error", title, errMsg);
        return;
    }

    let params = {
        name,
        scope,
        status
    };

    // console.log(params)

    let method = "PUT";
    // let method = "POST";
    if (idrole == -1){
        method = "POST";
        params["name"] = name;
    }
    let url = `saveRole&id=${idrole}`;
    
    await consumirApi(method, url, params)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            // console.log(resp)

            if (resp){
                if (resp.status && resp.status == 'ok') {
                    if (method == "POST"){
                        idrole = resp.message;
                    }

                    if (idrole){
                        // loadData();
                        saveDataRoleMenu(idrole);
                    } else {
                        sendMessage("error", title, "No viene el id del rol");
                    }
                } else {
                    sendMessage("error", title, resp.message[0].las || JSON.stringify(resp));
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

async function saveDataRoleMenu(idrole){

    let dparams = [];
    lstMenuOriginal.forEach(e=>{
        if (e.check){
            dparams.push({
                idmenu: e.idmenu
            })
        }
    })

    let params = {
        data: dparams
    }

    // console.log(params)

    method = "POST";
    let url = `saveRolMenu&id=${idrole}`;

    // console.log(url)
    
    await consumirApi(method, url, params)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            // console.log("█", resp)

            if (resp){
                if (resp.status && resp.status == 'ok') {
                    loadData();
                    showDivs(0);
                } else {
                    sendMessage("error", title, resp.message || JSON.stringify(resp));
                }
            } else {
                sendMessage("error", title + "- RoleMenu", "La respuesta es nula");
            }

        })
        .catch( err => {
            // closeLoading();
            console.log("ERR", err);
            sendMessage("error", title, JSON.stringify(err.responseText));
        });
}



$("#btmCancel").on("click", function(){
    showDivs(0);
});

$("#btmEdit").on("click", function(){
    cleanRecords(dataSelected);
    $("#idrolDIV").removeClass("hide");
    $("#username").addClass("disabled");
    showDivs(1);
    setTimeout(function(){
        loadMenuPorRol();
    }, 300)
});

$("#btmDelete").on("click", function(){
    hacerPregunta("Eliminar un Rol", "eliminar", "deleteRole");
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
    let method = ruta == "deleteRole" ? "DELETE" : "POST";
    let url = `${ruta}&id=${idSelect}`;

    await consumirApi(method, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            // console.log(resp)

            if (resp.status && resp.status == 'ok') {
                sendMessage("success", title, resp.message );
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
    // console.log(opc, dataSelected.deleted_at);
    if (opc && !dataSelected.deleted_at ){
        $("#btmEdit").removeClass("disabled");
        $("#btmEdit").removeClass("btn-secondary");
        $("#btmEdit").addClass("btn-info");
        
        if (dataSelected.nusuarios==0){
            $("#btmDelete").removeClass("disabled");
            $("#btmDelete").removeClass("btn-secondary");
            $("#btmDelete").addClass("btn-danger");
        } else {
            $("#btmDelete").addClass("disabled");
            $("#btmDelete").removeClass("btn-danger");
            $("#btmDelete").addClass("btn-secondary");
        }

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


$("#btnSelectAll").on("click", function(){
    let texto = $(this).text();
    let cel = false;
    if (texto == "Seleccionar Todo"){
        $("#btnSelectAll").text("Deseleccionar Todo");
        cel = true;
    }else{
        $("#btnSelectAll").text("Seleccionar Todo");
        cel = false;
    }

    gridApi2.forEachNodeAfterFilterAndSort(function (rowNode, index) {
        let row = rowNode.data;
        row.check = cel;
        transaction = { update: [row] };
        gridApi2.applyTransactionAsync(transaction);
    });

});

$("#btmReestablecer").on("click", function(){
    hacerPregunta("Recuperar un rol eliminado", "recuperar", "recuperarRol");
});