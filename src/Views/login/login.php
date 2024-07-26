<?php

if (isset($_POST[""]))


?>
<div class="login-container">
    <div class="text-center">
        <div class="mb-3">
            <h3>Software de Gestión de Almacén</h3>
            Ingrese su usuario y clave personal para continuar
        </div>
        <div class="login-screen text-center">
            <div class="mb-3">
                <label for="" class="form-label">Usuario</label>
                <input type="text" class="form-control text-center" id="username" name="username" placeholder="Nombre de Usuario"/>
            </div>
            <div class="mb-3">
                <label for="" class="form-label">Constraseña</label>
                <input type="password" class="form-control text-center" id="password" name="password" placeholder="*********"/>
            </div>
            <div class="mb-3">
                <button id="btnLogin" class="btn btn-primary btn-block">Ingresar</button>
            </div>
        </div>
        <div class="mt-3">
            <small>Derechos de Copia &copy;, DIPROAVILM Cia. Ltda., 2024</small><br>
            <sub class="text-success">Power by </sub>
            <img src="/logo.png">
        </div>
    </div>
</div>

<script src="/src/Views/login/login.js"></script>
