import {addPanelEvents} from "./events/all.mjs"
import {regionsColourSwitch} from "../colors/switches/regions.mjs"

export function addCountriesPanel(panelSetting) {

  $("body").append("<div id='countries' class='panel'></div>")

  let panel = $("#countries.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<h1 id='name'>Countries by Region</h1>")

  socket.emit("get_meta", "regions-countries")

  socket.on("new_regions-countries", function(regions) {

    for (let i = 0; i < regions.length; i++) {

      let region = "<div id='" + camalize(regions[i]) + "' class='region'>"

      region += "<img class='fold' src='/front/imgs/panels/indicators/fold.png'>"
      region += "<h3 class='region-name'>" + regions[i] + "</h3>"

      panel.append(region + "</div>")

      $("#" + camalize(regions[i]) + "").css("border-left", "5px solid " + regionsColourSwitch(regions[i]) + "")

    }

  })

  addPanelEvents(panel)

  if (panelSetting) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

}
