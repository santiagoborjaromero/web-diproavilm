
setTimeout(function(){
    estructuraGrid();
    loadData();
},800)

lstUsers = [];

/** 
 * Verificar los permisos (scope) de los usuarios
 */
if (scopeUser.includes("W")) {
    $("btmNuevo").removeClass("hide");
    $("btmEdit").removeClass("hide");
}else{
    $("btmNuevo").addClass("hide");
    $("btmEdit").addClass("hide");
}
if (scopeUser.includes("D")) {
    $("btmDelete").removeClass("hide");
}else{
    $("btmDelete").addClass("hide");
}

async function loadData(){
    showLoading("Cargando");

    estadoBotones(false);
    
    let metodo = "GET";
    let url = "users";
    await consumirApi(metodo, url)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            // console.log(resp)

            if (resp.status && resp.status == 'ok') {
                lstUsers = resp.message;
                // console.log(lstUsers)
                // lstUsers.forEach( e=>{
                //     transaction = { add: [e] };
                //     gridApi.applyTransactionAsync(transaction);
                // })
                // // let params = {
                // //     force: true,
                // //     suppressFlash: true,
                // // };
                gridApi.setGridOption("rowData", lstUsers);
                gridApi.sizeColumnsToFit();
            } else {
                sendMessage("error", "Usuarios", resp.message || JSON.stringify(resp));
            }
        })
        .catch( err => {
            closeLoading();
            console.log("ERR", err);
            sendMessage("error", "Usuarios", JSON.stringify(err.responseText));
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
            sortable: false,
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
            return params.data.iduser;
        },
        onRowClicked: (event) => {
            idSelect = event.data.iduser;
            idSelectName = event.data.username;
            estadoBotones(true);
        },
        columnDefs: [
            {
                headerName: "ID",
                flex: 1, 
                field: "iduser",
                filter: false,
                cellClass: "text-start",
            },
            {
                headerName: "Usuario",
                flex: 1, 
                field: "username",
                filter: true,
                cellClass: "text-start",
            },
            {
                headerName: "Nombre Completo",
                flex: 2, 
                field: "fullname",
                filter: true,
                cellClass: "text-start",
                sort: "asc",
                sortIndex: 1, 
            },
            {
                headerName: "Rol",
                flex: 2, 
                field: "rolename",
                filter: false,
                cellClass: "text-start",
            },
            {
                headerName: "Permisos",
                flex: 1, 
                field: "scope",
                filter: false,
                cellClass: "text-start",
                // pinned: "left"
                cellRenderer: (params) => {
                    let scope = params.data.scope;
                    // let arr = [...scope];
                    let html = "";

                    title_r = "Lectura";
                    if (scope.includes("R")){
                        color_r = "bg-success";
                    }else{
                        color_r = "bg-light";
                    }

                    title_w = "Escritura";
                    if (scope.includes("W")){
                        color_w = "bg-warning";
                    }else{
                        color_w = "bg-light";
                    }

                    title_d = "Borrado";
                    if (scope.includes("D")){
                        color_d = "bg-danger";
                    }else{
                        color_d = "bg-light";
                    }

                
                    html += `<kbd class="${color_r}" title="${title_r}">R</kbd> `;
                    html += `<kbd class="${color_w}" title="${title_w}">W</kbd> `;
                    html += `<kbd class="${color_d}" title="${title_d}">D</kbd> `;
                    return html;
                }
            },
            
            {
                headerName: "Estado",
                flex: 1, 
                field: "status",
                filter: false,
                // cellClass: "text-start",
                cellClass: "ag-header-cell-label-center", 
                cellRenderer: (params) => {
                    let status = params.data.status;
                    let html = "";
                    let cls = "";
                    let color = "";
                    if (status == 1){
                        cls = "fa fa-check";
                        color = "bg-success";
                    }else{
                        cls = "fa fa-times";
                        color = "bg-danger";
                    }
                    html += `<kbd class='${color}'><i class="${cls}"></i></kbd>`;
                    return html;
                },
                // cellStyle: (params) =>{
                //     let data = params.value;
                //     let bcolor = "";
    
                //     if (data == 1) {
                //         bcolor = "2bac61";
                //     }else {
                //         bcolor = "cb3d2d";
                //     }
                //     return {textAlign: 'center', backgroundColor: `#${bcolor}`, color: "#fff"};
                // },
            },
            {
                headerName: "Actualizado",
                flex: 1, 
                field: "udated_at",
                filter: false,
                cellClass: "text-start",
            },
            {
                headerName: "Inactivado",
                flex: 1, 
                field: "deleted_at",
                filter: false,
                cellClass: "text-start",
            },
        ]
    }

    const myGridElement = document.querySelector("#myGrid");
    gridApi = agGrid.createGrid(myGridElement, gridOptions);
    gridApi.sizeColumnsToFit();
}

$("#btmUsers").on("click", function(){
    console.log("Hola")
});

$("#btmEdit").on("click", function(){

});

$("#btmDelete").on("click", function(){

});

$("#btmRefresh").on("click", function(){
    
    loadData();

});


function estadoBotones(opc = false){
    if (opc){
        $("#btmEdit").removeClass("disabled");
        $("#btmEdit").removeClass("btn-secondary");
        $("#btmEdit").addClass("btn-info");
        $("#btmDelete").removeClass("disabled");
        $("#btmDelete").removeClass("btn-secondary");
        $("#btmDelete").addClass("btn-danger");
    }else{
        $("#btmEdit").addClass("disabled");
        $("#btmEdit").removeClass("btn-info");
        $("#btmEdit").addClass("btn-secondary");
        $("#btmDelete").addClass("disabled");
        $("#btmDelete").removeClass("btn-danger");
        $("#btmDelete").addClass("btn-secondary");
    }
}