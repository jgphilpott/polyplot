import {makeDragable} from "../ui/dragable.mjs"

export function addIndicatorsPanel() {

  $("body").append("<div id='indicators' class='panel'></div>")

  let panel = $("#indicators.panel")

  panel.append("<h1 id='title'>Indicators</h1>")

  makeDragable(panel)

}
