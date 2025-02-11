ruta = JSON.parse(sessionGet("current_route"));
title = ruta.name;
$("#Title").html(title);
$("#TitleIcon").addClass(ruta.icon);

goDash();

function goDash() {
    let url_grafana = `https://app.powerbi.com/view?r=eyJrIjoiNmNkMTk0ODEtYjVjMi00ODUzLWIzZmMtMjcxODA2YzMxODZiIiwidCI6ImIyNDhlMTU2LTI0NTAtNGQyYS05ZjdmLWVlNTc4ZmFmOWIxZCIsImMiOjR9`;
    console.log(url_grafana);
    $("#grafana").attr("src", url_grafana);
}

