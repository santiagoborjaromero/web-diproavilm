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
        
        <div class="row mt-5 mb-2" id="submenuDIV">
            <label class="col-12 col-md-3 control-label text-end">Tipo <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-6">
                <select id="type" class="form-control">
                    <option selected value="C">Cliente</option>
                    <option value="P">Proveedor</option>
                    <option value="A">Cliente/Proveedor</option>
                    <option value="E">Empresa</option>
                </select>
            </div>
        </div>
    
        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Nombre <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-6">
                <input class="form-control" type="hidden" id="idbeneficiary" value="">
                <input class="form-control" type="text" id="name"  placeholder="Nombre">
            </div>
            <!-- <div class="col-6 col-md-1 text-start">
                <i class="fas fa-question-circle" onclick="help('El nombre del menu debe ser un identificativo claro de lo que se desea mostrar, de preferencia debe ser único.')"></i>
            </div> -->
        </div>
        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Nombre Comercial</label>
            <div class="col-12 col-md-6">
                <input class="form-control" type="text" id="comercialname"  placeholder="Nombre comercial">
            </div>
            <!-- <div class="col-6 col-md-1 text-start">
                <i class="fas fa-question-circle" onclick="help('El nombre del menu debe ser un identificativo claro de lo que se desea mostrar, de preferencia debe ser único.')"></i>
            </div> -->
        </div>

        <div class="row mb-2" id="submenuDIV">
            <label class="col-12 col-md-3 control-label text-end">Tipo de Identificacion <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-3">
                <select id="ididentificationtype" class="form-control">
                </select>
            </div>
        </div>
        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Identificacion <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-3">
                <input class="form-control" type="text" id="identificationnumber"  placeholder="0000000000">
            </div>
             <div class="col-6 col-md-3 text-start" id="verificacionIdentificacion">
                <!-- <i class="fa fa-times text-danger"></i> No verificado -->
            </div>
        </div>

        <div class="row mb-2" id="submenuDIV">
            <label class="col-12 col-md-3 control-label text-end">Pais <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-3">
                <select id="idcountry" class="form-control">
                </select>
            </div>
        </div>
        <div class="row mb-2" id="submenuDIV">
            <label class="col-12 col-md-3 control-label text-end">Provincia <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-3">
                <select id="idprovince" class="form-control">
                </select>
            </div>
        </div>
        <div class="row mb-2" id="submenuDIV">
            <label class="col-12 col-md-3 control-label text-end">Ciudad <sup class="text-danger" title="Requerido">*</sup></label>
            <div class="col-12 col-md-3">
                <select id="idcity" class="form-control">
                </select>
            </div>
        </div>

        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Dirección</label>
            <div class="col-12 col-md-6">
                <input class="form-control" type="text" id="address"  placeholder="Direccion">
            </div>
        </div>

        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Parroquia</label>
            <div class="col-12 col-md-3">
                <input class="form-control" type="text" id="parish"  placeholder="Parroquia">
            </div>
        </div>

        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Telefono</label>
            <div class="col-12 col-md-3">
                <input class="form-control" type="text" id="phone"  placeholder="Telefono">
            </div>
        </div>

        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Correo Electronico</label>
            <div class="col-12 col-md-3">
                <input class="form-control" type="text" id="email"  placeholder="nombre@empresa.com">
            </div>
        </div>

        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Sitio web</label>
            <div class="col-12 col-md-3">
                <input class="form-control" type="text" id="web"  placeholder="www.empresa.com">
            </div>
        </div>

        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Cuota de crédito</label>
            <div class="col-12 col-md-3">
                <input class="form-control" type="text" id="creditquota"  placeholder="0.00">
            </div>
        </div>

        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Dias de crédito</label>
            <div class="col-12 col-md-3">
                <input class="form-control" type="text" id="creditdays"  placeholder="0">
            </div>
        </div>

        <div class="row mb-2">
            <label class="col-12 col-md-3 control-label text-end">Cuenta contable</label>
            <div class="col-12 col-md-3">
                <input class="form-control" type="text" id="account"  placeholder="0.0.0.0000">
            </div>
        </div>
    </div>
</div>


<script src="src/Views/beneficiarios/beneficiarios.js"></script>
<link rel="stylesheet" href="src/Views/beneficiarios/beneficiarios.css">