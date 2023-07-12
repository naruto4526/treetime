//function to handle function calls. It takes as argument, the object that holds the body of the function and the string of actual parameters and returns the result value.

function call(obj,str) {
  
  //getting value from either global or local map 
  function getVal(string) {
    if(localVariables.has(string))return localVariables.get(string);
    if(globalVariables.has(string))return globalVariables.get(string);
    else return parseInt(string);
  }
  let string = obj.lastElementChild.value;
  string = clean(string);
  let args = string;
  let lhs = "";
  if(string.indexOf("=") != -1) {
    let arr = string.split("=");
    lhs = arr[0];
    args = arr.at(-1);
  }
  args = args.split("(");
  let functionName = args[0];
  args = args[1];
  args = args.slice(0,-1);
  args = args.split(",");
  if(!globalVariables.has(functionName))return;
  let functionDef = globalVariables.get(functionName);
  string = functionDef.lastElementChild.value;
  string = string.trim();
  string = string.replace(/ /g,"");
  formalParameters = string.slice(string.indexOf("(") + 1);
  formalParameters = formalParameters.slice(0,-1);
  formalParameters = formalParameters.split(",");

  let localVariables = new Map();

  for(let i=0; i<args.length(); i++) {
    localVariables.set(formalParameters[i],getVal(args[i]));
  }
  
  start(functionDef.nextElementSibling.childNodes);
}

//function to handle function definition 
function defintion(obj) {
  let string = obj.lastElementChild.value;
  string = string.trim();
  string = string.replace(/ /g,"");
  let args = string;
  args = args.split("(");
  let functionName = args[0];
  globalVariables.set(functionName,obj);
  return;
}
