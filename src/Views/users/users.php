<div class="row bg-gray-lights p-2 border-down">
    <div class="col-12 col-md-6  mt-1">
        <span>
            <i class="fa fa-users mr-2 box"></i>
            <span class="t20">
                <?php echo $title; ?>
            </span>
        </span>
    </div>
    <div class="col-12  col-md-6 text-end">
        <button id="btmNew" class="btn btn-primary mr-1">
            <i class="fa fa-plus"></i>
            Nuevo
        </button>
        <button id="btmEdit" class="btn btn-info mr-1">
            <i class="far fa-edit"></i>
            Editar
        </button>
        <button id="btmDelete" class="btn btn-danger mr-1">
            <i class="far fa-trash-alt"></i>
            Eliminar
        </button>
        <button id="btmRefresh" class="btn btn-success mr-2">
            <i class="fas fa-sync-alt"></i>
            Refrescar
        </button>
    </div>
</div>

<div class="row mt-2">
    <div class="col-12">
        <div id="myGrid" class="ag-theme-quartz" style="height: 500px; min-height: 500px;"></div>
    </div>
</div>



<div id="form" class="hide">
    <div class="row mb-2">
        <label class="col-12 col-md-3 label-control text-end">Usuario</label>
        <div class="col-12 col-md-9">
            <input class="form-control" type="hidden" id="iduser" value="">
            <input class="form-control" type="text" id="username" placeholder="Ingrese el usuario">
        </div>
    </div>
    <div class="row mb-2">
        <label class="col-12 col-md-3 label-control text-end">Nombre completo</label>
        <div class="col-12 col-md-9">
            <input class=" form-control" type="text" id="fullname" placeholder="Ingrese el nombre completo">
        </div>
    </div>
    <div class="row mb-2">
        <label class="col-12 col-md-3 label-control text-end">Rol</label>
        <div class="col-12 col-md-9">
            <select id="rol" class="form-control"></select>
        </div>
    </div>
    <div class="row mb-2">
        <label class="col-12 col-md-3 label-control text-end">Idioma</label>
        <div class="col-12 col-md-9">
            <select id="idioma" class="form-control">
                <option selected value="es">Español</option>
            </select>
        </div>
    </div>
    <div class="row mb-5">
        <label class="col-12 col-md-3 label-control text-end">Estado</label>
        <div class="col-12 col-md-9">
            <select id="status" class="form-control">
                <option selected value="1">Activo</option>
                <option value="0">Inactivo</option>
            </select>
        </div>
    </div>
    <div class="row mb-2 text-end">
        <div class="col-12">
            <button id="btmSave" class="btn btn-primary mr-2">
                <i class="fas fa-save mr-2"></i>
                Guardar
            </button>
            <button id="btmCancel" class="btn btn-danger">
                <i class="fas fa-reply mr-2"></i>
                Cancelar
            </button>
        </div>
    </div>
</div>


<script src="src/Views/users/users.js"></script>
<link rel="stylesheet" href="src/Views/users/users.css">



