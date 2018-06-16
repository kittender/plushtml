const expect = require('chai').expect;
const log = require('./log.js');



const htmlChunk = "<strong>Pinkadelic</strong>";
const htmlChunky = "<em>Pantherish</em>";


// @getTagPosition
try {
	const getTagPosition = require('../lib/htmlContext.js').getTagPosition;
	const result = getTagPosition("<body>"+htmlChunk+"</body>", "strong");

	expect(result.start).to.equal("<body>".length);
	expect(result.end).to.equal("<body>".length + htmlChunk.length);

	expect(result.inner.start).to.equal("<body>".length + "<strong>".length);
	expect(result.inner.end).to.equal("<body>".length + "<strong>".length + "Pinkadelic".length);

} catch(e) {
	log("getTagPosition", e);
}

// @updateHOP
try {
	const updateHOP = require('../lib/htmlContext.js').updateHOP;
	const htmlPage = "<html><head>content</head><body>content</body><foot>content</foot></html>";
	const hop = updateHOP(htmlPage, {});

	// head
	const headStart = "<html>".length;
	expect(hop.head.start).to.equal(headStart);
	expect(hop.head.end).to.equal(headStart + "<head>content</head>".length);
	expect(hop.head.inner.start).to.equal(headStart + "<head>".length);
	expect(hop.head.inner.end).to.equal(headStart + "<head>content".length);

	// body
	const bodyStart = "<html><head>content</head>".length;
	expect(hop.body.start).to.equal(bodyStart);
	expect(hop.body.end).to.equal(bodyStart + "<body>content</body>".length);
	expect(hop.body.inner.start).to.equal(bodyStart + "<body>".length);
	expect(hop.body.inner.end).to.equal(bodyStart + "<body>content".length);

	// foot
	const footStart = "<html><head>content</head><body>content</body>".length;
	expect(hop.foot.start).to.equal(footStart);
	expect(hop.foot.end).to.equal(footStart + "<foot>content</foot>".length);
	expect(hop.foot.inner.start).to.equal(footStart + "<foot>".length);
	expect(hop.foot.inner.end).to.equal(footStart + "<foot>content".length);

} catch(e) {
	log("updateHOP", e);
}

// @buildContext
try {
	const buildContext = require('../lib/htmlContext.js').buildContext;
	const htmlPage = "<html><head>content</head><body>content</body><foot>content</foot></html>";
	const hop = {
		head: {
			start: "<html>".length,
			end: "<html><head>content</head>".length,
			inner: {
				start: "<html><head>".length,
				end: "<html><head>content".length,
			}
		},
		body: {
			start: "<html><head>content</head>".length,
			end: "<html><head>content</head><body>content</body>".length,
			inner: {
				start: "<html><head>content</head><body>".length,
				end: "<html><head>content</head><body>content".length,
			}
		},
		foot: {
			start: "<html><head>content</head><body>content</body>".length,
			end: "<html><head>content</head><body>content</body><foot>content</foot>".length,
			inner: {
				start: "<html><head>content</head><body>content</body><foot>".length,
				end: "<html><head>content</head><body>content</body><foot>content".length,
			}
		}
	};

	const result = buildContext(htmlPage, hop);
	expect(result.html).to.equal(htmlPage);
	expect(result.hop).to.equal(hop);

} catch(e) {
	log("buildContext", e);
}


// @updateContext
try {
	const updateContext = require('../lib/htmlContext.js').updateContext;

	const newPage = "<html><head>pinkadelic</head><body>pinkadelic</body><foot>pinkadelic</foot></html>";
	const oldhop = {
		head: {
			start: "<html>".length,
			end: "<html><head>content</head>".length,
			inner: {
				start: "<html><head>".length,
				end: "<html><head>content".length,
			}
		},
		body: {
			start: "<html><head>content</head>".length,
			end: "<html><head>content</head><body>content</body>".length,
			inner: {
				start: "<html><head>content</head><body>".length,
				end: "<html><head>content</head><body>content".length,
			}
		},
		foot: {
			start: "<html><head>content</head><body>content</body>".length,
			end: "<html><head>content</head><body>content</body><foot>content</foot>".length,
			inner: {
				start: "<html><head>content</head><body>content</body><foot>".length,
				end: "<html><head>content</head><body>content</body><foot>content".length,
			}
		}
	};

	const newhop = {
		head: {
			start: "<html>".length,
			end: "<html><head>pinkadelic</head>".length,
			inner: {
				start: "<html><head>".length,
				end: "<html><head>pinkadelic".length,
			}
		},
		body: {
			start: "<html><head>pinkadelic</head>".length,
			end: "<html><head>pinkadelic</head><body>pinkadelic</body>".length,
			inner: {
				start: "<html><head>pinkadelic</head><body>".length,
				end: "<html><head>pinkadelic</head><body>pinkadelic".length,
			}
		},
		foot: {
			start: "<html><head>pinkadelic</head><body>pinkadelic</body>".length,
			end: "<html><head>pinkadelic</head><body>pinkadelic</body><foot>pinkadelic</foot>".length,
			inner: {
				start: "<html><head>pinkadelic</head><body>pinkadelic</body><foot>".length,
				end: "<html><head>pinkadelic</head><body>pinkadelic</body><foot>pinkadelic".length,
			}
		}
	};

	let result = { html: newPage, hop: oldhop}
	result = updateContext(result.html, result.hop);

	// html
	expect(result.html).to.equal(newPage);

	// head
	expect(result.hop.head.start).to.equal(newhop.head.start);
	expect(result.hop.head.end).to.equal(newhop.head.end);
	expect(result.hop.head.inner.start).to.equal(newhop.head.inner.start);
	expect(result.hop.head.inner.end).to.equal(newhop.head.inner.end);

	// body
	expect(result.hop.body.start).to.equal(newhop.body.start);
	expect(result.hop.body.end).to.equal(newhop.body.end);
	expect(result.hop.body.inner.start).to.equal(newhop.body.inner.start);
	expect(result.hop.body.inner.end).to.equal(newhop.body.inner.end);

	// foot
	expect(result.hop.foot.start).to.equal(newhop.foot.start);
	expect(result.hop.foot.end).to.equal(newhop.foot.end);
	expect(result.hop.foot.inner.start).to.equal(newhop.foot.inner.start);
	expect(result.hop.foot.inner.end).to.equal(newhop.foot.inner.end);

} catch(e) {
	log("updateContext", e);
}
	