const getChunk = require('./htmlString.js').getChunk;
const removeChunk = require('./htmlString.js').removeChunk;
const changeTag = require('./htmlString.js').changeTag;
const isChildrenOf = require('./htmlString.js').isChildrenOf;
const getTagPosition = require('./htmlPosition.js').getTagPosition;

function getShallowNode(html, tag) {
    return {
        tag: tag,
        node: getChunk(html, getTagPosition(html, tag)),
        inner: getChunk(html, getTagPosition(html, tag, true))
    };
}

function removeNode(tag, shallowDOM) {
    shallowDOM.node = removeChunk(shallowDOM.node, getTagPosition(shallowDOM.node, tag));
    shallowDOM.inner = removeChunk(shallowDOM.inner, getTagPosition(shallowDOM.inner, tag));

    return shallowDOM;
}

function transmuteNode(tag, newTag, shallowDOM) {
    shallowDOM.node = changeTag(shallowDOM.node, tag, newTag);
    shallowDOM.inner = changeTag(shallowDOM.inner, tag, newTag);
    
    return shallowDOM;
}

function updateNode(shallowDOM, newContent) {
    shallowDOM.node = shallowDOM.node.replace(shallowDOM.inner, newContent);
    shallowDOM.inner = newContent;

    return shallowDOM;
}

function parseStruct(html, struct, shallowDOM) {
    struct.map(function(entry) {
        shallowDOM[entry.tag] = getShallowNode(html, entry.tag);
        if(entry.children) {
            parseStruct(html, entry.children, shallowDOM);
        }
    });

    return shallowDOM;
}

function getShallowDOM(plushtml, shallowStructure) {
    return parseStruct(plushtml, shallowStructure, {});
}

function parentCheck(parentBody, parentName, childName) {
    if (!isChildrenOf(parentBody, childName)) {
        throw "PLUSHTMLParser: <"+childName+"> must be a child of <"+parentName+">";
    }
    return true;
}


exports.getShallowNode = getShallowNode;
exports.removeNode = removeNode;
exports.transmuteNode = transmuteNode;
exports.updateNode = updateNode;
exports.parseStruct = parseStruct;
exports.getShallowDOM = getShallowDOM;
exports.parentCheck = parentCheck;