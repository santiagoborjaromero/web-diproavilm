
$("#nameApp").html(config.appname);
$("#versionApp").html(config.version);


$("#btnLogin").on("click", async function(){
    sendLogin();
});

async function sendLogin(){
    //Validacion
    let username = $.trim($("#username").val());
    let password = $.trim($("#password").val());

    let error = false;
    let errMsg = "";

    if (!error && username == ""){
        errMsg = "Debe ingresar el nombre del usuario";
        error = true;
    }

    if (!error && password == ""){
        errMsg = "Debe ingresar la contraseña del usuario";
        error = true;
    }

    if (error){
        // console.log(errMsg)
        sendMessage("error", "Autorizacion", errMsg);
        return;
    }

    let record = {
        username: username,
        password: password
    };

    metodo = "POST";
    url = "login";

    await consumirApiWT(metodo, url, record)
        .then(resp => {
            try {
                resp = JSON.parse(resp);
            } catch (ex) {
            }

            // console.log(resp)

            if (resp.status && resp.status == 'error') {
                sessionSet("logged", false);
                sessionSet("user", "");
                sessionSet("token", "");

                if (resp.message == "establecer clave"){
                    sendMessage("error", "Autorizacion", "Debe establecer una clave para su usuario")
                    setTimeout(function(){
                        let pagina = `src/Views/establecerclave/establecerclave.php`;
                        $("#mainPage").load(pagina);
                    }, 3000);

                } else { 
                    sendMessage("error", "Autorizacion", resp.message)
                }
                
            } else {
                data = resp.message[0];
                // console.log(data)
                apiToken = data.token;
                sessionSet("user", data);
                sessionSet("token", apiToken);
                sessionSet("logged", true);
                window.location.reload();
            }
        })
        .catch(err => {
            console.log(err);
            // sendMessage(err, "{{Title}}");
        });
    

}


$("#btnChange").on("click", () => {
    let pagina = `src/Views/change/change.php`;
    $("#mainPage").load(pagina);
});


$("#username").keypress(function ($event) {
    if ($event.keyCode==13){
        $("#password").focus();
    }
});

$("#password").keypress(function ($event) {
    if ($event.keyCode==13){
        sendLogin();
    }
});

