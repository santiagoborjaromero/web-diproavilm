<div class="row bg-gray-lights p-2 border-down bg-light sticky">
    <div class="col-12 col-md-2  mt-1">
        <span>
            <i id="TitleIcon" class="mr-2 box"></i>
            <span class="t20" id="Title"></span>
        </span>
    </div>
    <div class="col-12 col-md-10 text-end" id="btmDivs">
        <span id="divW">
            <button id="btmNew" class="btn btn-primary mr-1" title="Nuevo">
                <i class="fa fa-plus"></i>
                Nuevo
            </button>
            <button id="btmReset" title="Resetear contraseña" class="btn btn-info mr-1">
                <i class="fas fa-recycle"></i>
                Restablecer 
            </button>
            <button id="btmUpUser" title="Reestablecer Usuario eliminado" class="btn btn-info mr-1">
                <i class="fas fa-user-injured"></i>
                Recuperar
            </button>
            <button id="btmEdit" class="btn btn-info mr-1" title="Editar">
                <i class="far fa-edit"></i>
                Editar
            </button>
        </span>
        <span id="divD">
            <button id="btmDelete" class="btn btn-danger mr-1" title="Eliminar">
                <i class="far fa-trash-alt"></i>
                Eliminar
            </button>
        </span>
        <button id="btmRefresh" class="btn btn-success mr-2" title="Refrescar">
            <i class="fas fa-sync-alt"></i>
            Refrescar
        </button>
        <button id="btmSave" class="btn btn-primary mr-2 hide" title="Guardar">
            <i class="fas fa-save"></i>
            Guardar
        </button>
        <button id="btmCancel" class="btn btn-danger mr-2 hide">
            <i class="fas fa-reply"></i>
            Cancelar
        </button>

        <div class="btn-group"  id="btnPrint">
            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-print"></i>
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" id="PDF" href="javascript:void(0)">Exportar PDF</a></li>
                <li><a class="dropdown-item" id="CSV" href="javascript:void(0)">Exportar CSV</a></li>
                <!-- <li><a class="dropdown-item" href="#">Something else here</a></li>
                <li>
                    <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="#">Separated link</a></li> -->
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


<script src="src/Views/users/users.js"></script>
<link rel="stylesheet" href="src/Views/users/users.css">