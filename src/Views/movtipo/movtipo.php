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
            <button id="btmReestablecer" title="Reestablecer" class="btn btn-info mr-1">
                <i class="fas fa-notes-medical"></i>
                Reestablecer
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
            <label class="col-12 col-md-3 control-label text-end">Nombre <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-4">
                <input class="form-control" type="hidden" id="idmovementtype" value="">
                <input class="form-control" type="text" id="name"  placeholder="Nombre">
            </div>
            <!-- <div class="col-6 col-md-1 text-start">
                <i class="fas fa-question-circle" onclick="help('El nombre del menu debe ser un identificativo claro de lo que se desea mostrar, de preferencia debe ser único.')"></i>
            </div> -->
        </div>

        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Siglas <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-4">
                <input class="form-control" type="text" id="acronym"  placeholder="Siglas">
            </div>
        </div>

        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Secuencial <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-4">
                <input class="form-control" type="text" id="sequential"  placeholder="Secuencial">
            </div>
        </div>


        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Tipo de Beneficiario<sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-4">
                <select id="beneficiarytype" class="form-control">
                    <option selected value="C">Cliente</option>
                    <option value="P">Proveedor</option>
                    <option value="E">Empresa</option>
                </select>
            </div>
        </div>

        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Asiento<sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-4">
                <select id="entry" class="form-control">
                    <option selected value="I">Ingreso</option>
                    <option value="E">Egreso</option>
                </select>
            </div>
        </div>

        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Valor que se presenta<sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-4">
                <select id="typevalue" class="form-control">
                    <option selected value="C">Costo</option>
                    <option value="P">PVP</option>
                </select>
            </div>
            <div class="col-6 col-md-1 text-start">
                <i class="fas fa-question-circle" onclick="help('Determina si el valor que se presenta para el calculo de ingreso o egreso sera costo o precio de venta.')"></i>
            </div>
        </div>

        <div class="row mb-5 mb-2">
            <label class="col-12 col-md-3 control-label text-end">Calcula número de documento<sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-4">
                <select id="typevalue" class="form-control">
                    <option selected value="1">Si</option>
                    <option value="0">No</option>
                </select>
            </div>
            <div class="col-6 col-md-1 text-start">
                <i class="fas fa-question-circle" onclick="help('Opcion Si - Calcula automaticamente el numero de documento basado en el establecimiento, punto de venta y secuencial. Opcion No - Permite el ingreso manual del documento.')"></i>
            </div>
        </div>

    </div>
</div>


<script src="src/Views/movtipo/movtipo.js"></script>
<link rel="stylesheet" href="src/Views/movtipo/movtipo.css">