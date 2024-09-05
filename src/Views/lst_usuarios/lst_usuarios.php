<div class="row bg-gray-lights p-2 border-down bg-light sticky">
    <div class="col-12 col-md-4  mt-1">
        <span>
            <i id="TitleIcon" class="mr-2 box"></i>
            <span class="t20" id="Title"></span>
        </span>
    </div>
    <div class="col-12 col-md-8 text-end" id="btmDivs">
        <button id="btmRefresh" class="btn btn-success mr-2" title="Refrescar">
            <i class="fas fa-sync-alt"></i>
            Refrescar
        </button>
        <div class="btn-group">
            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-print"></i> Exportar
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" id="PDF" href="javascript:void(0)">Exportar PDF</a></li>
                <li><a class="dropdown-item" id="CSV" href="javascript:void(0)">Exportar CSV</a></li>
            </ul>
        </div>

    </div>
</div>

<div class="row mt-2 justify-content-md-center">
    <div class="col-12 col-md-11 align-items-center" id="GridDiv">
        <div id="myGrid" class="ag-theme-quartz text-dark-400" style="height: 500px; min-height: 500px;"></div>
    </div>
</div>

<!-- Formulario -->
<div class="row justify-content-md-center hide" id="FormDiv">
    <div class="col-12 col-md-11 align-items-center bg-white round-10">
        <div class="row mt-5 mb-2">
            <label class="col-12 col-md-3 control-label text-end">Usuario <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-3">
                <input class="form-control" type="hidden" id="iduser" value="">
                <input class="form-control" type="text" id="username" placeholder="Ingrese el usuario">
            </div>
            <div class="col-6 col-md-1 text-start t18">
                <i class="fas fa-question-circle " onclick="help('El nombre de usuario puede estar compuesto de mayúsculas, minúsculas, numeros. No se admiten símbolos, ni espacios en blanco.')"></i>
            </div>
        </div>
        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Nombre completo <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-3">
                <input class=" form-control" type="text" id="fullname" placeholder="Ingrese el nombre completo">
            </div>
        </div>
        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Rol <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-3">
                <select id="idrole" class="form-control">
                    <option selected value="-">-- Seleccione un Rol -- </option>
                </select>
            </div>
        </div>
        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Idioma <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-3">
                <select id="lang" class="form-control">
                    <option selected value="es">Español</option>
                </select>
            </div>
        </div>
        <div class="row mb-5">
            <label class="col-12 col-md-3 control-label text-end">Estado <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-3">
                <select id="status" class="form-control">
                    <option selected value="1">Activo</option>
                    <option value="0">Inactivo</option>
                </select>
            </div>
            <div class="col-6 col-md-1 text-start t18">
                <i class="fas fa-question-circle " onclick="help('El estado indica si un usuario puede ingresar al sistena (activo) o no(inactivo).')"></i>
            </div>
        </div>


    </div>
</div>


<script src="src/Views/lst_usuarios/lst_usuarios.js"></script>
<link rel="stylesheet" href="src/Views/lst_usuarios/lst_usuarios.css">