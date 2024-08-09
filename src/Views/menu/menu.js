setTimeout(function(){
    if (permisosLectura){
        estructuraGrid();
        loadData();
        showDivs(0);

        // gridApi.setGridOption("rowData", lstMenu);
        // gridApi.sizeColumnsToFit();
    } else{
        $("#btmDivs").addClass("hide");
        sendMessage("error", "Autorizacion", mensajeNoPermisoLectura);
    }
},800)

lstMenuOriginal = [];
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

async function loadData(){
    showLoading("Cargando");

    habilitarBotones(false);
    
    let metodo = "GET";
    let url = "menus";
    await consumirApi(metodo, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {
                lstMenuOriginal = [];
                resp.message.forEach( e => {
                    e["idmenu"] = e.idmenu.toString();
                    // if (e.submenu == 0){
                    //     e["name"] = "└─ " + e.name
                    // }
                    lstMenuOriginal.push(e)    
                });
                
                gridApi.setGridOption("rowData", lstMenuOriginal);
                gridApi.sizeColumnsToFit();

                // console.log(lstMenuOriginal)

                parent();

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

function parent(){
    lstMenuOriginal.forEach( e => {
        // if (e.order.length == 2 ){
        if (e.submenu == 1 ){
            $("#parent").append(`<option value="${e.order}">${e.name}</option>`);
        }
    });
    // checkParent();
}

function estructuraGrid(){
    gridOptions = {
        rowStyle: { background: 'white' },
        // getRowStyle: params => {
        //     if (params.node.rowIndex % 2 !== 0) {
        //         return { background: '#f9f9f9' };
        //     }
        // },
        getRowStyle: params => {
            if (params.data.submenu == 1) {
                return { background: '#e7f1f7'};
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
            return params.data.idmenu;
        },
        onRowClicked: (event) => {
            dataSelected = event.data;
            idSelect = event.data.idmenu;
            idSelectName = event.data.name;
            habilitarBotones(true);
        },
        // groupDisplayType: 'groupRows',
        // groupRowRendererParams: {
        //     order: '01',
        // },
        columnDefs: [
            {
                headerName: "ID",
                flex: 1, 
                field: "idmenu",
                filter: false,
                cellClass: "text-start",
            },
            {
                headerName: "Nivel",
                flex: 1, 
                field: "order",
                filter: true,
                cellClass: "text-start",
                sort: "asc",
                sortIndex: 1, 
            },
            {
                headerName: "Nombre",
                flex: 2, 
                field: "name",
                filter: true,
                cellClass: "text-start",
                cellRenderer: (params) => {
                    let sm = params.data.submenu;
                    let cls = "";
                    let html = "";
                    if (sm == 1){
                        cls  = "bold";
                        html = `<span class="${cls}">${params.data.name}</span>`;
                    } else{
                        html = `<span class="">└─ ${params.data.name}</span>`;
                    }
                    return  html;
                }
            },
            {
                headerName: "Icono",
                flex: 1, 
                field: "icon",
                filter: true,
                cellClass: "text-start",
                cellRenderer: (params) => {
                    let ico = params.data.icon;
                    let html = `<i class="${ico} t16"></i> `;
                    return html;
                }
            },
            {
                headerName: "Ruta",
                flex: 1, 
                field: "route",
                filter: true,
                cellClass: "text-start",
            },
            {
                headerName: "SubMenu",
                flex: 1, 
                field: "submenu",
                filter: false,
                cellClass: "text-start",
                cellRenderer: (params) => {
                    let sm = params.data.submenu;
                    let html = "";

                    title_d = "Borrado";
                    if (sm == 1){
                        cls = "fa fa-check";
                        color = "bg-success";
                    }else{
                        cls = "fas fa-minus";
                        color = "bg-light text-dark";
                    }
                    html += `<kbd class="${color}" title="${title_d}"> <i class='${cls}'></i> </kbd> `;
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

function cleanRecords(record=null){
    let idmenu = -1;
    let name = "";
    let submenu = "0";
    let status = "0";
    let parent = "00";
    let icono = "fa fa-cog";
    let route = "";

    $("#name").prop("readonly", false);
    $("#name").prop("disabled", false);
    $("#parentDIV").removeClass("hide");
    $("#submenuDIV").removeClass("hide");
    $("#rutaDIV").removeClass("hide");

    if(record){
        idmenu = record.idmenu;
        name = record.name;
        submenu = record.submenu;
        parent = record.order.split(".")[0];
        status = record.status.toString();
        icono = record.icon;
        route = record.route;
        // checkSubmenu(submenu);
        
        // lstMenuOriginal.forEach(e=>{
        //     // console.log(e)
        //     if (e.idmenu == record.idmenu) {
        //         name = e.name;
        //         submenu = e.submenu;
        //         parent = e.order.split(".")[0];
        //         status = e.status.toString();
        //         icono = e.icono;
        //         route = e.route;
        //     }
        // });

        if (submenu == 1){
            $("#rutaDIV").addClass("hide");
        }
        
        $("#username").prop("readonly", true);
        $("#username").prop("disabled", true);
        $("#parentDIV").addClass("hide");
        $("#submenuDIV").addClass("hide");
    }
    
    $("#idmenu").val(idmenu);
    $("#name").val(name);
    $("#submenu").val(submenu);
    $("#parent").val(parent);
    $("#status").val(status);
    $("#icon").val(icono);
    desplegarIcono(icono);
    $("#route").val(route);
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
    desplegarIcono($("#icon").val());
    showDivs(1);
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

$("#submenu").on("change", function(){
    let d = $(this).val();
    checkSubmenu(d);    
});

checkSubmenu = (d) =>{
    if(d == 0){
        $("#parentDIV").removeClass("hide");
        $("#order2").removeClass("hide");
    }else{
        $("#parentDIV").addClass("hide");
        $("#order2").addClass("hide");
    }
}

// $("#parent").on("change", function(){
//     checkParent();
// });

// function checkParent(){
//     let d1 = $("#parent").val();
//     let dText = $("#parent option:selected").text();
//     $("#orden1").val(d1);
//     $("#padre").html(dText);
    
//     let count = 0;
//     let found = false;
//     lstMenu.forEach( e=>{
//         if (!found && e.order == d1){
//             console.log(e)
//             console.log(e.child.length);
//             count = e.child.length;
//         }
//     });
    
//     count ++;
//     let posible_order = count.toString().padStart(2, "0");

//     $("#orden2").val(posible_order);


// }

//$(`#YourSelect option[value='${YourValue}']`).prop('selected', true);
$("#icon").on("keyup", function(){
    let icon = $(this).val();
    desplegarIcono(icon);
})

desplegarIcono = (icono) =>{
    // $("#execIcon").html(`<i class="${icono} t20"></i>`);
    $("#execIcon").html(`<kbd class="bg-primary"><i class='${icono} t16'></i></kbd>`);
}

$("#route").on("keyup", function(){
    let ruta = $(this).val();
    
    var found = verificarDisponibilidadRuta(ruta);

    let html = ""
    if (found){
        cls = "fas fa-times";
        color = "bg-danger";
        msg = "Ya existe";
    }else{
        cls = "fa fa-check";
        color = "bg-success";
        msg = "Verificado";
    }
    html += `<kbd class="${color}" title="${msg}"><i class='${cls}'></i></kbd>`;
    $("#obsRuta").html(html);

})


verificarDisponibilidadRuta = (ruta) => {
    let found = false;
    lstMenuOriginal.forEach( e=>{
        if (e.route == ruta){
            found = true;
        }
    });
    return found;
}