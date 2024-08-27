<div class="row bg-gray-lights p-2 border-down bg-light sticky">
    <div class="col-12 col-md-4  mt-1">
        <span>
            <i id="TitleIcon" class="mr-2 box"></i>
            <span class="t20" id="Title"></span>
        </span>
    </div>
    <div class="col-12  col-md-8 text-end">
        <span id="divW">
            <!-- <button id="btmUpLevel" class="btn btn-light mr-1" title="Editar">
                <i class="fas fa-long-arrow-alt-up"></i>
                Subir Nivel
            </button>
            <button id="btmDownLevel" class="btn btn-light mr-1" title="Editar">
                <i class="fas fa-long-arrow-alt-down"></i>
                Bajar Nivel
            </button> -->
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
    <div class="col-12 col-md-4 align-items-center  bg-opa50 round-10 p-2">
        <strong class="bold">Capas de Entradas y Salida esperada</strong>
        <br>
        <p>
            Aquí se define como el <b>BOT</b> va a responder a cada solicitud ingresada por el usuario.
        </p>
        <hr>
        <p>
            <b class="text-success bold">La capa de entrada</b> <i>(pregunta / petición)</i> es lo que el usuario escribe en el chat de telegram
            para que el BOT interprete y envie una solución.
        </p>
        <hr>
        <p>
            <b class="text-success bold">La capa de salida esperada</b> <i>(respuesta)</i> es lo que la red neuronal de la inteligencia 
            artificial interpretó. Este es el resultado luego de analizar las preguntas y respuestas.
        </p>
        <hr>
        El <b>objetivo</b> principal es <b>enseñar</b> al BOT qué preguntas deben tener qué respuestas. 
        <hr>
        Si una respuesta no es lo esperado, entonces, puede editar y determinar la respuesta correcta y asignar <b>confirmado</b>
        para que la siguiente solicitud ya cuente con este nuevo dato aprendido.
    </div>
</div>


<!-- Formulario -->
<div class="row justify-content-md-center hide" id="FormDiv">
    <div class="col-12 col-md-11 align-items-center bg-white round-10">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="row mt-5 mb-2">
                    <label class="col-12 col-md-3 control-label text-end">Capa de Entrada <sup class="text-danger" title="Requerido">*</sup></label>
                    <div class="col-12 col-md-9">
                        <input class="form-control" type="hidden" id="idbotspelling">
                        <input class="form-control" type="text" id="wordfind"  placeholder="Capa de entrada">
                    </div>
                </div>
                <div class="row mb-2" id="submenuDIV">
                    <label class="col-12 col-md-3 control-label text-end">Salida Esperada<sup class="text-danger" title="Requerido">*</sup></label>
                    <div class="col-12 col-md-9">
                        <select id="menurun" class="form-control">
                        </select>
                    </div>
                </div>
                <div class="row mb-5" id="parentDIV">
                    <label class="col-12 col-md-3 control-label text-end">Confirmado <sup class="text-danger" title="Requerido">*</sup></label>
                    <div class="col-12 col-md-9">
                        <select id="confirmed" class="form-control">
                            <option selected value="0">No confirmar, no tomar en cuenta</option>
                            <option value="1">Confirmar, es correcta la información</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="row">
                    <div class="col-12 col-md-12 align-items-center  bg-opa50 round-10 p-3">
                        <strong class="bold">Capas de Entradas y Salida esperada</strong>
                        <br>
                        <p>
                            Aquí se define como el <b>BOT</b> va a responder a cada solicitud ingresada por el usuario.
                        </p>
                        <hr>
                        <p>
                            <b class="text-success bold">La capa de entrada</b> <i>(pregunta / petición)</i> es lo que el usuario escribe en el chat de telegram
                            para que el BOT interprete y envie una solución.
                        </p>
                        <hr>
                        <p>
                            <b class="text-success bold">La capa de salida esperada</b> <i>(respuesta)</i> es lo que la red neuronal de la inteligencia 
                            artificial interpretó. Este es el resultado luego de analizar las preguntas y respuestas.
                        </p>
                        <hr>
                        El <b>objetivo</b> principal es <b>enseñar</b> al BOT qué preguntas deben tener qué respuestas. 
                        <hr>
                        Si una respuesta no es lo esperado, entonces, puede editar y determinar la respuesta correcta y asignar <b>confirmado</b>
                        para que la siguiente solicitud ya cuente con este nuevo dato aprendido.
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</div>


<script src="src/Views/bot_capas/bot_capas.js"></script>
<link rel="stylesheet" href="src/Views/bot_capas/bot_capas.css">