/* inizializzo la variabile counter e il db*/
let _counter = 0;
let _db = {};

/*creare il toDo nel Db con le proprietà completed, id e text
NOTA: Il metodo si appoggia a un counter per generare id per nuovi task */
export function createToDo(text) {
  const id = ++_counter;
  _db[id] = { completed: false, id, text };
  saveMemento();
  return id;
}
/*elimina toDo dal Db e salva nel session storage*/
export function deleteToDo(toDo) {
  const { id } = toDo;
  delete _db[id];
  saveMemento();
}
/*legge il valore della lista di oggetti toDo dal db*/
export function readToDos() {
  return Object.values(_db);
}
/*aggiorna le proprieta del todo e salva nel session storage*/
export function updateToDo(toDo) {
  const { completed, id, text } = toDo;
  _db[id] = { completed, id, text };
  saveMemento();
}

/*ripristina il backup
NOTA: legge dal session storage per ripristinae il counter con ultimo id utilizzato e 
ripristinare il db con elenco dei todo */
function restoreToDo() {
  const counterBackup = sessionStorage.getItem("counter");
  const dbBackup = sessionStorage.getItem("db");
  if (counterBackup) _counter = JSON.parse(counterBackup);
  if (dbBackup) _db = JSON.parse(dbBackup);
}
// salvare il memento (backup) nel sessionsorage
function saveMemento() {
  sessionStorage.setItem("counter", JSON.stringify(_counter));
  sessionStorage.setItem("db", JSON.stringify(_db));
}

restoreToDo();
