export class ToDo {
  constructor(id, text) {
    this._completed = false;
    this._id = id;
    this._text = text;
  }

  //permette di accedere al valore della variabile _completed (inizializata false)
  get completed() {
    return this._completed;
  }
  get id() {
    return this._id;
  }
  //mi permette di accedere al valore della variabile _text (il testo del ToDo)
  get text() {
    return this._text;
  }

  //cambia il valore della variabile _completed (da false a true)
  toggleCompleted() {
    this._completed = !this._completed;
  }
  // modifica il testo del toDo
  editToDo(text) {
    this._text = text;
    return this._text;
  }
}
