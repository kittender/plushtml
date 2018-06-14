"use strict";


    var debug = PLUSHTMLDebug ? PLUSHTMLDebug : false;

    function removeChunk(html, start, end) {
        if (debug) {
            console.log("removeChunk(html," + start + ", " + end + ")");
        }
        return html.substring(0, start) + html.substr(end);
    }

    function pasteBefore(html, chunk, contentStart) {
        if (debug) {
            console.log("pasteBefore(html," + chunk + ", contentStart)");
        }
        return html.substring(0, contentStart) + chunk + html.substr(contentStart + 1);
    }

    function pasteAfter(html, chunk, contentEnd) {
        if (debug) {
            console.log("pasteAfter(html," + chunk + ", contentEnd)");
        }
        return html.substring(0, contentEnd) + chunk + html.substr(contentEnd);
    }

    function isChildrenOf(parent, tag) {
        if (debug) {
            console.log("isChildrenOf(parent," + tag + ")");
        }
        return parent.match(new RegExp("<" + tag));
    }

    function getTagPosition(html, tag) {
        if (debug) {
            console.log("getTagPosition(html," + tag + ")");
        }

        if (!html || html.length < 7 || !tag || tag.length === 0) {
            return false;
        }

        const TAG_START = new RegExp("<" + tag + "([ ]+[^>])*>");
        const TAG_END = new RegExp("</" + tag + ">");

        let itStarts = html.match(TAG_START);
        itStarts = itStarts ? itStarts[0] : false;

        if (debug) {
            console.log(itStarts);
        }

        if (itStarts) {

            let itEnds = html.match(TAG_END);
            itEnds = itEnds ? itEnds[0] : false;

            if (debug) {
                console.log(itEnds);
            }

            if (itEnds) {

                const position = {
                    start: html.search(TAG_START),
                    end: html.search(TAG_END) + itEnds.length,
                    inner: {
                        start: html.search(TAG_START) + itStarts.length,
                        end: html.search(TAG_END),
                    }
                };

                if (debug) {
                    console.log(position);
                }

                return position;

            } else {
                tag === "foot" ? console.log("CHIER") : null;
                console.error("PLUSHTMLParser: your code contains an unclosed <" + tag + "> tag");
                return false;
            }

        } else {
                tag === "foot" ? console.log("PUTAIN") : null;
            console.warn("PLUSHTMLParser: your code doesn't contain any <" + tag + "> tag");
            return false;
        }
    }

    function refreshShallowDOM(html, dom, clearedFoot) {
        if(debug) {
            console.log("refreshShallowDOM(html, dom)");
        }

        dom.head = getTagPosition(html, "head");
        dom.body = getTagPosition(html, "body");
        !clearedFoot ? dom.foot = getTagPosition(html, "foot") : dom.foot = false;

        if(debug) {
            console.log(":::refreshed:::");
            console.log(dom);
        }

        return dom;
    }


    function parsePlushtml(plushtml) {
        debug = debug ? debug : false;

        let shallowDOM = refreshShallowDOM(plushtml, {});

        if (shallowDOM.body) {

            if (shallowDOM.head) { // HEADER treatment

                let header = getTagPosition(plushtml, "header");
                if (header) {

                    const HEAD = plushtml.substring(shallowDOM.head.start, shallowDOM.head.end);

                    if (!isChildrenOf(HEAD, "header")) {
                        console.error("PLUSHTMLParser: <header> must be a child of <head>");
                        return;
                    }

                    let HEADER = plushtml.substring(header.start, header.end);
                    let title = getTagPosition(plushtml, "title");  // TITLE treatment
                    if(title) {

                        if (!isChildrenOf(HEADER, "title")) {
                            console.error("PLUSHTMLParser: <title> must be a child of <header>");
                            return;
                        }

                        const TITLE = plushtml.substring(title.start, title.end);

                        // keep the info as a <h1> tag
                        plushtml = plushtml.replace("<title","<h1").replace("</title>","</h1>");
                        shallowDOM = refreshShallowDOM(plushtml, shallowDOM);

                        // TITLE Paste
                        plushtml = pasteBefore(plushtml, TITLE, shallowDOM.head.inner.start); // paste the <title> tag in <head>
                        shallowDOM = refreshShallowDOM(plushtml, shallowDOM);
                    }
                        
                        // refreshes the header
                        header = getTagPosition(plushtml, "header");
                        HEADER = plushtml.substring(header.start, header.end);

                        // HEADER Cut/Paste
                        plushtml = removeChunk(plushtml, header.start, header.end);
                        shallowDOM = refreshShallowDOM(plushtml, shallowDOM);

                        plushtml = pasteBefore(plushtml, HEADER, shallowDOM.body.inner.start);
                        shallowDOM = refreshShallowDOM(plushtml, shallowDOM);

                } else {
                    console.log("PLUSHTMLParser: your code does not contain a <header> tag");
                }
            } else {
                console.warn("PLUSHTMLParser: your code does not contain a <head> tag");
            }


            if (shallowDOM.foot) { // FOOTER treatment

                let footer = getTagPosition(plushtml, "footer");
                if (footer) {

                    const FOOT = plushtml.substring(shallowDOM.foot.start, shallowDOM.foot.end);

                    if (!isChildrenOf(FOOT, "footer")) {
                        console.error("PLUSHTMLParser: <footer> must be a child of <foot>");
                        return;
                    }

                    const FOOTER = plushtml.substring(footer.start, footer.end);

                    // FOOTER Cut/Paste
                    plushtml = removeChunk(plushtml, footer.start, footer.end);
                    shallowDOM = refreshShallowDOM(plushtml, shallowDOM);
                    plushtml = pasteAfter(plushtml, FOOTER, shallowDOM.body.inner.end);
                    shallowDOM = refreshShallowDOM(plushtml, shallowDOM);

                    const FOOT_CONTENT = plushtml.substring(shallowDOM.foot.inner.start, shallowDOM.foot.inner.end);
                    if (FOOT_CONTENT && FOOT_CONTENT.length > 0) {

                        // FOOT_CONTENT Cut/Paste
                        plushtml = removeChunk(plushtml, shallowDOM.foot.start, shallowDOM.foot.end);
                        shallowDOM = refreshShallowDOM(plushtml, shallowDOM, true);
                        plushtml = pasteAfter(plushtml, FOOT_CONTENT, shallowDOM.body.inner.end);
                        shallowDOM = refreshShallowDOM(plushtml, shallowDOM, true);
                    }

                } else {
                    console.log("PLUSHTMLParser: your code does not contain a <footer> tag");
                }
            } else {
                console.log("PLUSHTMLParser: your code does not contain a <foot> tag");
            }

        } else {
            console.warn("PLUSHTMLParser: your code should contain a <body> tag");
        }

        if (debug) {
            console.log("-----PLUSHTMLParser result:");
            console.log(plushtml);
        }

        return plushtml;

    };


exports.plushtml = parsePlushtml;
