// new Map() – creates the map.
// map.set(key, value) – stores the value by the key.
// map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
// map.has(key) – returns true if the key exists, false otherwise.
// map.delete(key) – removes the element (the key/value pair) by the key.
// map.clear() – removes everything from the map.
// map.size – returns the current element count.

let execute = new Map();

// function sing(arg1) {
//   alert(arg1);
// }
// execute.set("alert",sing);
// execute.get("alert")("hokage");

function print(str, obj) {
  let string = obj.lastElementChild.value;
  let elem = document.querySelector(".terminal");
  elem.innerHTML = ">>" + string;
}

let buttonToRun = document.querySelector("#runIt");

buttonToRun.onclick = function() {
  run(document.querySelectorAll(".nest")[0]);
}

function run(obj) {

  alert("why "+ obj);
  
}
