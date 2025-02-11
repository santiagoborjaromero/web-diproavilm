<div class="row bg-gray-lights p-2 border-down bg-light">
    <div class="col-12 col-md-6  mt-1">
        <span>
            <i id="TitleIcon" class="mr-2 box"></i>
            <span class="t20" id="Title"></span>
        </span>
    </div>
    <div class="col-12 col-md-6 text-end">
        <!-- <button id="btnRefresh" class="btn btn-success mr-2">
            <i class="fas fa-sync-alt"></i>
            Refrescar
        </button> -->
    </div>
</div>
<div class="row mt-2">
    <div class="col-12">
    <i class="far fa-chart-bar bold"></i> Movimientos de ingresos y egresos por cantidad y valor total del año en curso
    </div>
</div>
<div class="row mt-2">
    <div class="col-12 col-lg-4">
        <div class="row">
            <div class="col-12 col-lg-6 mb-1">
                <div class="bg-white bordered pbox">
                    <div class="dash-title"><i class="far fa-chart-bar"></i>Stock Egresos </div>
                    <div class="dash-valor">$ <span id="egresoStock">0.00</span></div>
                    <div class="dash-subtitulo">Suma Anual de productos por cantidad egresada.</div>
                </div>
            </div>
            <div class="col-12 col-lg-6">
                <div class="bg-white bordered pbox">
                    <div class="dash-title"><i class="far fa-chart-bar"></i>Valor Total Egresos</div>
                    <div class="dash-valor">$ <span id="egresoTotal">0.00</span></div>
                    <div class="dash-subtitulo">Suma Anual de productos por valor total egresado.</div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-lg-6">
                <div class="bg-white bordered pbox">
                    <div class="dash-title"><i class="far fa-chart-bar"></i>Stock Ventas </div>
                    <div class="dash-valor">$ <span id="ventasStock">0.00</span></div>
                    <div class="dash-subtituloXX bold"><span id="porcStock">50</span>% de Stock Egresos.</div>
                    <div class="dash-subtitulo">Suma Anual de productos por cantidad de ventas. </div>
                </div>
            </div>
            <div class="col-12 col-lg-6">
                <div class="bg-white bordered pbox">
                    <div class="dash-title"><i class="far fa-chart-bar"></i>Total Ventas </div>
                    <div class="dash-valor">$ <span id="ventasTotal">0.00</span></div>
                    <div class="dash-subtituloXX bold"><span id="porcTotal">50</span>% de Valor Total Egresos.</div>
                    <div class="dash-subtitulo">Suma Anual de productos por total ventas</div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-6 col-md-4">
        <div class="bg-white bordered pbox">
            <h6>Cantidad de Ingresos vs Egresos por Trimestres</h6>
            <canvas id="myCIE"></canvas>

        </div>
    </div>
    <div class="col-6 col-md-4">
        <div class="bg-white bordered pbox">
            <h6>Valor total Ingresos vs Egresos por Trimestres</h6>
            <canvas id="myCTIE"></canvas>
        </div>
    </div>
</div>

<div class="row mt-3">
    <div class="col-12">
    <i class="far fa-chart-bar bold"></i> Movimientos por clasificación
    </div>
</div>

<div class="row mt-2">
    <div class="col-6 col-md-3">
        <div class="bg-white bordered pbox">
            <h6>Por Tipo de Comprobantes</h6>
            <canvas id="myPolarTC"></canvas>
            <br>
            <table class="table table-striped table-hover t12" >
                <thead>
                    <tr>
                        <th>Comprobante</th>
                        <th class="text-end">Ingresos</th>
                        <th class="text-end">Egresos</th>
                    </tr>
                </thead>
                <tbody id="tblTC">
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th class="text-end" id="tblTCTotIng">0</th>
                        <th class="text-end" id="tblTCTotEgr">0</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="bg-white bordered pbox">
            <h6>Por Categoria de Productos</h6>
            <canvas id="myPolarCat"></canvas>
            <br>
            <table class="table table-striped table-hover t12" >
                <thead>
                    <tr>
                        <th>Categoría</th>
                        <th class="text-end">Ingresos</th>
                        <th class="text-end">Egresos</th>
                    </tr>
                </thead>
                <tbody id="tblCat">
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th class="text-end" id="tblCatTotIng">0</th>
                        <th class="text-end" id="tblCatTotEgr">0</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="bg-white bordered pbox">
            <h6>Por Linea de Productos</h6>
            <canvas id="myPolarLinea"></canvas>
            <br>
            <table class="table table-striped table-hover t12" >
                <thead>
                    <tr>
                        <th>Línea</th>
                        <th class="text-end">Ingresos</th>
                        <th class="text-end">Egresos</th>
                    </tr>
                </thead>
                <tbody id="tblLinea">
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th class="text-end" id="tblLineaTotIng">0</th>
                        <th class="text-end" id="tblLineaTotEgr">0</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="bg-white bordered pbox">
            <h6>Top 5 de Productos Vendidos</h6>
            <table class="table table-striped table-hover t12" >
                <thead>
                    <tr>
                        <th>Productos</th>
                        <th class="text-end">Valor</th>
                    </tr>
                </thead>
                <tbody id="tblTop5Prod">
                </tbody>
            </table>
        </div>

        <br>
        
        <div class="bg-white bordered pbox">
            <h6>Top 5 de Clientes</h6>
            <table class="table table-striped table-hover t12" >
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th class="text-end">Valor</th>
                    </tr>
                </thead>
                <tbody id="tblTop5Clie">
                </tbody>
            </table>
        </div>

        <br>
        
        <div class="bg-white bordered pbox">
            <h6>Top 5 de Ciudades</h6>
            <table class="table table-striped table-hover t12" >
                <thead>
                    <tr>
                        <th>Ciudad</th>
                        <th class="text-end">Valor</th>
                    </tr>
                </thead>
                <tbody id="tblTop5Ciu">
                </tbody>
            </table>
        </div>
    </div>

</div>
<script src="src/Views/dashgeneral/dashgeneral.js"></script>
<link rel="stylesheet" href="src/Views/dashgeneral/dashgeneral.css">