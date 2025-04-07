// task 1

function wrap(target) {
  return new Proxy(target, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      } else {
        throw new Error(`Свойство "${prop}" не существует`);
      }
    },
  });
}

let user1 = { name: "Артём" };
let wrappedUser = wrap(user1);

console.log(wrappedUser.name);
// console.log(wrappedUser.age);

//task 2

let array = new Proxy([], {
  get(target, prop, receiver) {
    let index = Number(prop);
    if (index < 0) {
      return target[target.length + index];
    }
    return Reflect.get(target, prop, receiver);
  },
});

let arr = [1, 2, 3];
console.log(arr[-1]);
arr = array;
arr.push(1, 2, 3);
console.log(arr[-1]);
console.log(arr[-2]);
console.log(arr[1]);

//task 3

function makeObservable(target) {
  target.observers = [];

  target.observe = function (handler) {
    this.observers.push(handler);
  };

  return new Proxy(target, {
    set(target, prop, value, receiver) {
      let success = Reflect.set(target, prop, value, receiver);
      if (success) {
        target.observers.forEach((handler) => handler(prop, value));
      }
      return success;
    },
  });
}

let user = {};
user = makeObservable(user);

user.observe((key, value) => {
  console.log(`SET ${key}=${value}`);
});

user.name = "Иван";
user.age = 25;
