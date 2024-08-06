
setTimeout(function(){
    $("#Title").html("Usuarios");
    if (permisosLectura){
        estructuraGrid();
        loadData();
        loadRoles();
        showDivs(0);
    } else{
        $("#btmDivs").addClass("hide");
        sendMessage("error", "Autorizacion", mensajeNoPermisoLectura);
    }
},800)

lstUsers = [];
lstRoles = [];
userSelected = {};

if (scopeUser.includes("D")) {
    $("btmDelete").removeClass("hide");
    permisosBorrado = true;
}else{
    $("btmDelete").addClass("hide");
    permisosBorrado = false;
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

            // console.log(resp)

            if (resp.status && resp.status == 'ok') {
                lstUsers = resp.message;
                // console.log(lstUsers)
                // lstUsers.forEach( e=>{
                //     transaction = { add: [e] };
                //     gridApi.applyTransactionAsync(transaction);
                // })
                // // let params = {
                // //     force: true,
                // //     suppressFlash: true,
                // // };
                gridApi.setGridOption("rowData", lstUsers);
                gridApi.sizeColumnsToFit();
            } else {
                sendMessage("error", "Usuarios", resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            closeLoading();
            console.log("ERR", err);
            sendMessage("error", "Usuarios", JSON.stringify(err.responseText));
        });
}

async function loadRoles(){

    let metodo = "GET";
    let url = "roles";

    await consumirApi(metodo, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            // console.log("ROLES", resp)

            if (resp.status && resp.status == 'ok') {
                lstRoles = resp.message;

                lstRoles.forEach( e => {
                    $("#idrole").append(`<option value='${e.idrole}'>${e.name}</option>`)
                });
            } else {
                sendMessage("error", "Usuarios", resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            closeLoading();
            console.log("ERR", err);
            sendMessage("error", "Usuarios", JSON.stringify(err.responseText));
        });
}

function estructuraGrid(){
    gridOptions = {
        rowStyle: { background: 'white' },
        getRowStyle: params => {
            if (params.node.rowIndex % 2 !== 0) {
                return { background: '#f9f9f9' };
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
            return params.data.iduser;
        },
        onRowClicked: (event) => {
            userSelected = event.data;
            idSelect = event.data.iduser;
            idSelectName = event.data.username;
            habilitarBotones(true);
        },
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
            {
                headerName: "Actualizado",
                flex: 1, 
                field: "udated_at",
                filter: false,
                cellClass: "text-start",
            },
            {
                headerName: "Inactivado",
                flex: 1, 
                field: "deleted_at",
                filter: true,
                cellClass: "text-start",
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
            $("#Title").html("Usuarios");
            $("#btmNew").removeClass("disabled");
            $("#btmEdit").removeClass("disabled");
            $("#btmDelete").removeClass("disabled");
            $("#btmRefresh").removeClass("disabled");
            $("#btmReset").removeClass("disabled");
            $("#btmUpUser").removeClass("disabled");
            $("#btmSave").addClass("disabled");
            $("#btmCancel").addClass("disabled");
            habilitarBotones(false);

            $("#myGrid").removeClass("hide");
            $("#FormDiv").addClass("hide");
            break;
        case 1:
            //Formulario de edicion o nuevo
            $("#Title").html("Edición de Usuarios");
            $("#btmNew").addClass("disabled");
            $("#btmEdit").addClass("disabled");
            $("#btmDelete").addClass("disabled");
            $("#btmRefresh").addClass("disabled");
            $("#btmReset").addClass("disabled");
            $("#btmUpUser").addClass("disabled");
            $("#btmSave").removeClass("disabled");
            $("#btmCancel").removeClass("disabled");

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
    // showDivs(0);
});


async function saveData(){
    let iduser = $("#iduser").val();
    let username = $.trim($("#username").val());
    let fullname = $.trim($("#fullname").val());
    let idrole = parseInt($("#idrole").val());
    let lang = $("#lang").val();
    let status = parseInt($("#status").val());

    let error = false;
    let errMsg = "";
    
    if (username == "") {
        error = true;
        errMsg = "Debe ingresar el nombre del usuario";
    }
    
    if (!error & !checkSoloLetrasNumeros(username)) {
        error = true;
        errMsg = "El Usuario puede estar compuesto de mayúsculas, minúsculas, numeros. No se admiten símbolos, ni espacios en blanco.";
    }
    
    if (!error && fullname == "") {
        error = true;
        errMsg = "Debe ingresar el nombre completo del usuario";
    }

    if (!error && idrole == "-") {
        error = true;
        errMsg = "Debe seleccionar un rol para asignar al usuario";
    }

    if (error){
        // console.log(errMsg)
        sendMessage("error", "Usuarios", errMsg);
        return;
    }

    let params = {
        fullname,
        idrole,
        lang,
        status
    };

    console.log(params)

    let method = "PUT";
    // let method = "POST";
    if (iduser == -1){
        method = "POST";
        params["username"] = username;
    }
    let url = `saveUser&id=${iduser}`;
    
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
                    sendMessage("error", "Usuarios", resp.message || JSON.stringify(resp));
                }
            } else {
                sendMessage("error", "Usuarios", "La respuesta es nula");
            }

        })
        .catch( err => {
            closeLoading();
            console.log("ERR", err);
            sendMessage("error", "Usuarios", JSON.stringify(err.responseText));
        });

}

$("#btmCancel").on("click", function(){
    showDivs(0);
});

$("#btmEdit").on("click", function(){
    cleanRecords(userSelected);
    $("#username").addClass("disabled");
    showDivs(1);
});

$("#btmDelete").on("click", function(){
    hacerPregunta("Eliminar un Usuario", "eliminar", "deleteUser");
});

$("#btmReset").on("click", function(){
    hacerPregunta("Resetear la clave de un usuario", "resetear", "resetearclave");
});

$("#btmUpUser").on("click", function(){
    hacerPregunta("Recuperar un Usuario eliminado", "recuperar", "recuperarUsuario");
});

function hacerPregunta(action='', keyword='', queFuncionEjecuto=''){
    Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        icon: 'question',
        title: 'Usuarios',
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
    let method = ruta == "deleteUser" ? "DELETE" : "POST";
    let url = `${ruta}&id=${idSelect}`;

    await consumirApi(method, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            // console.log(resp)

            if (resp.status && resp.status == 'ok') {
                sendMessage("success", "Usuarios", resp.message );
                showDivs(0);
                loadData();
            } else {
                sendMessage("error", "Usuarios", resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            closeLoading();
            console.log("ERR", err);
            sendMessage("error", "Usuarios", JSON.stringify(err.responseText));
        });

}

$("#btmRefresh").on("click", function(){
    loadData();
});

function habilitarBotones(opc = false){
    // console.log(opc, userSelected.deleted_at);
    if (permisosEscritura){
        $("#btmNew").removeClass("hide");
        $("#btmEdit").removeClass("hide");
        $("#btmReset").removeClass("hide");
        $("#btmUpUser").removeClass("hide");
    } else {
        $("#btmNew").addClass("hide");
        $("#btmEdit").addClass("hide");
        $("#btmReset").addClass("hide");
        $("#btmUpUser").addClass("hide");
    }
    if (permisosBorrado){
        $("#btmDelete").removeClass("hide");
    } else{
        $("#btmDelete").addClass("hide");
    }

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