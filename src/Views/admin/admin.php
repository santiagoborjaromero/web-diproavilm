<div class="container-fluid">
    <div class="row p-1 header">
        <div class="col-12 col-sm-4 col-md-3 "><img src="logo.png"></div>
        <div class="col-12 col-sm-4 col-md-6 special t20 mt-3 text-center" id="nameApp"></div>
        <div class="col-12 col-sm-4 col-md-3 text-end diviconos">
            <button id="btnNot" class="btn btn-white t20 text-secondary bold" title="Notificaciones"><i class="fa fa-bell"></i></button>
            <button id="btnUserInfo" class="btn btn-white  text-secondary bold" title="Informacion del Usuario"><i class="fas fa-user t20"></i> <span id="nombreUsuario"></span></button>
            <button id="btnSalir" class="btn btn-white t20 text-danger bold" title="Salir del Sistema"><i class="fas fa-power-off"></i></button>
        </div>
    </div>
    <div class="row menu">
        <div class="col-12 col-md-12 menuXXX" id="divmenu"></div>
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

<!-- <div id="DivForm" title="Diproavilm" class="hide">
    <div class="modal-body">
        <span id="MessageDivForm"></span>
    </div>
</div> -->


<!-- <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h6>Diproavilm</h6>
            </div>
            <div class="modal-bodyasd" id="MessagemyModal">
                <p>Some text in the modal.</p>
            </div>
            <div class="modal-footer" id="MessagemyFooter">
                <button type="button" id="" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div> -->
<!-- 
<div class="modal fade" id="DivForm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h6 class="modal-title" id="staticBackdropLabel">Diproavilm</h6>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="frm">
                <div class="modal-body" id="MessageDivForm">
                

                </div>
                <div class="modal-footer">
                </div>
            </form>
        </div>
    </div>
</div> -->



<script src="src/Views/admin/admin.js"></script>
<link rel="stylesheet" href="src/Views/admin/admin.css">