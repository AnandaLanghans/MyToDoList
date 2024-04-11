import { ToDoList } from "./toDoList.js";
export function restoreMemento() {
  const toDosFromSession = sessionStorage.getItem("listOfTodos");
  const toDosBackup =
    toDosFromSession !== null ? JSON.parse(toDosFromSession) : [];
  toDoList.setMemento(toDosBackup);
}
// salva la lista di todos nel sessionStorage
export function saveMemento() {
  sessionStorage.setItem("listOfTodos", JSON.stringify(toDoList.getMemento()));
}
