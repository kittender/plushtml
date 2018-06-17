const expect = require('chai').expect;
const log = require('./log.js');



const htmlChunk = "<p>Pinkadelic</p>";


// @getStart
try {
	const getStart = require('../lib/htmlPosition.js').getStart;
	expect( getStart("<body>"+htmlChunk+"</body>", "p") ).to.equal( "<body>".length );

} catch(e) {
	log.error("getStart", e);
}

log.success("getStart");

// @getEnd
try {
	const getEnd = require('../lib/htmlPosition.js').getEnd;
	expect( getEnd("<body>"+htmlChunk+"</body>", "p") ).to.equal( ("<body>"+ htmlChunk).length );

} catch(e) {
	log.error("getEnd", e);
}

log.success("getEnd");

// @getInnerStart
try {
	const getInnerStart = require('../lib/htmlPosition.js').getInnerStart;
	expect( getInnerStart("<body>"+htmlChunk+"</body>", "p") ).to.equal( "<body><p>".length );

} catch(e) {
	log.error("getInnerStart", e);
}

log.success("getInnerStart");

// @getInnerEnd
try {
	const getInnerEnd = require('../lib/htmlPosition.js').getInnerEnd;
	expect( getInnerEnd("<body>"+htmlChunk+"</body>", "p") ).to.equal( "<body><p>Pinkadelic".length );

} catch(e) {
	log.error("getInnerEnd", e);
}

log.success("getInnerEnd");

// @getTagPosition
try {
	const getTagPosition = require('../lib/htmlPosition.js').getTagPosition;
	const posObj = getTagPosition("<body>"+htmlChunk+"</body>", "p");
	expect(posObj.start).to.equal( "<body>".length );
	expect(posObj.end).to.equal( ("<body>"+ htmlChunk).length  );

} catch(e) {
	log.error("getTagPosition", e);
}

log.success("getTagPosition");

// @getTagPosition: inner
try {
	const getTagPosition = require('../lib/htmlPosition.js').getTagPosition;
	const posObj = getTagPosition("<body>"+htmlChunk+"</body>", "p", true);
	expect(posObj.start).to.equal( "<body><p>".length );
	expect(posObj.end).to.equal( "<body><p>Pinkadelic".length  );

} catch(e) {
	log.error("getTagPosition: inner", e);
}

log.success("getTagPosition: inner");