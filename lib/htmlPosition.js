
function getStart(html, tag) {
	return html.search(new RegExp("<" + tag + "([ ]+[^>])*>"));
}

function getEnd(html, tag) {
	const strEx = "</" + tag + ">";
	return html.search(new RegExp(strEx)) + strEx.length;
}

function getInnerStart(html, tag) {
	const strEx = "<" + tag + "([ ]+[^>])*>";
	const strMatch = html.match(strEx);
	return strMatch && strMatch.length > 0 ? html.search(new RegExp(strEx)) + strMatch[0].length : false;
}

function getInnerEnd(html, tag) {
    const strEx = "</" + tag + ">";
	return html.search(new RegExp(strEx));
}

function getTagPosition(html, tag, inner) {
    inner = inner ? inner : false;

    if(inner) {
        return {
            start: getInnerStart(html, tag),
            end: getInnerEnd(html, tag)
        };
    }

    return {
        start: getStart(html, tag),
        end: getEnd(html, tag)
    };
}

exports.getStart = getStart;
exports.getEnd = getEnd;
exports.getInnerStart = getInnerStart;
exports.getInnerEnd = getInnerEnd;
exports.getTagPosition = getTagPosition;