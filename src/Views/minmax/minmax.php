<div class="row bg-gray-lights p-2 border-down bg-light sticky">
    <div class="col-12 col-md-4  mt-1">
        <span>
            <i id="TitleIcon" class="mr-2 box"></i>
            <span class="t20" id="Title"></span>
        </span>
    </div>
    <div class="col-12 col-md-8 text-end" id="btmDivs">
        <button id="btmAplicar" class="btn btn-primary mr-2 hide" title="Más Información">
            <i class="fas fa-save"></i>
            Aplicar Cálculo
        </button>
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

<div class="row m-1 justify-content-md-center">
    <div class="col-12 col-md-12 align-items-center bg-white round-10 pb-4">
        <table class="tables mt-3" width="100%">
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
                    <td width="10%">
                        <br>
                        <button id="btnBuscar" class='btn btn-primary'>
                            <i class="fas fa-search"></i>
                            Buscar
                        </button>
                    </td>
                    <td width="70%" class="text-end">
                        <button id="btnInfo" class="btn btn-light mr-2" title="Más Información">
                            <i class="fas fa-info-circle t25"></i>
                        </button>
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
    <!-- <div class="col-12 col-md-3" >
        <i class="fas fa-search-dollar t20"></i>
        <strong class="t20 bold">Analisis </strong><br>
        <div id="analisis" class="align-items-justify"></div>
    </div> -->
</div>

<script src="src/Views/minmax/minmax.js"></script>
<link rel="stylesheet" href="src/Views/minmax/minmax.css">