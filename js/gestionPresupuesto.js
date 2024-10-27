let presupuesto=0;
let gastos=[];
let idGasto=0;


function actualizarPresupuesto(presu) {
    if (isNaN(presu) || presu <0){
        return -1
    }

    presupuesto=presu
    return presupuesto
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(descripcion, valor,fecha,...etiquetas) {

    this.descripcion=descripcion
    this.valor=(isNaN(valor) || valor<=0) ? 0 : valor
    this.fecha=(!fecha || isNaN(Date.parse(fecha))) ? Date.now() : Date.parse(fecha);
    this.etiquetas=(!etiquetas)? [] : etiquetas

    this.mostrarGasto=function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
    }

    this.actualizarDescripcion=function(descripcionNueva){
        this.descripcion=descripcionNueva
    }

    this.actualizarValor=function(valorNuevo){
        if (valorNuevo>0){
            this.valor=valorNuevo
        }
    }
}

CrearGasto.prototype.mostrarGastoCompleto=function(){
    let fechaLocal=new Date(this.fecha).toLocaleString();
    let gastoCompleto= `${this.mostrarGasto()}.\nFecha: ${fechaLocal}\nEtiquetas:\n` 
   
   for (this.etiqueta of this.etiquetas){
    gastoCompleto+=`- ${this.etiqueta}\n`
   }
   return gastoCompleto
}

CrearGasto.prototype.actualizarFecha=function(nuevaFecha){
    if(!isNaN(Date.parse(nuevaFecha))){
        this.fecha=Date.parse(nuevaFecha)
    }
}

CrearGasto.prototype.anyadirEtiquetas=function(...etiquetasNuevas){
    etiquetasNuevas.forEach(etiquetaNueva => {
        if (!this.etiquetas.includes(etiquetaNueva)){
            this.etiquetas.push(etiquetaNueva)
        }
    });
    
}
CrearGasto.prototype.borrarEtiquetas=function(...etiquetasABorrar){
   this.etiquetas=this.etiquetas.filter(etiqueta=>!etiquetasABorrar.includes(etiqueta))
}
CrearGasto.prototype.obtenerPeriodoAgrupacion=function(periodo){
    let fecha=new Date(this.fecha);
    let anyoMesDia=fecha.toISOString().substring(0,10);
    let anyoMes=fecha.toISOString().substring(0,7);
    let anyoFecha=fecha.getFullYear();

    if(periodo=="dia"){
        return `${anyoMesDia}`
    }
    if (periodo=="mes"){
        return `${anyoMes}`
    }
    
    if (periodo=="anyo"){
        return anyoFecha;
    }
}
function listarGastos(){
    return gastos
}

function anyadirGasto(gastoNuevo){
    gastoNuevo.id=idGasto;
    idGasto++
    gastos.push(gastoNuevo)
}
function borrarGasto(identificador){
    let encontrado=gastos.findIndex(gasto=>gasto.id===identificador)

    if (encontrado>-1){
        gastos.splice(encontrado,1)
    }
}

function calcularTotalGastos(){
    let suma=0;

    gastos.forEach(gasto => {
        suma+=gasto.valor
    });
    
    return suma;
}
function calcularBalance(){
    let balance=presupuesto-calcularTotalGastos();

    return balance
}
function filtrarGastos(objeto){
  let gastosFiltrados=gastos.filter(function(gasto){
    let cumple=true;
    if(objeto.fechaDesde!=undefined && Date.parse(objeto.fechaDesde)>gasto.fecha){
        cumple=false;
    }
    if(objeto.fechaHasta!=undefined && Date.parse(objeto.fechaHasta)<gasto.fecha){
        cumple=false;
    }
    if(objeto.valorMinimo!=undefined && objeto.valorMinimo>gasto.valor){
        cumple=false
    }
    if(objeto.valorMaximo!=undefined && objeto.valorMaximo<gasto.valor){
        cumple=false
    }
    if(objeto.descripcionContiene!=undefined && !gasto.descripcion.toLowerCase().includes(objeto.descripcionContiene.toLowerCase())){
        cumple=false
    }
    if(objeto.etiquetasTiene!=undefined){
        let etiquetasObjeto=objeto.etiquetasTiene.map(function(etiquetaObjeto){
            return etiquetaObjeto.toLowerCase()
        })
        let etiquetasGasto=gasto.etiquetas.map(function(etiquetaGasto){
            return etiquetaGasto.toLowerCase()
        })

        if(!etiquetasObjeto.some((et)=>etiquetasGasto.includes(et))){
            cumple=false
        }
        
    }
    return cumple;
});
return gastosFiltrados
  }

function agruparGastos(periodo='mes',etiquetas,fechaDesde,fechaHasta){
    let gastosFiltrados=filtrarGastos({etiquetas,fechaDesde,fechaHasta})
    
    return gastosFiltrados.reduce(function(acc,gastoFiltrado){
        let periodoAgrupacion=gastoFiltrado.obtenerPeriodoAgrupacion(periodo)
       acc[periodoAgrupacion]=acc[periodoAgrupacion] || 0
       acc[periodoAgrupacion]=acc[periodoAgrupacion]+gastoFiltrado.valor
       return acc
       
    },{});
}



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos 
}
