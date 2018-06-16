const fs = require('fs');
const exec = require('child_process').exec;
const plushtml = require('../plushtml.js').plushtml;

fs.readFile('./input.html', 'utf8', function(oErr, plushtmlString) {
    console.log(plushtml(plushtmlString));
});