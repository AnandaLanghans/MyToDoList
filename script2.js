class ToDo {
  constructor(text) {
    this._completato = false;
    this._text = text;
  }
  get text() {
    return this._text;
  }
  get completato() {
    return this._completato;
  }
  completa() {
    this._completato = true;
  }
  updateToDo(testo) {
    this._text = testo;
  }
}
class ToDoList {
  constructor() {
    this.toDos = [];
  }
  // aggiungere todo nella lista
  addToDo(text) {
    const toDo = new ToDo(text);
    this.toDos.push(toDo);
    return toDo;
  }
  //rimuovere todo della lista
  removeToDo(toDo) {
    this.toDos = this.toDos.filter((a) => a !== toDo);
  }
  setMemento(toDosMemento) {
    toDosMemento.forEach((a) => {
      const toDo = new ToDo(a.text);
      if (a.completato) toDo.completa();
      this.toDos.push(toDo);
    });
  }
  getMemento() {
    return this.toDos.map((a) => ({ completato: a.completato, text: a.text }));
  }
}

const toDosFromSession = sessionStorage.getItem("listOfTodos");
const toDosBackup =
  toDosFromSession !== null ? JSON.parse(toDosFromSession) : [];
const toDoList = new ToDoList();
toDoList.setMemento(toDosBackup);
renderList();

function addToDo() {
  // leggere il valore dell'input
  const inputElement = document.getElementById("myInput");
  const value = inputElement.value;
  inputElement.value = "";
  toDoList.addToDo(value);
  renderList();
  saveMemento();
}

function createListItemElement(toDo) {
  // elemento lista
  const listItemElement = document.createElement("li");
  // checkbox completato
  const completatoElement = document.createElement("input");
  completatoElement.type = "checkbox";
  completatoElement.checked = toDo.completato;
  completatoElement.onclick = () => {
    toDo.completa();
    renderList();
    saveMemento();
  };
  listItemElement.appendChild(completatoElement);

  // elemento testo
  const textElement = document.createElement("span");
  textElement.innerText = toDo.text;
  if (toDo.completato) listItemElement.style.textDecoration = "line-through";
  listItemElement.appendChild(textElement);

  // Bottone per rimuovere il todo della lista
  const removeBtn = document.createElement("button");
  removeBtn.innerText = "X";
  removeBtn.checked = toDo.removed;
  removeBtn.onclick = () => {
    toDoList.removeToDo(toDo);
    renderList();
    saveMemento();
  };
  listItemElement.appendChild(removeBtn);

  //modifica del testo
  if (!toDo.completato) {
    const updateToDoBtn = document.createElement("button");
    updateToDoBtn.innerText = "\u270E";
    updateToDoBtn.onclick = () => {
      const editprompt = prompt("Edit your entry");
      toDo.updateToDo(editprompt);
      renderList();
      saveMemento();
    };
    listItemElement.appendChild(updateToDoBtn);
  }

  return listItemElement;
}

function renderList() {
  const listElement = document.getElementById("myList");
  const listItemElements = toDoList.toDos.map(createListItemElement);
  listElement.replaceChildren(...listItemElements);
}
function saveMemento() {
  sessionStorage.setItem("listOfTodos", JSON.stringify(toDoList.getMemento()));
}

// function addToDo() {
//   // inserimento di un elemento nella ToDo list
//   const button = document.getElementById("mybutton");
//   const input = document.getElementById("myInput");
//   const inputValue = input.value;
//   input.value = "";
//   if (inputValue === "") {
//     button.disabled = true;
//     button.disabled = false;
//   } else {
//     const li = document.createElement("li");

//     //creazione del check list
//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     li.appendChild(checkbox);
//     checkbox.onclick = () => {
//       if (checkbox.checked) liText.style.textDecoration = "line-through";
//       else liText.style.textDecoration = "none";
//     };
//     // testo
//     const liText = document.createElement("span");
//     liText.innerText = inputValue;
//     li.appendChild(liText);

//     //modifica del testo
//     const edit = document.createElement("span");
//     const simboltext = document.createTextNode("\u270E");
//     edit.className = "edit";
//     edit.appendChild(simboltext);
//     li.appendChild(edit);
//     edit.onclick = function () {
//       const editprompt = prompt("Edit your entry");
//       liText.innerText = editprompt;
//     };

//     // creazione del botone per cancellare l'elemento inserito
//     const removeBtn = document.createElement("button");
//     removeBtn.innerText = " X";
//     removeBtn.onclick = function () {
//       li.remove(); //al click rimuove l'oggetto
//     };
//     li.appendChild(removeBtn);
//     document.getElementById("myList").appendChild(li);
//   }
// }
