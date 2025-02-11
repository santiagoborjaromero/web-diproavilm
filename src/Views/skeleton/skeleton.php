<div class="container-fluid">
    <div class="row p-1 header">
        <div class="d-none d-lg-block col-lg-3 logohead"><img id="logo" src="logo.jpg" alt="Logo" width="80"/> Diproavilm Cia. Ltda.</div>
        <div class="d-none d-lg-block col-lg-6 t25 mt-3 text-center" id="nameApp"></div>
        <div class="col-12 col-lg-3 text-end diviconos">
            <button id="btnNot" onclick="selectRuta('noti')" class="btn btn-white t20 text-danger bold hide parpadeaXX" title="Alertas & Notificaciones">
                <i class="fa fa-bell"></i>
                <badge id="numNoti">0</badge>
            </button>
            <button id="btnUserInfo" onclick="selectRuta('userinfo')" class="btn btn-white text-secondary bold" title="Informacion del Usuario">
                <!-- <i class="fas fa-user t20"></i> <span id="nombreUsuario"></span> -->
                <span id="inicialUsuario"></span>  <span id="nombreUsuario"></span> 
            </button>
            <button id="btnSalir" class="btn btn-white t20 text-danger bold" title="Salir del Sistema"><i class="fas fa-power-off"></i></button>
        </div>
    </div>
    <div class="row menu">
        <div class="d-none d-md-block col-md-12" id="divmenu"></div>
        <div class="col-12 d-ls-none " id="divmenus">
            <i onclick="showMenu()" class="fa fa-bars mt-2 cursor bold" alt="Menu Principal"></i>
        </div>
    </div>
    <div class="row ">
        <div class="col-12 col-md-12 breadcrumbs bg-light">
            <i class="far fa-map"></i> <span id="path" class=""></span>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-12 screen" id="divbody"></div>
    </div>
    <div class="row">
        <div class="col-12 col-md-12 footer" id="footer">
            <span class="t14" id="versionApp"></span> &nbsp;&nbsp; | &nbsp;&nbsp;
            <a class="text-white" onclick="selectRuta('mapasitio')" href="javascript: void(0)">
                <i class="far fa-map mr-2"></i> <span>Mapa del Sitio</span>
            </a>
        </div>
    </div>
</div>

<div id="MenuAuxDiv" class="menuaux p-3 hide">
    <h5>Menu de Opciones</h5>
    <span class="closebtn"><i class="fa fa-times"></i></span>
    <div id="menuAux">
        
    </div>
</div>



<script src="src/Views/skeleton/skeleton.js"></script>
<link rel="stylesheet" href="src/Views/skeleton/skeleton.css">