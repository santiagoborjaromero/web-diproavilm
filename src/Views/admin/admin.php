<div class="container-fluid">
    <div class="row p-1 header">
        <div class="col-12 col-md-2 "><img src="logo.png"></div>
        <div class="col-12 col-md-5 special t20 mt-3 " id="nameApp"></div>
        <div class="col-12 col-md-5 text-end diviconos">
            <button id="btnNot" class="btn btn-white t20 text-secondary bold" title="Notificaciones"><i class="fa fa-bell"></i></button>
            <button id="btnUserInfo" class="btn btn-white  text-secondary bold" title="Informacion del Usuario"><i class="fas fa-user t20"></i> <span id="nombreUsuario"></span></button>
            <button id="btnSalir" class="btn btn-white t20 text-danger bold" title="Salir del Sistema"><i class="fas fa-power-off"></i></button>
        </div>
    </div>
    <div class="row menu">
        <div class="col-12 col-md-12 menuXXX" id="divmenu"></div>
    </div>
    <div class="row">
        <div class="col-12 col-md-12 breadcrumbs">
            <i class="far fa-map"></i> <span id="path" class=""></span>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-12 screen" id="divbody"></div>
    </div>
    <div class="row">
        <div class="col-12 col-md-12 footer" id="footer">
            <span class="t14" id="versionApp"></span> &nbsp;&nbsp; | &nbsp;&nbsp;
            <i class="far fa-map mr-2"></i> <span>Mapa del Sitio</span>
        </div>
    </div>
</div>

<div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Modal Header</h4>
            </div>
            <div class="modal-body" id="MessagemyModal">
                <p>Some text in the modal.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>


<script src="src/Views/admin/admin.js"></script>
<link rel="stylesheet" href="src/Views/admin/admin.css">