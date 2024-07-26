

$("#nameApp").html(config.appname);
$("#versionApp").html(config.version);



$("#btnLogin").on("click", async function(){

    //Validacion
    let username = $.trim($("#username").val());
    let password = $.trim($("#password").val());

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

    if (!error && password == ""){
        errMsg = "Debe ingresar la contraseña del usuario";
        error = true;
    }


    if (error){
        console.log(errMsg)
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

            if (resp.status && resp.status == 'error') {
                sessionSet("logged", false);
                sessionSet("user", "");
                sessionSet("token", "");
                // sendMessage(resp.message ?? resp, "{{Title}}", "error");
                // console.log("Error", resp.message )
 
                swal({
                    title: "Autorizacion",
                    text: resp.message,
                    icon: "error",
                });
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
    

});