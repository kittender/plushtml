exports.removeChunk = function(html, posObj) {
    return html.substring(0, posObj.start) + html.substr(posObj.end);
};

exports.getChunk = function(html, posObj) {
    return (posObj && typeof posObj === "object") ? html.substring(posObj.start, posObj.end) : false;
}

exports.pasteBefore = function(html, chunk, contentStart) {
    return html.substring(0, contentStart) + chunk + html.substr(contentStart);
};

exports.pasteAfter = function(html, chunk, contentEnd) {
    return html.substring(0, contentEnd) + chunk + html.substr(contentEnd);
};

exports.isChildrenOf = function(parent, tag) {
    return parent.match(new RegExp("<" + tag));
};

exports.changeTag = function(html, originalTag, newTag) {
    return html.replace("<"+originalTag, "<"+newTag).replace("</"+originalTag+">","</"+newTag+">");
}