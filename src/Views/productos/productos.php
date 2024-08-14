<div class="row bg-gray-lights p-2 border-down bg-light sticky">
    <div class="col-12 col-md-4  mt-1">
        <span>
            <i id="TitleIcon" class="mr-2 box"></i>
            <span class="t20" id="Title"></span>
        </span>
    </div>
    <div class="col-12  col-md-8 text-end">
        <span id="divW">
            <button id="btmNew" class="btn btn-primary mr-1" title="Nuevo">
                <i class="fa fa-plus"></i>
                Nuevo
            </button>
            <button id="btmEdit" class="btn btn-info mr-1" title="Editar">
                <i class="far fa-edit"></i>
                Editar
            </button>
            <button id="btmReestablecer" title="Reestablecer Usuario eliminado" class="btn btn-info mr-1">
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
    <div class="col-12 col-md-10 align-items-center">
        <div id="myGrid" class="ag-theme-quartz text-dark-400" style="height: 500px; min-height: 500px;"></div>
    </div>
    <div class="col-12 col-md-2 align-items-center" id="info">
    </div>
</div>


<!-- Formulario -->
<div class="row justify-content-md-center hide" id="FormDiv">
    <div class="col-12 col-md-11 align-items-center bg-white round-10">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="row mt-5 mb-2">
                    <label class="col-12 col-md-4 label-control text-end">Nombre</label>
                    <div class="col-12 col-md-8">
                        <input class="form-control" type="hidden" id="idproduct" value="">
                        <input class="form-control" type="text" id="name"  placeholder="Nombre del producto">
                    </div>
                    <!-- <div class="col-6 col-md-1 text-start">
                        <i class="fas fa-question-circle" onclick="help('El nombre del menu debe ser un identificativo claro de lo que se desea mostrar, de preferencia debe ser único.')"></i>
                    </div> -->
                </div>
                <div class="row mb-2">
                    <label class="col-12 col-md-4 label-control text-end">Descripcion</label>
                    <div class="col-12 col-md-8">
                        <input class="form-control" type="text" id="description"  placeholder="Descripcion">
                    </div>
                </div>
                <div class="row mb-2">
                    <label class="col-12 col-md-4 label-control text-end">Codigo</label>
                    <div class="col-12 col-md-8">
                        <input class="form-control" type="text" id="productcode"  placeholder="Codigo">
                    </div>
                </div>
                <div class="row mb-2">
                    <label class="col-12 col-md-4 label-control text-end">Codigo de Barras</label>
                    <div class="col-12 col-md-8">
                        <input class="form-control" type="text" id="barcode"  placeholder="Codigo de Barras">
                    </div>
                </div>
                <div class="row mb-2">
                    <label class="col-12 col-md-4 label-control text-end">Presentación</label>
                    <div class="col-12 col-md-8">
                        <select id="idpresentation" class="form-control">
                            <option value="-">-- Seleccione una linea --</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-2">
                    <label class="col-12 col-md-4 label-control text-end">Línea</label>
                    <div class="col-12 col-md-8">
                        <select id="idproductline" class="form-control">
                            <option value="-">-- Seleccione una linea --</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-2">
                    <label class="col-12 col-md-4 label-control text-end">Categoría</label>
                    <div class="col-12 col-md-8">
                        <select id="idproductcategory" class="form-control">
                            <option value="-">-- Seleccione una categoria --</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-2">
                    <label class="col-12 col-md-4 label-control text-end">PVP</label>
                    <div class="col-12 col-md-8">
                        <input class="form-control" type="text" id="price"  placeholder="0.00">
                    </div>
                </div>
                <div class="row mb-5">
                    <label class="col-12 col-md-4 label-control text-end">Estado</label>
                    <div class="col-12 col-md-8">
                        <select id="status" class="form-control">
                            <option selected value="1">Activo</option>
                            <option value="0">Inactivo</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="row mt-5 mb-2">
                    <div class="col-12 col-md-4"></div>
                    <div class="col-12 col-md-8">
                        <h6>Cuentas Contables</h6>
                    </div>
                </div>
                <div class="row mb-2">
                    <label class="col-12 col-md-4 label-control text-end">Costo</label>
                    <div class="col-12 col-md-8">
                        <input class="form-control" type="text" id="accountcost"  placeholder="0.0.00.00.00">
                    </div>
                </div>
                <div class="row mb-2">
                    <label class="col-12 col-md-4 label-control text-end">Ventas</label>
                    <div class="col-12 col-md-8">
                        <input class="form-control" type="text" id="accountsales"  placeholder="0.0.00.00.00">
                    </div>
                </div>
                <div class="row mb-2">
                    <label class="col-12 col-md-4 label-control text-end">Inventario</label>
                    <div class="col-12 col-md-8">
                        <input class="form-control" type="text" id="accountinv"  placeholder="0.0.00.00.00">
                    </div>
                </div>
    
            </div>
        </div>
    </div>
</div>


<script src="src/Views/productos/productos.js"></script>
<!-- <link rel="stylesheet" href="src/Views/productos/productos.css"> -->