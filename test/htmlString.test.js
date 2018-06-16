const expect = require('chai').expect;
const log = require('./log.js');



const htmlChunk = "<p>Pinkadelic</p>";
const htmlChunky = "<p>Pantherish</p>";


// @removeChunk
try {
	const removeChunk = require('../lib/htmlString.js').removeChunk;
	expect( removeChunk("<body>"+htmlChunk+"</body>", { start: "<body>".length, end: ("<body>".length + htmlChunk.length) }) ).to.equal( "<body></body>" );

} catch(e) {
	log("removeChunk", e);
}

// @getChunk
try {
	const getChunk = require('../lib/htmlString.js').getChunk;
	expect( getChunk("<body>"+htmlChunk+"</body>", { start: "<body>".length, end: ("<body>".length + htmlChunk.length) }) ).to.equal( htmlChunk );

} catch(e) {
	log("getChunk", e);
}

// @pasteBefore
try {
	const pasteBefore = require('../lib/htmlString.js').pasteBefore;
	expect( pasteBefore("<body>"+htmlChunk+"</body>", htmlChunky, "<body>".length) ).to.equal( "<body>"+htmlChunky+htmlChunk+"</body>" );

} catch(e) {
	log("pasteBefore", e);
}

// @pasteAfter
try {
	const pasteAfter = require('../lib/htmlString.js').pasteAfter;
	expect( pasteAfter("<body>"+htmlChunk+"</body>", htmlChunky, ("<body>".length + htmlChunk.length)) ).to.equal( "<body>"+htmlChunk+htmlChunky+"</body>" );

} catch(e) {
	log("pasteAfter", e);
}

// @isChildrenOf
try {
	const isChildrenOf = require('../lib/htmlString.js').isChildrenOf;
	expect( isChildrenOf("<body><strong></strong></body>", "strong") ).to.have.lengthOf(1);
	expect( isChildrenOf("<body><strong></strong></body>", "em") ).to.equal( null );

} catch(e) {
	log("isChildrenOf", e);
}

// @changeTag
try {
	const changeTag = require('../lib/htmlString.js').changeTag;
	expect( changeTag("<body><p>awww</p></body>", "p", "div") ).to.equal( "<body><div>awww</div></body>" );

} catch(e) {
	log("changeTag", e);
}