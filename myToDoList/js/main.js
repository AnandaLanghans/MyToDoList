import { ToDoList } from "./toDoList.js";
import { readToDos } from "./database.js";
import { startApp } from "./viewCopy.js";

const toDosBackup = readToDos(); // legge i toDos dal Db
export const toDoList = new ToDoList(); // istanzia la toDoList
toDoList.setMemento(toDosBackup); // itera sul memento (ovvero il backup) delle attività, per creare istanze di ToDo e aggiungerle alla lista

startApp();
