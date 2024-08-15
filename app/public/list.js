const fecha = document.getElementById("fecha")
const lista = document.getElementById("lista")
const input = document.getElementById("input")
const botonEnter = document.getElementById("enter")
const check = 'fa-check-circle';
const unCheck = 'fa-circle';
const lineThrough = 'line-through';
let LIST;
let id;


// Date function
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('en-US',{
    weekday: 'long',
    month: 'long',
    day: 'numeric',
})

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
    LIST[element2.id].realizado = LIST[element2.id].realizado ?false :true;
}

// delete task function
function tareaEliminada(element2){
    element2.parentNode.remove();;
    LIST[element2.id].eliminado = true
}

//  Click Event 
botonEnter.addEventListener('click', () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea,id,false,false);
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false,
        });
    }
    localStorage.setItem('TO-DO',JSON.stringify(LIST));
    input.value = '';
    id++;
});

document.addEventListener('keyup', function(event){
    if(event.key === 'Enter'){
        const tarea = input.value;
        if (tarea) {
            agregarTarea(tarea,id,false,false);
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false,
            });
        }
        localStorage.setItem('TO-DO',JSON.stringify(LIST));
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
    localStorage.setItem('TO-DO',JSON.stringify(LIST));
});

// LocalStorage
let data = localStorage.getItem('TO-DO');
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
}else {
    LIST = [];
    id = 0;
}

function cargarLista(DATA) {
    DATA.forEach(function (i){
        agregarTarea(
            i.nombre,
            i.id,
            i.realizado,
            i.eliminado
        );
    });
}

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