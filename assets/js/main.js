// document.addEventListener("readystatechange", function () {
// 	switch (document.readyState) {
// 		case "complete":
//             break;
//         }
//     });
setTimeout(function(){
    initial();
},800)
    
$("#spinner").removeClass("rotate_div");
$("#DivForm").removeClass("modal-form");

// Variables Globales
apiPathBase = "";
var webPathBase = "";
let config = {};
let prefijoDocumentacion = "";

//TODO: carga el archiv config
fetch('anything.papajhons')
    .then((response) => response.json())
    .then((json) => {
        config = json;
        apiPathBase = config.apipath + "?ruta=";
        webPathBase = config.webpath;
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
    getAlerts();

    if (["mapasitio"].includes(route)){
        $("#path").html("Mapa del Sitio");
    } else if (["userinfo"].includes(route)){
        $("#path").html("Informacion del Usuario");
    } else if (["noti"].includes(route)){
        $("#path").html("Alertas & Notificaciones");
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

async function getAlerts(){
    let metodo = "GET";
    let url = "alertas";
    await consumirApi(metodo, url)
        .then( resp=>{
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            // console.log(resp)

            if (resp.status && resp.status == 'ok') {
                if (resp.message){
                    if (resp.message.length>0){
                        $("#btnNot").removeClass("hide");
                        $("#numNoti").html(resp.message.length);
                    }
                }
            } else {
                sendMessage("error", "Alertas", resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            console.log("ERR", err);
            sendMessage("error", "Alertas", JSON.stringify(err.responseText));
        });
}


//TODO: Funcion generica para despliegue de mensajes (POPUP)
function sendMessage(type, titulo, message, textishtml = false, width="900px"){
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
                width: width
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
    if (obj.hasOwnProperty("code")) html += `<tr><th width="20%" class="text-end">Codigo</th><td class="text-start">${obj.code}</td></tr>` ;
    if (obj.hasOwnProperty("file")) html += `<tr><th class="text-end">Archivo</th><td class="text-start">${obj.file}</td></tr>` ;
    if (obj.hasOwnProperty("line")) html += `<tr><th class="text-end">Linea</th><td class="text-start">${obj.line}</td></tr>` ;
    if (obj.hasOwnProperty("message")) html += `<tr><th class="text-end">Mensaje</th><td class="text-start">${obj.message}</td></tr>` ;
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
function help(message, esHTML = false){
    sendMessage("question", "Ayuda", message, esHTML);
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


function numero(amount, decimals) {
    if (amount==0){
        return 0;
    }
    amount += ''; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.\-]/g, '')); // elimino cualquier cosa que no sea numero o punto

    decimals = decimals || 0; // por si la variable no fue fue pasada

    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0)
        return parseFloat(0).toFixed(decimals);

    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = '' + amount.toFixed(decimals);

    var amount_parts = amount.split('.'),
        regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
        amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

    return amount_parts.join('.');
}

async function imprimir( title = 'file', data = null, orientacion = 'p', subtitle="", reemplazaAL = false){
    // if (data.length==0){
    //     sendMessage("error", "PDF", "No se puede exportar a PDF si no existen datos");
    //     return;
    // }

    if (data){
        records = formatoDatosPDF(data);
    }
    
    const { jsPDF } = window.jspdf;
    
    var doc = new jsPDF({
        orientation: orientacion,
        format: 'A4',
        unit: 'mm'
    })
    try{
        const imgData = await loadImage(webPathBase + 'assets/images/logo.jpg');
        doc.addImage(imgData, 'JPEG', 10, 10, 40, 30);
    }catch(err){}
    doc.setFontSize(18);
    doc.text(title, 60, 20);
    doc.setFontSize(10);
    if (!reemplazaAL) doc.text('Al: ' + moment().format("DD-MM-YYYY HH:mm:ss"), 60, 25);
    if (subtitle!='') {
        subtitle = subtitle.replace(`<kbd class="bg-success mr-1">`,"")
        subtitle = subtitle.replace(`<kbd class="bg-success mr-1">`,"")
        subtitle = subtitle.replace(`</kbd>`,"")
        subtitle = subtitle.replace(`</kbd>`,"")
        subtitle = subtitle.replace(`<br>`,"")
        if (!reemplazaAL) {
            doc.text(subtitle, 60, 30);
        } else{
            doc.text(subtitle, 60, 25);
        }
    }
    
    // Agregar la tabla usando jsPDF-AutoTable
    if (data){
        doc.autoTable({
            startY: 50,  // Donde empieza la tabla
            head: [records[0]],
            body: records.slice(1),
        });
    }

    // Número de páginas y pie de página
    // const pageCount = doc.getNumberOfPages();
    // for (let i = 1; i <= pageCount; i++) {
    //     doc.setPage(i);
    //     doc.setFontSize(10);
    //     doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 10);
    //     // doc.text(`Página ${i} de ${pageCount}`, 10);
    // }

    doc.save(title + '.pdf');
}

function exportarCSV(filename, array = [], subtitle = ''){
    let str = (Object.keys(array[0])).join(",") + '\r\n';
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
          line += array[i][index] + ',';
        }
        line.slice(0, line.Length - 1);
        str += line + '\r\n';
    }

    if (subtitle!='') {
        subtitle = subtitle.replace(`<kbd class="bg-success mr-1">`,"")
        subtitle = subtitle.replace(`<kbd class="bg-success mr-1">`,"")
        subtitle = subtitle.replace(`</kbd>`,"")
        subtitle = subtitle.replace(`</kbd>`,"")
        subtitle = subtitle.replace(`<br>`,"")
    }

    download(filename, filename + "\r\n" + subtitle + "\r\n" +  str);
}


function formatoDatosPDF(array = []){

    /*
    const data = [
        ["ID", "Producto", "Cantidad", "Precio"],
        ["1", "Producto A", "100", "$10"],
        ["2", "Producto B", "200", "$20"],
        ["3", "Producto C", "150", "$15"],
    ];
    */

    const data = [];
    let cabecera = Object.keys(array[0]);
    data.push(cabecera);

    let temp = [];
    for (var i = 0; i < array.length; i++) {
        temp = [];
        for (var index in array[i]) {
            temp.push(array[i][index] == null ? '' : array[i][index]);
        }
        data.push(temp)
    }
    return data;
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/jpeg'));
        };
        img.onerror = reject;
        img.src = url;
    });
}


function download(filename, textInput) {
    var element = document.createElement('a');
    element.setAttribute('href','data:text/csv;charset=utf-8, ' + encodeURIComponent(textInput));
    var blob = new Blob([textInput], { type: 'text/csv;charset=utf-8;' });
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
}