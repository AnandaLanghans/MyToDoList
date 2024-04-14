import{ createToDo } from "./database.js";
import {toDoList} from "./main.js";

export function addToDo(text){
    const id = createToDo(text);
    const newToDo = toDoList.createToDo(id, text)
    return newToDo;
}