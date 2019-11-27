Application.load()

/* Кнопка добавления колонки с карточками */
document
  .querySelector("[data-action-addColumn]")
  .addEventListener("click", function(e) {
   const columnElement = Column.create();
   document.querySelector(".columns").append(columnElement);
   const headerElement = columnElement.querySelector(".caption");
   headerElement.setAttribute("contenteditable", "true");
   headerElement.focus();

    Application.save()
  });
