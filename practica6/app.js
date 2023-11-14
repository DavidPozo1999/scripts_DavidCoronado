// to do list
const formulario = document.getElementById("formulario");
const listaTareas = document.getElementById("lista-tareas");
const input = document.getElementById("input");
const templateItem = document.getElementById("template.item").content;

const fragment = document.createDocumentFragment();
let tareas = {};

document.addEventListener("DOMContentLoaded", () => {
    pintarTareas();
});

listaTareas.addEventListener("click", e => {
    btnAccion(e);
});

formulario.addEventListener("submit", e => {
    //stopPropagation no funcionaría para el submit del formulario
    e.preventDefault();
    //console.log(e);
    //console.log(e.target[0].value);
    //console.log(e.target.querySelector("input").value);

    setTarea(e);
});

const setTarea = e => {
    if (input.ariaValueMax.trim() === "") {
        console.log("no hay valor");
    } else {
        // generar ID pseudoaleatorios con el date.now
        const tarea = {
            id: Date.now(),
            texto: input.value.trim(),
            completada: false
        }

        tareas[tareas.id]=tarea;
        console.log(tareas);
        formulario.reset();
        input.focus();

        pintarTareas();
    }
}

const pintarTareas= e=>{
    if(Object.values(tareas).length){
        listaTareas.innerHTML="";
        Object.values(tareas).forEach(tarea=>{
            const clone=templateItem.cloneNode(true);
            if(tarea.completada){
                clone.querySelector(".alert").classList.replace("alert-warning","alert-info");
                clone.querySelector(".fa-check").classList.replace("fa-check","fa-undo-alt");
                clone.querySelector("p").style.textDecoration="line-through";
            }else{
                clone.querySelector(".alert").classList.replace("alert-info","alert-warning");
                clone.querySelector("p").style.textDecoration="";
            }
            clone.querySelector("p").textContent=tarea.texto;
            clone.querySelectorAll(".fas")[0].dataset.id=tarea.id;
            clone.querySelectorAll(".fas")[1].dataset.id=tarea.id;
            fragment.appendChild(clone);
        })
    }else{
        listaTareas.innerHTML=`<div class="alert alert-secondary d-flex justify-content-between align-items-center">
                                <p class="m-0">No hay tareas</p></div>`;
    }
    listaTareas.appendChild(fragment);
}

const btnAccion = e =>{
    if(e.target.classList.contains("fa-check")){
        tareas[e.target.dataset.id].completada=true;
    }else if(e.target.classList.contains("fa-ban")){
        delete tareas[e.target.dataset.id];
    }else if(e.target.classList.contains("fa-undo-alt")){
        tareas[e.target.dataset.id].completada=false;
    }
    pintarTareas();
    e.stopPropagation();
}