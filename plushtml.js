
const getChunk = require('./lib/htmlString.js').getChunk;
const getStart = require('./lib/htmlPosition.js').getStart;
const getEnd = require('./lib/htmlPosition.js').getEnd;
const getShallowDOM = require('./lib/shallowDOM.js').getShallowDOM;
const parentCheck = require('./lib/shallowDOM.js').parentCheck;
const removeNode = require('./lib/shallowDOM.js').removeNode;
const updateNode = require('./lib/shallowDOM.js').updateNode;
const transmuteNode = require('./lib/shallowDOM.js').transmuteNode;


function getStructure() {
    return [{
        tag: "head",
        children: [{
            tag: "header",
            children: [{
                tag: "title"
            }]

        }]
    },{
        tag: "body"
    },{
        tag: "foot",
        children: [{
            tag: "footer"
        }]
    }];
}


function parsePlushtml(plushtml) {
    if(typeof plushtml === "string") {
        let shallowDOM = getShallowDOM(plushtml, getStructure());
        let HTML = getChunk(plushtml, { start: 0, end: getStart(plushtml, "head") }); // extracting code before <head>

        if(shallowDOM.body) {

            if (shallowDOM.head) {
                if (shallowDOM.header) {
                    parentCheck(shallowDOM.head.inner, "head", "header");

                    // remove <header> from <head>
                    shallowDOM.head = removeNode("header", shallowDOM.head); 

                    if (shallowDOM.title) {
                        parentCheck(shallowDOM.header.inner, "header", "title");

                        shallowDOM.header = transmuteNode("title", "h1", shallowDOM.header); // turns title into <h1> for <header>
                        shallowDOM.head = updateNode(shallowDOM.head, shallowDOM.title.node + shallowDOM.head.inner); // insert title before <head> inner
                    }

                    shallowDOM.body = updateNode(shallowDOM.body, shallowDOM.header.node + shallowDOM.body.inner); // insert header before <body> inner
                }

                HTML += shallowDOM.head.node; // PASTE HEAD NODE INTO HTML
            }

            if (shallowDOM.foot) {
                if (shallowDOM.footer) {
                    parentCheck(shallowDOM.foot.inner, "foot", "footer");
                    
                    shallowDOM.foot = removeNode("footer", shallowDOM.foot); // remove <footer> from <foot>
                    shallowDOM.body = updateNode(shallowDOM.body, shallowDOM.body.inner + shallowDOM.footer.node); // insert footer after <body> inner
                }

                // insert foot content after <body> inner
                shallowDOM.body = updateNode(shallowDOM.body, shallowDOM.body.inner + shallowDOM.foot.inner); 
            }

            HTML += shallowDOM.body.node; // PASTE BODY NODE INTO HTML

        } else {
            throw "PLUSHTMLParser: your HTML code should contain a <body> tag";
        }

        if (shallowDOM.foot) {
            HTML += getChunk(plushtml, { start: getEnd(plushtml, "foot"), end: null }); // extracting code after </foot>
        } else {
            HTML += getChunk(plushtml, { start: getEnd(plushtml, "body"), end: null }); // extracting code after </body>
        }

        return HTML;

    } else {
            throw "PLUSHTMLParser: your HTML code can only be parsed as a string";
    }
};

module.exports = parsePlushtml;