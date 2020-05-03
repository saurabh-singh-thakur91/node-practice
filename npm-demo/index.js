var _ = require('underscore');

// Node resolving a require
// Node assumes its a core module
// File or folder in this project (but that requires it to be './underscore') then tries to find index.js
// looks inside node_modules directory

var result = _.contains([1, 2 ,3], 2);
console.log(result);

// Exercise
// Install mongoose package


