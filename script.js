document.querySelectorAll(".column").forEach(Column.process);
document.querySelectorAll(".note").forEach(Note.process);

/* Кнопка добавления колонки с карточками */
document
  .querySelector("[data-action-addColumn]")
  .addEventListener("click", function(e) {
    const columnElement = document.createElement("div");
    columnElement.classList.add("column");
    columnElement.setAttribute("draggable", "true");
    columnElement.setAttribute("data-column-id", Column.idCounter++);
    columnElement.innerHTML = `<div class="column-header"><span class="caption"></span></div>
      <div class="column-body" data-notes></div>
      <div class="column-footer">
        <span data-action-addNote class="action"
          >+ Добавить карточку</span
        >
      </div>`;

    document.querySelector(".columns").append(columnElement);
    Column.process(columnElement);
    const headerElement = columnElement.querySelector(".caption");
    headerElement.setAttribute("contenteditable", "true");
    headerElement.focus();
  });
