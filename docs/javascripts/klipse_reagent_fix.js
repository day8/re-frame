/*
 * Klipse does not currently re-evaluate dependent snippets on change of a
 * snippet. In other words, if a user edits a reagent view function a different
 * snippet that renders that view will not be re-rendered. To the user this is
 * very confusing.
 *
 * It is reported as a bug at https://github.com/viebel/klipse/issues/361
 *
 * In the meantime we workaround it by triggering a change event on all snippet
 * editors on the page every time any editor receives a change event. As this
 * would cause infinite recursive events without a stop condition we keep track
 * of the number of editors that have been notified. In addition, we need to use
 * both the browser window load event and polling of Klipse to run code once
 * Klipse has finished loading.
 */

var editorsOnChangePending = 0

function onKlipseLoad () {
    // klipse_editors is a array-like map, not an array, so we need to convert
    // it for ease of use.
    let editors = Object.keys(klipse_editors).map((key) => {
        return klipse_editors[key]
    })

    console.log(editors.length, "editors on page")
    for (let i = 0; i < editors.length; i++) {
        editors[i].on("change", () => {
            let thisIsTheUsersChange = editorsOnChangePending === 0
            if (thisIsTheUsersChange) {
                editorsOnChangePending = editors.length
                let head = editors.slice(0, i)
                let tail = editors.slice(i + 1)
                let notify = head.concat(tail)
                console.log("notifying", notify.length, "editors of change")
                notify.forEach((editor) => {
                    CodeMirror.signal(editor, "change", editor)
                })
            }
            editorsOnChangePending = editorsOnChangePending - 1
            if (editorsOnChangePending === 0) {
                // simple.core.mount_ui()
            }

        })
    }
}

window.addEventListener("load", (event) => {
    let handle = setInterval(function() {
        if (window.klipse_editors !== undefined) {
            clearInterval(handle)
            onKlipseLoad()
        }
    }, 1000)
})
