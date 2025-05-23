<div class="row bg-gray-lights p-2 border-down bg-light sticky">
    <div class="col-12 col-md-4  mt-1">
        <span>
            <i id="TitleIcon" class="mr-2 box"></i>
            <span class="t20" id="Title"></span>
        </span>
    </div>
    <div class="col-12  col-md-8 text-end">
        <button id="btmVerMas" class="btn btn-info mr-1" title="Nuevo">
            <i class="fa fa-eye"></i>
            Ver mas detalles
        </button>
        <!-- <span id="divW">
            <button id="btmNew" class="btn btn-primary mr-1" title="Nuevo">
                <i class="fa fa-plus"></i>
                Nuevo
            </button>
            <button id="btmEdit" class="btn btn-info mr-1" title="Editar">
                <i class="far fa-edit"></i>
                Editar
            </button>
        </span> -->
        <!-- <span id="divD">
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
        </button> -->
    </div>
</div>

<div class="row m-1 justify-content-md-center">
    <div class="col-12 col-md-11 align-items-center bg-white round-10 pb-4">
        <div class="row mt-4 mb-1">
            <label class="col-12 col-md-2 control-label text-end">Fecha desde</label>
            <div class="col-12 col-md-3">
                <input class="form-control" type="date" id="fechadesde" value="2024-01-01" placeholder="Nombre del menu">
            </div>
            <label class="col-12 col-md-2 control-label text-end">Fecha hasta</label>
            <div class="col-12 col-md-3">
                <input class="form-control" type="date" id="fechahasta" value="2024-01-01"  placeholder="Nombre del menu">
            </div>
            <div class="col-12 col-md-2">
                <button id="btnBuscar" class='btn btn-primary'>
                    <i class="fas fa-search"></i>
                    Buscar
                </button>
            </div>
        </div>
    </div>
</div>

<div class="row mt-2 justify-content-md-center" id="GridDiv">
    <div class="col-12 col-md-11 align-items-center ">
        <div class="gridwidth">
            <div id="myGrid" class="ag-theme-quartz text-dark-400" style="height: 500px; min-height: 500px;"></div>
        </div>
    </div>
</div>


<script src="src/Views/audit/audit.js"></script>
<link rel="stylesheet" href="src/Views/audit/audit.css">