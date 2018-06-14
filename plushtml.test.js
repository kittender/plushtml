"use strict";

const PLUSHTMLDebug = true;
const PLUSHTMLParser = require('./plushmtl.js').plushtml;
const minimalHTML = '<!DOCTYPE html><html lang="en-US" charset="UTF-8"> <head> <header> <title>Title of the document</title> <nav> <a href="#one">One</a> <a href="#two">Two</a> <a href="#three">Three</a> <a href="#four">Four</a> <a href="#five">Five</a> </nav> </header> </head> <body> <h1>Title in the document content</h1> <p>Hello world! This is PLUSHTML Boilerplate.</p></body> <foot> <footer> <h6>Title of the document foot</h6> <nav> <a href="#six">Six</a> <a href="#seven">Seven</a> <a href="#eight">Eight</a> <a href="#nine">Nine</a> </nav> </footer> </foot></html>';
PLUSHTMLParser(minimalHTML);