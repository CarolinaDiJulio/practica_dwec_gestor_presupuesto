let presupuesto=0;
let gastos=[];
let idGasto=0;


function actualizarPresupuesto(presu) {
    if (isNaN(presu)){
        return -1
    }
    if(presu <0){
        return -1
    }

    presupuesto=presu
    return presupuesto
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(descripcion, valor) {
    this.descripcion=descripcion
    if (isNaN(valor)){
        this.valor=0;
    }
    if (valor>0){
        this.valor=Number(valor)
        
    }else{
        this.valor=0;
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

function listarGastos(){
    return gastos
}
function anyadirGasto(gasto1){
    gasto1.id=idGasto;
    idGasto++
    gastos.push(gasto1)
}
function borrarGasto(){

}
function calcularTotalGastos(){}
function calcularBalance(){}


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
