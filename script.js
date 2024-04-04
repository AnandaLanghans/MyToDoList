class ToDo {
  constructor(text) {
    this._completato = false;
    this._removed = false;
    this._text = text;
  }
  get text() {
    return this._text;
  }
  get removed() {
    return this._removed;
  }
  get completato() {
    return this._completato;
  }
  completa() {
    this._completato = true;
  }
  //rimuovere todo della lista
  removeToDo() {
    this._removed = true;
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
}

const toDoList = new ToDoList();

function addToDo() {
  // leggere il valore dell'input
  const inputElement = document.getElementById("myInput");
  const value = inputElement.value;
  inputElement.value = "";
  const toDo = toDoList.addToDo(value);
  // elemento lista
  const liElement = document.createElement("li");
  // checkbox completato
  const completatoElement = document.createElement("input");
  completatoElement.type = "checkbox";
  completatoElement.checked = toDo.completato;
  completatoElement.onclick = () => {
    toDo.completa();
    completatoElement.checked = toDo.completato;
    if (completatoElement.checked)
      liElement.style.textDecoration = "line-through";
    else liElement.style.textDecoration = "none";
    // log
    console.log(...toDoList.toDos);
  };
  liElement.appendChild(completatoElement);

  // elemento testo
  const textElement = document.createElement("span");
  textElement.innerText = toDo.text;
  liElement.appendChild(textElement);
  // aggiungo elemento lista alla lista
  const listElement = document.getElementById("myList");
  listElement.appendChild(liElement);

  // Bottone per rimuovere il todo della lista
  const removeBtn = document.createElement("button");
  removeBtn.innerText = "X";
  removeBtn.checked = toDo.removed;
  removeBtn.onclick = () => {
    toDo.removeToDo();
    removeBtn.checked = toDo.removed;
    if (removeBtn.checked === true) {
      liElement.remove();
    }
  };
  liElement.appendChild(removeBtn);
  document.getElementById("myList").appendChild(liElement);

  //modifica del testo
  const updateToDoBtn = document.createElement("button");
  updateToDoBtn.innerText = "\u270E";
  updateToDoBtn.onclick = () => {
    if (completatoElement.checked === false) {
      const editprompt = prompt("Edit your entry");
      textElement.innerText = editprompt;
      toDo.updateToDo(textElement.innerText);
      //log
      console.log(...toDoList.toDos);
    }
  };
  liElement.appendChild(updateToDoBtn);
  document.getElementById("myList").appendChild(liElement);
  //log
  console.log(...toDoList.toDos);
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
