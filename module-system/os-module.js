const os = require('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log('Total memory: ' + totalMemory);

//template string
//ES6 / ES2015
console.log(`Free memory: ${freeMemory}`);