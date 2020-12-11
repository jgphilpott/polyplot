import {addPanelEvents} from "./events/all.mjs"

export function addLayersPanel(panelSetting) {

  $("body").append("<div id='layers' class='panel'></div>")

  let panel = $("#layers.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<h1 id='name'>Layers</h1>")

  addPanelEvents(panel)

  if (panelSetting) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

}
