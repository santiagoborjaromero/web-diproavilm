<div class="container-fluid">
    <div class="row p-1 header">
        <div class="col-6 col-sm-4 col-md-3 logohead"><img id="logo" src="logo.png" alt="Logo" /></div>
        <div class="col-6 col-sm-4 col-md-6 t25 mt-3 text-center" id="nameApp"></div>
        <div class="col-6 col-sm-4 col-md-3 text-end diviconos">
            <!-- <button id="btnNot" class="btn btn-white t20 text-secondary bold" title="Notificaciones"><i class="fa fa-bell"></i></button> -->
            <button id="btnUserInfo" onclick="selectRuta('userinfo')" class="btn btn-white  text-secondary bold" title="Informacion del Usuario">
                <!-- <i class="fas fa-user t20"></i> <span id="nombreUsuario"></span> -->
                <span id="inicialUsuario"></span>  <span id="nombreUsuario"></span> 
            </button>
            <button id="btnSalir" class="btn btn-white t20 text-danger bold" title="Salir del Sistema"><i class="fas fa-power-off"></i></button>
        </div>
    </div>
    <div class="row menu">
        <div class="col-12 col-md-12" id="divmenu"></div>
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

<script src="src/Views/skeleton/skeleton.js"></script>
<link rel="stylesheet" href="src/Views/skeleton/skeleton.css">