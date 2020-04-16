import {makeDragable} from "../ui/dragable.mjs"

export function addMenuPanel() {

  $("body").append("<div id='menu' class='panel'></div>")

  let panel = $("#menu.panel")

  panel.append("<h1 id='name'>Menu</h1>")

  makeDragable(panel)

}
