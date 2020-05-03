console.log(); // global object, part of the global scope

setTimeout();
clearTimeout();

setInterval(); // REPEATEDLY call a function after a given delay
clearInterval();

//window object represents the global scope in browsers
window.setTimeout() // node does not have the window object, instead we have global

var message = '';
console.log(global.message); //message is not available with the global object

