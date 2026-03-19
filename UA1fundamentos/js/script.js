function cargarPagina(pagina){

fetch(pagina)
.then(respuesta => respuesta.text())
.then(data => {

document.getElementById("contenido").innerHTML = data;

// resaltar código
Prism.highlightAll();

// generar índice
generarIndice();

// esperar a que el DOM se actualice
setTimeout(()=>{
agregarBotonesCopiar();
},50);

});

}

function mostrarSolucion(boton){

let solucion = boton.nextElementSibling

if(solucion.style.display === "none"){

solucion.style.display = "block"
boton.textContent = "Ocultar solución"

}else{

solucion.style.display = "none"
boton.textContent = "Ver solución"

}

}
document.getElementById("menuToggle").addEventListener("click",function(){

document.querySelector(".sidebar").classList.toggle("activo")

})

const botonTema = document.getElementById("toggleTema");

botonTema.addEventListener("click", () => {

document.body.classList.toggle("modo-oscuro");

if(document.body.classList.contains("modo-oscuro")){
botonTema.textContent="☀️"
}else{
botonTema.textContent="🌙"
}

});

function generarIndice(){

const contenido = document.getElementById("contenido");
const indice = document.getElementById("indice");

const headers = contenido.querySelectorAll("h2");

let html = "<h3>Contenido</h3><ul>";

headers.forEach((h,i)=>{

let id = "seccion-"+i;
h.id=id;

html += `<li onclick="document.getElementById('${id}').scrollIntoView()">${h.textContent}</li>`;

});

html += "</ul>";

indice.innerHTML=html;

}

function agregarBotonesCopiar(){

const bloques = document.querySelectorAll("#contenido pre");

bloques.forEach(pre => {

if(pre.parentElement.classList.contains("bloque-codigo")){
return;
}

let wrapper = document.createElement("div");
wrapper.className="bloque-codigo";

pre.parentNode.insertBefore(wrapper, pre);
wrapper.appendChild(pre);

let boton = document.createElement("button");
boton.textContent="Copiar";
boton.className="boton-copiar";

wrapper.appendChild(boton);

boton.addEventListener("click",()=>{

let codigo = pre.innerText;

navigator.clipboard.writeText(codigo);

boton.textContent="Copiado ✓";

setTimeout(()=>{
boton.textContent="Copiar";
},1500);

});

});

}