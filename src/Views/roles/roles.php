<div class="row bg-gray-lights p-2 border-down">
    <div class="col-12 col-md-4  mt-1">
        <span>
            <i class="fas fa-shield-alt mr-2 box"></i>
            <span class="t20" id="Title">
                <?php echo $title; ?>
            </span>
        </span>
    </div>
    <div class="col-12  col-md-8 text-end">
        <button id="btmNew" class="btn btn-primary mr-1" title="Nuevo">
            <i class="fa fa-plus"></i>
            Nuevo
        </button>
        <button id="btmEdit" class="btn btn-info mr-1" title="Editar">
            <i class="far fa-edit"></i>
            Editar
        </button>
        <button id="btmDelete" class="btn btn-danger mr-1" title="Eliminar">
            <i class="far fa-trash-alt"></i>
            Eliminar
        </button>
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
    </div>
</div>

<div class="row mt-2 justify-content-md-center" id="GridDiv">
    <div class="col-12 col-md-11 align-items-center">
        <div id="myGrid" class="ag-theme-quartz text-dark-400" style="height: 500px; min-height: 500px;"></div>
    </div>
</div>


<!-- Formulario -->
<div id="FormDiv" class="hide">
    <div class="row mb-2">
        <label class="col-12 col-md-3 label-control text-end">Nombre del rol</label>
        <div class="col-12 col-md-3">
            <input class="form-control" type="hidden" id="idrole" value="">
            <input class="form-control" type="text" id="name" keypress="keypress" placeholder="Nombre del rol">
        </div>
        <!-- <div class="col-6 col-md-1 text-start">
            <i class="fas fa-question-circle" onclick="help('El nombre de usuario puede estar compuesto de mayúsculas, minúsculas, numeros. No se admiten símbolos, ni espacios en blanco.')"></i>
        </div> -->
    </div>
    <div class="row mb-2">
        <label class="col-12 col-md-3 label-control text-end">Permisos Generales</label>
        <div class="col-12 col-md-3">
            <input class="form-check-input" type="checkbox"  id="scope_r">
            <label class="form-check-label" for="scope_r"> Lectura </label> <br>

            <input class="form-check-input" type="checkbox"  id="scope_w">
            <label class="form-check-label" for="scope_w"> Escritura </label> <br>

            <input class="form-check-input" type="checkbox"  id="scope_d">
            <label class="form-check-label" for="scope_d"> Borrado </label> <br>

            <!-- <input type="checkbox" class="input-switch" id="scope_r" /> Lectura <br> -->
            <!-- <input type="checkbox" class="input-switch" id="scope_w" /> Escritura <br>
            <input type="checkbox" class="input-switch" id="scope_d" /> Eliminado -->
        </div>
    </div>
    <div class="row mb-5">
        <label class="col-12 col-md-3 label-control text-end">Estado</label>
        <div class="col-12 col-md-3">
            <select id="status" class="form-control">
                <option selected value="1">Activo</option>
                <option value="0">Inactivo</option>
            </select>
        </div>
    </div>
</div>


<script src="src/Views/roles/roles.js"></script>
<link rel="stylesheet" href="src/Views/roles/roles.css">



