<!-- <div class="contenedor">
    <div class="divmenu" id="divmenu">
        menu
    </div>
    <div class="divcuerpo" id="divbody">
        cuerpo
    </div>
</div> -->


<div class="container-fluid">
    <div class="row p-1 header">
        <div class="col-12 col-md-2 "><img src="/logo.png"></div>
        <div class="col-12 col-md-5 mt-3 bold t18">SGA - Software de Gestión de Almacén</div>
        <div class="col-12 col-md-5 text-end diviconos">
            <button id="btnNot" class="btn btn-link t20 text-secondary bold" title="Notificaciones"><i class="fa fa-bell"></i></button>
            <button id="btnUserInfo" class="btn btn-link t20 text-secondary bold" title="Informacion del Usuario"><i class="fas fa-user"></i></button>
            <button id="btnSalir" class="btn btn-link t20 text-danger bold" title="Salir del Sistema"><i class="fas fa-power-off"></i></button>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-12 menu" id="divmenu"></div>
    </div>
    <div class="row">
        <div class="col-12 col-md-12 breadcrumbs" >
            <i class="far fa-map"></i> <span id="path" class=""></span>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-12 screen" id="divbody"></div>
    </div>
    <div class="row">
        <div class="col-12 col-md-12 footer" id="footer">
            <i class="far fa-map mr-2"></i> <span>Mapa del Sitio</span>
        </div>
    </div>
</div>


<script src="/src/Views/admin/admin.js"></script>
<link rel="stylesheet" href="/src/Views/admin/admin.css">