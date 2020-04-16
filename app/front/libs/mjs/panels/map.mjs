import {makeDragable} from "../ui/dragable.mjs"

export function addMapPanel() {

  let panel = $("#map.panel")

  makeDragable(panel)

}
