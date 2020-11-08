import {addPanelEvents} from "./events/all.mjs"

export function addLinePanel() {

  $("body").append("<div id='line' class='panel'></div>")

  let panel = $("#line.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<h1 id='name'>Line</h1>")

  addPanelEvents(panel)

}
