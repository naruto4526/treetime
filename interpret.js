// new Map() – creates the map.
// map.set(key, value) – stores the value by the key.
// map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
// map.has(key) – returns true if the key exists, false otherwise.
// map.delete(key) – removes the element (the key/value pair) by the key.
// map.clear() – removes everything from the map.
// map.size – returns the current element count.


//maps that have variables and functions to execute any given node in the tree.
let execute = new Map();
let globalVariables = new Map();

//avoid has elements/objects to be avoided when running, they will be handled by previous function calls
let avoid = new Set();
avoid
  .add("nest")
  .add("else")
  .add("end");

//basic operations

function plus(number1,number2) { return number1 + number2;}
function sub(number1,number2) {return number1 - number2;}
function mod(number1,number2) {return number1%number2;}
function divide(number1,number2) {return number1/number2;}
function greaterThan(number1,number2) {return number1 > number2;}
function greaterThanOrEqual(number1,number2) {return number1 >= number2;}
function lessThan(number1,number2) {return number1 < number2;}
function lessthanOrEqual(number1,number2) {return number1 <= number2;}
function isEqual(number1,number2) {return number1 == number2;}
function isNotEqual(number1, number2) {return number1 != number2;}

//function to evaluate condition from string 

function conditionCheck(string) {

  let arr = ["<=",">=","==","!=","<",">"];
  let operator;
  for (let op of arr) {
    if(string.search(op) == -1)continue;
    else {
      arr = string.split(op);
      operator = op;
      break;
    }
 	}
  if(globalVariables.has(arr[0]))arr[0] = globalVariables.get(arr[0]);
  else arr[0] = parseInt(arr[0]);
  if(globalVariables.has(arr[1]))arr[1] = globalVariables.get(arr[1]);
  else arr[1] = parseInt(arr[1]);
  return execute.get(operator)(arr[0],arr.at(-1));

}


//function to handle variable declaration 

function varDeclare(obj) { 
  let string = obj.lastElementChild.value;
  string = string.trim(); 
  let arrStr = string.split(",");
  for (let str of arrStr) {
    str = str.replace(/ /g,"");
    let arr = str.split("=");
    let lhs = arr[0];
    let rhs = arr.at(-1);
    if(globalVariables.has(rhs)) globalVariables.set(lhs,globalVariables.get(rhs));
    else globalVariables.set(lhs,parseInt(rhs));
  }
}


//function to handle print statement

function printIt(obj) {
 
  let string = obj.lastElementChild.value;
  if(globalVariables.has(string)) string = globalVariables.get(string);
  let elem = document.querySelector(".terminal");
  elem.insertAdjacentHTML('beforeend', `<p>>>${string}</p>`);

}

//function to handle if statement

function ifStmt(obj) {
  let string = obj.lastElementChild.value;
  string = string.trim(); 
  string = string.replace(/ /g,"");
  // alert(string)
  // let elseElem = obj.nextElementSibling.nextElementSibling;
  // let elseBlock;
  // if(elseElem.className == "else") {
  //   elseBlock = elseElem.nextElementSibling;
  // }
  if(conditionCheck(string)) {
    // alert("true")
    start(obj.nextElementSibling.childNodes);
    
  }
  else {
    return;
  }

}

execute
  .set("+",plus)
  .set("-",sub)
  .set("/",divide)
  .set("%",mod)
  .set("<=",lessthanOrEqual)
  .set(">=",greaterThanOrEqual)
  .set(">",greaterThan)
  .set("<",lessThan)
  .set("==",isEqual)
  .set("!=",isNotEqual)
  .set("print",printIt)
  .set("var",varDeclare)
  .set("if",ifStmt);
let buttonToRun = document.querySelector("#runpgm");

buttonToRun.onclick = function() {
  start(document.querySelectorAll(".nest")[0].childNodes);
}

function start(listNodes) {

  if(listNodes.length == 0) {
    alert("yo");
    return;
  }

  for(let node of listNodes) {
    if(avoid.has(node.className))continue;
    else run(node);
  }

}

function run(obj) {
  execute.get(obj.className)(obj);
}
