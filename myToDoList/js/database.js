let _counter = 0;
let _db= {};

/*creare il todo nel Db con le proprieta completed, id e text*/
export function createToDo(text){
    const id = ++_counter; // aggiorna l'id
    _db[id]= {completed: false, id, text}; 
    saveMemento();
    return id;
}
/*elimina todo dal Db*/
export function deleteToDo(toDo){
    const{id}= toDo;
    delete _db[id];
    saveMemento();
}
/*legge il valore dell-oggetto todo dal db*/
export function readToDos(){
    return Object.values(_db);
}
/*aggiorna le proprieta del todo*/
export function updateToDo(toDo){
    const{completed, id, text}= toDo;
    _db[id]={completed, id, text};
    saveMemento();
}
/*ripristina il backup*/
function restoreToDo(){
    const counterBackup= sessionStorage.getItem("counter");
    const dbBackup= sessionStorage.getItem("db");
    if(counterBackup) _counter = JSON.parse(counterBackup);
    if(dbBackup) _db = JSON.parse(dbBackup);
}
// salvare il memento nel sessionsorage
function saveMemento(){
    sessionStorage.setItem("counter", JSON.stringify(_counter));
    sessionStorage.setItem("db", JSON.stringify(_db));
}

restoreToDo();