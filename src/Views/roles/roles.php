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
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="row mt-5 mb-2 hide" id="idrolDIV">
                    <label class="col-12 col-md-4 label-control text-end">ID</label>
                    <div class="col-12 col-md-7">
                        <input class="form-control disabled" readonly type="text" id="idrole" value="">
                    </div>
                </div>
                <div class="row mb-2" id="nombreDiv">
                    <label class="col-12 col-md-4 label-control text-end">Nombre del rol <sup class="text-danger" title="Requerido">*</sup></label>
                    <div class="col-12 col-md-6">
                        <input class="form-control" type="text" id="name"  placeholder="Nombre del rol">
                    </div>
                    <div class="col-12 col-md-1">
                        <i class="fas fa-question-circle" onclick="help('El nombre puede estar compuesto de mayúsculas, minúsculas, numeros. No se admiten símbolos, ni espacios en blanco.')"></i>
                    </div>
                </div>
                <div class="row mb-2">
                    <label class="col-12 col-md-4 label-control text-end">Permisos Generales <sup class="text-danger" title="Requerido">*</sup></label>
                    <div class="col-12 col-md-7">
                        <input class="form-check-input" type="checkbox" id="scope_r">
                        <label class="form-check-label" for="scope_r"> <kbd class="bg-success">R</kbd> Lectura </label> <br>
        
                        <input class="form-check-input" type="checkbox" id="scope_w">
                        <label class="form-check-label" for="scope_w"> <kbd class="bg-warning">W</kbd> Escritura </label> <br>
        
                        <input class="form-check-input" type="checkbox" id="scope_d">
                        <label class="form-check-label" for="scope_d"> <kbd class="bg-danger">D</kbd> Borrado </label> <br>
        
                        <!-- <input type="checkbox" class="input-switch" id="scope_r" /> Lectura <br> -->
                        <!-- <input type="checkbox" class="input-switch" id="scope_w" /> Escritura <br>
                        <input type="checkbox" class="input-switch" id="scope_d" /> Eliminado -->
                    </div>
                </div>
                <div class="row mb-5">
                    <label class="col-12 col-md-4 label-control text-end">Estado <sup class="text-danger" title="Requerido">*</sup></label>
                    <div class="col-12 col-md-7">
                        <select id="status" class="form-control">
                            <option selected value="1">Activo</option>
                            <option value="0">Inactivo</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 p-1 bg-gray-lightXXX">
                <h6 class="mt-3">Seleccione las opciones del menu hablitadas que este rol tendrá acceso</h6>
                <!-- <input class="form-check-input" type="checkbox" id="selectall"> 
                <label class="form-check-label" for="selectall" id="selectalllabel"> Seleccionar Todo </label>  -->
                <div class="row mb-2">
                    <div class="col-12 text-end">
                        <button class="btn btn-link" id="btnSelectAll"> Seleccionar Todo </button>
                    </div>
                </div>

                <div id="myGridMenu" class="ag-theme-quartz text-dark-400" style="height: 500px; min-height: 500px;"></div>
            </div>
        </div>
    </div>
</div>


<script src="src/Views/roles/roles.js"></script>
<link rel="stylesheet" href="src/Views/roles/roles.css">