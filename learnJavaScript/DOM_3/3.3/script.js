let isDragging = false;
let dragElement = null;
let shiftX, shiftY;

function onMouseMove(event) {
  if (!isDragging) return;
  moveAt(event.clientX, event.clientY);
}

function onMouseUp() {
  if (!isDragging) return;
  finishDrag();
}

function startDrag(element, clientX, clientY) {
  if (isDragging) return;

  isDragging = true;
  dragElement = element;

  const rect = element.getBoundingClientRect();
  shiftX = clientX - rect.left;
  shiftY = clientY - rect.top;

  element.style.position = "fixed";
  element.style.zIndex = "1000";
  document.body.append(element);

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp, { once: true });

  moveAt(clientX, clientY);
}

function finishDrag() {
  if (!isDragging) return;

  isDragging = false;
  dragElement.style.position = "absolute";
  dragElement.style.zIndex = "";
  dragElement.style.top = `${
    parseInt(dragElement.style.top) + window.pageYOffset
  }px`;

  document.removeEventListener("mousemove", onMouseMove);
  dragElement = null;
}

function moveAt(clientX, clientY) {
  if (!dragElement) return;

  let newX = clientX - shiftX;
  let newY = clientY - shiftY;

  const viewportHeight = document.documentElement.clientHeight;
  const elementHeight = dragElement.offsetHeight;
  const viewportWidth = document.documentElement.clientWidth;
  const elementWidth = dragElement.offsetWidth;

  if (newY + elementHeight > viewportHeight - 10) {
    window.scrollBy(0, 10);
  } else if (newY < 10) {
    window.scrollBy(0, -10);
  }

  newX = Math.max(0, Math.min(newX, viewportWidth - elementWidth));
  newY = Math.max(0, Math.min(newY, viewportHeight - elementHeight));

  dragElement.style.left = `${newX}px`;
  dragElement.style.top = `${newY}px`;
}

document.addEventListener("mousedown", function (event) {
  const target = event.target.closest(".draggable");
  if (!target) return;

  event.preventDefault();
  target.ondragstart = () => false;

  startDrag(target, event.clientX, event.clientY);
});
