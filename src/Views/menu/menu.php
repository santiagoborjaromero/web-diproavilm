<div class="row bg-gray-lights p-2 border-down bg-light sticky">
    <div class="col-12 col-md-4  mt-1">
        <span>
            <i id="TitleIcon" class="mr-2 box"></i>
            <span class="t20" id="Title"></span>
        </span>
    </div>
    <div class="col-12  col-md-8 text-end">
        <span id="divW">
            <!-- <button id="btmUpLevel" class="btn btn-light mr-1" title="Editar">
                <i class="fas fa-long-arrow-alt-up"></i>
                Subir Nivel
            </button>
            <button id="btmDownLevel" class="btn btn-light mr-1" title="Editar">
                <i class="fas fa-long-arrow-alt-down"></i>
                Bajar Nivel
            </button> -->
            <button id="btmNew" class="btn btn-primary mr-1" title="Nuevo">
                <i class="fa fa-plus"></i>
                Nuevo
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
    </div>
</div>

<div class="row mt-2 justify-content-md-center" id="GridDiv">
    <div class="col-12 col-md-11 align-items-center">
        <div id="myGrid" class="ag-theme-quartz text-dark-400" style="height: 500px; min-height: 500px;"></div>
    </div>
</div>


<!-- Formulario -->
<div class="row justify-content-md-center hide" id="FormDiv">
    <div class="col-12 col-md-11 align-items-center bg-white round-10">
        <div class="row mt-5 mb-2">
            <label class="col-12 col-md-3 label-control text-end">Nombre <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-3">
                <input class="form-control" type="hidden" id="idmenu" value="">
                <input class="form-control" type="text" id="name"  placeholder="Nombre del menu">
            </div>
            <div class="col-6 col-md-1 text-start">
                <i class="fas fa-question-circle" onclick="help('El nombre del menu debe ser un identificativo claro de lo que se desea mostrar, de preferencia debe ser único.')"></i>
            </div>
        </div>
        <div class="row mb-2" id="submenuDIV">
            <label class="col-12 col-md-3 label-control text-end">Es Submenu? <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-3">
                <select id="submenu" class="form-control">
                    <option value="1">Si</option>
                    <option selected  value="0">No</option>
                </select>
            </div>
        </div>
        <div class="row mb-2" id="parentDIV">
            <label class="col-12 col-md-3 label-control text-end">Quien es el padre? <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-3">
                <select id="parent" class="form-control">
                </select>
            </div>
        </div>
        <div class="row  mb-2">
            <label class="col-12 col-md-3 label-control text-end">Icono <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-3">
                <input class="form-control" type="text" id="icon" value="fa fa-cog" placeholder="fa fa-cogs">
            </div>
            <div class="col-6 col-md-3 text-start">
                <i class="fas fa-question-circle" onclick="help('El listado de iconos disponibles puede revisar en https://fontawesome.com/v5/search?q=dot&o=r&m=free.')"></i>
                <span class="ml-2" id="execIcon"></span>
            </div>
        </div>
        <div class="row  mb-2" id="rutaDIV">
            <label class="col-12 col-md-3 label-control text-end">Ruta <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-3">
                <input class="form-control" type="text" id="route" placeholder="Ruta">
            </div>
            <div class="col-6 col-md-3 text-start">
                <i class="fas fa-question-circle" onclick="help('Debe ser único y debe estar compuesto de letras minusculas')"></i>
                <span class="ml-2 text-success" id="obsRuta"></span>
            </div>
        </div>
        <div class="row mb-5">
            <label class="col-12 col-md-3 label-control text-end">Estado <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-3">
                <select id="status" class="form-control">
                    <option selected value="1">Activo</option>
                    <option value="0">Inactivo</option>
                </select>
            </div>
        </div>
    </div>
</div>


<script src="src/Views/menu/menu.js"></script>
<link rel="stylesheet" href="src/Views/menu/menu.css">