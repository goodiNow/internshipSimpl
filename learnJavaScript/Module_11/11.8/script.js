//task 1

async function loadJson(url) {
  try {
    let response = await fetch(url);

    if (response.status == 200) {
      return await response.json();
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    alert(error);
  }
}

loadJson("no-such-user.json");

//task 2

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);

  if (response.status == 200) {
    return await response.json();
  } else {
    throw new HttpError(response);
  }
}

async function demoGithubUser() {
  while (true) {
    let name = prompt("Введите логин?", "iliakan");

    try {
      let user = await loadJson(`https://api.github.com/users/${name}`);
      alert(`Полное имя: ${user.name}.`);
      return user;
    } catch (err) {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
      } else {
        throw err;
      }
    }
  }
}

demoGithubUser();
