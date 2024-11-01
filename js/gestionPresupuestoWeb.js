function mostrarDatoEnId(valor, idElemento){
    let elemento=document.getElementById(`${idElemento}`)
    elemento.textContent=`${valor}`
}
function mostrarGastoWeb(idElemento,gasto){
    
}
function mostrarGastoAgrupadosWeb(){}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastoAgrupadosWeb
}