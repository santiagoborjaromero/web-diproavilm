<div class="row bg-gray-lights p-2 border-down bg-light sticky">
    <div class="col-12 col-md-4  mt-1">
        <span>
            <i id="TitleIcon" class="mr-2 box"></i>
            <span class="t20" id="Title"></span>
        </span>
    </div>
    <div class="col-12  col-md-8 text-end">
        <!-- 
        <button id="btmRefresh" class="btn btn-success mr-2" title="Refrescar">
            <i class="fas fa-sync-alt"></i>
            Refrescar
        </button>
        <button id="btmSave" class="btn btn-primary mr-2" title="Guardar">
            <i class="fas fa-save"></i>
            Guardar
        </button> 
    -->
    </div>
</div>

<div class="row justify-content-md-center" id="FormDiv">
    <div class="col-12 col-md-6 userdiv">
        <div class="shadow-sm p-3 mb-5 bg-body rounded">
            <div class="user-card ">
                <div class="userimage">
                    <div class="imagen-user bg-success justify-content-md-center">
                        <i class="fas fa-user-shield t50"></i>
                    </div>
                    <br>
                    <span id="nombre">Usuario Apellido</span> <br>
                    <span id="rol" class="text-success">Administrador General</span>
                    <br><br>
                </div>

                <div class="userbody rounded">
                    <div class="row justify-content-center">
                        <div class="col-8">
                            <div class="row p-2">
                                <div class="col-12 col-md-6 mt-3">
                                    <input class="form-control" type="hidden" id="iduser" value="">
                                    <label for="" class="form-label bold">Usuario </label>
                                    <input disabled type="text" class="form-control text-centerxx" id="username" name="username" placeholder="Nombre de Usuario" />
                                </div>
                                <div class="col-12 col-md-6 mt-3">
                                    <label for="" class="form-label bold">Contraseña anterior <sup class="text-danger" title="Requerido">*</sup></label>
                                    <input type="password" class="form-control text-centerxx" id="password_old" name="password_old" placeholder="*********" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-md-6 mt-3">
                                    <label for="" class="form-label bold">Contraseña nueva <sup class="text-danger" title="Requerido">*</sup></label>
                                    <input type="password" class="form-control text-centerxx" id="password_new" name="password_new" placeholder="*********" />
                                </div>
                                <div class="col-12 col-md-6 mt-3">
                                    <label for="" class="form-label bold">Contraseña confirmación <sup class="text-danger" title="Requerido">*</sup></label>
                                    <input type="password" class="form-control text-centerxx" id="password_confirmacion" name="password_confirmacion" placeholder="*********" />
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div id="fortalezaPassword" class="ml-2 barra nivel-0"></div>
                            <div id="fortalezaPasswordDesc" class="ml-1"></div>
                        </div>
                    </div>
                    <br><br>
                    <button id="btnCambio" class="btn btn-primary mr-2" title="Change">
                        Cambiar Contraseña
                    </button> 
                    <br><br>
                </div>
            </div>
        </div>

    </div>
</div>



<!-- Formulario -->


<script src="src/Views/userinfo/userinfo.js"></script>
<link rel="stylesheet" href="src/Views/userinfo/userinfo.css">