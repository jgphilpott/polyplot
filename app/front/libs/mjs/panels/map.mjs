import {makeDragable} from "../ui/dragable.mjs"

export function addMapPanel() {

  $("body").append("<div id='map' class='panel'></div>")

  let panel = $("#map.panel")

  panel.append("<h1 id='title'>Map</h1>")

  makeDragable(panel)

}
