const expect = require('chai').expect;
const log = require('./log.js');


const htmlContent = "Pinkadelic";
const htmlTag = "<p>"+htmlContent+"</p>";
const htmlChunk = "<body>"+htmlTag+"</body>";


// @getShallowNode
try {
	const getShallowNode = require('../lib/shallowDOM.js').getShallowNode;
	const node = getShallowNode(htmlChunk, "p");
	expect(node.tag).to.equal("p");
	expect(node.node).to.equal(htmlTag);
	expect(node.inner).to.equal(htmlContent);
} catch(e) {
	log.error("getShallowNode", e);
}

log.success("getShallowNode");


// @removeNode
try {
	const removeNode = require('../lib/shallowDOM.js').removeNode;
	const node = removeNode("p", {node: htmlChunk, inner: htmlTag});
	expect(node.node).to.equal("<body></body>");
	expect(node.inner).to.equal("");
} catch(e) {
	log.error("removeNode", e);
}

log.success("removeNode");


// @transmuteNode
try {
	const transmuteNode = require('../lib/shallowDOM.js').transmuteNode;
	const node = transmuteNode("p", "strong", {node: htmlChunk, inner: htmlTag});
	expect(node.node).to.equal("<body><strong>"+htmlContent+"</strong></body>");
	expect(node.inner).to.equal("<strong>"+htmlContent+"</strong>");
} catch(e) {
	log.error("transmuteNode", e);
}

log.success("transmuteNode");


// @updateNode
try {
	const updateNode = require('../lib/shallowDOM.js').updateNode;
	const node = updateNode({node: htmlChunk, inner: htmlTag}, "<em>Ostrichian</em>");
	expect(node.node).to.equal("<body><em>Ostrichian</em></body>");
	expect(node.inner).to.equal("<em>Ostrichian</em>");
} catch(e) {
	log.error("updateNode", e);
}

log.success("updateNode");


// @parseStruct
try {
	const parseStruct = require('../lib/shallowDOM.js').parseStruct;
	const htmlBigChunk = "<div>Panterish</div><body><p>Pinkadelic</p></body><article><section><strong>Dazzlious</strong></section></article>";
	const structEg = [
		{ tag: "div" },
		{ tag: "body", children: [{ tag: "p" }] },
		{ tag: "article", children: [{ tag: "section", children: [{ tag: "strong" }] }] },
	];

	const shallowDOM = parseStruct(htmlBigChunk, structEg, {});
	expect(shallowDOM.div).to.deep.equal({
		tag: "div",
		node: "<div>Panterish</div>",
		inner: "Panterish"
	});
	expect(shallowDOM.body).to.deep.equal({
		tag: "body",
		node: "<body><p>Pinkadelic</p></body>",
		inner: "<p>Pinkadelic</p>"
	});
	expect(shallowDOM.p).to.deep.equal({
		tag: "p",
		node: "<p>Pinkadelic</p>",
		inner: "Pinkadelic"
	});
	expect(shallowDOM.article).to.deep.equal({
		tag: "article",
		node: "<article><section><strong>Dazzlious</strong></section></article>",
		inner: "<section><strong>Dazzlious</strong></section>"
	});
	expect(shallowDOM.section).to.deep.equal({
		tag: "section",
		node: "<section><strong>Dazzlious</strong></section>",
		inner: "<strong>Dazzlious</strong>"
	});
	expect(shallowDOM.strong).to.deep.equal({
		tag: "strong",
		node: "<strong>Dazzlious</strong>",
		inner: "Dazzlious"
	});
} catch(e) {
	log.error("parseStruct", e);
}

log.success("parseStruct");


// @parentCheck
try {
	const parentCheck = require('../lib/shallowDOM.js').parentCheck;
	expect(parentCheck(htmlChunk, "body", "p")).to.be.true;
} catch(e) {
	log.error("parentCheck", e);
}

log.success("parentCheck");