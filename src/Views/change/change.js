
$("#nameApp").html(config.appname);
$("#versionApp").html(config.version);

var minLength = 8;
var arrSecurity = [
    {id: "lowercase", caption: "Minusculas", value:false},
    {id: "uppercase", caption: "Mayusculas", value:false},
    {id: "number", caption: "Numeros", value:false},
    {id: "symbol", caption: "Símbolos", value:false},
    {id: "len", caption: "Longitud", value: false},
    {id: "fuerza", caption: "Fortaleza", value:"Poco Segura"},
];


leyenda();


/*
{
    "contains": [
        "lowercase",
        "uppercase",
        "number",
        "symbol"
    ],
    "length": 12,
    "id": 3,
    "value": "Strong"
}
*/
function chkPasswordStrength(pwd){
    return checkPasswordStrength.passwordStrength(pwd);
}

$("#password_new").on("keyup", (event)=>{
    let fuerza_arr = chkPasswordStrength($.trim($("#password_new").val()));
    let color = "";
    let texto = "";
    
    /** Que componentes tiene el texto */
    setValores("lowercase", false);
    setValores("uppercase", false);
    setValores("number", false);
    setValores("symbol", false);
    fuerza_arr.contains.forEach(e=>{
        setValores(e, true);
    });

    /** Longitud */
    setValores("len", fuerza_arr.length >= minLength ? true : false);
    
    fuerza = fuerza_arr.value;
    switch(fuerza){
        case "Too weak":
            color = "nivel-0";
            texto = "Muy poco segura";
            break;
        case "Weak":
            color = "nivel-1";
            texto = "Poco segura";
            break;
        case "Medium":
            color = "nivel-2";
            texto = "Media";
            break;
        case "Strong":
            color = "nivel-3";
            texto = "Fuerte";
            break;
    }
    
    setValores("fuerza", texto);

    $("#fortalezaPassword").removeClass("nivel-0");
    $("#fortalezaPassword").removeClass("nivel-1");
    $("#fortalezaPassword").removeClass("nivel-2");
    $("#fortalezaPassword").removeClass("nivel-3");
    $("#fortalezaPassword").addClass(color);

    leyenda();
    
});

function setValores(find = '', valor){
    arrSecurity.forEach( e => {
        if (e.id == find){
            e.value = valor
        };
    });
};

function leyenda() {
    let html = "";
    let elem;
    arrSecurity.forEach( e => {
        html += "<div class='row t12 mt-2'>";
            if (typeof(e.value) === "string"){
                elem = e.value;
            } else {
                if (e.value){
                    elem  = "<i class='far fa-check-circle text-success'></i>";
                }else{
                    elem  = "<i class='far fa-times-circle text-danger'></i>";
                }
            }
            html += `<div class='col-6'>${e.caption}</div>`;
            html += `<div class='col-6'>${elem}</div>`;
        html += "</div>";
    });
    // console.log(html);
    $("#fortalezaPasswordDesc").html(html);
}

$("#btnCambio").on("click", async function(){
    cambiarPass();
});

async function cambiarPass(){
    //Validacion
    let username = $.trim($("#username").val());
    let password_old = $.trim($("#password_old").val());
    let password_new = $.trim($("#password_new").val());
    let password_confirmacion = $.trim($("#password_confirmacion").val());

    let error = false;
    let errMsg = "";

    let pattern = /^[a-zA-Z0-9]$/;
    if (!pattern.test(username)) {
        resp = false;
    }

    if (!error && username == ""){
        errMsg = "Debe ingresar el nombre del usuario";
        error = true;
    }

    if (!error && password_old == ""){
        errMsg = "Debe ingresar la contraseña anterior del usuario";
        error = true;
    }

    if (!error && password_new == ""){
        errMsg = "Debe ingresar la nueva contraseña del usuario";
        error = true;
    }

    if (!error && password_confirmacion == ""){
        errMsg = "Debe ingresar la confirmación de la nueva contraseña del usuario";
        error = true;
    }

    if (!error && password_confirmacion != password_new){
        errMsg = "La contraseña nueva y la confirmación deben ser iguales";
        error = true;
    }

    let fuerza = chkPasswordStrength(password_new);

    if (!error && (fuerza.length < minLength || fuerza.contains.length < 4 || !["Medium","Strong"].includes(fuerza.value) )){
        errMsg = "La contraseña debe estar compuesta de mayúsculas, minúsculas, números y símbolos, con una longitud mínima de 8 caracteres.";
        error = true;
    }

    if (error){
        sendMessage("error", "Cambio de Contraseña", errMsg);
        return;
    }

    let record = {
        username,
        password_old,
        password_new
    };

    metodo = "POST";
    url = "cambioclave";

    await consumirApiWT(metodo, url, record)
        .then(resp => {
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}
            
            if (resp.status && resp.status == 'error') {
                sendMessage("error", "Autorizacion", resp.message)
            } else {
                sendMessage("success", "Autorizacion", resp.message)
                setTimeout(function(){
                    window.location.reload();
                },2000);
            }
        })
        .catch(err => {
            console.log(err);
            // sendMessage(err, "{{Title}}");
        });
}

$("#btnReturn").on("click", () => {
    let pagina = `src/Views/login/login.php`;
    $("#mainPage").load(pagina);
});

$("#username").keypress(function($event){
    if ($event.keyCode == 13){
        $("#password_old").focus();
    }
});
$("#password_old").keypress(function($event){
    if ($event.keyCode == 13){
        $("#password_new").focus();
    }
});
$("#password_new").keypress(function($event){
    if ($event.keyCode == 13){
        $("#password_confirmacion").focus();
    }
});
$("#password_confirmacion").keypress(function($event){
    if ($event.keyCode == 13){
        cambiarPass();
    }
});