<div class="container-fluid">
    <div class="row">
        <div class="d-none d-md-block col-md-3  imagenGranja"></div>
        <div class="col-12 col-md-9 texto mt-3">
            <div class="col-12 col-md-7">
                <h3 class="special t20 bold" id="nameApp"></h3>
                <span id="versionApp"></span>
                <br>
                <h4>Establecer Contraseña</h4>
                Debe establecer una clave para su usuario 
                <br>
                <div class="row">
                    <div class="col-12 col-md-6 mt-3">
                        <label for="" class="form-label bold">Usuario</label>
                        <input type="text" class="form-control text-centerxx" id="username" name="username" placeholder="Nombre de Usuario"/>
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
                        <button id="btnEstablecer" class="btn btn-info btn-block">Establecer contraseña</button>
                        <div class="row">
                            <div class="col-6">
                                <!-- <button id="btnForgot" class="btn btn-link t12">¿Olvidó la constraseña?</button> -->
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
</div>

<script src="src/Views/establecerclave/establecerclave.js"></script>
<link rel="stylesheet" href="src/Views/establecerclave/establecerclave.css">