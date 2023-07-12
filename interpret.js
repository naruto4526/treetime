  // new Map() – creates the map.
  // map.set(key, value) – stores the value by the key.
  // map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
  // map.has(key) – returns true if the key exists, false otherwise.
  // map.delete(key) – removes the element (the key/value pair) by the key.
  // map.clear() – removes everything from the map.
  // map.size – returns the current element count.


function callFunction(obj,str1,str2) {
  //maps that have variables and functions to execute any given node in the tree.
  listOfNodes = obj.nextElementSibling.childNodes;
  let execute = new Map();
  let globalVariables = new Map();
  let stackOfLoops = []
  if(obj.className != "main") {
    let s = obj.lastElementChild.value;
    s = clean(s);
    s = s.slice(0,s.indexOf('('));
    globalVariables.set(s,obj);
    // alert(`${s} set to ${globalVariables.get(s).className}`);
    // alert(str1);
    // alert(str2);
  }
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
  function divide(number1,number2) {return Math.floor(number1/number2);}
  function product(number1,number2) {return number1*number2;}
  function greaterThan(number1,number2) {return number1 > number2;}
  function greaterThanOrEqual(number1,number2) {return number1 >= number2;}
  function lessThan(number1,number2) {return number1 < number2;}
  function lessthanOrEqual(number1,number2) {return number1 <= number2;}
  function isEqual(number1,number2) {return number1 == number2;}
  function isNotEqual(number1, number2) {return number1 != number2;}

  //function to clean string
  function clean(string) {
    string = string.trim();
    string = string.replace(/ /g,"");
    return string;
  }
  //function to see if ident present in map, and if so, return val. Otherwise, ident must be number so return that

  function getVal(string) {
    if(string.indexOf('(') != -1) {
      let funcName = string.slice(0,string.indexOf('('));
      string = string.slice(string.indexOf('(') + 1);
      string = string.slice(0,-1);
      string = string.split(',');
      string = string.map(x => getVal(x));
      string = string.toString();
      string = "(" + string + ")";
      let obj = globalVariables.get(funcName);
      let formalPara = obj.lastElementChild.value;
      formalPara = clean(formalPara);
      
      // alert(string);
      formalPara = formalPara.slice(formalPara.indexOf("("));
      // alert(formalPara);
      return callFunction(obj,formalPara,string);
    }
    if(globalVariables.has(string))return globalVariables.get(string);
    else return parseInt(string);
  }

  //function to handle variable declaration 

  function varDeclare(obj) { 
    let string = obj.lastElementChild.value;
    string = clean(string);
    let arrStr = string.split(",");
    for (let str of arrStr) {
    
      let arr = str.split("=");
      let lhs = arr[0];
      let rhs = arr.at(-1);
      //rhs = eval(rhs);
      globalVariables.set(lhs,getVal(rhs));
    }
    return "goOn";
  }

  //function to do math

  function math(obj,eval) {
  
    let ops = ["*","/","+","-","%"];
    let string;
    if(eval != undefined) {
      string = eval;
    }
    else {
      string = obj.lastElementChild.value;
    }
    string = clean(string);
    let arrStr = string.split(",");
    for (let str of arrStr) {

      let arr = str.split("=");
      let lhs = arr[0];
      let rhs = arr.at(-1);

      if(rhs.indexOf("ABS") == 0) {
        rhs = rhs.slice(4);
        rhs = rhs.slice(0,-1);
        let splitArr = rhs.split("-");
        if(splitArr.length == 1) {
          globalVariables.set(lhs,Math.abs(getVal(rhs)));
        }
        else globalVariables.set(lhs,Math.abs(getVal(splitArr[0]) - getVal(splitArr.at(-1))));
        return "goOn";
      }
      let flag = 0;
      for(let sign of ops) {
        if(rhs.indexOf(sign) == -1)continue;
        let nums = rhs.split(sign);
        let numberOne = getVal(nums[0]);
        let numberTwo = getVal(nums[1]);
        globalVariables.set(lhs,execute.get(sign)(numberOne,numberTwo));
        flag = 1;
        break;
      }
      if(flag == 0) {
        globalVariables.set(lhs,getVal(rhs));
      }
    }
    return "goOn";
  }

  //function to handle print statement and to clear terminal

  printStack = [];
  let term = document.querySelector(".terminal");
  let para = document.createElement('p');
  term.append(para);
  printStack.push(para);
  function printIt(obj) {
  
    let string = obj.lastElementChild.value;
    let str = string.slice(0,2);
    if(str=='\\n') {
      string = string.slice(2);
      let newPara = document.createElement('p');
      term.append(newPara);
      printStack.push(newPara);
    }
    let elem = printStack.at(-1);
    str = string.slice(-2);
    if(str == '\\n') {
      let newPara = document.createElement('p');
      term.append(newPara);
      printStack.push(newPara);
      string = string.slice(0,-2);
    }
    if(globalVariables.has(string)) string = globalVariables.get(string);
    elem.insertAdjacentText('beforeend', `${string}`);
    // alert(term.innerHTML);
    return "goOn";

  }

  let clear = document.querySelector("#clc");
  clear.onclick = function() {
    let term = document.querySelector(".terminal");
    term.innerHTML = "";
    printStack = [];
    let para = document.createElement('p');
    para.innerHTMl = ">>";
    term.append(para);
    printStack.push(para);
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
    string = clean(string);
    // alert(string)
    if(conditionCheck(string)) {
      // alert("true")
      let val = start(obj.nextElementSibling.childNodes);
      if(val == "continue")return "continue";
      else if(val == "break")return "break";
      else return val;
      
    }
    else {
      let elseElem = obj.nextElementSibling.nextElementSibling;
      let elseBlock;
      if(elseElem.className == "else") {
        elseBlock = elseElem.nextElementSibling;
        let val = start(elseBlock.childNodes);
        if(val == "continue")return "continue";
        else if(val == "break")return "break";
        else return val;
      }
    }
    return "goOn";
  }

  //function to handle for loop

  function forLoop(obj) {
    stackOfLoops.push(obj);
    let string = obj.lastElementChild.value;
    let iter = "it";
    string = clean(string);
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
        let val = start(obj.nextElementSibling.childNodes);
        if(val == "continue"||val == "goOn")continue;
        else if(val == "break")return "goOn";
        else return val;
      }
      return "goOn";
    }
    for(let i = l; i < r; i++) {
      if(iter != "it") {
        globalVariables.set(iter,i);
      }
      let val = start(obj.nextElementSibling.childNodes);
      if(val == "continue"||val == "goOn")continue;
      else if(val == "break")return "goOn";
      else return val;
    }
    return "goOn";
  }

  //function for while loop

  function whileLoop(obj) {
    stackOfLoops.push(obj);
    let string = obj.lastElementChild.value;
    string = clean(string);
    let count = 0;
    while(conditionCheck(string)) {
      count++;
      if(count == 46185) {
        alert("While loop exited forcefully");
        break;
      }
      let val = start(obj.nextElementSibling.childNodes);
      if(val == "continue"||val == "goOn")continue;
      else if(val == "break")return "goOn";
      else return val;
    }
    return "goOn";
  }
  //function to handle function definition
  function def(obj) {
    let string = obj.lastElementChild.value;
    string = clean(string);
    let bracket = string.indexOf('(');
    string = string.slice(0,bracket);
    globalVariables.set(string,obj);
    return "goOn";
  }

  //function to handle function calls

  function call(obj) {
    let string = obj.lastElementChild.value;
    string = clean(string);
    math(obj,string);
    return "goOn";
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
    .set("while",whileLoop)
    .set("def",def)
    .set("call",call);


  //functions that iterates through parent nodes at current level and executes them

  function start(listNodes) {

    if(listNodes.length == 0) {
      alert("yo");
      return;
    }
    for(let node of listNodes) {
      if(avoid.has(node.className))continue;
      if(node.className == "continue")return "continue";
      if(node.className == "break")return "break";
      if(node.className == "return")return getVal(clean(node.lastElementChild.value));
      
      let val = run(node);
      if(val == "goOn")continue;
      else if(val == "continue")return "continue";
      else if(val == "break")return "break";
      else return val;
      
    }
    return "goOn";
  }

  function run(obj) {
    let val = execute.get(obj.className)(obj);
    return val;
  }

  if(str1 == undefined) {
    start(listOfNodes);
    return;
  }

  str1 = str1.slice(1);
  str1 = str1.slice(0,-1);
  str2 = str2.slice(1);
  str2 = str2.slice(0,-1);

  str1 = str1.split(',');
  str2 = str2.split(',');
  // alert(str1);
  // alert(str2);
  //assigning actual parameters to formal parameters 
  for(let arg in str1) {
    globalVariables.set(str1[arg],parseInt(str2[arg]));
    // alert(`${str1[arg]} has value ${globalVariables.get(str1[arg])}`);
  }

  return start(listOfNodes);
}


let buttonToRun = document.querySelector("#runpgm");

buttonToRun.onclick = function() {
  callFunction(document.querySelector(".main"));
}


