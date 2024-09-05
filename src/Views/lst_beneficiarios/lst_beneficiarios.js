setTimeout(function(){
    if (permisosLectura){
        estructuraGrid();
        loadData();
        showDivs(0);
    } else{
        $("#btmDivs").addClass("hide");
        sendMessage("error", "Autorizacion", mensajeNoPermisoLectura);
    }
},800)


lstBeneficiarios = [];
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

async function loadData(){
    showLoading("Cargando");

    habilitarBotones(false);
    
    let metodo = "GET";
    let url = "bene";
    await consumirApi(metodo, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}


            if (resp.status && resp.status == 'ok') {
                lstBeneficiarios = [];
                resp.message.forEach( e => {
                    e["idbeneficiary"] = e.idbeneficiary.toString();
                    lstBeneficiarios.push(e)    
                });
                
                gridApi.setGridOption("rowData", lstBeneficiarios);
                gridApi.sizeColumnsToFit();

                // console.log(lstBeneficiarios)
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
            if (params.data.deleted_at == null){
                if (params.node.rowIndex % 2 !== 0) {
                    return { background: '#f9f9f9' };
                }
            } else{
                return { background: '#FFE2E2'};
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
            floatingFilter: false,
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
            return params.data.idbeneficiary;
        },
        onRowClicked: (event) => {
            dataSelected = event.data;
            idSelect = event.data.idbeneficiary;
            idSelectName = event.data.nombre;
            habilitarBotones(true);
        },
        columnDefs: [
            {
                headerName: "Tipo Bene",
                flex: 1, 
                field: "type",
                filter: true,
                cellClass: "text-start",
                cellRenderer: (params) => {
                    let type = params.data.type;
                    let cls = "";
                    let html = "";
                    let text = "";
                    if (type == "C"){
                        text = "Cliente"
                        cls  = "bg-success";
                    } else if (type == "P"){
                        text = "Proveedor"
                        cls  = "bg-warning";
                    } else if (type == "A"){
                        text = "Proveedor/Cliente"
                        cls  = "bg-info";
                    } else if (type == "E"){
                        text = "Empresa"
                        cls  = "bg-primary";
                    }
                    // return `<span class='${cls}'>${type}<span>`;
                    return `<kbd class='${cls}'>${text}<kbd>`;
                }
            },
            {
                headerName: "Tipo Id.",
                flex: 2, 
                field: "identificationtype",
                filter: true,
                cellClass: "text-start",
            },
            {
                headerName: "Identificacion",
                flex: 1, 
                field: "identification",
                filter: true,
                cellClass: "text-start",
            },
            {
                headerName: "Nombre",
                flex: 4, 
                field: "nombre",
                filter: true,
                cellClass: "text-start",
            },
            {
                headerName: "Ciudad",
                flex: 1, 
                field: "ciudad",
                filter: true,
                cellClass: "text-start",
            },
            {
                headerName: "Eliminado",
                flex: 1, 
                field: "deleted_at",
                filter: true,
                cellClass: "text-start",
                cellRenderer: (params) => {
                    let html="";
                    let inactivo = params.data.deleted_at ? 1 : 0;
                    if (inactivo == 1){
                        cls = "fa fa-check";
                        color = "bg-danger";
                    }else{
                        cls = "fas fa-minus";
                        color = "bg-light text-dark";
                    }
                    html += `<kbd class='${color}'><i class="${cls}"></i></kbd>`;
                    return html;
                },
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



//TODO:EXPORTAR PDF Y CSV
$("#PDF").on("click", function(event){
    event.preventDefault();
    imprimir(title, prepararArray(1), 'l', "");
});
$("#CSV").on("click", function(event){
    event.preventDefault();
    exportarCSV(title, prepararArray(2), "");
});

function prepararArray(opc){
    let lstR = [];
    lstBeneficiarios.forEach(e=>{
        if (opc==1){
            lstR.push({
                "Tipo": e.type=="C" ? "Cliente" : (e.type=="P" ? "Proveedor" : (e.type=="A" ? "Cliente/Proveedor" : 'Empresa' ) ),
                "Tipo Identificacion": e.ididentificationtype == 1 ? 'RUC' : (e.ididentificationtype == 2 ? 'CEDULA' : (e.ididentificationtype == 3 ? 'PASAPORTE' : (e.ididentificationtype == 4 ? 'CONSUMIDOR FINAL' : 'IDENTIFICACION DEL EXTERIOR'))) ,
                "Identificacion": e.identification,
                "Razon Social": e.nombre + " / " + e.nombrecomercial,
                "Telefono": e.telefono,
                "Email": e.email,
            })
        } else{
            lstR.push({
                "ID": e.idbeneficiary,
                "Tipo": e.type=="C" ? "Cliente" : (e.type=="P" ? "Proveedor" : (e.type=="A" ? "Cliente/Proveedor" : 'Empresa' ) ),
                "Tipo Identificacion": e.ididentificationtype == 1 ? 'RUC' : (e.ididentificationtype == 2 ? 'CEDULA' : (e.ididentificationtype == 3 ? 'PASAPORTE' : (e.ididentificationtype == 4 ? 'CONSUMIDOR FINAL' : 'IDENTIFICACION DEL EXTERIOR'))) ,
                "Identificacion": e.identification,
                "Razon Social": e.nombre,
                "Nombre Comercial": e.nombrecomercial,
                "Direccion": e.direccion,
                "Pais": e.pais,
                "Provincia": e.provincia,
                "Ciudad": e.ciudad,
                "Parroquia": e.parroquia,
                "Telefono": e.telefono,
                "Email": e.email,
                "Web": e.web,
                "Eliminado": e.deleted_at,
                "Cuota Credito": e.creditquota,
                "Dias de Credito": e.creditdays,
                "Cuenta Contable": e.account,
            })
            
        }
    })
    return lstR;
}

