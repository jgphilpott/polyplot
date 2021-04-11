import {addPanelEvents} from "./events/all.mjs"

export function addTitlePanel(panelSetting) {

  $("body").append("<div id='title' class='panel'></div>")

  let panel = $("#title.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<a href='https://data.worldbank.org/indicator'><h1 id='name'>" + data.plot.title + "</h1></a>")

  addPanelEvents(panel)

  if (panelSetting) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

}
