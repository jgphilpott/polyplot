import {makeDragable} from "../ui/dragable.mjs"
import {addPanelEvents} from "../ui/events.mjs"

export function addLinePanel() {

  $("body").append("<div id='line' class='panel'></div>")

  let panel = $("#line.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<h1 id='title'>Line</h1>")

  makeDragable(panel)
  addPanelEvents(panel)

}
