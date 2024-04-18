import { ToDo } from "./toDo.js";

export class ToDoList {
  constructor() {
    this._toDos = [];
  }

  // accede al valore della lista contenente tutti ToDos inseriti
  get toDos() {
    return [...this._toDos];
  }

  //il metodo crea un nuovo toDo che contiene un id univoco e il testo
  createToDo(id, text) {
    const toDo = new ToDo(id, text);
    this._toDos.push(toDo);
    return toDo;
  }
  // elimina un todo della lista
  deleteToDo(toDo) {
    this._toDos = this._toDos.filter((a) => a !== toDo);
  }

  //itera sul memento (ovvero il backup) delle attività, per creare istanze di ToDo e aggiungerle alla lista
  setMemento(toDosMemento) {
    toDosMemento.forEach(({ completed, id, text }) => {
      const toDo = new ToDo(id, text);
      if (completed) toDo.toggleCompleted();
      this._toDos.push(toDo);
    });
  }
  // estrae il memento (ovvero il backup) delle attivita, e conserva solo le proprietà text e completed
  getMemento() {
    return this._toDos.map((a) => ({
      completed: a.completed,
      text: a.text,
    }));
  }
}
