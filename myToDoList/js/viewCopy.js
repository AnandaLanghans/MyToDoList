import { ToDoList } from "./toDoList.js";
//import { restoreMemento, saveMemento } from "./saveData.js";

export let toDoList = new ToDoList();

export function startApp() {
  attachEvents();
  // restoreMemento();
  renderList();
}
/**
 * NOTA: gli eventi vengono invocati con un parametro: ev.
 * ev contiene varie informazioni sull'evento, tra cui:
 * 1. target - ovvero l'oggetto di UI, l'element del DOM. In questo caso e' l'input stesso
 * 2. key - ovvero il nome dell'eventuale carattere premuto (in questo caso, il tasto INVIO)
 */
function attachEvents() {
  const buttonElement = document.getElementById("button");
  buttonElement.onclick = addToDo;
  const inputElement = document.getElementById("input");
  inputElement.oninput = (ev) => {
    buttonElement.disabled = !Boolean(ev.target.value);
  };
  inputElement.onkeypress = (ev) => {
    if (ev.target.value && ev.key === "Enter") addToDo();
  };
}
// aggiunge un ToDo nella lista
/**
 * NOTA: si occupa di:
 * 1. aggiungere un nuovo ToDo alla ToDoList
 * 2. sincronizzare la UI con i cambi applicati alla ToDoList
 * 3. persistere/salvare i cambi applicati alla ToDoList
 */
function addToDo() {
  const inputElement = document.getElementById("input");
  const value = inputElement.value;
  toDoList.createToDo(value);
  inputElement.value = "";
  renderList();
  // saveMemento();
}
// serve a creare gli elementi aggiunti nell'interfaccia (checkbox, tasto elimina)
function createToDoElement(toDo) {
  // Checkbox completed
  const checkboxElement = document.createElement("input");
  checkboxElement.checked = toDo.completed;
  checkboxElement.onclick = () => {
    toDo.toggleCompleted();
    renderList();
    // saveMemento();
  };
  checkboxElement.type = "checkbox";
  checkboxElement.className = "checkboxElement";
  // Text element
  const textElement = document.createElement("span");
  textElement.innerText = toDo.text;
  textElement.id = "textElement";
  if (toDo.completed === true)
    textElement.style.textDecoration = "line-through";
  else textElement.style.textDecoration = "none";
  // Remove button
  const removeElement = document.createElement("button");
  removeElement.innerText = "x";
  removeElement.className = "removeBtn";
  removeElement.onclick = () => {
    toDoList.deleteToDo(toDo);
    renderList();
    // saveMemento();
  };
  //Edit To-DO
  const editElement = document.createElement("button");
  editElement.innerText = "\u270E";
  editElement.classname = "edit";
  editElement.onclick = () => {
    const editprompt = prompt("Edit your entry");
    toDo.editToDo(editprompt);
    renderList();
    // saveMemento();
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
