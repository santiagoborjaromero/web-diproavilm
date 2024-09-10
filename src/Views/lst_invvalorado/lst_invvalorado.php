<div class="row bg-gray-lights p-2 border-down bg-light sticky">
    <div class="col-12 col-md-4  mt-1">
        <span>
            <i id="TitleIcon" class="mr-2 box"></i>
            <span class="t20" id="Title"></span>
        </span>
    </div>
    <div class="col-12  col-md-8 text-end">
        <button id="btmRefresh" class="btn btn-success mr-2" title="Refrescar">
            <i class="fas fa-sync-alt"></i>
            Refrescar
        </button>
        <div class="btn-group hideXX" id="btnPrint">
            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-print"></i> Exportar
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" id="PDF" href="javascript:void(0)">Exportar PDF</a></li>
                <li><a class="dropdown-item" id="CSV" href="javascript:void(0)">Exportar CSV</a></li>
            </ul>
        </div>
    </div>
</div>

<div class="row m-1 justify-content-md-center">
    <div class="col-6 col-md-6 col-lg-2">
        <div class="card">
            <div class="card-body text-end">
                <div class="dash-title"><i class="far fa-chart-bar"></i> Costo</div>
                <div class="dash-valor text-primary" id="acumcosto">$ 0.00</div>
                <div class="dash-subtitulo">Total general por costo</div>
                <!-- <kbd class="">KPI</kbd> -->
            </div>
        </div>
    </div>
    <div class="col-6 col-md-6 col-lg-2">
        <div class="card">
            <div class="card-body text-end">
                <div class="dash-title"><i class="far fa-chart-bar"></i> Precio</div>
                <div class="dash-valor text-success" id="acumventa">$ 0.00</div>
                <div class="dash-subtitulo">Total general precio de venta</div>
                <!-- <kbd class="">KPI</kbd> -->
            </div>
        </div>
    </div>
    <div class="col-12 col-md-12 col-lg-8" >
    <div class="card">
            <div class="card-body altopermitido" id="dataStats">
            </div>
        </div>
    </div>
    
    
</div>

<div class="row mt-2 justify-content-md-center" id="GridDiv">
    <div class="col-12 col-md-12 align-items-center tablaancho" >
        <div id="myGrid" class="ag-theme-quartz text-dark-400" style=" height: 500px; min-height: 500px;"></div>
    </div>
</div>



<script src="src/Views/lst_invvalorado/lst_invvalorado.js"></script>
<link rel="stylesheet" href="src/Views/lst_invvalorado/lst_invvalorado.css">