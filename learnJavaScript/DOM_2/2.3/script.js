//task 1
container.onclick = function (event) {
  if (event.target.className != "remove-button") return;

  let pane = event.target.closest(".pane");
  pane.remove();
};

//task 2
for (let li of tree.querySelectorAll("li")) {
  let span = document.createElement("span");
  li.prepend(span);
  span.append(span.nextSibling);
}

tree.onclick = function (event) {
  if (event.target.tagName != "SPAN") {
    return;
  }

  let childrenContainer = event.target.parentNode.querySelector("ul");
  if (!childrenContainer) return;

  childrenContainer.hidden = !childrenContainer.hidden;
};

//task 3
grid.onclick = function (e) {
  if (e.target.tagName != "TH") return;

  let th = e.target;

  sortGrid(th.cellIndex, th.dataset.type);
};

function sortGrid(colNum, type) {
  let tbody = grid.querySelector("tbody");

  let rowsArray = Array.from(tbody.rows);

  let compare;

  switch (type) {
    case "number":
      compare = function (rowA, rowB) {
        return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
      };
      break;
    case "string":
      compare = function (rowA, rowB) {
        return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML
          ? 1
          : -1;
      };
      break;
  }

  rowsArray.sort(compare);

  tbody.append(...rowsArray);
}
