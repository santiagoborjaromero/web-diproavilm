ruta = JSON.parse(sessionGet("current_route"));
title = ruta.name;
$("#Title").html(title);
$("#TitleIcon").addClass(ruta.icon);

console.log("Cargando")
goDash();

function goDash() {
    let url_grafana = `https://app.powerbi.com/view?r=eyJrIjoiMzVmMjE0NjMtNzJiMy00OTRhLWE0ZmUtNjRjOGE4OWIwYjA0IiwidCI6ImIyNDhlMTU2LTI0NTAtNGQyYS05ZjdmLWVlNTc4ZmFmOWIxZCIsImMiOjR9`;
    console.log(url_grafana);
    $("#grafana").attr("src", url_grafana);
}

