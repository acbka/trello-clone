Application.load()

/* Кнопка добавления колонки с карточками */
document
  .querySelector("[data-action-addColumn]")
  .addEventListener("click", function(e) {
   const column= new Column
   document.querySelector(".columns").append(column.element)
   //const headerElement = columnElement.querySelector(".caption")
   //headerElement.setAttribute("contenteditable", "true")
   //headerElement.focus()

    Application.save()
  });
