let counter = 1;

class ToDo {
  constructor(title) {
    this.completed = false;
    this.id = counter++;
    this.title = title;
  }
}

const Db = {};

// class ToDoDb {
//   constructor() {
//     this._data = {};
//   }
//   add(todo) {
//     this._data[todo.id] = todo;
//   }
//   delete(todo) {
//     delete this._data[todo.id];
//   }
//   updateCompleted(todo, completed) {
//     const todoOnDb = this._data[todo.id];
//     if (todoOnDb) todoOnDb.completed = completed;
//     else throw "ToDo con id " + todo.id + " non trovato";
//   }
// }

const td1 = new ToDo("fare la spesa");
Db[td1.id] = td1;

console.log(Db);

const td2 = new ToDo("palestra");
Db[td2.id] = td2;

console.log(Db);

delete Db[td2.id];

console.log(Db);

const td3 = new ToDo("altro");
Db[td3.id] = td3;

console.log(Db);

Db[td1.id].completed = true;

console.log(Db);
