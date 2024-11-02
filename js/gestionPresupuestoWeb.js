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

    let gastoEtiquetas=document.querySelector(".gasto-etiquetas")
 
    gasto.etiquetas.forEach(etiqueta => {
        let nuevaEtiqueta=document.createElement("span")
        nuevaEtiqueta.classList.add("gasto-etiquetas-etiqueta")
        nuevaEtiqueta.textContent=etiqueta
        gastoEtiquetas.appendChild(nuevaEtiqueta)
    });
   
}
function mostrarGastoAgrupadosWeb(){}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastoAgrupadosWeb
}