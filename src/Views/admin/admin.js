let user = sessionGet("user");
let menu = user.menu;
apiToken = sessionGet("token");
scopeUser = user.role[0].scope;

$("#nameApp").html(config.appname);
$("#versionApp").html(config.version);
$("#nombreUsuario").html(user.fullname);

cargaMenu();

function cargaMenu(){
    lstMenu = [];
    let html = `<ul class="nav nav-pills">`;

    menu.forEach( e => {
        e["child"] = [];

        if ( e.order.length == 2){
            lstMenu.push(e);
        } else {
            lstMenu.forEach( l => {
                if (l.order == e.order.substring(0,2) ){
                    l["child"].push(e)
                }
            })
        }
    });

    lstMenu.forEach( e => {
        if (e.child.length == 0){
            html += `
            <li class="nav-item ">
                <a class="nav-link" onclick="selectRuta('${e.route}')" href="javascript: void(0)">
                    <i class="${e.icon} mr-2 text-secondary"></i><span>${e.name}</span>
                </a>
            </li>`;
        } else{
            html += `
                <li class="nav-item dropdown ">
                    <a class="nav-link dropdown-toggle" 
                        data-bs-toggle="dropdown"    
                        href="javascript: void(0)">
                        <i class="${e.icon} mr-2 text-secondary"></i><span>${e.name}</span>
                    </a>
                    <ul class="dropdown-menu">
                `;
            e.child.forEach(c => {
                html += `<li>
                    <a class="dropdown-item" href="javascript: void(0)" onclick="selectRuta('${c.route}')">
                        <i class="${c.icon} mr-2 text-secondary t12"></i><span>${c.name}</span>
                    </a>
                </li>`
            });
            html +=`</ul></li>`;
        }
    });

    html += `</ul>`;

    $("#divmenu").html(html);
    
}

$("#btnSalir").on("click", function(){
    proccessCleanMemory();
    window.location.reload();
});


