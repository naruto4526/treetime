
//[1,2].forEach(alert);
//alert(`you chose ${age}`);

function makeUser(name, age) {
    return {
      name: name,
      age: age,
      // ...other properties
    };
  }

function User(name) {
this.name = name;
this.isAdmin = false;
}

let user = new User("Jack");

alert(user.name); // Jack
alert(user.isAdmin); // false
  "key" in object
  let n = "name"
  n in object 
  // is a variable containing the quoted string
  //Please note that on the left side of in there must be a property name. That’s usually a quoted string.
//If we omit quotes, that means a variable should contain the actual name to be tested. For instance:


let usor = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // values for the keys
  alert( user[key] ); // John, 30, true
}

//backticks to return string expression.

const person = "Mike";
const age = 28;

function myTag(strings, personExp, ageExp) {
  const str0 = strings[0]; // "That "
  const str1 = strings[1]; // " is a "
  const str2 = strings[2]; // "."

  const ageStr = ageExp > 99 ? "centenarian" : "youngster";

  // We can even return a string built using a template literal
  return `${str0}${personExp}${str1}${ageStr}${str2}`;
}

const output = myTag`That ${person} is a ${age}.`;

console.log(output);
// That Mike is a youngster.


//STRING MANIPULATION!!!!!!????

//iterate through a string 

for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char becomes "H", then "e", then "l" etc)
}

alert( str[0] ); // H
alert( str.at(0) ); // H

// the last character
alert( str[str.length - 1] ); // o
alert( str.at(-1) );


//Strings are immutble and therefore we have to creater new strings each time we wanna change a string

let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, because 'Widget' is found at the beginning
alert( str.indexOf('widget') );

//start looking from a different index location
alert( str.indexOf('id', 2) )

//to look for every single occurrence of a string, loop until indexOf() returns a -1

let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}

alert( "Widget with id".includes("Widget") ); // true

//slicing of strings

alert( str.slice(0, 5) ); // 'strin', the substring from 0 to 5 (not including 5)

// Remove all occurrences of the character 'a' from the string 'banana'
string = 'banana'
string = string.replace('a', '') //bnn


// ARRAYSS!?!?!

let fruits = ["Apple", "Orange", "Plum"];

let len = fruits.length //length of an array

//arrays can store elements of any type, even objects and functions

// mix of values
let arr = [ 'Apple', { name: 'John' }, true, function() { alert('hello'); } ];

// get the object at index 1 and then show its name
alert( arr[1].name ); // John

// get the function at index 3 and run it
arr[3](); // hello

//array supports pop_front = shift and push_back = push operations. pop_back is pop

fruits.pop()//returns the last elements and removes it from the array

fruits.push('sumn')// is equal to fruits[fruits.length] = 'sumn'

fruits.unshift('apple') //inserts at index 0

fruits.shift() // removes apple from the array and returns it

//adding multiple elements at once
fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");

//array is an object and therefore is copied by reference just like objects and we need special copy
//methods

let fruito = []; // make an array

let fruity = ["Apple", "Orange", "Plum"];

// iterates over array elements
for (let fruit of fruits) {
  alert( fruit );
}


//NOTICE: shift and unshift are slow as expected, but pop and push are fast

for (let key in arr) {
  alert( arr[key] ); // Apple, Orange, Pear
}

//for.. in.. is acrtually slower although useful... keep that in mind

fruits[123] = "Apple";

//fruits.length() returns 124, which is the greatest index plus one

//TWO OBJECTS ARE EQUAL ONLY IF THEY POINT TO THE SAME OBJECT. == will return true if and only if both variables
//are references to the same object


//my love, oh my love

for (let i=0; i<arr.length; i++);
//{works fastest, old-browser-compatible.

//DELETING STUFF FROM AN ARRAY

let aso = ["I", "go", "home"];

delete aso[1]; // remove "go"

alert( aso[1] ); // undefined

// now arr = ["I",  , "home"];
alert( arr.length ); // 3

//NOTICE: delete obj.key removes a value by the key


//add some splice to your life!!

let ar = ["I", "study", "JavaScript", "right", "now"];

// remove 3 first elements and replace them with another
arr.splice(0, 3, "Let's", "dance");

alert( arr ) // now ["Let's", "dance", "right", "now"]

//splice removes second arg number of elements starting from the fisrt arg index number and inserts all
//the remaining arguments at this index 
//splice allows negative value as first argument which is the index from where deletion starts

let a = ["t", "e", "s", "t"];

alert( arr.slice(1, 3) ); // e,s (copy from 1 to 3)

alert( arr.slice(-2) ); // s,t (copy from -2 till the end)


//concatenate arrays here
let arrr = [1, 2];

// create an array from: arr and [3,4]
alert( arr.concat([3, 4]) ); // 1,2,3,4

//can pass as argument to foreach, a function that itself takes as argument the item, index and array
//arr.forEach(function(item,index,array) {
  //do sumn
//})
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});

//search in an array

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2

//check if present in an array

alert( arr.includes(1) ); // true

//to search through an array of objects to find one that satisfies a condition

//TRANSFORM AN ARRAY. Call a function on every element in the array and return an array of the results
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6

//sort funciton sorts the string rep, so write a custom comparision function, using arrow function oke
arr.sort( (a, b) => a - b );

//reverse the array bro

arr.reverse();

//python spllitstrings arrives
let names = 'Bilbo, Gandalf, Nazgul';
let rr = names.split(', '); // [Bilbo,Gandalf,Nazgul]
for (let name of rr) {
  alert( `A message to ${name}.` ); // A message to Bilbo  (and other names)
}

//now to join an array of strings using some seperator
arr.join(';');

//merge arrays lesgooo
{
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

let merged = [0, ...arr, 2, ...arr2];

alert(merged); // 0,3,5,1,2,8,9,15 (0, then arr, then 2, then arr2)
}
//get array from stuff
let stronk = "Hello";

// Array.from converts an iterable into an array
alert( Array.from(stronk) ); // H,e,l,l,o

//Array.from works on both iterables and array-likes


//copy arrays easily. Array also pass by ref like obj
let arrCopy = [...arr]; 
// spread the array into a list of parameters
// then put the result into a new array

//DOM
// The reason is that the root node document.documentElement (<html>) has document as its parent. 
//But document is not an element node, so parentNode returns it and parentElement does not.
//climb up the tree until html which is document.documentElement but not up to document which is parent of html
while(elem = elem.parentElement) { // go up till <html>
  alert( elem );
}

//get and set non-standard attributes to html tags

//CHECK HANDWRITTEN NOTES

  <div id="elem" about="Elephant"></div>

    alert( elem.getAttribute('About') ); // (1) 'Elephant', reading
    elem.setAttribute('Test', 123); // (2), writing
    alert( elem.outerHTML ); 
    //see if the attribute is in HTML (yes)
  //attributes collection is iterable in js. And attributes we set are in string type
    for (let attr of elem.attributes) { // (4) list all
      alert( `${attr.name} = ${attr.value}`);
    }

//just use dot operator to access these properties instead of getAttribute as non std attr will
//not synchronise

//attribute value and property value are two different things( for the same html tag and dom object representation)
//for example, the style attribute is a string in the html, and in the dom property , it is an object
//with its own properties

// important!!
// The value of this inside a handler is the element. The one which has the handler on it.
// In the code below button shows its contents using this.innerHTML:

<button onclick="alert(this.innerHTML)">Click me</button>
//this will show the innerHtml, the html inside the current element which is 'this'

///EVENT LISTENERS
//can add and remove event listeners
function handler() {
  alert( 'Thanks!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);

//inout is the id of a html element in the document

//to know more about an event that occurred , we can pass the event object as an argument to the handler
elem.onclick = function(event) {
  // show event type, element and coordinates of the click
  alert(event.type + " at " + event.currentTarget);
  alert("Coordinates: " + event.clientX + ":" + event.clientY);
};

//do not stop bubbling of events  instead, do this!!
// Also we can write our data into the event object in one handler and read it in another one, 
// so we can pass to handlers on parents,information about the processing below.


//assign an event handler to the parent element to handle all similar events on the children
//if you wanna do the same thing to all the children then just add that handler to the parent and
//get the event.target and hande event in the parent handler accordinlgy

let selectedTd;

table.onclick = function(event) {
  let target = event.target; // where was the click?

  if (target.tagName != 'TD') return; // not on TD? Then we're not interested

  highlight(target); // highlight it
};

function highlight(td) {
  if (selectedTd) { // remove the existing highlight if any
    selectedTd.classList.remove('highlight');
  }
  selectedTd = td;
  selectedTd.classList.add('highlight'); // highlight the new td
}

//make sure to catch events on nested tags inside our required tags when using event handlers
table.onclick = function(event) {
  let td = event.target.closest('td'); // (1)

  if (!td) return; // (2)

  if (!table.contains(td)) return; // (3)

  highlight(td); // (4)
};

//bocl default operations of the browser if you need to
menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  alert( href ); // ...can be loading from the server, UI generation etc

  return false; // prevent browser action (don't go to the URL)
};