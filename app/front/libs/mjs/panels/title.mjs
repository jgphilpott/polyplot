import {makeDragable} from "./events/drag.mjs"
import {addPanelHover} from "./events/hover.mjs"

export function addTitlePanel() {

  $("body").append("<div id='title' class='panel'></div>")

  let panel = $("#title.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<h1 id='name'>" + data.plot.title + "</h1>")

  makeDragable(panel)
  addPanelHover(panel)

}
