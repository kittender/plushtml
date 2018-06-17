# PLUSHTML <\*>

Plushtml is not a linter. It's an automated tool that reads a custom structure and prints out a standard HTML5 one.
Plushtml allows you to write the following document structure :

```html
<!DOCTYPE html>
<html>
    <head>
    	<!-- Assets best written here -->
    	<header>
    		<title></title>
    	</header>
    </head>

    <body><!-- Content best written here --></body>

    <foot>
    	<footer></footer>
    	<!-- Scripts best written here -->
    </foot>
</html>
```

Plushtml doesn't care about the details of your code.
It will try to print out your code structure as follows :

```html
<!DOCTYPE html>
<html>
    <head>
    	<!-- Assets best written here -->
    </head>

    <body>
    	<header>
    		<h1></h1>
    	</header>

    	<!-- Content best written here -->

    	<footer></footer>

    	<!-- Scripts best written here -->
    </body>

</html>
```

## Install

```
npm install plushtml
```

### Example usage

```
const fs = require('fs');
const plushtml = require('plushtml');

fs.readFile('/path/to/input.html', 'utf8', function (err, html) {
  if (err) throw err;
    fs.writeFile('/path/to/output.html', plushtml(html), 'utf8', function (err) {
      if (err) throw err;
    });
});
```