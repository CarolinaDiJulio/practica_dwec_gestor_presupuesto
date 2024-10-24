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
    let diaFecha=fecha.getDate();
    let mesFecha=fecha.getMonth()+1;
    let anyoFecha=fecha.getFullYear();

    if(periodo=="dia"){
        return `${anyoFecha}-${mesFecha}-${diaFecha}`;
    }
    if (periodo=="mes"){
        return `${anyoFecha}-${mesFecha}`;
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
function filtrarGastos(){

}
function agruparGastos(){

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
