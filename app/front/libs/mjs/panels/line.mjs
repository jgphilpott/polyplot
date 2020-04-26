import {makeDragable} from "../ui/dragable.mjs"

export function addLinePanel() {

  $("body").append("<div id='line' class='panel'></div>")

  let panel = $("#line.panel")

  panel.append("<h1 id='title'>Line</h1>")

  makeDragable(panel)

}
