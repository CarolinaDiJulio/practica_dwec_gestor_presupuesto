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
    if (isNaN(valor) || valor<=0){
        this.valor=0;
    }else{
        this.valor=valor
    }

    if (!fecha || isNaN(Date.parse(fecha))){
        this.fecha=Date.now();
    }else{
        this.fecha=Date.parse(fecha)
    }

    if(!etiquetas){
        this.etiquetas=[]
    }else{
        this.etiquetas=etiquetas
    }
    
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
    let fecha1=new Date(this.fecha).toLocaleString();
    let gastoCompleto= `${this.mostrarGasto()}. \nFecha: ${fecha1} \nEtiquetas:` 
   
   for (this.etiqueta of this.etiquetas){
    gastoCompleto+="\n- "+this.etiqueta
   }
   return gastoCompleto
}

CrearGasto.prototype.actualizarFecha=function(nuevaFecha){
    if(!isNaN(Date.parse(nuevaFecha))){
        this.fecha=Date.parse(nuevaFecha)
    }
}

CrearGasto.prototype.anyadirEtiquetas=function(){
    
}

function listarGastos(){
    return gastos
}

function anyadirGasto(gasto1){
    gasto1.id=idGasto;
    idGasto++
    gastos.push(gasto1)
}
function borrarGasto(identificador){
    let encontrado=gastos.findIndex(gasto=>gasto.id==identificador)
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
    calcularBalance 
}
