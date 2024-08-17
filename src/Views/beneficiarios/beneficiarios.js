setTimeout(function(){
    if (permisosLectura){
        estructuraGrid();
        loadData();
        showDivs(0);
        loadPais();
        loadProvincia();
        loadCiudad();
    } else{
        $("#btmDivs").addClass("hide");
        sendMessage("error", "Autorizacion", mensajeNoPermisoLectura);
    }
},800)


lstBeneficiarios = [];
lstPais = [];
lstProvincia = [];
lstCiudad = [];
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
    let url = "bene";
    await consumirApi(metodo, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}


            if (resp.status && resp.status == 'ok') {
                lstBeneficiarios = [];
                resp.message.forEach( e => {
                    e["idbeneficiary"] = e.idbeneficiary.toString();
                    lstBeneficiarios.push(e)    
                });
                
                gridApi.setGridOption("rowData", lstBeneficiarios);
                gridApi.sizeColumnsToFit();

                // console.log(lstBeneficiarios)
                // parent();

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
            return params.data.idbeneficiary;
        },
        onRowClicked: (event) => {
            dataSelected = event.data;
            idSelect = event.data.idbeneficiary;
            idSelectName = event.data.nombre;
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
                field: "idbeneficiary",
                filter: false,
                cellClass: "text-start text-underline",
            },
            {
                headerName: "Tipo",
                flex: 1, 
                field: "type",
                filter: true,
                cellClass: "text-start",
                cellRenderer: (params) => {
                    let type = params.data.type;
                    let cls = "";
                    let html = "";

                    if (type == "Cliente"){
                        // cls  = "text-success";
                        cls  = "bg-success";
                    } else{
                        // cls  = "text-warning";
                        cls  = "bg-warning";
                    }
                    // return `<span class='${cls}'>${type}<span>`;
                    return `<kbd class='${cls}'>${type}<kbd>`;
                }
            },
            {
                headerName: "Identificacion",
                flex: 1, 
                field: "identification",
                filter: true,
                cellClass: "text-start",
            },
            {
                headerName: "Nombre",
                flex: 2, 
                field: "nombre",
                filter: true,
                cellClass: "text-start",
            },
            {
                headerName: "Nombre Comercial",
                flex: 2, 
                field: "nombrecomercial",
                filter: true,
                cellClass: "text-start",
            },
            // {
            //     headerName: "Email",
            //     flex: 1, 
            //     field: "email",
            //     filter: true,
            //     cellClass: "text-start",
            // },
            {
                headerName: "Ciudad",
                flex: 1, 
                field: "ciudad",
                filter: true,
                cellClass: "text-start",
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


async function loadPais(){
    let metodo = "GET";
    let url = "pais";
    await consumirApi(metodo, url)
        .then( resp=>{
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {
                lstPais = resp.message;
                llenaPais();
            } else {
                sendMessage("error", title, resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            console.log("ERR", err);
            sendMessage("error", title, JSON.stringify(err.responseText));
        });
}




async function loadProvincia(){
    let metodo = "GET";
    let url = "provincia";
    await consumirApi(metodo, url)
        .then( resp=>{
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {

                lstProvincia = resp.message;

            } else {
                sendMessage("error", title, resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            console.log("ERR", err);
            sendMessage("error", title, JSON.stringify(err.responseText));
        });
}



async function loadCiudad(){
    let metodo = "GET";
    let url = "ciudad";
    await consumirApi(metodo, url)
        .then( resp=>{
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}
            
            if (resp.status && resp.status == 'ok') {
                lstCiudad = resp.message;
            } else {
                sendMessage("error", title, resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            console.log("ERR", err);
            sendMessage("error", title, JSON.stringify(err.responseText));
        });
}

function llenaPais(){
    $("#idcountry").html("");
    lstPais.forEach(e=>{
        $("#idcountry").append(`<option ${e.name == "Ecuador" ? 'selected': ''} value="${e.idcountry}">${e.name}</option>`)
    });
}

function llenaProvincia(pais = 0, ids = null, ciudad = null){
    $("#idprovince").html("");
    lstProvincia.forEach(p=>{
        if (p.idcountry == pais){
            $("#idprovince").append(`<option ${ids && ids == p.idprovince ? 'selected' : '' } value="${p.idprovince}">${p.name}</option>`)
        }
    })
    llenaCiudad(ids ?? parseInt($("#idprovince").val()), ciudad);
}

function llenaCiudad(provincia = 0, ids=null){
    $("#idcity").html("");
    lstCiudad.forEach(p=>{
        if (p.idprovince == provincia){
            $("#idcity").append(`<option ${ids && ids == p.idcity ? 'selected' : '' } value="${p.idcity}">${p.name}</option>`)
        }
    })
}


function cleanRecords(record = null){

    let idbeneficiary = -1;
    let type = "C";
    let name = "";
    let comercialname = "";
    let identificationnumber = "";
    let idcountry = 50;
    llenaProvincia(idcountry);

    // let idprovince = parseInt($("idprovince").val());

    let address = "";
    let parish = "";
    let phone = "";
    let email = "";
    let web = "";
    let creditquota = "0";
    let creditdays = "0";
    let account = "";

    if(record){
        //TODO: Edicion
        
        idbeneficiary = record.idbeneficiary;
        type  = record.type == "Cliente" ? "C" : (record.type == "Proveedor" ? 'P' : 'A' ) ;
        name = record.nombre;
        comercialname = record.nombrecomercial;
        identificationnumber = record.identification;
        idcountry = record.idcountry;
        idprovince = record.idprovince;
        idcity = record.idcity;
        address = record.direccion;
        parish = record.parroquia;
        phone = record.telefono;
        email = record.email;
        web = record.web;
        creditquota  = record.creditquota ;
        creditdays  = record.creditdays ;
        account = record.account;
        llenaProvincia(idcountry, idprovince, idcity);

    }

    $("#idbeneficiary").val(idbeneficiary);
    $("#type").val(type);
    $("#name").val(name);
    $("#comercialname").val(comercialname);
    $("#identificationnumber").val(identificationnumber);
    $("#idcountry").val(idcountry);
    $("#address").val(address);
    $("#parish").val(parish);
    $("#phone").val(phone);
    $("#email").val(email);
    $("#web").val(web);
    $("#creditquota ").val(creditquota );
    $("#creditdays ").val(creditdays );
    $("#account").val(account);

    // llenaProvincia(idcountry);
    // llenaCiudad(idprovince);
    
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


$("#idcountry").on("change", function(){
    let id = $(this).val();
    llenaProvincia(parseInt(id));
});

$("#idprovince").on("change", function(){
    let id = $(this).val();
    llenaCiudad(parseInt(id));
});



async function saveData(){

    showLoading("Guardando");

    let idbeneficiary = parseInt($("#idbeneficiary").val());
    let type = $("#type").val();
    let name = $.trim($("#name").val());
    let comercialname = $.trim($("#comercialname").val());
    let identificationnumber = $.trim($("#identificationnumber").val());
    let idcountry = parseInt($("#idcountry").val());
    let idprovince = parseInt($("#idprovince").val());
    let idcity = parseInt($("#idcity").val());
    let address = $.trim($("#address").val());
    let parish = $.trim($("#parish").val());
    let phone = $.trim($("#phone").val());
    let email = $.trim($("#email").val());
    let web = $.trim($("#web").val());
    let creditquota = parseFloat($("#creditquota").val());
    let creditdays = parseInt($("#creditdays").val());
    let account = $.trim($("#account").val());

    let error = false;
    let errMsg = "";
    
    if (name == "") {
        error = true;
        errMsg = "Debe ingresar el nombre";
    }

    if (!error && identificationnumber == "") {
        error = true;
        errMsg = "Debe ingresar el numero de identificación";
    }

    if (!error && idprovince == "") {
        error = true;
        errMsg = "Debe seleccionar una provincia";
    }

    if (!error && idcity == "") {
        error = true;
        errMsg = "Debe seleccionar una ciudad";
    }


    if (error){
        sendMessage("error", title, errMsg);
        return;
    }

    name = name.toUpperCase();
    comercialname  = comercialname.toUpperCase();
    
    let params = {
        type, 
        name, 
        comercialname , 
        identificationnumber, 
        idcountry, 
        idprovince, 
        idcity, 
        address, 
        parish, 
        phone, 
        email, 
        web, 
        creditquota, 
        creditdays, 
        account
    };


    let method = "PUT";
    if (idbeneficiary == -1){
        method = "POST";
    }
    let url = `saveBene&id=${idbeneficiary}`;

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

$("#icon").on("keyup", function(){
    let icon = $(this).val();
    desplegarIcono(icon);
})

desplegarIcono = (icono) =>{
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
    if (idmenu == "" || idmenu == "-1"){
        lstBeneficiarios.forEach( e=>{
            if (e.route == ruta){
                found = true;
            }
        });
    }
    return found;
}


