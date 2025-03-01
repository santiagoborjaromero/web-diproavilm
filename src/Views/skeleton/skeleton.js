//TODO: Definir variables globales para el sistema


let user = sessionGet("user");
let menu = user.menu;
apiToken = sessionGet("token");
scopeUser = user.role[0].scope;
let permisosLectura = true;
let permisosEscritura = true;
let permisosBorrado = true;
let mensajeNoPermisoLectura = "No tiene los permisos para acceder a este recurso, contacte con el administrador.";
if (!scopeUser.includes("R")) permisosLectura = false;
if (!scopeUser.includes("W")) permisosEscritura = false;
if (!scopeUser.includes("D")) permisosBorrado = false;
$("#nameApp").html(config.appname);
$("#versionApp").html(config.version);
$("#nombreUsuario").html(user.fullname);
$("#inicialUsuario").html((user.username).substring(0,1));

cargaMenu();

//TODO: Carga menu de opciones que viene en los datos del usuario cuando se hace un login
function cargaMenu(){
    lstMenu = [];
    let html = `<ul class="nav nav-pills">`;
    let html2 = ``;


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
            html2 = `
                <a href="javascript:void(0)" onclick="selectRuta('${e.route}')">
                    <i class="${e.icon} mr-2 text-secondary"></i><span> ${e.name}</span>
                </a>`;
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

            html2 += `<i class="${e.icon} mr-2 text-secondary"></i><span class="bold">${e.name}</span><br>`;


            e.child.forEach(c => {
                html += `<li>
                    <a class="dropdown-item" href="javascript: void(0)" onclick="selectRuta('${c.route}')">
                        <i class="${c.icon} mr-2 text-secondary t12"></i><span>${c.name}</span>
                    </a>
                </li>`;

                html2 += `
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a class="item-menu" href="javascript: void(0)" onclick="selectRuta('${c.route}')">
                        <i class="${c.icon} mr-2 text-secondary t12"></i><span>${c.name}</span>
                    </a><br>
                `;
            });
            html +=`</ul></li>`;

            
        }
    });

    html += `</ul>`;

    $("#divmenu").html(html);
    $("#menuAux").html(html2);
    
}

$("#btnSalir").on("click", function(){
    Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        icon: 'question',
        title: config.appname,
        text: `Desea salir del sistema`,
        showCancelButton: true,
        confirmButtonColor: '#f63c3a',
        confirmButtonText: "Salir",
        cancelButtonColor: '#33a0d6',
        cancelButtonText: 'Cancelar',
    }).then(res => {
        if (res.isConfirmed) {
            proccessCleanMemory();
            window.location.reload();
        }
    });
});

function showMenu(){
    $("#MenuAuxDiv").removeClass("hide");
}

$(".closebtn").on("click", function(){
    $("#MenuAuxDiv").addClass("hide");
});


