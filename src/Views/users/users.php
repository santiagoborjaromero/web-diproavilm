<div class="row bg-gray-lights p-2 border-down">
    <div class="col-12 col-md-6  mt-1">
        <span>
            <i class="fa fa-users mr-2 box"></i>
            <span class="t20">
                <?php echo $title; ?>
            </span>
        </span>
    </div>
    <div class="col-12  col-md-6 text-end">
        <button id="btmUsers" class="btn btn-primary mr-1">
            <i class="fa fa-plus"></i>
            Nuevo
        </button>
        <button id="btmEdit" class="btn btn-info mr-1">
            <i class="far fa-edit"></i>
            Editar
        </button>
        <button id="btmDelete" class="btn btn-danger mr-1">
            <i class="far fa-trash-alt"></i>
            Eliminar
        </button>
        <button id="btmRefresh" class="btn btn-success mr-2">
            <i class="fas fa-sync-alt"></i>
            Refrescar
        </button>
    </div>
</div>

<div class="row mt-2">
    <div class="col-12">
        <div id="myGrid" class="ag-theme-quartz" style="height: 500px; min-height: 500px;"></div>
    </div>
</div>



<script src="src/Views/users/users.js"></script>
<link rel="stylesheet" href="src/Views/users/users.css">



