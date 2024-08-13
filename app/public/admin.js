const fecha = document.getElementById("fecha")
const lista = document.getElementById("lista")
const input = document.getElementById("input")
const botonEnter = document.getElementById("enter")
const check = 'fa-check-circle';
const unCheck = 'fa-circle';
const lineThrough = 'line-through';
const LIST = [];
let id = 0;


// add task function
function agregarTarea(tarea,id,realizado,eliminado){

    if (eliminado) {
        return;
    }

    const REALIZADO = realizado ?check :unCheck;
    const LINE = realizado ?lineThrough :'';
    const element = `<li id="element">
                    <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                    <p class="text ${LINE}">${tarea}</p>
                    <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                    </li>
                    `
    lista.insertAdjacentHTML("beforeend",element);
}

// task performed function
function tareaRealizada(element2){
    element2.classList.toggle(check);
    element2.classList.toggle(unCheck);
    element2.parentNode.querySelector('.text').classList.toggle(lineThrough);
}

// delete task function
function tareaEliminada(element2){
    element2.parentNode.remove();
}

//  Click Event 
botonEnter.addEventListener('click', () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea,id,false,false);
    }
    input.value = '';
    id++;
});

document.addEventListener('keyup', function(event){
    if(event.key === 'Enter'){
        const tarea = input.value;
        if (tarea) {
            agregarTarea(tarea,id,false,false);
        }
        input.value = '';
        id++;
    }
});

lista.addEventListener('click', function(event){
    const element2 = event.target;
    const elementData = element2.attributes.data.value;
    if (elementData === 'realizado') {
        tareaRealizada(element2);
    } else if(elementData === 'eliminado') {
        tareaEliminada(element2);
    }
});

// logout function
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById("btn-logout"); // Asegúrate de que el botón tenga un ID específico
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include'
            });
            document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            document.location.href = "/";
        });
    }
});