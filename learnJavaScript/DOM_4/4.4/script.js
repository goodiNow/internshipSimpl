function showCover() {
  let coverDiv = document.createElement("div");
  coverDiv.id = "cover-div";
  document.body.append(coverDiv);
  document.body.style.overflowY = "hidden";
}

function hideCover() {
  let coverDiv = document.getElementById("cover-div");
  if (coverDiv) coverDiv.remove();
  document.body.style.overflowY = "";
}

function showPrompt(text, callback) {
  showCover();

  let form = document.getElementById("prompt-form");
  let container = document.getElementById("prompt-form-container");
  let message = document.getElementById("prompt-message");
  let input = form.elements["text"];
  let cancelButton = form.elements["cancel"];

  message.innerHTML = text;
  input.value = "";

  function complete(value) {
    hideCover();
    container.style.display = "none";
    document.onkeydown = null;
    callback(value);
  }

  form.onsubmit = function (e) {
    e.preventDefault();
    complete(input.value);
  };

  cancelButton.onclick = function () {
    complete(null);
  };

  document.onkeydown = function (e) {
    if (e.key === "Escape") {
      complete(null);
    }
  };

  input.onkeydown = function (e) {
    if (e.key === "Tab") {
      e.preventDefault();
      let nextElement = e.shiftKey
        ? cancelButton
        : form.querySelector("input[type='submit']");
      nextElement.focus();
    }
  };

  container.style.display = "block";
  input.focus();
}

document.getElementById("show-button").onclick = function () {
  showPrompt("Введите что-нибудь<br>...умное :)", function (value) {
    alert("Вы ввели: " + value);
  });
};
