import * as gestionPresupuesto from './gestionPresupuesto.js'
function mostrarDatoEnId(idElemento,valor){
    let elemento=document.getElementById(idElemento)
    elemento.textContent=valor
}
function mostrarGastoWeb(idElemento,gasto){
    let elemento=document.getElementById(idElemento)
    let nuevoGasto=document.createElement("div")
    let fecha= new Date(gasto.fecha)
    nuevoGasto.classList.add("gasto")
    nuevoGasto.innerHTML=`
    
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${fecha}</div> 
        <div class="gasto-valor">${gasto.valor}</div> 
        <div class="gasto-etiquetas">
            
        </div>
    
    `
    elemento.appendChild(nuevoGasto)

    let gastoEtiquetas=nuevoGasto.querySelector(".gasto-etiquetas")
 
    gasto.etiquetas.forEach(etiqueta => {
        let nuevaEtiqueta=document.createElement("span")
        nuevaEtiqueta.classList.add("gasto-etiquetas-etiqueta")
        nuevaEtiqueta.textContent=`${etiqueta} `
        gastoEtiquetas.appendChild(nuevaEtiqueta)
    });
    let btnEditar=document.createElement("button")
    btnEditar.textContent="Editar"
    btnEditar.classList.add("gasto-editar")

    let edGasto=new EditarHandle
    edGasto.gasto=gasto
    btnEditar.addEventListener("click",edGasto)
    nuevoGasto.appendChild(btnEditar)

    let btnEliminar=document.createElement("button")
    btnEliminar.textContent="Eliminar"
    btnEliminar.classList.add("gasto-borrar")

    let borraGasto=new borrarHandle
    borraGasto.gasto=gasto
    btnEliminar.addEventListener("click",borraGasto)
    nuevoGasto.appendChild(btnEliminar)
   
}
function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let elemento=document.getElementById(idElemento)
    let nuevaAgrup=document.createElement("div")
    nuevaAgrup.classList.add("agrupacion")
    nuevaAgrup.innerHTML=`<h1>Gastos agrupados por ${periodo}</h1>`

    elemento.appendChild(nuevaAgrup)

    Object.entries(agrup).forEach(([key,value]) => {
        let nuevaProp=document.createElement("div")
        nuevaProp.classList.add("agrupacion-dato")
        nuevaProp.innerHTML=`
        <span class="agrupacion-dato-clave">${key}</span>
        <br/>
        <span class="agrupacion-dato-valor">${value}</span>` 
        nuevaAgrup.appendChild(nuevaProp)
    });
}

function repintar(){
    mostrarDatoEnId("presupuesto",gestionPresupuesto.mostrarPresupuesto())
    mostrarDatoEnId("gastos-totales",gestionPresupuesto.calcularTotalGastos())
    mostrarDatoEnId("balance-total",gestionPresupuesto.calcularBalance())
    document.getElementById("listado-gastos-completo").innerHTML = ''
    let listadoGastos=gestionPresupuesto.listarGastos();

    for (let gasto of listadoGastos){
        mostrarGastoWeb("listado-gastos-completo",gasto)
    }
}

function actualizarPresupuestoWeb(){
    let pres=Number(prompt("Introduzca un presupuesto"))
    gestionPresupuesto.actualizarPresupuesto(pres)
    repintar()
}
let btnaActualizarPresupuesto=document.getElementById("actualizarpresupuesto")
btnaActualizarPresupuesto.addEventListener("click",actualizarPresupuestoWeb)

function nuevoGastoWeb(){
    let descripcion=prompt("Introduzca la descripción del gasto")
    let valor=Number(prompt("Introduzca el valor del gasto"))
    let fecha=new Date(prompt("Introduzca la fecha del gasto"))
    fecha.toISOString().substring(0, 10);
    let etiquetas=prompt("Introduzca las etiquetas")
    let arrEtiquetas=etiquetas.split(", ")
    
    let nuevoGasto1=new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...arrEtiquetas)
    gestionPresupuesto.anyadirGasto(nuevoGasto1)
    repintar()
}
let btnAnyadirGasto=document.getElementById("anyadirgasto")
btnAnyadirGasto.addEventListener("click",nuevoGastoWeb)

function EditarHandle(){
    this.handleEvent=function(evento){
        let descripcion=prompt("Introduzca la descripción del gasto")
        let valor=Number(prompt("Introduzca el valor del gasto"))
        let fecha=new Date(prompt("Introduzca la fecha del gasto"))
        fecha.toISOString().substring(0, 10);
        let etiquetas=prompt("Introduzca las etiquetas")
        let arrEtiquetas=etiquetas.split(", ")

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor)
        this.gasto.actualizarFecha(fecha)
        this.gasto.anyadirEtiquetas(arrEtiquetas)
        repintar()
    }
}
function borrarHandle(){
    this.handleEvent=function(evento){
        let id=this.gasto.id
        gestionPresupuesto.borrarGasto(id)
        repintar()
    }
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}