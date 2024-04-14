import { ToDoList } from "./toDoList.js";
import { readToDos } from "./database.js";
import { startApp } from "./viewCopy.js";

const toDosBackup = readToDos();
export const toDoList = new ToDoList();
toDoList.setMemento(toDosBackup);

startApp();
