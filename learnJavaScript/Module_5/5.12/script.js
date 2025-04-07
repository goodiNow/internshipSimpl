//task 1

let user = {
  name: "Василий Иванович",
  age: 35,
};

let json = JSON.parse(JSON.stringify(user));

// console.log(json)

//task 2

let room = {
  number: 23,
};

let meetup = {
  title: "Совещание",
  occupiedBy: [{ name: "Иванов" }, { name: "Петров" }],
  place: room,
};

room.occupiedBy = meetup;
meetup.self = meetup;

console.log(
  JSON.stringify(meetup, function replacer(key, value) {
    return key !== "" && value === meetup ? undefined : value;
  })
);
