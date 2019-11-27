const Column = {
  idCounter: 4,
  dragged: null,

  process(columnElement) {
    const spanAction_addNote = columnElement.querySelector(
      "[data-action-addNote]"
    );
    spanAction_addNote.addEventListener("click", function(e) {

      const noteElement = Note.create()

      columnElement.querySelector("[data-notes]").append(noteElement);
     

      noteElement.setAttribute("contenteditable", "true");
      noteElement.focus();

    });

   const headerElement = columnElement.querySelector(".caption");

   headerElement.addEventListener("dblclick", function(event) {
   headerElement.setAttribute("contenteditable", "true");
   headerElement.focus();
   });

   headerElement.addEventListener("blur", function(event) {
   headerElement.textContent = headerElement.textContent.trim();
   headerElement.removeAttribute("contenteditable");
   if (!headerElement.textContent.length) {
      columnElement.remove();
      return;
      }
   
   Application.save();
   });

    columnElement.addEventListener("dragstart", Column.dragstart);
    columnElement.addEventListener("dragend", Column.dragend);
    columnElement.addEventListener("dragenter", Column.dragenter);
    columnElement.addEventListener("dragover", Column.dragover);
    columnElement.addEventListener("dragleave", Column.dragleave);
    columnElement.addEventListener("drop", function(event) {
      event.stopPropagation();

      if (Note.dragged) {
        return columnElement.querySelector("[data-notes]").append(Note.dragged);
      }

      if (this === Column.dragged) {
        return;
      }

      if (this.parentElement === Column.dragged.parentElement) {
        const column = Array.from(
          this.parentElement.querySelectorAll(".column")
        );
        const indexA = column.indexOf(this);
        const indexB = column.indexOf(Column.dragged);
        if (indexA < indexB) {
          this.parentElement.insertBefore(Column.dragged, this);
        } else {
          this.parentElement.insertBefore(
            Column.dragged,
            this.nextElementSibling
          );
        }
      } else {
        this.parentElement.insertBefore(Column.dragged, this);
      }
    });
  },

  create(id = null){
   const columnElement = document.createElement("div");
   columnElement.classList.add("column");
   columnElement.setAttribute("draggable", "true");
   if(id){
      columnElement.setAttribute("data-column-id", id);
   } else {
      columnElement.setAttribute("data-column-id", Column.idCounter);
      Column.idCounter++;
   }
   columnElement.innerHTML = `<div class="column-header"><span class="caption"></span></div>
     <div class="column-body" data-notes></div>
     <div class="column-footer">
       <span data-action-addNote class="action"
         >+ Добавить карточку</span
       >
     </div>`;
  
   
   Column.process(columnElement);

   return columnElement;
  },

  dragstart(event) {
    Column.dragged = this;
    this.classList.add("dragged");
    event.stopPropagation();
  },

  dragend(event) {
    Column.dragged = null;
    this.classList.remove("dragged");

    document
      .querySelectorAll(".column")
      .forEach(x => x.classList.remove("under"));

      Application.save();
  },

  dragenter(event) {
    if (this === Column.dragged) {
      return;
    }
    // this.classList.add("under");
  },

  dragover(event) {
    event.preventDefault();
    if (this === Column.dragged) {
      return;
    }
  },
  /* Ошибка с удалением класса при перетаскивания на дочернии элементы колонки!! */
  dragleave(event) {
    if (this === Column.dragged) {
      return;
    }
    // this.classList.remove("under");
  }
};
