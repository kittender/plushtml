function getFirstMatch(needle, haystack) {
    let result = haystack.match(needle);
    return result ? result[0] : false;
};

function buildObjectPosition(haystack, startEx, startMatch, endEx, endMatch) {
    return {
        start: haystack.search(startEx),
        end: haystack.search(endEx) + endMatch.length,
        inner: {
            start: haystack.search(startEx) + startMatch.length,
            end: haystack.search(endEx),
        }
    };
};

function getTagPosition(html, tag) {

    if (!html || html.length < 7 || !tag || tag.length === 0) {
        return false;
    }

    let tagPosition = false;

    const TAG_START = new RegExp("<" + tag + "([ ]+[^>])*>");
    const TAG_END = new RegExp("</" + tag + ">");

    const itStarts = getFirstMatch(TAG_START, html);
    if (itStarts) {

        const itEnds = getFirstMatch(TAG_END, html);
        if(itEnds) {
            
            tagPosition = buildObjectPosition(html, TAG_START, itStarts, TAG_END, itEnds);
        }
    }

    return tagPosition;
}

function updateHOP(html, hop) {
    hop.head = getTagPosition(html, "head");
    hop.body = getTagPosition(html, "body");
    hop.foot = getTagPosition(html, "foot");

    !hop.body ? console.warn("PLUSHTMLParser: your code should contain a <body> tag") : null;

    return hop;
}

function buildContext(html, hop) {
    return {
        html: html,
        hop: hop // HOP stands for HTML Objects Positions
    };
}

function updateContext(html, hop) {
    hop = updateHOP(html, hop);
    return buildContext(html, hop);
}

module.exports = {
    getTagPosition: getTagPosition,
    updateHOP: updateHOP,
    buildContext: buildContext,
    updateContext: updateContext
};