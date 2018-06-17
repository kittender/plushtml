const expect = require('chai').expect;
const log = require('./log.js');



const htmlChunk = "<p>Pinkadelic</p>";
const htmlChunky = "<p>Pantherish</p>";


// @removeChunk
try {
	const removeChunk = require('../lib/htmlString.js').removeChunk;
	expect( removeChunk("<body>"+htmlChunk+"</body>", { start: "<body>".length, end: ("<body>".length + htmlChunk.length) }) ).to.equal( "<body></body>" );
} catch(e) {
	log.error("removeChunk", e);
}

log.success("removeChunk");

// @getChunk
try {
	const getChunk = require('../lib/htmlString.js').getChunk;
	expect( getChunk("<body>"+htmlChunk+"</body>", { start: "<body>".length, end: ("<body>".length + htmlChunk.length) }) ).to.equal( htmlChunk );

} catch(e) {
	log.error("getChunk", e);
}

log.success("getChunk");

// @isChildrenOf
try {
	const isChildrenOf = require('../lib/htmlString.js').isChildrenOf;
	expect( isChildrenOf("<body><strong></strong></body>", "strong") ).to.have.lengthOf(1);
	expect( isChildrenOf("<body><strong></strong></body>", "em") ).to.equal( null );

} catch(e) {
	log.error("isChildrenOf", e);
}

log.success("isChildrenOf");

// @changeTag
try {
	const changeTag = require('../lib/htmlString.js').changeTag;
	expect( changeTag("<body><p>awww</p></body>", "p", "div") ).to.equal( "<body><div>awww</div></body>" );

} catch(e) {
	log.error("changeTag", e);
}

log.success("changeTag");