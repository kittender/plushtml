
// HTML objects positions & context utils
const buildContext = require('./lib/htmlContext.js').buildContext;
const updateContext = require('./lib/htmlContext.js').updateContext;
const getTagPosition = require('./lib/htmlContext.js').getTagPosition;
const updateHOP = require('./lib/htmlContext.js').updateHOP;

// HTML String utils
const getChunk = require('./lib/htmlString.js').getChunk;
const removeChunk = require('./lib/htmlString.js').removeChunk;
const pasteBefore = require('./lib/htmlString.js').pasteBefore;
const pasteAfter = require('./lib/htmlString.js').pasteAfter;
const isChildrenOf = require('./lib/htmlString.js').isChildrenOf;
const changeTag = require('./lib/htmlString.js').changeTag;


function parentCheck(parentBody, parentName, childName) {
    if (!isChildrenOf(parentBody, childName)) {
        console.error("PLUSHTMLParser: <"+childName+"> must be a child of <"+parentName+">");
        return false;

    } else {
        return true;
    }
}

function parsePlushtml(plushtml) {
    let context = buildContext(plushtml, updateHOP(plushtml, {}));

    if (context.hop.body) {
        if (context.hop.head) {

            const HEAD = getChunk(context.html, context.hop.head);

            if(HEAD) {
                if(!parentCheck(HEAD, "head", "header")) {
                    return;
                }

                const HEADER = getChunk(context.html, getTagPosition(context.html, "header"));

                if (HEADER) {
                    if(!parentCheck(HEADER, "header", "title")) {
                        return;
                    }

                    const TITLE = getChunk(context.html, getTagPosition(context.html, "title"));

                    if(TITLE) {
                        context = updateContext(changeTag(context.html, "title", "h1"), context.hop); // keep the info as a <h1> tag
                        context = updateContext(pasteBefore(context.html, TITLE, context.hop.head.inner.start), context.hop); // paste the <title> tag in <head>
                    }

                    const header = getTagPosition(context.html, "header");
                    const HEADER_UPDATED = getChunk(context.html, header);

                    // HEADER Cut/Paste
                    context = updateContext(removeChunk(context.html, header), context.hop);
                    context = updateContext(pasteBefore(context.html, HEADER_UPDATED, context.hop.body.inner.start), context.hop);

                }
            }

        }

        if (context.hop.foot) {

            const FOOT = getChunk(context.html, context.hop.foot);

            if (FOOT) {
                if(!parentCheck(FOOT, "foot", "footer")) {
                    return;
                }

                const footer = getTagPosition(context.html, "footer");
                const FOOTER = getChunk(context.html, footer);

                // FOOTER Cut/Paste
                context = updateContext(removeChunk(context.html, footer), context.hop);
                context = updateContext(pasteAfter(context.html, FOOTER, context.hop.body.inner.end), context.hop);


                const FOOT_CONTENT = getChunk(context.html, context.hop.foot.inner);

                if (FOOT_CONTENT && FOOT_CONTENT.length > 0) {

                    // FOOT_CONTENT Cut/Paste
                    context = updateContext(removeChunk(context.html, context.hop.foot), context.hop);
                    context = updateContext(pasteAfter(context.html, FOOT_CONTENT, context.hop.body.inner.end), context.hop);
                }

            }
        }
    }

    return context.html;

};


exports.plushtml = parsePlushtml;
