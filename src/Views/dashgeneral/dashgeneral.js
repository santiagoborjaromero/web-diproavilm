

lstData = [];

ruta = JSON.parse(sessionGet("current_route"));
title = ruta.name;
$("#Title").html(title);
$("#TitleIcon").addClass(ruta.icon);

loadData();
// goDash();

function goDash(){
    let url_grafana;
    url_grafana = `https://app.powerbi.com/view?r=eyJrIjoiYzRjOWUxZWYtOGQ0NC00MDRmLWE3MjEtMGU2ZDEzNDVjOGI4IiwidCI6ImIyNDhlMTU2LTI0NTAtNGQyYS05ZjdmLWVlNTc4ZmFmOWIxZCIsImMiOjR9`;
    console.log(url_grafana);
    $("#grafana").attr("src", url_grafana);
}


async function loadData(params){
    showLoading("Cargando");

    let params = {
        fecha_ini: "2024-01-01",
        fecha_fin: "2024-12-31",
    }

    // habilitarBotones(false);

    let metodo = "GET";
    let url = "lstmovgeneral";
    await consumirApi(metodo, url, params)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {
                lstData = resp.message;

                // if (resp.message){
                //     resp.message.forEach( e => {
                //         e["idaudit"] = e.idaudit.toString();
                //         lstData.push(e)    
                //     });
                // }
                
                // console.log(lstAudit)

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

function buscar(){
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });
}