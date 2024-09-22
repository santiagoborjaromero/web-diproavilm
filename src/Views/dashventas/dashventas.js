ruta = JSON.parse(sessionGet("current_route"));
title = ruta.name;
$("#Title").html(title);
$("#TitleIcon").addClass(ruta.icon);

goDash();

function goDash() {
    let url_grafana;
    // url_grafana = `https://app.powerbi.com/view?r=eyJrIjoiYzRjOWUxZWYtOGQ0NC00MDRmLWE3MjEtMGU2ZDEzNDVjOGI4IiwidCI6ImIyNDhlMTU2LTI0NTAtNGQyYS05ZjdmLWVlNTc4ZmFmOWIxZCIsImMiOjR9`;
    url_grafana = `https://app.powerbi.com/view?r=eyJrIjoiMzVmMjE0NjMtNzJiMy00OTRhLWE0ZmUtNjRjOGE4OWIwYjA0IiwidCI6ImIyNDhlMTU2LTI0NTAtNGQyYS05ZjdmLWVlNTc4ZmFmOWIxZCIsImMiOjR9`;
    console.log(url_grafana);
    $("#grafana").attr("src", url_grafana);
}
