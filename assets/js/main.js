document.addEventListener("readystatechange", function () {
	switch (document.readyState) {
		case "complete":
			setTimeout(function(){
				initial();
			},800)
			break;
	}
});

$("#spinner").removeClass("rotate_div");
$("#DivForm").removeClass("modal-form");

// Variables Globales
let apiPathBase = "";
let config = {};
let prefijoDocumentacion = "";

//TODO: carga el archiv config
fetch('config.json')
    .then((response) => response.json())
    .then((json) => {
        config = json;
        apiPathBase = config.apipath + "?ruta=";
    });

//TODO: carga tabla config
async function loadConfig(){
    let metodo = "GET";
    let url = "config";

    await consumirApiWT(metodo, url)
        .then( resp=>{
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}
            
            if (resp.status && resp.status == 'ok') {
                resp.message.forEach(e=>{
                    eval(`config["${e.variable}"] = '${e.vvalue}'`);
                });

                config["prefijo_documentacion"]  = "";
                if (config.establecimiento!="" && config.empresa_pto_venta!=''){
                    config["prefijo_documentacion"] = `${config.empresa_establecimiento}-${config.empresa_pto_venta}-`;
                }
                prefijoDocumentacion = config.prefijo_documentacion;
                $("#titleapp").html(config["empresa_nombre"]);

                sessionSet("config", config);
                // console.log(config)

            } else {
                sendMessage("error", title, resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            console.log("ERR", err);
            sendMessage("error", title, JSON.stringify(err.responseText));
        });
}


$("#spinner").addClass("hide");

let apiToken = '';
lstMenu = [];
let gridOptions = {};
let gridApi;
let idSelect ="";
let idSelectName ="";
let dataSelected;
let gridOptions2 = {};
let gridApi2;
let idSelect2 ="";
let idSelectName2 ="";
let dataSelected2;
let lstUsers = [];
let scopeUser = "";
let title = "";


function initial(){
    //TODO:Verificar si tiene iniciado la session
    let logueado = sessionGet("logged");
    let page = "";
    if (logueado){
        page = "skeleton";
    }else{
        page = "login";
    }
    let pagina = `src/Views/${page}/${page}.php`;
    $("#mainPage").load(pagina);

    //TODO: Proceso de refresco y analisis de el path donde se encuentra, si  no se encuentra en login es decir cuando este logueado
    if (!["login"].includes(page)){
        setTimeout(function(){
            let ruta = sessionGet("route");
            if (!ruta){
                ruta = lstMenu[0].child[0].route;
            }
            selectRuta(ruta);
        },1000)
    }

    //TODO: getconfig
    loadConfig();

}

//TODO Funcion que permite consumir recursos ajax resp api sin token, para rutas de logueo
function consumirApiWT(method, url, params = null) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${apiPathBase}${url}`,
            type: method,
            data: params,
            success: function (resp, status, xhr) {
                resolve(resp);
            }
        })
        .fail(function(error) {
            reject(error);
        });
    });
}
//TODO Funcion que permite consumir recursos ajax resp api con token
function consumirApi(method, url, params = null) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${apiPathBase}${url}`,
            type: method,
            headers: {
                "Authorization": "Bearer " + apiToken,
                "Content-Type": "application/json"
            },
            data: params,
            success: function (resp, status, xhr) {
                resolve(resp);
            }
        })
        .fail(function(error) {
            reject(error);
        });
    });
}

//TODO Funcion que permite encriptar texto
function encryptKey(text){
    var encrypted = CryptoJS.AES.encrypt(text, "y91ooeN3Vbx7iCkUpJXP5Xvek");
    return encrypted.toString();
}
//TODO Funcion que permite desencriptar texto
function decryptKey(text){
    var bytes  = CryptoJS.AES.decrypt(text, "y91ooeN3Vbx7iCkUpJXP5Xvek");
    var decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
}
//TODO Funcion que permite establecer la session por session storage
function sessionSet(key = "", value = null){
    if (key == "") return;
    let text = encryptKey(JSON.stringify(value));
    sessionStorage.setItem(key, text);
}
//TODO Funcion que permite traer la informacion guardada en la session storage
function sessionGet(key = ""){
    let conv = null;
    try{
        if (key == "") return null;
        let text = sessionStorage.getItem(key);
        if (text !== undefined){
            conv = JSON.parse(decryptKey(text));
        }
    } catch(err){
        conv = null;
    }
    return conv;
}

//TODO Funcion que permite limpiar las variables de sesion
function proccessCleanMemory(){
    sessionSet("user", "");
    sessionSet("token", "");
    sessionSet("route", "");
    sessionSet("logged", false);
}

//TODO Seleccion de rutas. 
async function selectRuta(route, args = ''){
    sessionSet("route", route);

    if (["mapasitio"].includes(route)){
        $("#path").html("Mapa del Sitio")
    } else {
        //TODO: Breadcrumbs
        let parent = "";
        let path = [];
        let objMenu = [];
        let title = "";
    
        lstMenu.forEach( e => {
            parent = e.name;
            e.child.forEach(ch=>{
                if (route == ch.route){
                    objMenu = ch;
                    path.push(parent);
                    path.push(ch.name);
                    title = ch.name;
                }
            })
        });
        sessionSet("current_route", JSON.stringify(objMenu));
        $("#path").html(path.join(" / "))
    }

    
    //TODO: Llamar al controlador generico y pasar variables para ejecutar vistas
    controller = `src/Controllers/BaseController.php?cont=${route}&args=${args}`;
    $("#divbody").load(controller)
}

//TODO: Funcion generica para despliegue de mensajes (POPUP)
function sendMessage(type, titulo, message, textishtml = false){
    if (typeof message === "array" || typeof message === "object" ){
        sendMessageObj(type, titulo, message)
    } else{
        if (textishtml){
            Swal.fire({
                allowOutsideClick: false,
                allowEscapeKey: false,
                title: titulo,
                html: message,
                icon: type,
                footer: "DIPROAVILM",
                width: "900px"
            })

        } else {
            Swal.fire({
                allowOutsideClick: false,
                allowEscapeKey: false,
                title: titulo,
                text: message,
                icon: type,
                footer: "DIPROAVILM",
            })

        }
    }
}

function sendMessageObj(type, titulo, obj){
    let html = "<table class='table table-striped'>";
    if (obj.hasOwnProperty("code")) html += `<tr><th class="text-end">Codigo:</th><td class="text-start">${obj.code}</td></tr>` ;
    if (obj.hasOwnProperty("file")) html += `<tr><th class="text-end">Archivo:</th><td class="text-start">${obj.file}</td></tr>` ;
    if (obj.hasOwnProperty("line")) html += `<tr><th class="text-end">Linea:</th><td class="text-start">${obj.line}</td></tr>` ;
    if (obj.hasOwnProperty("message")) html += `<tr><th class="text-end">Mensaje:</th><td class="text-start">${obj.message}</td></tr>` ;
    html += "</table>"
    Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        title: titulo,
        html: html,
        icon: type,
        width: "900px", 
        footer: "DIPROAVILM",
    })
}

//TODO: Despliegue de ayudas
function help(message){
    sendMessage("question", "Ayuda", message);
}

//TODO: Icono girando en proceso spinner
function showLoading(text="Cargando"){
    $("#spinner").removeClass("hide");
    $("#spinner").addClass("rotate_div");
    $("#spinner-text").html(text);
}

//TODO: Revisa solo letras y numeros
function checkSoloLetrasNumeros(palabra){
    const pattern = new RegExp('^[A-Z0-9]+$', 'i');
    return pattern.test(palabra)
}

function checkSoloLetrasNumerosEspacios(palabra){
    const pattern = new RegExp('^[A-Z0-9]+$', 'i');
    return pattern.test(palabra)
}

function closeLoading(){
    $("#spinner").addClass("hide");
    $("#spinner").removeClass("rotate_div");
}

function formatoTitulo(text) {
    let palabras = text.split("");
    let convertirPalabra = "";
    let aplicarMayuscula = true;
    palabras.forEach(e=>{
        if (aplicarMayuscula && e != " "){
            aplicarMayuscula = false;
            convertirPalabra += e.toUpperCase();
        }else{
            if (e == " " && aplicarMayuscula){
                aplicarMayuscula = true;
            }else{
                if (e == " " && !aplicarMayuscula){
                    aplicarMayuscula = true;
                    convertirPalabra += e;
                }else{
                    aplicarMayuscula = false;
                    convertirPalabra += e.toLowerCase();
                }
            }
        }
    })
    return convertirPalabra;
}
