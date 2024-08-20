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
        <!-- <div class="row mt-5 mb-2 ">
            <label class="col-6 col-md-2 control-label text-end" for="fecha">Fecha</label>
            <div class="col-6 col-md-2">
                <input class="form-control" type="date" id="fecha" value="2024-01-01" placeholder="Fecha">
            </div>
            
            <label class="col-12 col-md-2 control-label text-end">Tipo de Movimiento</label>
            <div class="col-12 col-md-2">
                <select id="idmovementtype" class="form-control">
                    <option value="-">-- Seleccione --</option>
                </select>
            </div>

            <label class="col-6 col-md-2 control-label text-end">Número de Movimiento</label>
            <div class="col-6 col-md-2">
                <input class="form-control" type="text" id="numberdocument"  placeholder="000000000">
            </div>
        </div>
        <div class="row mb-2">
            <label class="col-12 col-md-2 control-label text-end">Beneficiario</label>
            <div class="col-12 col-md-4">
                <select id="idbeneficiary" class="form-control">
                    <option value="-">-- Seleccione --</option>
                </select>
            </div>
        </div> -->

        <table class="table">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th colspan="3">Comprobante</th>
                    <th>Beneficiario</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> <input class="form-control" type="date" id="fecha" value="2024-01-01" placeholder="Fecha"> </td>
                    <td> 
                        <select id="idmovementtype" class="form-control">
                        </select>
                    </td>
                    <td class="pt-2"><kbd id="tipoSiglas" class="bg-primary mt-5">FC</kbd></td>
                    <td> <input class="form-control" type="text" id="numberdocument"  placeholder="000000000"> </td>
                    <td width="50%">
                        <select id="idbeneficiary" class="form-control">
                            <option value="-">-- Seleccione --</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>

        <table class="table">
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Producto</th>
                    <th>Asiento</th>
                    <th class="text-end">Cantidad</th>
                    <th class="text-end">Precio</th>
                    <th class="text-end">Total</th>
                    <th class="text-end">Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> 
                        <input class="form-control" type="text" id="searchProduct"  placeholder="Ingrese Nombre o codigo">
                    </td>
                    <td> 
                        <select id="idproduct" class="form-control">
                        </select>
                    </td>
                    <td> 
                        <select id="entry" disabled class="form-control">   
                            <option selected value="I">Ingreso</option>
                            <option value="E">Egreso</option>
                        </select>
                    </td>
                    <td> <input class="form-control text-end" type="text" id="qty"  placeholder="0.00"> </td>
                    <td> <input class="form-control text-end" type="text" id="price"  placeholder="0.00"> </td>
                    <td> <input readonly disabled class="form-control text-end" type="text" id="total"  placeholder="0.00"> </td>
                    <td>
                        <button id="btmAddItem" class="btn btn-primary">
                            Añadir
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th class="bg-primary text-white">ID</th>
                    <th class="bg-primary text-white">Codigo</th>
                    <th class="bg-primary text-white">Producto</th>
                    <th class="bg-primary text-white text-center">Asiento</th>
                    <th class="bg-primary text-white text-end">Cantidad</th>
                    <th class="bg-primary text-white text-end">Precio</th>
                    <th class="bg-primary text-white text-end">Total</th>
                    <th class="bg-primary text-white text-center">Acción</th>
                </tr>
            </thead>
            <tbody id="tblbody"></tbody>
        </table>

    </div>
</div>


<script src="src/Views/movimientos/movimientos.js"></script>
<!-- <link rel="stylesheet" href="src/Views/movimientos/movimientos.css"> -->