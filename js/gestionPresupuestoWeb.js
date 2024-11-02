function mostrarDatoEnId(idElemento,valor){
    let elemento=document.getElementById(idElemento)
    elemento.textContent=valor
}
function mostrarGastoWeb(idElemento,gasto){
    let elemento=document.getElementById(idElemento)
    elemento.innerHTML=`
    <div class="gasto">
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${gasto.fecha}</div> 
        <div class="gasto-valor">${gasto.valor}</div> 
        <div class="gasto-etiquetas">
            
        </div>
    </div>
    `
    let gastoEtiquetas=document.querySelector("gasto-etiquetas")
    gasto.etiquetas.forEach(etiqueta => {
        gastoEtiquetas.innerHTML+=`<span class="gasto-etiquetas-etiqueta">
     ${etiqueta}
    </span>`
    });
}
function mostrarGastoAgrupadosWeb(){}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastoAgrupadosWeb
}