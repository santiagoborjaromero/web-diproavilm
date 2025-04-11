<div class="imagenGranja"></div>
<div class="bbody">
    <div class="login-form">
        <div class="row">
            <div class="col-12 text-start pull-left" >
                <button id="btnReturn" class="btn btn-light t11 ">
                    <i class="fas fa-chevron-left"></i> Retornar a login
                </button>
            </div>
        </div>
        <img src="assets/images/logo.jpg" alt="Diproavilm" width="120">
        <h2 class="specialXX t20 bold" id="nameApp"></h2>
        <strong>
            <sup id="versionApp"></sup>
        </strong>
        <br>
        <h4>Cambio de Contraseña</h4>

        <div class="boton-horizontal text-center">
            <div class="form-group m-1">
                <label for="" class="form-label bold t10">Usuario</label>
                <input type="text" class="form-control text-center " id="username" name="username" placeholder="Nombre de Usuario"/>
            </div>
            <div class="form-group m-1">
                <label for="" class="form-label bold t10">Contraseña anterior</label>
                <input type="password" class="form-control text-center " id="password_old" name="password_old" placeholder="*********"/>
            </div>
        </div>
            
        <div class="boton-horizontal text-center">
            <div class="form-group m-1">
            <label for="" class="form-label bold t10">Contraseña nueva</label>
                <input type="password" class="form-control text-center " id="password_new" name="password_new" placeholder="*********"/>
    
            </div>
            <div class="form-group m-1">
                <label for="" class="form-label bold t10">Contraseña confirmación</label>
                <input type="password" class="form-control text-center " id="password_confirmacion" name="password_confirmacion" placeholder="*********"/>
            </div>
        </div>
        
        <br>
        <button id="btnCambio" class="btn btn-primary btn-block">Cambiar contraseña</button>
        <br>
        <br>
        <div>
            <div id="fortalezaPassword" class="ml-2 barra nivel-0"></div>
            <div id="fortalezaPasswordDesc" class="ml-1"></div>
        </div>


        <br>
        <small>Derechos de Copia &copy;, DIPROAVILM Cia. Ltda., 2024</small><br>
        <sub class="text-secondary bold">Power by </sub>
        <img src="logo7AG8.jpg" width="80">
    </div>
</div>


<!-- <div class="container-fluid">
    <div class="row">
        <div class="d-none d-md-block col-md-3  imagenGranja"></div>
        <div class="col-12 col-md-9 texto mt-3">
            <div class="col-12 col-md-7">
                <h3 class="special t20 bold" id="nameApp"></h3>
                <span id="versionApp"></span>
                <br>
                <h4>Cambio de Contraseña</h4>
                <br>
                <div class="row">
                    <div class="col-12 col-md-6 mt-3">
                        <label for="" class="form-label bold">Usuario</label>
                        <input type="text" class="form-control text-centerxx" id="username" name="username" placeholder="Nombre de Usuario"/>
                    </div>
                    <div class="col-12 col-md-6 mt-3">
                        <label for="" class="form-label bold">Contraseña anterior</label>
                        <input type="password" class="form-control text-centerxx" id="password_old" name="password_old" placeholder="*********"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-6 mt-3">
                        <label for="" class="form-label bold">Contraseña nueva</label>
                        <input type="password" class="form-control text-centerxx" id="password_new" name="password_new" placeholder="*********"/>
                        <div id="fortalezaPassword" class="ml-2 barra nivel-0"></div>
                        <div id="fortalezaPasswordDesc" class="ml-1"></div>
                    </div>
                    <div class="col-12 col-md-6 mt-3">
                        <label for="" class="form-label bold">Contraseña confirmación</label>
                        <input type="password" class="form-control text-centerxx" id="password_confirmacion" name="password_confirmacion" placeholder="*********"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-12 mt-3">
                        <button id="btnCambio" class="btn btn-info btn-block">Cambiar contraseña</button>
                        <div class="row">
                            <div class="col-6">
                            </div>
                            <div class="col-6 text-end">
                                <button id="btnReturn" class="btn btn-link t12">Retorno a Login</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <br>
                <br>
                <small>Derechos de Copia &copy;, DIPROAVILM Cia. Ltda., 2024</small><br>
                <br>
                <sub class="text-secondary bold">Power by </sub>
                <img src="logo.png" width="150">

            </div>
        </div>
    </div>
</div> -->

<script src="src/Views/change/change.js"></script>
<link rel="stylesheet" href="src/Views/change/change.css">