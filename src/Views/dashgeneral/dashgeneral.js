lstData = [];

ruta = JSON.parse(sessionGet("current_route"));
title = ruta.name;
$("#Title").html(title);
$("#TitleIcon").addClass(ruta.icon);

var ctxIE;
var ctxTIE ;
var ctxPolarTC;
var ctxPolarCategoria;
var ctxPolarLinea;

ctxIE = document.getElementById('myCIE');
ctxTIE = document.getElementById('myCTIE');
ctxPolarTC = document.getElementById('myPolarTC');
ctxPolarCategoria = document.getElementById('myPolarCat');
ctxPolarLinea = document.getElementById('myPolarLinea');

loadData();

$("#btnRefresh").on("click", function(){
    loadData();
})

async function loadData(){
    showLoading("Cargando");

    let params = {
        fecha_ini: "2024-01-01",
        fecha_fin: moment().format("YYYY-MM-DD")
    }

    let metodo = "POST";
    let url = "movgeneral";
    await consumirApi(metodo, url, params)
        .then( resp=>{
            closeLoading();
            try {
                resp = JSON.parse(resp);
            } catch (ex) {}

            if (resp.status && resp.status == 'ok') {
                lstData = resp.message;
                graficar();
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


function graficar(){

    let trimestres = {
        labels:["Trim 1", "Trim 2", "Trim 3", "Trim 4"],
        data_egreso:[],
        data_ingreso:[],
        data_egreso_total:[],
        data_ingreso_total:[],
    }

    let trim1egr = 0;
    let trim1ing = 0;
    let trim2egr = 0;
    let trim2ing = 0;
    let trim3egr = 0;
    let trim3ing = 0;
    let trim4egr = 0;
    let trim4ing = 0;
    let trim1egrtot = 0;
    let trim1ingtot = 0;
    let trim2egrtot = 0;
    let trim2ingtot = 0;
    let trim3egrtot = 0;
    let trim3ingtot = 0;
    let trim4egrtot = 0;
    let trim4ingtot = 0;
    let egresoStock = 0;
    let egresoTotal = 0;
    let ventasStock = 0;
    let ventasTotal = 0;
    let found = false;

    let tipoComprobantes = [];
    let CategoriaProd = [];
    let LineaProd = [];

    let Top5Prod = [];
    let Top5Clie = [];
    let Top5Ciu = [];

    lstData.forEach( d => {

        /** TRIMESTRES  */
        trim1egr += d.trimestre == 1 && d.asiento == 'E' ?  parseFloat(d.cantidad) : 0;
        trim2egr += d.trimestre == 2 && d.asiento == 'E' ?  parseFloat(d.cantidad) : 0;
        trim3egr += d.trimestre == 3 && d.asiento == 'E' ?  parseFloat(d.cantidad) : 0;
        trim4egr += d.trimestre == 4 && d.asiento == 'E' ?  parseFloat(d.cantidad) : 0;

        trim1ing += d.trimestre == 1 && d.asiento == 'I' ?  parseFloat(d.cantidad) : 0;
        trim2ing += d.trimestre == 2 && d.asiento == 'I' ?  parseFloat(d.cantidad) : 0;
        trim3ing += d.trimestre == 3 && d.asiento == 'I' ?  parseFloat(d.cantidad) : 0;
        trim4ing += d.trimestre == 4 && d.asiento == 'I' ?  parseFloat(d.cantidad) : 0;

        trim1egrtot += d.trimestre == 1 && d.asiento == 'E' ?  parseFloat(d.total) : 0;
        trim2egrtot += d.trimestre == 2 && d.asiento == 'E' ?  parseFloat(d.total) : 0;
        trim3egrtot += d.trimestre == 3 && d.asiento == 'E' ?  parseFloat(d.total) : 0;
        trim4egrtot += d.trimestre == 4 && d.asiento == 'E' ?  parseFloat(d.total) : 0;

        trim1ingtot += d.trimestre == 1 && d.asiento == 'I' ?  parseFloat(d.total) : 0;
        trim2ingtot += d.trimestre == 2 && d.asiento == 'I' ?  parseFloat(d.total) : 0;
        trim3ingtot += d.trimestre == 3 && d.asiento == 'I' ?  parseFloat(d.total) : 0;
        trim4ingtot += d.trimestre == 4 && d.asiento == 'I' ?  parseFloat(d.total) : 0;

        /** TOTAL CANTIDAD Y VALOR POR VENTAS */
        ventasStock += d.coddoc == "FV" ?  parseFloat(d.cantidad) : 0;
        ventasTotal += d.coddoc == "FV" ?  parseFloat(d.total) : 0;
        
        /** TOTAL POR TIPO DE COMPROBANTES */

        found = false;
        tipoComprobantes.forEach( (tc, idx) => {

            if (!found && tc.tipo == d.movimiento){
                found = true;
                tipoComprobantes[idx].ingreso = tc.ingreso + (d.asiento == "I" ? parseFloat(d.total) : 0);
                tipoComprobantes[idx].egreso = tc.egreso + (d.asiento == "E" ? parseFloat(d.total) : 0);
            }
        })
        if (!found){
            tipoComprobantes.push(
                {
                    tipo: d.movimiento, 
                    ingreso: d.asiento == "I" ? parseFloat(d.total) : 0, 
                    egreso: d.asiento == "E" ? parseFloat(d.total) : 0
                }
            )
        }
        
        /** TOTAL POR CATEGORIAS */
        found = false;
        CategoriaProd.forEach( (tc, idx) => {

            if (!found && tc.label == d.categoria){
                found = true;
                CategoriaProd[idx].ingreso = tc.ingreso + (d.asiento == "I" ? parseFloat(d.total) : 0);
                CategoriaProd[idx].egreso = tc.egreso + (d.asiento == "E" ? parseFloat(d.total) : 0);
            }
        })
        if (!found){
            CategoriaProd.push(
                {
                    label: d.categoria, 
                    ingreso: d.asiento == "I" ? parseFloat(d.total) : 0, 
                    egreso: d.asiento == "E" ? parseFloat(d.total) : 0
                }
            )
        }

        /** TOTAL POR LINEA DE PRODUCTOS */
        found = false;
        LineaProd.forEach( (tc, idx) => {

            if (!found && tc.label == d.linea){
                found = true;
                LineaProd[idx].ingreso = tc.ingreso + (d.asiento == "I" ? parseFloat(d.total) : 0);
                LineaProd[idx].egreso = tc.egreso + (d.asiento == "E" ? parseFloat(d.total) : 0);
            }
        })
        if (!found){
            LineaProd.push(
                {
                    label: d.linea, 
                    ingreso: d.asiento == "I" ? parseFloat(d.total) : 0, 
                    egreso: d.asiento == "E" ? parseFloat(d.total) : 0
                }
            )
        }


        /** TOP 5 PRODUCTOS */
        found = false;
        Top5Prod.forEach( (tc, idx) => {
            if (!found && tc.label == d.nombre){
                found = true;
                Top5Prod[idx].egreso = tc.egreso + (d.asiento == "E" ? parseFloat(d.total) : 0);
            }
        })
        if (!found){
            if (d.coddoc == "FV"){
                Top5Prod.push(
                    {
                        label: d.nombre, 
                        egreso: d.asiento == "E" ? parseFloat(d.total) : 0
                    }
                )
            }
        }


        /** TOP 5 CLIENTES */
        found = false;
        Top5Clie.forEach( (tc, idx) => {
            if (!found && tc.label == d.beneficiario){
                found = true;
                Top5Clie[idx].egreso = tc.egreso + (d.asiento == "E" ? parseFloat(d.total) : 0);
            }
        })
        if (!found){
            if (d.asiento == "E"){
                Top5Clie.push(
                    {
                        label: d.beneficiario, 
                        egreso: d.asiento == "E" ? parseFloat(d.total) : 0
                    }
                )
            }
        }

        /** TOP 5 CIUDADES */
        found = false;
        Top5Ciu.forEach( (tc, idx) => {
            if (!found && tc.label == d.ciudad){
                found = true;
                Top5Ciu[idx].egreso = tc.egreso + (d.asiento == "E" ? parseFloat(d.total) : 0);
            }
        })
        if (!found){
            if (d.asiento == "E"){
                Top5Ciu.push(
                    {
                        label: d.ciudad, 
                        egreso: d.asiento == "E" ? parseFloat(d.total) : 0
                    }
                )
            }
        }
    });

    trimestres.data_ingreso= [trim1ing, trim2ing, trim3ing, trim4ing];
    trimestres.data_ingreso_total= [trim1ingtot, trim2ingtot, trim3ingtot, trim4ingtot];
    trimestres.data_egreso = [trim1egr, trim2egr, trim3egr, trim4egr];
    trimestres.data_egreso_total= [trim1egrtot, trim2egrtot, trim3egrtot, trim4egrtot];
    
    egresoStock = trim1ing + trim2ing + trim3ing + trim4ing;
    egresoTotal = trim1ingtot + trim2ingtot + trim3ingtot + trim4ingtot;

    porcStock = (ventasStock / egresoStock) * 100;
    porcTotal = (ventasTotal / egresoTotal) * 100;
    
    $("#egresoStock").html(numero(egresoStock,2));
    $("#egresoTotal").html(numero(egresoTotal,2));

    $("#ventasStock").html(numero(ventasStock,2));
    $("#ventasTotal").html(numero(ventasTotal,2));

    $("#porcStock").html(numero(porcStock,2));
    $("#porcTotal").html(numero(porcTotal,2));

    

    new Chart(ctxIE, {
        type: 'bar',
        data: {
            labels: trimestres.labels,
            datasets: [
                {
                    label: 'Ingresos',
                    data: trimestres.data_ingreso,
                    borderWidth: 0
                },
                {
                    label: 'Egresos',
                    data: trimestres.data_egreso,
                    borderWidth: 0
                }
            ]
        },
        options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
        }
    });
    new Chart(ctxTIE, {
        type: 'bar',
        data: {
        labels: trimestres.labels,
        datasets: [
            {
                label: 'Ingresos',
                data: trimestres.data_ingreso_total,
                borderWidth: 0
            },
            {
                label: 'Egresos',
                data: trimestres.data_egreso_total,
                borderWidth: 0
            }
        ]
        },
        options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
        }
    });
    
    /**TIPO DE COMPROBANTES */
    let grptipo = []
    let grpIng = [];
    let grpEgr = [];
    let tblTCTotIng = 0;
    let tblTCTotEgr = 0;
    tipoComprobantes.forEach(tc=>{
        $("#tblTC").append(`
            <tr>
            <td>${tc.tipo}</td>
            <td class="text-end">${numero(tc.ingreso,2)}</td>
            <td class="text-end">${numero(tc.egreso,2)}</td>
            </tr>
        `);
        grptipo.push(tc.tipo);
        grpIng.push(tc.ingreso);
        grpEgr.push(tc.egreso);
        tblTCTotIng += tc.ingreso;
        tblTCTotEgr += tc.egreso;
    })

    $("#tblTCTotIng").html(numero(tblTCTotIng,2))
    $("#tblTCTotEgr").html(numero(tblTCTotEgr,2))

    new Chart(ctxPolarTC , {
        type: 'polarArea',
        data: {
        labels: grptipo,
        datasets: [
            {
                label: 'Ingresos',
                data: grpIng,
                borderWidth: 0
            },
            {
                label: 'Egresos',
                data: grpEgr,
                borderWidth: 0
            },
        ]
        },
        options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
        }
    });

    /**TIPO DE CATEGORIAS */
    grptipo = []
    grpIng = [];
    grpEgr = [];
    tblTCTotIng = 0;
    tblTCTotEgr = 0;
    CategoriaProd.forEach(tc=>{
        $("#tblCat").append(`
            <tr>
            <td>${tc.label}</td>
            <td class="text-end">${numero(tc.ingreso,2)}</td>
            <td class="text-end">${numero(tc.egreso,2)}</td>
            </tr>
        `);
        grptipo.push(tc.label);
        grpIng.push(tc.ingreso);
        grpEgr.push(tc.egreso);
        tblTCTotIng += tc.ingreso;
        tblTCTotEgr += tc.egreso;
    })

    $("#tblCatTotIng").html(numero(tblTCTotIng,2))
    $("#tblCatTotEgr").html(numero(tblTCTotEgr,2))

    new Chart(ctxPolarCategoria , {
        type: 'pie',
        data: {
        labels: grptipo,
        datasets: [
            {
                label: 'Ingresos',
                data: grpIng,
                borderWidth: 0
            },
            {
                label: 'Egresos',
                data: grpEgr,
                borderWidth: 0
            },
        ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    /** LINEA DE PRODUCTOS */
    grptipo = []
    grpIng = [];
    grpEgr = [];
    tblTCTotIng = 0;
    tblTCTotEgr = 0;
    LineaProd.forEach(tc=>{
        $("#tblLinea").append(`
            <tr>
            <td>${tc.label}</td>
            <td class="text-end">${numero(tc.ingreso,2)}</td>
            <td class="text-end">${numero(tc.egreso,2)}</td>
            </tr>
        `);
        grptipo.push(tc.label);
        grpIng.push(tc.ingreso);
        grpEgr.push(tc.egreso);
        tblTCTotIng += tc.ingreso;
        tblTCTotEgr += tc.egreso;
    })

    $("#tblLineaTotIng").html(numero(tblTCTotIng,2))
    $("#tblLineaTotEgr").html(numero(tblTCTotEgr,2))

    new Chart(ctxPolarLinea , {
        type: 'pie',
        data: {
        labels: grptipo,
        datasets: [
            {
                label: 'Ingresos',
                data: grpIng,
                borderWidth: 0
            },
            {
                label: 'Egresos',
                data: grpEgr,
                borderWidth: 0
            },
        ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    /** TO 5 PRODUCTOS */
    
    tblTCTotIng = 0;
    tblTCTotEgr = 0;

    // console.log(Top5Prod)

    Top5Prod.sort(function (a, b) {
        if (a.egreso < b.egreso) {
          return 1;
        }
        if (a.egreso > b.egreso) {
          return -1;
        }
        return 0;
    });

    let count = 0;
    Top5Prod.forEach(tc=>{
        count ++;
        if (count<=5){
            $("#tblTop5Prod").append(`
                <tr>
                <td>${tc.label}</td>
                <td class="text-end">${numero(tc.egreso,2)}</td>
                </tr>
            `);
            tblTCTotEgr += tc.egreso;
        }
    })


    /** TOP 5 CIUDADES*/
    
    tblTCTotIng = 0;
    tblTCTotEgr = 0;

    Top5Ciu.sort(function (a, b) {
        if (a.egreso < b.egreso) {
          return 1;
        }
        if (a.egreso > b.egreso) {
          return -1;
        }
        return 0;
    });

    count = 0;
    Top5Ciu.forEach(tc=>{
        count ++;
        if (count<= 5){
            $("#tblTop5Ciu").append(`
                <tr>
                <td>${tc.label}</td>
                <td class="text-end">${numero(tc.egreso,2)}</td>
                </tr>
            `);
            tblTCTotEgr += tc.egreso;
        }
    })


    /** TOP 5 CLIENTES*/
    tblTCTotIng = 0;
    tblTCTotEgr = 0;

    Top5Clie.sort(function (a, b) {
        if (a.egreso < b.egreso) {
          return 1;
        }
        if (a.egreso > b.egreso) {
          return -1;
        }
        return 0;
    });

    count = 0;
    Top5Clie.forEach(tc=>{
        if (tc.label != "SANTIAGO BORJA ROMERO"){
            count ++;
            if (count<= 5){
                $("#tblTop5Clie").append(`
                    <tr>
                    <td>${tc.label}</td>
                    <td class="text-end">${numero(tc.egreso,2)}</td>
                    </tr>
                `);
                tblTCTotEgr += tc.egreso;
            }
        }
    })

    // $("#tblTop5ProdTotEgr").html(numero(tblTCTotIng,2))

}