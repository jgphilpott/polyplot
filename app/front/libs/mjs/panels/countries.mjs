import {makeDragable} from "./events/drag.mjs"
import {addPanelHover} from "./events/hover.mjs"

export function addCountriesPanel() {

  $("body").append("<div id='countries' class='panel'></div>")

  let panel = $("#countries.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<h1 id='title'>Countries by Region</h1>")

  makeDragable(panel)
  addPanelHover(panel)

}
