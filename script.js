function addToDo() {
  // inserimento di un elemento nella ToDo list
  const button = document.getElementById("mybutton");
  const input = document.getElementById("myInput");
  const inputValue = input.value;
  //input.value = "";
  if (inputValue === "") {
    button.disabled = true;
    button.disabled = false;
  } else {
    const li = document.createElement("li");

    //creazione del check list
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    li.appendChild(checkbox);
    checkbox.onclick = () => {
      if (checkbox.checked) liText.style.textDecoration = "line-through";
      else liText.style.textDecoration = "none";
    };
    // testo
    const liText = document.createElement("span");
    liText.innerText = inputValue;
    li.appendChild(liText);

    //modifica del testo
    const edit = document.createElement("span");
    const simboltext = document.createTextNode("\u270E");
    edit.className = "edit";
    edit.appendChild(simboltext);
    li.appendChild(edit);
    edit.onclick = function () {
      const editprompt = prompt("Edit your entry");
      liText.innerText = editprompt;
    };

    // creazione del botone per cancellare l'elemento inserito
    const removeBtn = document.createElement("button");
    removeBtn.innerText = " X";
    removeBtn.onclick = function () {
      li.remove(); //al click rimuove l'oggetto
    };
    li.appendChild(removeBtn);
    document.getElementById("myList").appendChild(li);
  }
}
