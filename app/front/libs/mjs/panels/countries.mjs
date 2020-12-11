import {addPanelEvents} from "./events/all.mjs"

export function addCountriesPanel(panelSetting) {

  $("body").append("<div id='countries' class='panel'></div>")

  let panel = $("#countries.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<h1 id='name'>Countries by Region</h1>")

  addPanelEvents(panel)

  if (panelSetting) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

}
