<div class="row bg-gray-lights p-2 border-down bg-light sticky">
    <div class="col-12 col-md-4  mt-1">
        <span>
            <i id="TitleIcon" class="mr-2 box"></i>
            <span class="t20" id="Title"></span>
        </span>
    </div>
    <div class="col-12  col-md-8 text-end">
        
    </div>
</div>
<div id="formDivP1" >
    <div class="row  justify-content-md-center">
        <div class="col-12 col-md-12">
            <div class="card">
                <div class="card-body">
                    <table class="tables" width="100%">
                        <tr>
                            <td>Producto</td>
                            <td>
                                <input id="buscarP" type="text" class='form-control' placeholder="Ingrese código o nombre">
                                <select id="idproduct" class="form-control hide">
                                    <option value="-">-- Seleccione un producto --</option>
                                </select>
                            </td>
                            <td>
                                <button id="btnBuscarP" class='btn btn-primary'>
                                    <i class="fas fa-search"></i>
                                </button>
                            </td>
                            <td id="descProd" width="70%" class="p-1"></td>
                            <td class="text-right">
                                <div class="btn-group hide" id="btnPrint">
                                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fas fa-print"></i> Exportar
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" id="PDF" href="javascript:void(0)">Exportar PDF</a></li>
                                        <li><a class="dropdown-item" id="CSV" href="javascript:void(0)">Exportar CSV</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </table>


                    <!-- <div class="row mt-1 mb-1">
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
                    </div> -->
                </div>
            </div>
        </div>
    </div>
    
    
    <div class="row mt-2 justify-content-md-center" id="GridDiv">
        <div class="col-12 col-md-12 align-items-center">
            <div id="myGrid" class="ag-theme-quartz text-dark-400" style="height: 500px; min-height: 500px;"></div>
        </div>
    </div>
</div>


<div id="formDivP2" class="hide">
    <div class="row  justify-content-md-center">
        <div class="col-12 col-md-12">
            <div class="card">
                <div class="card-body">
                    <div class="row mt-3 mb-2">
                        <div class="col-12 col-md-2 text-end mt-2">Texto a buscar</div>
                        <div class="col-12 col-md-3">
                            <input class="form-control" type="text" id="txtbuscar" placeholder="Ingrese Nombre o codigo">
                        </div>
                        <div class="col-12 col-md-2">
                            <button id="btnBuscar" class="btn btn-primary">Buscar</button>
                        </div>
                        <div class="col-12 col-md-5 text-end">
                            <button id="btnSeleccionar" class="btn btn-primary disabled">Seleccionar</button>
                            <button id="btnCancelaBusqueda" class="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                    <div id="myGridP" class="ag-theme-quartz text-dark-400" style="height: 500px; min-height: 500px;"></div>
                </div>
            </div>
        </div>
    </div>
</div>


<script src="src/Views/lst_kardex/lst_kardex.js"></script>
<!-- <link rel="stylesheet" href="src/Views/lst_kardex/lst_kardex.css"> -->