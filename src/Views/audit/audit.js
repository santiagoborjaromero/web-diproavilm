setTimeout(function(){
    if (permisosLectura){
        estructuraGrid();
        showDivs(0);
        $("#fechadesde").val( moment().format("YYYY-MM-DD") )
        $("#fechahasta").val( moment().format("YYYY-MM-DD") )

    } else{
        $("#btmDivs").addClass("hide");
        sendMessage("error", "Autorizacion", mensajeNoPermisoLectura);
    }
},800)

lstAudit = [];
lstPais = [];
lstProvincia = [];
lstCiudad = [];
dataSelected = {};
var idmenu = "-1";

//TODO: Determinar titulo e icono que viene del menu
ruta = JSON.parse(sessionGet("current_route"));
title = ruta.name;
$("#Title").html(title);
$("#TitleIcon").addClass(ruta.icon);

//TODO: Determina los permisos de RWD 
if (permisosEscritura){
    $("#divW").removeClass("hide");
} else {
    $("#divW").addClass("hide");
}
if (permisosBorrado){
    $("#divD").removeClass("hide");
} else{
    $("#divD").addClass("hide");
}

async function loadData(params){
    showLoading("Cargando");

    habilitarBotones(false);

    let metodo = "GET";
    let url = "audit";
    await consumirApi(metodo, url, params)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {
                lstAudit = [];

                if (resp.message){
                    resp.message.forEach( e => {
                        e["idaudit"] = e.idaudit.toString();
                        lstAudit.push(e)    
                    });
                }
                
                gridApi.setGridOption("rowData", lstAudit);
                gridApi.sizeColumnsToFit();

                // console.log(lstAudit)
                // parent();

            } else {
                sendMessage("error", title, resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            closeLoading();
            console.log("ERR", err);
            sendMessage("error", title, JSON.stringify(err.responseText));
        });
}

function estructuraGrid(){
    gridOptions = {
        rowStyle: { background: 'white' },
        getRowStyle: params => {
            if (params.node.rowIndex % 2 !== 0) {
                return { background: '#f9f9f9' };
            }
        },
        rowData: [],
        deltaSort: true,
        pagination: true,
        paginationPageSize: 50,
        paginationPageSizeSelector: [5, 10,20, 30, 40, 50, 100, 200, 300, 1000],
        rowSelection: 'single',
        rowHeight: 40,
        tooltipInteraction: true,
        defaultColDef: {
            flex: 1,
            minWidth: 50,
            filter: true,
            sortable: true,
            resizable: false,
            floatingFilter: true,
            wrapText: true,
            suppressSizeToFit: true,
            autoHeaderHeight: true,
            suppressAutoSize: true,
            enableCellChangeFlash: true,
            autoHeight: true,
        },
        autoSizeStrategy: {
            // type: 'fitCellContents'
        },
        getRowId: (params) => {
            return params.data.idaudit;
        },
        onRowClicked: (event) => {
            dataSelected = event.data;
            idSelect = event.data.idaudit;
            idSelectName = event.data.fullname;
            habilitarBotones(true);
        },
        // groupDisplayType: 'groupRows',
        // groupRowRendererParams: {
        //     order: '01',
        // },
        columnDefs: [
            {
                headerName: "ID",
                flex: 1, 
                field: "idaudit",
                filter: false,
                cellClass: "text-start",
            },
            {
                headerName: "Fecha",
                flex: 2, 
                field: "date",
                filter: true,
                cellClass: "text-start",
            },
            {
                headerName: "Responsable",
                flex: 2, 
                field: "fullname",
                filter: true,
                cellClass: "text-start",
            },
            // {
            //     headerName: "User Agent",
            //     flex: 3, 
            //     field: "ipaddr",
            //     filter: true,
            //     cellClass: "text-start",
            //     cellRenderer: (params) => {
            //         let ipaddr = params.data.ipaddr;
            //         return ipaddr.substring(0,20) + " ..."
            //     }
            // },
            {
                headerName: "Metodo",
                flex: 1, 
                field: "method",
                filter: true,
                cellClass: "text-start",
                cellRenderer: (params) => {
                    let method = params.data.method;
                    let cls = "";
                    let html = "";

                    switch(method){
                        case "GET":
                            cls  = "bg-success";
                            break;
                        case "POST":
                            cls  = "bg-primary";
                            break;
                        case "PUT":
                            cls  = "bg-warning";
                            break;
                        case "DELETE":
                            cls  = "bg-danger";
                            break;
                    }

                    return `<kbd class='${cls}'>${method}<kbd>`;
                }
            },
            {
                headerName: "Ruta",
                flex: 2, 
                field: "route",
                filter: true,
                cellClass: "text-start",
                // cellRenderer: (params) => {
                //     let route = params.data.route;
                //     return route.substring(0,20) + " ..."
                // }
            },
            {
                headerName: "Json",
                flex: 1, 
                field: "json",
                filter: true,
                cellClass: "text-start",
                cellRenderer: (params) => {
                    let json = params.data.json;
                    let cls = "";
                    let html = "";

                    if(json != "null"){
                        cls  = "bg-success";
                        html = "<i class='fa fa-check'></i>";
                    } else {
                        cls  = "bg-secondary";
                        html = "<i class='fa fa-times'></i>";
                    }

                    return `<kbd class='${cls}'>${html}<kbd>`;
                }
            },
        ]
    }

    const myGridElement = document.querySelector("#myGrid");
    gridApi = agGrid.createGrid(myGridElement, gridOptions);
    gridApi.sizeColumnsToFit();
}

showDivs = (que = 0) => {
    switch(que){
        case 0:
            //Grid o listado 
            $("#Title").html(title);
            $("#btmNew").removeClass("hide");
            $("#btmEdit").removeClass("hide");
            $("#btmDelete").removeClass("hide");
            $("#btmRefresh").removeClass("hide");
            $("#btmSave").addClass("hide");
            $("#btmCancel").addClass("hide");
            habilitarBotones(false);

            $("#myGrid").removeClass("hide");
            $("#FormDiv").addClass("hide");
            break;
        case 1:
            //Formulario de edicion o nuevo
            $("#Title").html("Edición de " + title);
            $("#btmNew").addClass("hide");
            $("#btmEdit").addClass("hide");
            $("#btmDelete").addClass("hide");
            $("#btmRefresh").addClass("hide");
            $("#btmSave").removeClass("hide");
            $("#btmCancel").removeClass("hide");

            $("#myGrid").addClass("hide");
            $("#FormDiv").removeClass("hide");
            break;
        case 2:
            break;
    }
}

$("#btnBuscar").on("click", function(){
    let dini = $("#fechadesde").val();
    let dfin  = $("#fechahasta").val();

    let params = {
        fecha_ini: dini,
        fecha_fin: dfin
    }
    loadData(params);
});


$("#btmCancel").on("click", function(){
    showDivs(0);
});

$("#btmEdit").on("click", function(){
    // cleanRecords(dataSelected);
    // showDivs(1);

    let html = "<table class='table table-striped'>";
    html += "<tbody>";
    html += `<tr><td width="20%" class="text-start">Fecha</td><td class="text-start">${dataSelected.date}</td><tr>`;
    html += `<tr><td width="20%" class="text-start">Responsable</td><td class="text-start">${dataSelected.fullname}</td><tr>`;
    html += `<tr><td width="20%" class="text-start">Metodo</td><td class="text-start">${dataSelected.method}</td><tr>`;
    html += `<tr><td width="20%" class="text-start">Ruta</td><td class="text-start">${dataSelected.route}</td><tr>`;
    html += `<tr><td width="20%" class="text-start">Json</td><td class="text-start">${dataSelected.json}</td><tr>`;
    html += `<tr><td width="20%" class="text-start">User Agent</td><td class="text-start">${dataSelected.ipaddr}</td><tr>`;
    html += "</tbody>";
    html += "</table>";
    sendMessage("info", "Auditor", html, true);
});

$("#btmDelete").on("click", function(){
    hacerPregunta("Eliminar Beneficiario", "eliminar", "deleteBene");
});

function hacerPregunta(action='', keyword='', queFuncionEjecuto=''){
    Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        icon: 'question',
        title: title,
        text: `Para ${action}, debe escribir ${keyword}.`,
        input: "text",
        showCancelButton: true,
        inputPlaceholder: keyword,
        confirmButtonColor: '#f63c3a',
        confirmButtonText: formatoTitulo(keyword),
        cancelButtonColor: '#33a0d6',
        cancelButtonText: 'Cancelar',
        inputValidator: text => {
            return new Promise(resolve => {
              if (text.trim() !== '' && text.trim() ==  keyword) {
                resolve('');
              } else {
                resolve(
                  `Para ${action}, debe ingresar la palabra ${keyword}.`
                );
              }
            });
        }
    }).then(res => {
        if (res.isConfirmed) {
            if (queFuncionEjecuto!=''){
                eval(`realizarAccion('${queFuncionEjecuto}')`);
            }
        }
    });
}

async function realizarAccion(ruta=""){
    let method = ruta == "deleteBene" ? "DELETE" : "POST";
    let url = `${ruta}&id=${idSelect}`;

    await consumirApi(method, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            // console.log(resp)

            if (resp.status && resp.status == 'ok') {
                sendMessage("success", title, `Registro ${resp.message} eliminado con éxito`);
                showDivs(0);
                loadData();
            } else {
                sendMessage("error", title, resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            closeLoading();
            console.log("ERR", err);
            sendMessage("error", title, JSON.stringify(err.responseText));
        });

}

$("#btmRefresh").on("click", function(){
    loadData();
});

function habilitarBotones(opc = false){
    if (opc ){
        $("#btmEdit").removeClass("disabled");
        $("#btmEdit").removeClass("btn-secondary");
        $("#btmEdit").addClass("btn-info");
        
        $("#btmDelete").removeClass("disabled");
        $("#btmDelete").removeClass("btn-secondary");
        $("#btmDelete").addClass("btn-danger");

        $("#btmReset").removeClass("disabled");
        $("#btmReset").removeClass("btn-secondary");
        $("#btmReset").addClass("btn-info");
        
    } else {
        $("#btmEdit").addClass("disabled");
        $("#btmEdit").removeClass("btn-info");
        $("#btmEdit").addClass("btn-secondary");

        $("#btmDelete").addClass("disabled");
        $("#btmDelete").removeClass("btn-danger");
        $("#btmDelete").addClass("btn-secondary");
        
        $("#btmReset").addClass("disabled");
        $("#btmReset").removeClass("btn-info");
        $("#btmReset").addClass("btn-secondary");
        
    }
}

$("#submenu").on("change", function(){
    let d = $(this).val();
    checkSubmenu(d);    
});

checkSubmenu = (d) =>{
    if(d == 0){
        $("#parentDIV").removeClass("hide");
        $("#order2").removeClass("hide");
    }else{
        $("#parentDIV").addClass("hide");
        $("#order2").addClass("hide");
    }
}

$("#icon").on("keyup", function(){
    let icon = $(this).val();
    desplegarIcono(icon);
})

desplegarIcono = (icono) =>{
    $("#execIcon").html(`<kbd class="bg-primary"><i class='${icono} t16'></i></kbd>`);
}

$("#route").on("keyup", function(){
    let ruta = $(this).val();
    
    var found = verificarDisponibilidadRuta(ruta);

    let html = ""
    if (found){
        cls = "fas fa-times";
        color = "bg-danger";
        msg = "Ya existe";
    }else{
        cls = "fa fa-check";
        color = "bg-success";
        msg = "Verificado";
    }
    html += `<kbd class="${color}" title="${msg}"><i class='${cls}'></i></kbd>`;
    $("#obsRuta").html(html);

})


verificarDisponibilidadRuta = (ruta) => {
    let found = false;
    if (idmenu == "" || idmenu == "-1"){
        lstAudit.forEach( e=>{
            if (e.route == ruta){
                found = true;
            }
        });
    }
    return found;
}


