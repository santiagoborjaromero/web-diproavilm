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
            <!-- <button id="btmReestablecer" title="Reestablecer" class="btn btn-info mr-1">
                <i class="fas fa-notes-medical"></i>
                Reestablecer
            </button> -->
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
    <div class="col-12 col-md-7 align-items-center">
        <div id="myGrid" class="ag-theme-quartz text-dark-400" style="height: 500px; min-height: 500px;"></div>
    </div>
    <div class="col-12 col-md-4 align-items-center bg-white bg-opa50 round-10 p-2">
        <strong class="bold">Contenido</strong>
        <br>
        <textarea id="contenido" readonly class="form-control" cols="30" rows="15"></textarea>
    </div>
</div>


<!-- Formulario -->
<div class="row justify-content-md-center hide" id="FormDiv">
    <div class="col-12 col-md-11 align-items-center bg-white round-10">
        <div class="row">
            <div class="col-12 col-md-8">
                <div class="row mt-5 mb-2">
                    <label class="col-12 col-md-3 control-label text-end">Opción <sup class="text-danger" title="Requerido">*</sup></label>
                    <div class="col-12 col-md-8">
                        <input class="form-control" type="hidden" id="idbotdic">
                        <input class="form-control" type="text" id="menu"  placeholder="Capa de salida esperada">
                    </div>
                    <div class="col-6 col-md-1 text-start">
                        <i class="fas fa-question-circle" onclick="help('Opción o capa de salida es lo que la Inteligencia artificial debe responder para que el usuario tenga informacion que necesita.')"></i>
                    </div>
                </div>
                <div class="row mb-2" >
                    <label class="col-12 col-md-3 control-label text-end">Saldrá en el listado del menu <sup class="text-danger" title="Requerido">*</sup></label>
                    <div class="col-12 col-md-8">
                        <select id="ismenu" class="form-control">
                            <option value="0">No</option>
                            <option value="1">Si</option>
                        </select>
                    </div>
                    <div class="col-6 col-md-1 text-start">
                        <i class="fas fa-question-circle" onclick="help('Si - formará parte del menu cuando el usuario solicite un listado de opciones.')"></i>
                    </div>
                </div>
                <div class="row mb-2">
                    <label class="col-12 col-md-3 control-label text-end">Descripción <sup class="text-danger" title="Requerido">*</sup></label>
                    <div class="col-12 col-md-8">
                        <input class="form-control" type="text" id="description"  placeholder="Descripcion">
                    </div>
                    <div class="col-6 col-md-1 text-start">
                        <i class="fas fa-question-circle" onclick="help('Ingrese la descripción corta sobre el contenido de la opcion.')"></i>
                    </div>
                </div>
                <div class="row mb-2" >
                    <label class="col-12 col-md-3 control-label text-end">Que acción tendrá <sup class="text-danger" title="Requerido">*</sup></label>
                    <div class="col-12 col-md-4">
                        <select id="action" class="form-control">
                            <option value="T">Texto</option>
                            <option value="Q">Comando SQL</option>
                            <option value="M">Lista de Menu</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-2" >
                    <label class="col-12 col-md-3 control-label text-end" for="txt">Contenido <sup class="text-danger" title="Requerido">*</sup></label>
                    <div class="col-12 col-md-9">
                        <textarea id="txt" cols="30" rows="15" class="form-control"></textarea>
                    </div>
                </div>
              
            </div>
            <div class="col-12 col-md-4">
                <div id="variables" class="hide">
                    <br><br><br><br><br><br><br><br><br><br>
                    <span class="t18 bold">Variables disponibles</span>
                    <hr>
                    <table width="100%">
                        <tr>
                            <td width="10%"><kbd class="bg-primary cursor" id="varNombre">&#60;nombre&#62;</kbd></td>
                            <td>Nombre del usuario telegram.</td>
                        </tr>
                        <tr>
                            <td width="10%"><kbd class="bg-primary cursor" id="varTiempo">&#60;tiempo&#62;</kbd></td>
                            <td>Tiempo, buenas tardes, buenos dias, buenas noches.</td>
                        </tr>
                        <tr>
                            <td width="10%"><kbd class="bg-primary cursor" id="varFecha">&#60;fecha&#62;</kbd></td>
                            <td> La fecha actual</td>
                        </tr>
                    </table>
                </div>

                <!-- <kbd class="cursor" id="varNombre">&#60;nombre&#62;</kbd>  - Nombre del usuario telegram.<br>
                <kbd class="cursor" id="varTiempo">&#60;tiempo&#62;</kbd> - Tiempo, buenas tardes, buenos dias, buenas noches.<br>
                <kbd class="cursor" id="varFecha">&#60;fecha&#62;</kbd> - La fecha actual.<br> -->
            </div>
           
        </div>
        
    </div>
</div>


<script src="src/Views/bot_dict/bot_dict.js"></script>
<link rel="stylesheet" href="src/Views/bot_dict/bot_dict.css">