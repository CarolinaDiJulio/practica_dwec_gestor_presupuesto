function mostrarDatoEnId(idElemento,valor){
    let elemento=document.getElementById(idElemento)
    elemento.textContent=valor
}
function mostrarGastoWeb(idElemento,gasto){
    let elemento=document.getElementById(idElemento)
    let nuevoGasto=document.createElement("div")
    nuevoGasto.classList.add("gasto")
    nuevoGasto.innerHTML=`
    
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${gasto.fecha}</div> 
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
   
}
function mostrarGastoAgrupadosWeb(idElemento,agrup,periodo){
    let elemento=document.getElementById(idElemento)
    let nuevaAgrup=document.createElement("div")
    nuevaAgrup.classList.add("agrupacion")
    nuevaAgrup.innerHTML=`<h1>Gastos agrupados por ${periodo}</h1>`

    elemento.appendChild(nuevaAgrup)

    let agrupaciones=document.querySelector(".agrupacion")
    Object.keys(agrup).forEach(prop => {
        let nuevaProp=document.createElement("div")
        nuevaProp.classList.add("agrupacion-dato")
        nuevaProp.innerHTML=`<span class="agrupacion-dato-clave">${prop}</span>` 
        agrupaciones.appendChild(nuevaProp)
    });
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastoAgrupadosWeb
}