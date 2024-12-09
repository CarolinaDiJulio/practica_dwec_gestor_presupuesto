import * as gestionPresupuesto from './gestionPresupuesto.js'
function mostrarDatoEnId(idElemento,valor){
    let elemento=document.getElementById(idElemento)
    elemento.textContent=valor
}
function mostrarGastoWeb(idElemento,gasto){
    let elemento=document.getElementById(idElemento)
    let nuevoGasto=document.createElement("div")
    let fecha= new Date(gasto.fecha)
    fecha=fecha.toISOString().substring(0,10)
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

        let borraEtiqueta=new borrarEtiquetasHandle
        borraEtiqueta.gasto=gasto
        borraEtiqueta.etiqueta=etiqueta
        nuevaEtiqueta.addEventListener("click",borraEtiqueta)
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
   
    let btnEditarGastoForm=document.createElement("button")
    btnEditarGastoForm.textContent="Editar (formulario)"
    btnEditarGastoForm.classList.add("gasto-editar-formulario")
    
    
    let editarGastoForm=new EditarHandleFormulario
    editarGastoForm.gasto=gasto
    btnEditarGastoForm.addEventListener("click",editarGastoForm)
    nuevoGasto.appendChild(btnEditarGastoForm)
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

function borrarEtiquetasHandle(){
    this.handleEvent=function(evento){
        this.gasto.borrarEtiquetas(this.etiqueta)
        repintar()
    }
}

let btnAnyadirGastoForm=document.getElementById("anyadirgasto-formulario")
btnAnyadirGastoForm.addEventListener("click",nuevoGastoWebFormulario)

function nuevoGastoWebFormulario(){

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
    let btnAnyadir=document.getElementById("anyadirgasto-formulario")
    btnAnyadir.setAttribute("disabled","")

    formulario.addEventListener("submit", eventoSubmit)

    function eventoSubmit(evento){
        evento.preventDefault()
        let descripcion=evento.currentTarget.descripcion.value
        let valor=Number(evento.currentTarget.valor.value)
        let fecha=new Date(evento.currentTarget.fecha.value)
        let etiquetas=evento.currentTarget.etiquetas.value.split(', ')

        let nuevoGasto= new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...etiquetas)
        gestionPresupuesto.anyadirGasto(nuevoGasto)
        repintar()
        
        btnAnyadir.removeAttribute("disabled")
        formulario.remove()
    }
    
    let btnCancelar=formulario.querySelector("button.cancelar")
   
    let objCancelar = new eventoCancelar
    objCancelar.formulario=formulario
    objCancelar.referenciaBtn=btnAnyadir

    
    btnCancelar.addEventListener("click",objCancelar)
    
    controlesprincipales.appendChild(plantillaFormulario)
}
function eventoCancelar(){
    this.handleEvent=function(evento){
        this.formulario.remove()
        this.referenciaBtn.removeAttribute("disabled")
    }
}
function EditarHandleFormulario(){
    this.handleEvent=function(evento){

        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");

        let bEditarGastoForm=evento.currentTarget
        bEditarGastoForm.setAttribute("disabled","")

        formulario.descripcion.value=this.gasto.descripcion
        formulario.valor.value=this.gasto.valor
        let fecha=new Date(this.gasto.fecha)
        fecha=fecha.toISOString().substring(0,10)
        formulario.fecha.value=fecha
        formulario.etiquetas.value=this.gasto.etiquetas

        let objSubmit=new submitHandle
        objSubmit.formulario=formulario
        objSubmit.gasto=this.gasto
        formulario.addEventListener("submit",objSubmit)

        let btnCancelar=formulario.querySelector("button.cancelar")

        let objetoCancelar=new eventoCancelar
        
        objetoCancelar.formulario=formulario
        objetoCancelar.referenciaBtn=evento.currentTarget

        btnCancelar.addEventListener("click",objetoCancelar)

        let nuevoGasto=document.querySelector(".gasto")
        nuevoGasto.appendChild(plantillaFormulario)
    }
}
function submitHandle(){
    this.handleEvent=function(evento){
        evento.preventDefault()
        this.gasto.descripcion=evento.currentTarget.descripcion.value
        this.gasto.valor=Number(evento.currentTarget.valor.value)
        this.gasto.fecha=new Date(evento.currentTarget.fecha.value)
        this.gasto.etiquetas=evento.currentTarget.etiquetas.value.split(', ')

        repintar()
        
    }
}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}