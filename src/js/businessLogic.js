import { createToDo } from "./database.js";
import { toDoList } from "./main.js";

// aggiunge il toDO nella lista
export function addToDo(text) {
  const id = createToDo(text); // crea il toDo e lo associa all'id
  const newToDo = toDoList.createToDo(id, text); //aggiunge il toDo con il relativo id nella lista di todos
  return newToDo; //restituisce il nuovo todo
}
