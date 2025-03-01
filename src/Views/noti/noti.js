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

lstAlertas = [];
lstPais = [];
lstProvincia = [];
lstCiudad = [];
dataSelected = {};
var idmenu = "-1";

//TODO: Determinar titulo e icono que viene del menu
ruta = JSON.parse(sessionGet("current_route"));
title = "Alertas & Notificaciones";
$("#Title").html(title);
$("#TitleIcon").addClass("fa fa-bell");

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
    let url = "alertas";
    await consumirApi(metodo, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}


            if (resp.status && resp.status == 'ok') {
                lstAlertas = [];
                resp.message.forEach( (e, idx) => {
                    e["id"] = (idx+1).toString();
                    lstAlertas.push(e)    
                });
                
                gridApi.setGridOption("rowData", lstAlertas);
                gridApi.sizeColumnsToFit();

                // console.log(lstAlertas)
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
            return params.data.id;
        },
        onRowClicked: (event) => {
            dataSelected = event.data;
            idSelect = event.data.id;
            // habilitarBotones(true);
        },
        // groupDisplayType: 'groupRows',
        // groupRowRendererParams: {
        //     order: '01',
        // },
        columnDefs: [
            {
                headerName: "ID",
                flex: 1, 
                field: "id",
                filter: false,
                cellClass: "text-start text-underline",
            },
            {
                headerName: "Tipo Alerta",
                flex: 1, 
                field: "tipo",
                filter: true,
                cellClass: "text-start",
                cellRenderer: (params) => {
                    let tipo = params.value;
                    let cls = "";
                    let html = "";
                    let text = "";
                    if (tipo == "Stock"){
                        cls  = "bg-success";
                    } else if (tipo == "P"){
                        cls  = "bg-warning";
                    } else if (tipo == "A"){
                        text = "Proveedor/Cliente"
                        cls  = "bg-info";
                    } else if (tipo == "E"){
                        text = "Empresa"
                        cls  = "bg-primary";
                    }
                    // return `<span class='${cls}'>${type}<span>`;
                    return `<kbd class='${cls}'>${tipo}<kbd>`;
                }
            },
            {
                headerName: "Razon Alerta",
                flex: 5, 
                field: "razon",
                filter: true,
                cellClass: "text-start",
            },
        ]
    }

    const myGridElement = document.querySelector("#myGrid");
    gridApi = agGrid.createGrid(myGridElement, gridOptions);
    gridApi.sizeColumnsToFit();
}


async function loadTipoIdentificacion(){
    let metodo = "GET";
    let url = "tipoIdentificacion";
    await consumirApi(metodo, url)
        .then( resp=>{
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {
                lstTipoIdentificacion = resp.message;
                lstTipoIdentificacion.forEach(e=>{
                    $("#ididentificationtype").append(`<option value="${e.ididentificationtype}">${e.description}</option>`)
                })
            } else {
                sendMessage("error", title, resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            console.log("ERR", err);
            sendMessage("error", title, JSON.stringify(err.responseText));
        });
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
    let address = "";
    let parish = "";
    let phone = "";
    let email = "";
    let web = "";
    let creditquota = "0";
    let creditdays = "0";
    let account = "";
    let ididentificationtype = "2";

    if(record){
        //TODO: Edicion
        
        idbeneficiary = record.idbeneficiary;
        type  = record.type;
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
        ididentificationtype = record.ididentificationtype;
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
    
    $("#ididentificationtype").val(ididentificationtype).trigger("change");

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
    let ididentificationtype = $("#ididentificationtype").val();

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
    
    let resp = validarIdentificacion(true);
    if (!error && !resp.valides){
        error = true;
        errMsg = resp.razon;
    }
    
    if (!error && email != '' && !validarEmail(email)){
        error = true;
        errMsg = "Correo electrónico invalido";
    }

    if (error){
        sendMessage("error", title, errMsg);
        return;
    }

    showLoading("Guardando");


    name = name.toUpperCase();
    comercialname  = comercialname.toUpperCase();
    
    let params = {
        type, 
        name, 
        comercialname , 
        ididentificationtype,
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
        lstAlertas.forEach( e=>{
            if (e.route == ruta){
                found = true;
            }
        });
    }
    return found;
}

$("#identificationnumber").on("focusout", function(){
    validarIdentificacion();
});

$("#ididentificationtype").on("change", function(){
    validarIdentificacion();
});

function validarIdentificacion(opc = false){
    $("#identificationnumber").prop("disabled", false);
    let type = $("#ididentificationtype").val();
    let identificacion = $.trim($("#identificationnumber").val());
  
    let resultado = {valides: true, razon: ""};
    let imprimir = false;
    switch(type){
        case "2":
            //Cedula
            resultado = validadorCedulaEcuador(identificacion);
            imprimir = true;
            if (identificacion.length == 0) imprimir = false;
            break;
        case "1":
            //RUC
            resultado = validarRucEcuador(identificacion);
            imprimir = true;
            if (identificacion.length == 0) imprimir = false;
            break;
        case "4":
            //CONSUMIDOR FINAL
            $("#identificationnumber").val("9999999999");
            $("#identificationnumber").prop("disabled", true);
            imprimir = false;
            break;
        default:
            resultado = {valides: true, razon: ""}
            break;
    }

    if (opc){
        return resultado;
    }

    let html="";
    if (imprimir){
        if (resultado.valides){
            html = `<kbd class="bg-success"><i class="fa fa-check"></i></kbd> `;
        } else {
            html = `<kbd class="bg-danger"><i class="fa fa-times"></i></kbd> `;
        }
        html += resultado.razon;
    }else{
        html = "";
    }
    $("#verificacionIdentificacion").html(html);
}

function validadorCedulaEcuador(cedula){

    var ok = 1;
    for (i=0; i<cedula.length && ok==1 ; i++){
       var n = parseInt(cedula.charAt(i));
       if (isNaN(n)) ok=0;
    }
    if (ok==0){
       return { valides: false, razon: "La cédula no puede contener caracteres" };
    }

    if (!cedula) return { valides: false, razon: "Longitud errónea de la cedula" };
    
    if (cedula.length !== 10) return { valides: false, razon: "Longitud errónea de la cedula" };

    var provincia = parseInt(cedula.substring(0, 2), 10);
    
    if (provincia < 1 || provincia > 24) return { valides: false, razon: "Provincia erónea" };
    
    var tercerDigito = parseInt(cedula.substring(2, 3), 10);
    
    if (tercerDigito < 0 || tercerDigito > 5) return { valides: false, razon: "Tercer dígito erróneo" };
    
    var digitoVerificador = parseInt(cedula.substring(9, 10), 10);
    var coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    
    let suma = 0;
    
    for (let i = 0; i < coeficientes.length; i++) {
      var valor = parseInt(cedula.substring(i, i + 1), 10) * coeficientes[i];
      suma += valor > 9 ? valor - 9 : valor;
    }
    
    var resultado = suma % 10 === 0 ? 0 : 10 - (suma % 10);
    
    if (resultado !== digitoVerificador) return { valides: false, razon: "Digito verificador erróneo" };

    return {valides: true, razon:"Identificacion válida"};
}


function validarRucEcuador(numero) {          

    var suma = 0;      
    var residuo = 0;      
    var pri = false;      
    var pub = false;            
    var nat = false;      
    var numeroProvincias = 22;                  
    var modulo = 11;
                
    /* Verifico que el campo no contenga letras */                  
    var ok=1;
    for (i=0; i<numero.length && ok==1 ; i++){
       var n = parseInt(numero.charAt(i));
       if (isNaN(n)) ok=0;
    }
    if (ok==0){
       return { valides: false, razon: "El RUC no puede contener caracteres" };
    }
                
    if (numero.length < 10 ){              
        return { valides: false, razon: "El número ingresado no es válido" };
    }

    if (numero.length!=13){
        return { valides: false, razon: "Longitud errónea del RUC" }
    }
   
    /* Los primeros dos digitos corresponden al codigo de la provincia */
    provincia = numero.substr(0,2);      
    if (provincia < 1 || provincia > numeroProvincias){           
        return { valides: false, razon: "El código de la provincia es inválido" };
    }

    /* Aqui almacenamos los digitos de la cedula en variables. */
    d1  = numero.substr(0,1);         
    d2  = numero.substr(1,1);         
    d3  = numero.substr(2,1);         
    d4  = numero.substr(3,1);         
    d5  = numero.substr(4,1);         
    d6  = numero.substr(5,1);         
    d7  = numero.substr(6,1);         
    d8  = numero.substr(7,1);         
    d9  = numero.substr(8,1);         
    d10 = numero.substr(9,1);                
       
    /* El tercer digito es: */                           
    /* 9 para sociedades privadas y extranjeros   */         
    /* 6 para sociedades publicas */         
    /* menor que 6 (0,1,2,3,4,5) para personas naturales */ 

    if (d3==7 || d3==8){           
    //    alert('El tercer dígito ingresado es inválido');                     
       return false;
    }         
       
    /* Solo para personas naturales (modulo 10) */         
    if (d3 < 6){           
       nat = true;            
       p1 = d1 * 2;  if (p1 >= 10) p1 -= 9;
       p2 = d2 * 1;  if (p2 >= 10) p2 -= 9;
       p3 = d3 * 2;  if (p3 >= 10) p3 -= 9;
       p4 = d4 * 1;  if (p4 >= 10) p4 -= 9;
       p5 = d5 * 2;  if (p5 >= 10) p5 -= 9;
       p6 = d6 * 1;  if (p6 >= 10) p6 -= 9; 
       p7 = d7 * 2;  if (p7 >= 10) p7 -= 9;
       p8 = d8 * 1;  if (p8 >= 10) p8 -= 9;
       p9 = d9 * 2;  if (p9 >= 10) p9 -= 9;             
       modulo = 10;
    }         

    /* Solo para sociedades publicas (modulo 11) */                  
    /* Aqui el digito verficador esta en la posicion 9, en las otras 2 en la pos. 10 */
    else if(d3 == 6){           
       pub = true;             
       p1 = d1 * 3;
       p2 = d2 * 2;
       p3 = d3 * 7;
       p4 = d4 * 6;
       p5 = d5 * 5;
       p6 = d6 * 4;
       p7 = d7 * 3;
       p8 = d8 * 2;            
       p9 = 0;            
    }         
       
    /* Solo para entidades privadas (modulo 11) */         
    else if(d3 == 9) {           
       pri = true;                                   
       p1 = d1 * 4;
       p2 = d2 * 3;
       p3 = d3 * 2;
       p4 = d4 * 7;
       p5 = d5 * 6;
       p6 = d6 * 5;
       p7 = d7 * 4;
       p8 = d8 * 3;
       p9 = d9 * 2;            
    }
              
    suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;                
    residuo = suma % modulo;                                         

    /* Si residuo=0, dig.ver.=0, caso contrario 10 - residuo*/
    digitoVerificador = residuo==0 ? 0: modulo - residuo;                

    /* ahora comparamos el elemento de la posicion 10 con el dig. ver.*/                         
    if (pub==true){           
        if (digitoVerificador != d9){                          
            return { valides: false, razon: "El ruc de la empresa del sector público es incorrecto" };
        }                  
       /* El ruc de las empresas del sector publico terminan con 0001*/         
        if ( numero.substr(9,4) != '0001' ){                    
            return { valides: false, razon: "El ruc de la empresa del sector público debe terminar con 0001" };
        }
    }         
    else if(pri == true){         
        if (digitoVerificador != d10){                          
            return { valides: false, razon: "El ruc de la empresa del sector privado es incorrecto." };
        }         
        if ( numero.substr(10,3) != '001' ){                    
            return { valides: false, razon: "El ruc de la empresa del sector privado debe terminar con 001." };
        }
    }      

    else if(nat == true){         
        if (digitoVerificador != d10){                          
            return { valides: false, razon: "El número de cédula de la persona natural es incorrecto." };
        }         
        if (numero.length >10 && numero.substr(10,3) != '001' ){                    
            //   alert('El ruc de la persona natural debe terminar con 001');
            return { valides: false, razon: "El ruc de la persona natural debe terminar con 001" };
        }
    }      
    return {valides: true, razon:"Identificacion válida"};
 }  

 

 function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}