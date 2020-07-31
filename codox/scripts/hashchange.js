/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  *
  * Source: https://raw.githubusercontent.com/ded/domready/v1.0.8/ready.js
  */
var domready = (function () {

    var fns = [], listener
        , doc = document
        , hack = doc.documentElement.doScroll
        , domContentLoaded = 'DOMContentLoaded'
        , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


    if (!loaded)
        doc.addEventListener(domContentLoaded, listener = function () {
            doc.removeEventListener(domContentLoaded, listener)
            loaded = 1
            while (listener = fns.shift()) listener()
        })

    return function (fn) {
        loaded ? setTimeout(fn, 0) : fns.push(fn)
    }

})();

/**
 * re-frame codox iframe js (c) Michael Thompson 2020 - MIT
 *
 * This code runs inside the iframe that contains codox-generated API
 * documentation so that links, including named anchors, can be forwarded from
 * the parent mkdocs site to the child iframe. Specifically:
 *
 * 1. Notifies the parent when the iframe dom is ready to receive events to go
 *    to a given link.
 * 2. Registers event handlers on every anchor to forward the 'click' event to
 *    the parent, and cancel default behaviour.
 * 3. Receives events to go to a given link from the parent, replacing the
 *    default behaviour cancelled by 2.
 *
 * The combination of 2. and 3. promotes control of link behaviour to the parent
 * so that copy/pasting a link into the location bar behaves as-if the
 * codox-generated content was not within an iframe.
 */

domready(function() {
    window.parent.postMessage({type: 'ready'}, '*')

    let anchors = document.getElementsByTagName('a')
    for (let anchor of anchors) {
        anchor.addEventListener('click', function(event) {
            event.preventDefault()
            let href = anchor.getAttribute('href')
            if (href) {
                window.parent.postMessage(
                    {type: 'setHash',
                        hash: href.replace(/#/g, '/')}, '*')
            }
        })
    }

});

window.addEventListener('message', function(event) {
    if (event.data.type === 'setHref' && event.data.href) {
        window.location.href = event.data.href
    }
});
