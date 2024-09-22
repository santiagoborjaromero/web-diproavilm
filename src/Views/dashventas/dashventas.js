ruta = JSON.parse(sessionGet("current_route"));
title = ruta.name;
$("#Title").html(title);
$("#TitleIcon").addClass(ruta.icon);

goDash();
// init();

function goDash() {
    let url_grafana;
    // url_grafana = `https://app.powerbi.com/view?r=eyJrIjoiYzRjOWUxZWYtOGQ0NC00MDRmLWE3MjEtMGU2ZDEzNDVjOGI4IiwidCI6ImIyNDhlMTU2LTI0NTAtNGQyYS05ZjdmLWVlNTc4ZmFmOWIxZCIsImMiOjR9`;
    url_grafana = `https://app.powerbi.com/view?r=eyJrIjoiMzVmMjE0NjMtNzJiMy00OTRhLWE0ZmUtNjRjOGE4OWIwYjA0IiwidCI6ImIyNDhlMTU2LTI0NTAtNGQyYS05ZjdmLWVlNTc4ZmFmOWIxZCIsImMiOjR9`;
    console.log(url_grafana);
    $("#grafana").attr("src", url_grafana);
}

// function init(){
//     const ctx = document.getElementById('myChart');

//     new Chart(ctx, {
//         type: 'bar',
//         data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             borderWidth: 1
//         }]
//         },
//         options: {
//         scales: {
//             y: {
//             beginAtZero: true
//             }
//         }
//         }
//     });
// }