import{ toDoList} from "./main.js";
import{addToDo} from  "./businessLogic.js"
import { createToDo,deleteToDo,updateToDo } from "./database.js";

export function startApp() {
  renderList();
  attachEvents();
  
}
/**
 * NOTA: gli eventi vengono invocati con un parametro: ev.
 * ev contiene varie informazioni sull'evento, tra cui:
 * 1. target - ovvero l'oggetto di UI, l'element del DOM. In questo caso e' l'input stesso
 * 2. key - ovvero il nome dell'eventuale carattere premuto (in questo caso, il tasto INVIO)
 */
export function attachEvents() {
  const buttonElement = document.getElementById("button");
  buttonElement.className = "addBtn";
  const inputElement = document.getElementById("input");
 
  inputElement.oninput = (ev) => {
    buttonElement.disabled = !Boolean(ev.target.value);
  };
 
  inputElement.onkeypress = (ev) => {
    if (ev.key === "Enter" && ev.target.value.trim() !== "") {
      addToDo(ev.target.value.trim());
      inputElement.value = "";
      renderList();
    }
  };
 
  buttonElement.onclick = () => {
    if (inputElement.value.trim() !== "") {
      addToDo(inputElement.value.trim());
      inputElement.value = "";
      renderList();
    }
  };
}
// serve a creare gli elementi aggiunti nell'interfaccia (checkbox, tasto elimina)
function createToDoElement(toDo) {
  // Checkbox completed
  const checkboxElement = document.createElement("input");
  checkboxElement.checked = toDo.completed;
  checkboxElement.onclick = () => {
    toDo.toggleCompleted();
    updateToDo(toDo);
    renderList();
    
  };
  checkboxElement.type = "checkbox";
  checkboxElement.className = "checkboxElement";
  // Text element
  const textElement = document.createElement("span");
  textElement.innerText = toDo.text;
  textElement.id = "textElement";
  if (toDo.completed)
    textElement.style.textDecoration = "line-through";
  
    //Edit To-DO
  const editElement = document.createElement("button");
  editElement.innerText = "\u270E";
  editElement.classname = "edit";
  editElement.onclick = () => {
    const editprompt = prompt("Edit your entry");
    toDo.editToDo(editprompt);
    renderList();
    updateToDo(toDo);
  };
  // Remove button
  const removeElement = document.createElement("button");
  removeElement.innerText = "x";
  removeElement.className = "removeBtn";
  removeElement.onclick = () => {
    toDoList.deleteToDo(toDo);
    renderList();
    deleteToDo(toDo);
  };
  
  // ToDo Element
  const toDoElement = document.createElement("li");
  toDoElement.appendChild(checkboxElement);
  toDoElement.appendChild(textElement);
  toDoElement.appendChild(removeElement);
  toDoElement.appendChild(editElement);
  return toDoElement;
}
//crea una copia della lista di todos e lo riposiziona quando viene chiamato
function renderList() {
  const liElements = toDoList.toDos.map(createToDoElement);
  const listElement = document.getElementById("list");
  listElement.replaceChildren(...liElements);
}
