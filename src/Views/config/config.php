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
            <label class="col-12 col-md-3 control-label text-end">Orden <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-3">
                <input class="form-control" type="hidden" id="idconfig" value="">
                <input class="form-control" type="text" id="order"  placeholder="Orden">
            </div>
        </div>
        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Variable <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-3">
                <input class="form-control" type="text" id="variable"  placeholder="Variable">
            </div>
        </div>
        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Etiqueta <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-3">
                <input class="form-control" type="text" id="label"  placeholder="Etiqueta">
            </div>
        </div>
        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Valor <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-3">
                <input class="form-control" type="text" id="vvalue"  placeholder="Valor">
            </div>
        </div>
    </div>
</div>


<script src="src/Views/config/config.js"></script>
<link rel="stylesheet" href="src/Views/config/config.css">