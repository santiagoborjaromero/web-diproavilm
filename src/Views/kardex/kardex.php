<div class="row bg-gray-lights p-2 border-down bg-light sticky">
    <div class="col-12 col-md-4  mt-1">
        <span>
            <i id="TitleIcon" class="mr-2 box"></i>
            <span class="t20" id="Title"></span>
        </span>
    </div>
    <div class="col-12  col-md-8 text-end">
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
<div class="row  justify-content-md-center">
    <div class="col-12 col-md-12">
        <div class="card">
            <div class="card-body">
                <div class="row mt-1 mb-1">
                    <label class="col-12 col-md-1 control-label text-end mt-2">Producto</label>
                    <div class="col-12 col-md-2">
                        <select id="idproduct" class="form-control">
                            <option value="-">-- Seleccione un producto --</option>
                        </select>
                    </div>
                    <div class="col-12 col-md-1">
                        <button id="btnBuscar" class='btn btn-primary'>
                            <i class="fas fa-search"></i>
                            Buscar
                        </button>
                    </div>
                    <div class="col-12 col-md-6 text-start" id="descProd"></div>
                </div>
            </div>
        </div>
    </div>
</div>


<div class="row mt-2 justify-content-md-center" id="GridDiv">
    <div class="col-12 col-md-12 align-items-center">
        <div id="myGrid" class="ag-theme-quartz text-dark-400" style="height: 500px; min-height: 500px;"></div>
    </div>
</div>


<script src="src/Views/kardex/kardex.js"></script>
<link rel="stylesheet" href="src/Views/kardex/kardex.css">