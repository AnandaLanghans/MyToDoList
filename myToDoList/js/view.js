import { ToDoList } from "./toDoList.js";

const toDoList = new ToDoList();

function restoreMemento() {
  const toDosFromSession = sessionStorage.getItem("listOfTodos");
  const toDosBackup =
    toDosFromSession !== null ? JSON.parse(toDosFromSession) : [];
  toDoList.setMemento(toDosBackup);
}

export function startApp() {
  attachEvents();
  //restoreMemento();
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
  saveMemento();
}
// serve a creare gli elementi aggiunti nell'interfaccia (checkbox, tasto elimina)
function createToDoElement(toDo) {
  // Checkbox completed
  const checkboxElement = document.createElement("input");
  checkboxElement.checked = toDo.completed;
  checkboxElement.disabled = toDo.completed;
  checkboxElement.onclick = () => {
    toDo.complete();
    renderList();
    saveMemento();
  };
  checkboxElement.type = "checkbox";
  checkboxElement.id = "checkboxElement";
  // Text element
  const textElement = document.createElement("span");
  textElement.innerText = toDo.text;
  if (toDo.completed) textElement.style.textDecoration = "line-through";
  // Remove button
  const removeElement = document.createElement("button");
  removeElement.innerText = "x";
  removeElement.onclick = () => {
    toDoList.deleteToDo(toDo);
    renderList();
    saveMemento();
  };
  removeElement.id = "removeBtn";
  // ToDo Element
  const toDoElement = document.createElement("li");
  toDoElement.appendChild(checkboxElement);
  toDoElement.appendChild(textElement);
  toDoElement.appendChild(removeElement);
  return toDoElement;
}
//crea una copia della lista di todos e lo riposiziona quando viene chiamato
function renderList() {
  const liElements = toDoList.toDos.map(createToDoElement);
  const listElement = document.getElementById("list");
  listElement.replaceChildren(...liElements);
}
// salva la lista di todos nel sessionStorage
function saveMemento() {
  sessionStorage.setItem("listOfTodos", JSON.stringify(toDoList.getMemento()));
}
