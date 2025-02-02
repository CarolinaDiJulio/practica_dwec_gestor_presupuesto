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

    //boton editar
    let btnEditar=document.createElement("button")
    btnEditar.textContent="Editar"
    btnEditar.classList.add("gasto-editar")

    let edGasto=new EditarHandle
    edGasto.gasto=gasto
    btnEditar.addEventListener("click",edGasto)
    nuevoGasto.appendChild(btnEditar)

    //boton eliminar
    let btnEliminar=document.createElement("button")
    btnEliminar.textContent="Eliminar"
    btnEliminar.classList.add("gasto-borrar")

    let borraGasto=new borrarHandle
    borraGasto.gasto=gasto
    btnEliminar.addEventListener("click",borraGasto)
    nuevoGasto.appendChild(btnEliminar)
   
    //boton borrar gasto api
    let btnBorrarGastoApi=document.createElement("button")
    btnBorrarGastoApi.textContent="Borrar (API)"
    btnBorrarGastoApi.classList.add("gasto-borrar-api")

    let borrarGastoApi=new BorrarGastoApi
    borrarGastoApi.gasto=gasto
    borrarGastoApi.id=gasto.gastoId
    btnBorrarGastoApi.addEventListener("click",borrarGastoApi)
    nuevoGasto.appendChild(btnBorrarGastoApi)

    //boton editar gasto form
    let btnEditarGastoForm=document.createElement("button")
    btnEditarGastoForm.textContent="Editar (formulario)"
    btnEditarGastoForm.classList.add("gasto-editar-formulario")
    
    let editarGastoForm=new EditarHandleFormulario
    editarGastoForm.gasto=gasto
    btnEditarGastoForm.addEventListener("click",editarGastoForm)
    nuevoGasto.appendChild(btnEditarGastoForm)
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    //let elemento=document.getElementById(idElemento)
    var divP = document.getElementById(idElemento);
    divP.innerHTML = "";

    let nuevaAgrup=document.createElement("div")
    nuevaAgrup.classList.add("agrupacion")
    nuevaAgrup.innerHTML=`<h1>Gastos agrupados por ${periodo}</h1>`

    //elemento.appendChild(nuevaAgrup)
    divP.appendChild(nuevaAgrup)

    Object.entries(agrup).forEach(([key,value]) => {
        let nuevaProp=document.createElement("div")
        nuevaProp.classList.add("agrupacion-dato")
        nuevaProp.innerHTML=`
        <span class="agrupacion-dato-clave">${key}</span>
        <br/>
        <span class="agrupacion-dato-valor">${value}</span>` 
        nuevaAgrup.appendChild(nuevaProp)
    });
    // Estilos
divP.style.width = "33%";
divP.style.display = "inline-block";
// Crear elemento <canvas> necesario para crear la gráfica
// https://www.chartjs.org/docs/latest/getting-started/
let chart = document.createElement("canvas");
// Variable para indicar a la gráfica el período temporal del eje X
// En función de la variable "periodo" se creará la variable "unit" (anyo -> year; mes -> month; dia -> day)
let unit = "";
switch (periodo) {
case "anyo":
    unit = "year";
    break;
case "mes":
    unit = "month";
    break;
case "dia":
default:
    unit = "day";
    break;
}

// Creación de la gráfica
// La función "Chart" está disponible porque hemos incluido las etiquetas <script> correspondientes en el fichero HTML
const myChart = new Chart(chart.getContext("2d"), {
    // Tipo de gráfica: barras. Puedes cambiar el tipo si quieres hacer pruebas: https://www.chartjs.org/docs/latest/charts/line.html
    type: 'bar',
    data: {
        datasets: [
            {
                // Título de la gráfica
                label: `Gastos por ${periodo}`,
                // Color de fondo
                backgroundColor: "#555555",
                // Datos de la gráfica
                // "agrup" contiene los datos a representar. Es uno de los parámetros de la función "mostrarGastosAgrupadosWeb".
                data: agrup
            }
        ],
    },
    options: {
        scales: {
            x: {
                // El eje X es de tipo temporal
                type: 'time',
                time: {
                    // Indicamos la unidad correspondiente en función de si utilizamos días, meses o años
                    unit: unit
                }
            },
            y: {
                // Para que el eje Y empieza en 0
                beginAtZero: true
            }
        }
    }
});
// Añadimos la gráfica a la capa
divP.append(chart);
}

function repintar(){
    mostrarDatoEnId("presupuesto",gestionPresupuesto.mostrarPresupuesto())
    mostrarDatoEnId("gastos-totales",gestionPresupuesto.calcularTotalGastos())
    mostrarDatoEnId("balance-total",gestionPresupuesto.calcularBalance())
    let gastosPorDia=gestionPresupuesto.agruparGastos("dia")
    
    mostrarGastosAgrupadosWeb("agrupacion-dia",gastosPorDia,"día")
    
    let gastosPorMes=gestionPresupuesto.agruparGastos("mes")
    mostrarGastosAgrupadosWeb("agrupacion-mes",gastosPorMes,"mes")
    
    let gastosPorAnyo=gestionPresupuesto.agruparGastos("anyo")
    gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo",gastosPorAnyo,"año")
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

    let btnEnviarApi=formulario.querySelector("button.gasto-enviar-api")

    let objEnviarApi=new enviarApi
    objEnviarApi.formulario=formulario
    btnEnviarApi.addEventListener("click",objEnviarApi)

    
    controlesprincipales.appendChild(plantillaFormulario)
}
function enviarApi(){
    this.handleEvent=function(evento){
        let nombreUsuario=document.getElementById("nombre_usuario").value.trim()
        nombreUsuario=nombreUsuario.replace(/[^a-zA-Z0-9]/g, "")
        let url=`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`

        let datosForm={
            descripcion:this.formulario.descripcion.value,
            valor:Number(this.formulario.valor.value),
            fecha:new Date(this.formulario.fecha.value),
            etiquetas:this.formulario.etiquetas.value.split(', ')
        }
        fetch(url,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(datosForm)
        })
        .then(function(respuesta){
            if(respuesta.ok){
                alert("Gasto enviado.")
                cargarGastosApi()
            }else{
                throw("Ha habido un error.")
            }
        }).catch(function(error){
            console.log(`Error:${error}`)
        })

    }
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

        let btnEnviarApi=formulario.querySelector("button.gasto-enviar-api")

        let objActualizarGastoApi=new actualizarGastoApi
        objActualizarGastoApi.formulario=formulario
        objActualizarGastoApi.gasto=this.gasto
        btnEnviarApi.addEventListener("click",objActualizarGastoApi)

        let nuevoGasto=document.querySelector(".gasto")
        nuevoGasto.appendChild(plantillaFormulario)
    }
}
function actualizarGastoApi(){
    this.handleEvent=function(evento){
    let nombreUsuario=document.getElementById("nombre_usuario").value.trim()
    nombreUsuario=nombreUsuario.replace(/[^a-zA-Z0-9]/g, "")
    let idGasto=this.gasto.gastoId

    let url=`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${idGasto}`
    let datosForm={
        descripcion:this.formulario.descripcion.value,
        valor:Number(this.formulario.valor.value),
        fecha:new Date(this.formulario.fecha.value),
        etiquetas:this.formulario.etiquetas.value.split(', ')
    }
    fetch(url,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosForm)
    }).then(function(respuesta){
        if(respuesta.ok){
            alert("Gasto actualizado.")
            cargarGastosApi()
            }else{
                throw("Ha habido un error.")
            }
    }).catch(function(error){
        console.log(`Error:${error}`)
    })
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
function filtrarGastosWeb(evento){
    evento.preventDefault()

    let desc=document.getElementById("formulario-filtrado-descripcion").value ; 
    let valMin=parseFloat( document.getElementById("formulario-filtrado-valor-minimo").value) ;
    let valMax=parseFloat(document.getElementById("formulario-filtrado-valor-maximo").value);
    let fInicial=document.getElementById("formulario-filtrado-fecha-desde").value ;
    let fFinal=document.getElementById("formulario-filtrado-fecha-hasta").value ;
    let etiq=document.getElementById("formulario-filtrado-etiquetas-tiene").value;

    if (etiq!==''){
        etiq=gestionPresupuesto.transformarListadoEtiquetas(etiq)
    }else{
        etiq=undefined
    }

    valMin = isNaN(valMin) ? undefined : valMin;
    valMax = isNaN(valMax) ? undefined : valMax;

    let objNecesario={
        fechaDesde:fInicial || undefined,
        fechaHasta:fFinal || undefined,
        valorMinimo:valMin,
        valorMaximo:valMax,
        descripcionContiene:desc || undefined,
        etiquetasTiene:etiq
    }
    let gastosFiltrados=gestionPresupuesto.filtrarGastos(objNecesario)

    let listadoGastos = document.getElementById("listado-gastos-completo");
    listadoGastos.innerHTML = "";


    for(let g of gastosFiltrados){
        mostrarGastoWeb("listado-gastos-completo",g)
    }

}

let formu=document.getElementById("formulario-filtrado")
formu.addEventListener("submit",filtrarGastosWeb)

let btnGuardarGastos=document.getElementById("guardar-gastos")
btnGuardarGastos.addEventListener("click",guardarGastosWeb)

function guardarGastosWeb(){

        let listadoGastos=gestionPresupuesto.listarGastos();

        let listadoGastosString=JSON.stringify(listadoGastos)

        localStorage.setItem("GestorGastosDWEC", listadoGastosString)
}
let btnCargarGastos=document.getElementById("cargar-gastos")
btnCargarGastos.addEventListener("click",cargarGastosWeb)

function cargarGastosWeb(){

    let gastoLocalStorage=localStorage.getItem("GestorGastosDWEC")

    let gastos
    if(gastoLocalStorage){
        gastos=JSON.parse(gastoLocalStorage)
    }else{
        gastos=[]
    }

     gestionPresupuesto.cargarGastos(gastos)

     repintar()
}

let btnCargarGastosApi=document.getElementById("cargar-gastos-api")
btnCargarGastosApi.addEventListener("click", cargarGastosApi)

function cargarGastosApi(){
    let nombreUsuario=document.getElementById("nombre_usuario").value.trim()
    nombreUsuario=nombreUsuario.replace(/[^a-zA-Z0-9]/g, "")
    let url=`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`

    fetch(url)
        .then(function(respuesta){
            if(respuesta.ok){
               return respuesta.json()
            }else{
                throw ("Ha habido un error.")
            }
        }).then(function(datos){

            //modifico la fecha para que no me salga error
            datos=datos.map(gasto=>{
                if (!gasto.fecha || isNaN(Date.parse(gasto.fecha))){
                    gasto.fecha=Date.now()
                }else{
                    gasto.fecha=Date.parse(gasto.fecha);
                }
                return gasto
            })

            gestionPresupuesto.cargarGastos(datos)
            repintar()
        }).catch(function(error){
            console.log(`Error: ${error}`)
        })
}
function BorrarGastoApi(){
    this.handleEvent=function(evento){
        let nombreUsuario=document.getElementById("nombre_usuario").value.trim()
        nombreUsuario=nombreUsuario.replace(/[^a-zA-Z0-9]/g, "")
        let idGasto=this.id
        let url=`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${idGasto}`
        console.log(nombreUsuario,idGasto)

        fetch(url,{method:"DELETE"})
        .then(function(respuesta){
            if(respuesta.ok){
                alert("Gasto eliminado.")
                cargarGastosApi()
            }else{
                throw("Ha habido un error.")
            }
        }).catch(function(error){
            console.log(`Error:${error}`)
        })
    }
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}