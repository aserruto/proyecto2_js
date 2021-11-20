// Variables globales

const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.getElementById('listaActividades');
let arrayActividades = [];


// Funciones

const CrearItem = (actividad) => { // creamos un objeto actividad con estado inicial en incompleto

  let item = {
    actividad: actividad,
    estado: "incompleto"
  }

  arrayActividades.push(item);

  return item;

}

const GuardarDB = () => {

  localStorage.setItem('actividad_key', JSON.stringify(arrayActividades));

  PintarDB();

}

const PintarDB = () => {

  listaActividadesUI.innerHTML = ''; // cuando se carga la pagina se rellena con vacio

  arrayActividades = JSON.parse(localStorage.getItem('actividad_key'));
  
  if(arrayActividades === null){ // si no existe el array se inicializa con array vacio
    arrayActividades = [];
  }else{

    arrayActividades.forEach(element => {

      if(element.estado === "incompleto"){
        listaActividadesUI.innerHTML += `<div class="alert alert-danger" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
      }else{
        listaActividadesUI.innerHTML += `<div class="alert alert-success" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
      }
    });

  }
}

const EliminarDB = (actividad) => {
  let indexArray;
  arrayActividades.forEach((elemento, index) => {
    
    if(elemento.actividad === actividad){
      indexArray = index;
    }
    
  });

  arrayActividades.splice(indexArray,1);
  GuardarDB();

}

const EditarDB = (actividad) => {

  let indexArray = arrayActividades.findIndex((elemento)=>elemento.actividad === actividad);

  arrayActividades[indexArray].estado = "completo";

  GuardarDB();

}




// EventListener

formularioUI.addEventListener('submit', (e) => {

  e.preventDefault();
  let actividadUI = document.querySelector('#actividad').value;

  CrearItem(actividadUI);
  GuardarDB();

  formularioUI.reset();

});

document.addEventListener('DOMContentLoaded', PintarDB);

listaActividadesUI.addEventListener('click', (e) => { // capturamos en donde se hizo el click

  e.preventDefault();

  console.log(e);

  if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete'){
    let texto = e.path[2].childNodes[1].innerHTML; // capturamos ese elmento del objeto e
    if(e.target.innerHTML === 'delete'){
      // Accción de eliminar
      EliminarDB(texto);
    }
    if(e.target.innerHTML === 'done'){
      // Accción de editar
      EditarDB(texto);
    }
  }

});
