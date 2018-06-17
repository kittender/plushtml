
exports.removeChunk = function(html, posObj) {
    return html.substring(0, posObj.start) + html.substr(posObj.end);
};

exports.getChunk = function(html, posObj) {
	if(posObj && typeof posObj === "object") {
    	return  posObj.end ? html.substring(posObj.start, posObj.end) : html.substring(posObj.start);
	}
};

exports.isChildrenOf = function(parent, tag) {
    return parent.match(new RegExp("<" + tag));
};

exports.changeTag = function(html, originalTag, newTag) {
    return html.replace("<"+originalTag, "<"+newTag).replace("</"+originalTag+">","</"+newTag+">");
};