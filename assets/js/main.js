document.addEventListener("readystatechange", function () {
	switch (document.readyState) {
		case "complete":
			setTimeout(function(){
				initial();
			},800)
			break;
	}
});

// Variables Globales
var apiPathBase = "";
var config = {};
fetch('config.json')
    .then((response) => response.json())
    .then((json) => {
        config = json;
        apiPathBase = config.apipath + "?ruta=";
        sessionSet("config", json);
    });

$("#spinner").addClass("hide");

var apiToken = '';
lstMenu = [];
var gridOptions = {};
var gridApi;
var idSelect ="";
var idSelectName ="";
var lstUsers = [];
var scopeUser = "";


// var cookie_options = {
//     expires: 365,
//     path: '/',
//     domain: 'webdiproavilm.dev.com',
//     secure: true
// };

function initial(){
    /**
     * Verificar si tiene iniciado la session
     */
    let logueado = sessionGet("logged");
    let page = "";
    if (logueado){
        page = "admin";
    }else{
        page = "login";
    }
    let pagina = `src/Views/${page}/${page}.php`;
    $("#mainPage").load(pagina);

    /**
     * Pagina por defecto
     */
    if (!["login"].includes(page)){
        setTimeout(function(){
            let ruta = sessionGet("route");
            if (!ruta){
                ruta = lstMenu[0].child[0].route;
            }
            selectRuta(ruta);
            // console.log(apiToken);
        },1000)
    }

}

function consumirApiWT(method, url, params = null) {
    console.log(`${apiPathBase}${url}`)
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

function consumirApi(method, url, params = null) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${apiPathBase}${url}`,
            type: method,
            headers: {
                "Authorization": "Bearer " + apiToken, 
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


function encryptKey(text){
    var encrypted = CryptoJS.AES.encrypt(text, "y91ooeN3Vbx7iCkUpJXP5Xvek");
    return encrypted.toString();
}

function decryptKey(text){
    var bytes  = CryptoJS.AES.decrypt(text, "y91ooeN3Vbx7iCkUpJXP5Xvek");
    var decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
}

function sessionSet(key = "", value = null){
    if (key == "") return;
    // let text = encryptKey(btoa(JSON.stringify(value)));
    let text = encryptKey(JSON.stringify(value));
    // Cookies.set(key,  text, cookie_options);
    sessionStorage.setItem(key, text);
}

function sessionGet(key = ""){
    let conv = null;
    try{
        if (key == "") return null;
        // let text = Cookies.get(key);
        let text = sessionStorage.getItem(key);
        if (text !== undefined){
            // conv = JSON.parse(atob(decryptKey(text)));
            conv = JSON.parse(decryptKey(text));
        }
    } catch(err){
        conv = null;
    }
    return conv;
}


function proccessCleanMemory(){
    sessionSet("user", "");
    sessionSet("token", "");
    sessionSet("route", "");
    sessionSet("logged", false);
}


async function selectRuta(route, args = ''){
    // console.log("Ruta", route)
    sessionSet("route", route);

    /**
     * Breadcrumbs
     */
    let parent = "";
    let path = [];
    let title = "";

    lstMenu.forEach( e => {
        parent = e.name;
        e.child.forEach(ch=>{
            if (route == ch.route){
                path.push(parent);
                path.push(ch.name);
                title = ch.name;
            }
        })
    });
    $("#path").html(path.join(" / "))

    /**
     * Llamar al controlador especifico
     */
    // controller = `src/Controllers/${route}Controller.php?args=125`;
    // $("#divbody").load(controller)
    controller = `src/Controllers/BaseController.php?cont=${route}&title=${title}&args=${args}`;
    $("#divbody").load(controller)
}


function sendMessage(type, titulo, message){
    swal({
        title: titulo,
        text: message,
        icon: type,
        // allowEscapeKey: false,
        // showLoaderOnConfirm: true
    });
}

function showLoading(text="Cargando"){
    $("#spinner").removeClass("hide");
    $("#spinner").addClass("rotate_div");
    $("#spinner-text").html(text);
}

function closeLoading(){
    $("#spinner").addClass("hide");
    $("#spinner").removeClass("rotate_div");
}


function openForm(obj) {
	let icon = "info";
	let type = obj.icon;
	switch(type){
		case 'info':
			icon = `<div class="t60 text-warning"><i class="fas fa-info-circle"></i></div>`;
			break;
		case 'error':
			icon = `<div class="t60 text-danger"><i class="far fa-times-circle"></i></div>`;
			break;
		case 'question':
			icon = `<div class="t60 text-info"><i class="far fa-question-circle"></i></div>`;
			break;
		case 'success':
			icon = `<div class="t60 text-success"><i class="far fa-check-circle"></i></div>`;
			break;
		case 'bug':
			icon = `<div class="t60 text-danger"><i class="fas fa-bug"></i></div>`;
			break;
		case '':
			icon = "";
			break;
	}

	let enters = "<br>";
	if (obj.minimum){
		enters = "";
		icon = "";
	}

	let html = `
		<div class="text-center">
			${icon}
			<h2 class="bold">${obj.title}</h2><br>
			<div class="normal">${obj.content}</div>
			${enters}
		</div>
	`;

	// let div = "DivForm";
	let div = "myModal";

    
    // $(`#${div}`).removeClass('hide');
    // $(`#${div}`).addClass('modal-form');
	$(`#Message${div}`).html(html);
	// $(`#Message${div}`).css("width", obj.width);
	$(`#${div}`).css("width", obj.width);

    $(`#${div}`).modal('show');

    // positionModal($(`#Message${div}`));
    positionModal($(`#${div}`));

}

function positionModal (obj, sus=0, fixed=true, center=true){
    let w = obj.width();
    let h = obj.height();
    let resp = {
        x: (jQuery(this).outerWidth() - w) / 2 ,
        y: center ? ((jQuery(this).outerHeight() - h) / 2) - sus : 0
    };
    if (fixed){
        obj.closest("div[role='dialog']").css({top:resp.y ,left:resp.x});
        return;
    }

    obj.closest("div[role='dialog']").css("margin-top", resp.y );
    return;
}
