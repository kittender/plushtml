const fs = require('fs');
const plushtml = require('../plushtml');

fs.readFile('input.html', 'utf8', function (err, html) {
  if (err) throw err;
	fs.writeFile('output.html', plushtml(html), 'utf8', function (err) {
	  if (err) throw err;
	});
});
