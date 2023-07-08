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
function product(number1,number2) {return number1*number2;}
function greaterThan(number1,number2) {return number1 > number2;}
function greaterThanOrEqual(number1,number2) {return number1 >= number2;}
function lessThan(number1,number2) {return number1 < number2;}
function lessthanOrEqual(number1,number2) {return number1 <= number2;}
function isEqual(number1,number2) {return number1 == number2;}
function isNotEqual(number1, number2) {return number1 != number2;}

//function to see if ident present in map, and if so, return val. Otherwise, ident must be number so return that

function getVal(string) {
  if(globalVariables.has(string))return globalVariables.get(string);
  else return parseInt(string);
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
    //rhs = eval(rhs);
    globalVariables.set(lhs,getVal(rhs));
  }
}

//function to do math

function math(obj) {
  let ops = ["*","/","+","-","%"];
  
  let string = obj.lastElementChild.value;
  string = string.trim(); 
  let arrStr = string.split(",");
  for (let str of arrStr) {
    str = str.replace(/ /g,"");
    let arr = str.split("=");
    let lhs = arr[0];
    let rhs = arr.at(-1);
    for(let sign of ops) {
      if(rhs.indexOf(sign) == -1)continue;
      let nums = rhs.split(sign);
      let numberOne = getVal(nums[0]);
      let numberTwo = getVal(nums[1]);
      globalVariables.set(lhs,execute.get(sign)(numberOne,numberTwo));
    }
  }
}

//function to handle print statement

function printIt(obj) {
 
  let string = obj.lastElementChild.value;
  if(globalVariables.has(string)) string = globalVariables.get(string);
  let elem = document.querySelector(".terminal");
  elem.insertAdjacentHTML('beforeend', `<p>>>${string}</p>`);

}

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
  arr[0] = getVal(arr[0]);
  arr[1] = getVal(arr[1]);
  return execute.get(operator)(arr[0],arr.at(-1));

}

//function to handle if statement and else statement

function ifStmt(obj) {
  let string = obj.lastElementChild.value;
  string = string.trim(); 
  string = string.replace(/ /g,"");
  // alert(string)
  if(conditionCheck(string)) {
    // alert("true")
    start(obj.nextElementSibling.childNodes);
    
  }
  else {
    let elseElem = obj.nextElementSibling.nextElementSibling;
    let elseBlock;
    if(elseElem.className == "else") {
      elseBlock = elseElem.nextElementSibling;
      start(elseBlock.childNodes);
    }
    else return;
  }
}

//function to handle for loop

function forLoop(obj) {
  let string = obj.lastElementChild.value;
  let iter = "it";
  string = string.trim();
  string = string.replace(/ /g,"");
  let condition = string;
  if(string.search("=") != -1) {
    let arr = string.split("=");
    iter = arr[0];
    condition = arr.at(-1);
  }
  condition = condition.split(":");
  let l = getVal(condition[0]);
  let r = getVal(condition.at(-1));
  if(l > r) {
    for(let i = l; i > r; i--) {
      if(iter != "it") {
        globalVariables.set(iter,i);
      }
      start(obj.nextElementSibling.childNodes);
    }
    return;
  }
  for(let i = l; i < r; i++) {
    if(iter != "it") {
      globalVariables.set(iter,i);
    }
    start(obj.nextElementSibling.childNodes);
  }
}

 //function for while loop

 function whileLoop(obj) {
  let string = obj.lastElementChild.value;
  string = string.trim();
  string = string.replace(/ /g,"");

  while(conditionCheck(string)) {
    start(obj.nextElementSibling.childNodes);
  }
}

//adding functions to the map to be called later

execute
  .set("+",plus)
  .set("-",sub)
  .set("/",divide)
  .set("*",product)
  .set("%",mod)
  .set("math",math)
  .set("<=",lessthanOrEqual)
  .set(">=",greaterThanOrEqual)
  .set(">",greaterThan)
  .set("<",lessThan)
  .set("==",isEqual)
  .set("!=",isNotEqual)
  .set("print",printIt)
  .set("var",varDeclare)
  .set("if",ifStmt)
  .set("for",forLoop)
  .set("while",whileLoop);
  

let buttonToRun = document.querySelector("#runpgm");

buttonToRun.onclick = function() {
  start(document.querySelectorAll(".nest")[0].childNodes);
}


//functions that iterates through parent nodes at current level and executes them

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
