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
                Anular
            </button>
            <button id="btmReestablecer" title="Reestablecer" class="btn btn-info mr-1">
                <i class="fas fa-notes-medical"></i>
                Recuperar
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
        <div class="btn-group" id="btnPrint">
            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-print"></i> 
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" id="PDF" href="javascript:void(0)">Exportar PDF</a></li>
                <!-- <li><a class="dropdown-item" id="CSV" href="javascript:void(0)">Exportar CSV</a></li> -->
            </ul>
        </div>
    </div>
</div>
<div  id="GridDiv">
    <div class="row m-1 justify-content-md-center">
        <div class="col-12 col-md-11 align-items-center bg-white round-10 pb-4">
            <div class="row mt-4 mb-1">
                <label class="col-12 col-md-2 control-label text-end mt-1">Fecha desde</label>
                <div class="col-12 col-md-3">
                    <input class="form-control" type="date" id="fechadesde" value="2024-01-01" placeholder="Nombre del menu">
                </div>
                <label class="col-12 col-md-2 control-label text-end mt-1">Fecha hasta</label>
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
    
    <div class="row mt-2 justify-content-md-center">
        <div class="col-12 col-md-11 align-items-center">
            <div id="myGrid" class="ag-theme-quartz text-dark-400" style="height: 500px; min-height: 500px;"></div>
        </div>
    </div>

</div>


<!-- Formulario -->
<div class="row justify-content-md-center hide" id="FormDiv">
    <div class="col-12 col-md-11 align-items-center bg-white round-10" id="formDivP1">
        <table class="table">
            <thead>
                <tr>
                    <th class="tr-headerXX">Fecha</th>
                    <th class="tr-headerXX" colspan="2">Comprobante</th>
                    <th class="tr-headerXX">Número Documento</th>
                    <th class="tr-headerXX">Beneficiario</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> <input class="form-control" type="date" id="date" value="2024-01-01" placeholder="Fecha"> </td>
                    <td width="15%">
                        <select id="idmovementtype" class="form-control"></select>
                    </td>
                    <td class="pt-2"><kbd id="tipoSiglas" class="bg-primary mt-5">FC</kbd></td>
                    <td> <input class="form-control" type="text" id="numberdocument" placeholder="000-000-0000000"> </td>
                    <td >
                        <input type="text" name="txtBene" id="txtBuscarBene" class="form-control" placeholder="Ingrese cedula o nombre">
                    </td>
                    <td>
                        <button class="btn btn-success" id="btnBuscarBeneficiario"><i class="fas fa-search"></i></button>
                    </td>
                    <td width="20%"> 
                        <select id="idbeneficiary"  disabled class="form-control">
                            <option value="-">-- Seleccione --</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>

        <table class="table">
            <thead>
                <tr>
                    <th class="tr-headerXX">Codigo</th>
                    <th class="tr-headerXX"></th>
                    <th class="tr-headerXX">Producto</th>
                    <th class="text-end tr-headerXX">Stock</th>
                    <th class="tr-headerXX">Asiento</th>
                    <th class="text-end tr-headerXX">Cantidad</th>
                    <th class="text-end tr-headerXX">Precio</th>
                    <th class="text-end tr-headerXX">Total</th>
                    <th class="text-end tr-headerXX">Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <input class="form-control" type="text" id="searchProduct" placeholder="Ingrese Nombre o codigo">
                    </td>
                    <td>
                        <button class="btn btn-success" id="btnBuscarTexto"><i class="fas fa-search"></i></button>
                    </td>
                    <td>
                        <select disabled id="idproduct" class="form-control"></select>
                    </td>
                    <td> <input disabled class="form-control text-end" type="text" id="stock" placeholder="0.00">  </td>
                    <td>
                        <select id="entry" disabled class="form-control">
                            <option selected value="I">Ingreso</option>
                            <option value="E">Egreso</option>
                        </select>
                    </td>
                    <td> <input class="form-control text-end" type="text" id="qty" placeholder="0.00"> </td>
                    <td> <input class="form-control text-end" type="text" id="price" placeholder="0.00"> </td>
                    <td> <input readonly disabled class="form-control text-end" type="text" id="total" placeholder="0.00"> </td>
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
                    <th class="tr-header text-white">ID</th>
                    <th class="tr-header text-white">Codigo</th>
                    <th class="tr-header text-white">Producto</th>
                    <th class="tr-header text-white text-center">Asiento</th>
                    <th class="tr-header text-white text-end">Cantidad</th>
                    <th class="tr-header text-white text-end">Precio</th>
                    <th class="tr-header text-white text-end">Total</th>
                    <th class="tr-header text-white text-center">Acción</th>
                </tr>
            </thead>
            <tbody id="tblbody"></tbody>
        </table>

        <div class="row mb-5">
            <div class="col-6 col-md-8">
                <div class="row mb-3">
                    <div class="col-3 text-end t12 bold">
                        Comentarios / Referencia
                    </div>
                    <div class="col-9 text-start">
                        <textarea id="reference" class="form-control" rows="3"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3 text-end t12 bold">
                        Son:
                    </div>
                    <div class="col-9 text-start" id="son">
                    </div>
                </div>
                <div class="row">
                    <div class="col-3 text-end t12 bold">
                        Número de Items:
                    </div>
                    <div class="col-9 text-start" id="nitems"></div>
                </div>
            </div>
            <div class="col-6 col-md-4">
                <div class="row bg-light">
                    <div class="col text-end bold mt-2">SubTotal</div>
                    <div class="col"><input disabled readonly type="text" id="subtotal" class="form-control text-end" value="0.00"></div>
                </div>
                <div class="row mt-1">
                    <div class="col text-end bold mt-2">Descuento</div>
                    <div class="col"><input type="text" id="desc" class="form-control text-end" value="0.00"></div>
                </div>
                <div class="row bg-light mt-1 ">
                    <div class="col text-end bold mt-2">Total</div>
                    <div class="col"><input disabled readonly type="text" id="totalg" class="form-control text-end" value="0.00"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 col-md-11 align-items-center bg-white round-10 hide" id="formDivP2">
        <div class="row mt-3 mb-2">
            <div class="col-12 col-md-3 text-end mt-2">Texto a buscar</div>
            <div class="col-12 col-md-3">
                <input class="form-control" type="text" id="buscarP" placeholder="Ingrese Nombre o codigo">
            </div>
            <div class="col-12 col-md-2">
                <button id="btnBuscarP" class="btn btn-primary">Buscar</button>
            </div>
            <div class="col-12 col-md-4 text-end">
                <button id="btnSeleccionar" class="btn btn-primary disabled">Seleccionar</button>
                <button id="btnCancelaBusqueda" class="btn btn-danger">Cancelar</button>
            </div>
        </div>
        <div id="myGridP" class="ag-theme-quartz text-dark-400" style="height: 500px; min-height: 500px;"></div>
    </div>
    <div class="col-12 col-md-11 align-items-center bg-white round-10 hide" id="formDivP3">
        <div class="row mt-3 mb-2">
            <div class="col-12 col-md-3 text-end mt-2">Texto a buscar</div>
            <div class="col-12 col-md-3">
                <input class="form-control" type="text" id="buscarP3" placeholder="Ingrese identificacion o nombre">
            </div>
            <div class="col-12 col-md-2">
                <button id="btnBuscarP3" class="btn btn-primary">Buscar</button>
            </div>
            <div class="col-12 col-md-4 text-end">
                <button id="btnSeleccionar3" class="btn btn-primary disabled">Seleccionar</button>
                <button id="btnCancelaBusqueda3" class="btn btn-danger">Cancelar</button>
            </div>
        </div>
        <div id="myGridP3" class="ag-theme-quartz text-dark-400" style="height: 500px; min-height: 500px;"></div>
    </div>
</div>




<script src="src/Views/movimientos/movimientos.js"></script>
<link rel="stylesheet" href="src/Views/movimientos/movimientos.css">