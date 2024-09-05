<div class="row bg-gray-lights p-2 border-down bg-light sticky">
    <div class="col-12 col-md-4  mt-1">
        <span>
            <i id="TitleIcon" class="mr-2 box"></i>
            <span class="t20" id="Title"></span>
        </span>
    </div>
    <div class="col-12 col-md-8 text-end" id="btmDivs">
        <!-- <button id="btmRefresh" class="btn btn-success mr-2" title="Refrescar">
            <i class="fas fa-sync-alt"></i>
            Refrescar
        </button> -->
        <div class="btn-group hide" id="btnPrint">
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

<!-- <div class="row mt-2 justify-content-md-center bg-white rounded-10 p-2">
    <div class="col-12 col-md-12 align-items-center" id="GridDiv">
        <button class="btn btn-light">2024</button>
        <button class="btn btn-light">Trimestre 1</button>
        <button class="btn btn-light">Trimestre 2</button>
        <button class="btn btn-light">Trimestre 3</button>
    </div>
</div> -->

<div class="row m-1 justify-content-md-center">
    <div class="col-12 col-md-12 align-items-center bg-white round-10 pb-4">
        <table class="tables mt-3">
            <!-- <thead>
                <tr>
                    <th>Fecha Desde</th>
                    <th>Fecha Hasta</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead> -->
            <tbody>
                <tr>
                    <td>
                        <label for="fechadesde">Fecha Desde</label>
                        <input class="form-control" type="date" id="fechadesde" value="2024-01-01" placeholder="Nombre del menu">
                    </td>
                    <td>
                        <label for="fechadesde">Fecha Hasta</label>
                        <input class="form-control" type="date" id="fechahasta" value="2024-01-01"  placeholder="Nombre del menu">
                    </td>
                    <td>
                        <br>
                        <button id="btnBuscar" class='btn btn-primary'>
                            <i class="fas fa-search"></i>
                            Buscar
                        </button>
                    </td>
                    <td class="p-3" width="60%">
                        <i class="fas fa-info-circle"></i>
                        KPI. Rotación de Productos<br>
                        Es el indicador de rendimiento que monitorea el stock y evalúa la disponibilidad del mismo a partir de la correcta clasificación de la mercancía en el almacén por su nivel de demanda.<br>
                        Tasa de rotación de inventario = Costo de mercancía vendida / promedio de inventario.
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>


<div class="row mt-2 justify-content-md-center">
    <div class="col-12 col-md-12 align-items-center" id="GridDiv">
        <div id="myGrid" class="ag-theme-quartz text-dark-400" style="height: 500px; min-height: 500px;"></div>
    </div>
</div>

<script src="src/Views/lst_rotacion/lst_rotacion.js"></script>
<link rel="stylesheet" href="src/Views/lst_rotacion/lst_rotacion.css">