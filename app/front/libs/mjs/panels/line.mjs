import {makeDragable} from "./events/drag.mjs"
import {addPanelHover} from "./events/hover.mjs"

export function addLinePanel() {

  $("body").append("<div id='line' class='panel'></div>")

  let panel = $("#line.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<h1 id='title'>Line</h1>")

  makeDragable(panel)
  addPanelHover(panel)

}
