export class ToDo {
  constructor(text) {
    this._completed = false;
    this._text = text;
  }
  //permette di accedere al valore della variabile _completed (inizializata false)
  get completed() {
    return this._completed;
  }
  //mi permette di accedere al valore della variabile _text (il testo del ToDo)
  get text() {
    return this._text;
  }
  //si occupa di cambiare lo stato della variabile _completed (da false a true)
  complete() {
    this._completed = true;
  }
}
