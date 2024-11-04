import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js'

gestionPresupuesto.actualizarPresupuesto(1500);

let valor=gestionPresupuesto.mostrarPresupuesto()

gestionPresupuestoWeb.mostrarDatoEnId("presupuesto",valor)

let gasto1=new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida")
let gasto2=new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida")
let gasto3=new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte")
let gasto4=new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina")
let gasto5=new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros")
let gasto6=new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")

gestionPresupuesto.anyadirGasto(gasto1)
gestionPresupuesto.anyadirGasto(gasto2)
gestionPresupuesto.anyadirGasto(gasto3)
gestionPresupuesto.anyadirGasto(gasto4)
gestionPresupuesto.anyadirGasto(gasto5)
gestionPresupuesto.anyadirGasto(gasto6)

let gastosTotales=gestionPresupuesto.calcularTotalGastos()

gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales",gastosTotales)

let balanceTotal=gestionPresupuesto.calcularBalance();

gestionPresupuestoWeb.mostrarDatoEnId("balance-total",balanceTotal)

let listadoGastos=gestionPresupuesto.listarGastos();

for (let gasto of listadoGastos){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo",gasto)
}

let gastosSeptiembre2021=gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01",fechaHasta:"2021-09-30"})

for(let gasto of gastosSeptiembre2021){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1",gasto)
}

let gastosMayoresA50=gestionPresupuesto.filtrarGastos({valorMinimo:50})

for(let gasto of gastosMayoresA50){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto)
}

let gastosMayoresA200=gestionPresupuesto.filtrarGastos({valorMinimo:200})

for(let gasto of gastosMayoresA200){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto)
}
let gastosMenorA50=gestionPresupuesto.filtrarGastos({valorMaximo:50})
let gastosEtiquetaComida=gestionPresupuesto.filtrarGastos({etiquetasTiene: ["comida"]})
let gastosEtiquetaTransporte=gestionPresupuesto.filtrarGastos({etiquetasTiene: ["transporte"]})

for (let gasto of (gastosEtiquetaComida || gastosEtiquetaTransporte) && gastosMenorA50){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4",gasto)
}

let gastosPorDia=gestionPresupuesto.agruparGastos("dia")

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia",gastosPorDia,"día")

let gastosPorMes=gestionPresupuesto.agruparGastos("mes")
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes",gastosPorMes,"mes")

let gastosPorAnyo=gestionPresupuesto.agruparGastos("anyo")
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo",gastosPorAnyo,"año")