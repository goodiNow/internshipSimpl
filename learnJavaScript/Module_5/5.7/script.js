//task 1

function unique(arr) {
    return [...new Set(arr)];
  }
  
  let values = ["2", "22", "3", "Krishna",
    "Krishna", "1", "1", "5", "22"
  ];
  
  console.log(unique(values));

//task 2

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

console.log(aclean(arr));

function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    let sort = word.toLowerCase().split("").sort().join("");
    map.set(sort, word);
  }

  return Array.from(map.values());
}
