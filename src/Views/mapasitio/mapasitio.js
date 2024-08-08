
title = "Mapa del Sitio";
$("#TitleIcon").addClass("far fa-map");
$("#Title").html(title);

showMenu();

function showMenu(){
    // console.log(lstMenu)
    let html ="<ul class='list-group'>";

    lstMenu.forEach( m => {

        html += `<li class="list-group-item"> <i class="${m.icon} mr-2"></i> <b class="text-primary">${m.name}</b>`;
        html += `<ul>`;

        m.child.forEach( c => {
            html += `<li> 
                <a class="text-secondary" onclick="selectRuta('${c.route}')" href="javascript: void(0)">
                    <i class="${c.icon} mr-2"></i> <span>${c.name}</span>
                </a>
            </li>`;
        });

        html += `</ul>`;
        html += `</li>`;

    });
    
    html += `</ul>`;

    $("#Tree").html(html);
}
