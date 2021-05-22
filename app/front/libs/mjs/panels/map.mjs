import {drawMaps} from "../draw/maps.mjs"
import {startRotation} from "../cartography/rotate.mjs"
import {regionsColourSwitch} from "../colors/switches/regions.mjs"

import {updateSettings} from "./menu.mjs"
import {addPanelEvents} from "./events/all.mjs"

let plot = data.plot
let plots = plot.plots

export function addMapPanel(panelSetting) {

  $("body").append("<div id='map' class='panel'></div>")

  let panel = $("#map.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  let rotation = localRead("settings").general.rotation

  if (rotation) {
    panel.append("<img id='rotation-icon' src='/front/imgs/panels/map/rotation-dark.png'>")
  } else {
    panel.append("<img id='rotation-icon' src='/front/imgs/panels/map/rotation-light.png'>")
  }

  panel.append("<svg id='mini-map'></svg>")

  panel.append("<h1 id='name'>Geographic Regions</h1>")

  socket.emit("get_maps", {}, {"_id": 0}, [["properties.code", 1]], 0, "micro")

  socket.on("new_maps", function(maps) {

    plot.GeoJSON = {"type": "FeatureCollection", "features": maps, "properties": {}}

    drawMaps("mini-map")

    if (rotation) { startRotation() }

    $("#rotation-icon").click(function(event) {
      ($(this).attr("src").split("/").pop().split(".")[0] == "rotation-light") ? (updateSettings("general", "rotation", true)) : (updateSettings("general", "rotation", false))
    })

    socket.emit("get_meta", "regions_map")

    socket.on("new_regions_map", function(regions) {

      for (let i = 0; i < regions.length; i++) {

        panel.append("<div class='regions-box'><div id='" + camalize(regions[i]) + "' class='region-key'></div><b><p class='region-name'>" + regions[i] + "</p></b></div>")

        $("#" + camalize(regions[i]) + ".region-key").css("background-color", regionsColourSwitch(regions[i], null))

      }

      panel.append("<p id='countries-toggle'><span>Toggle Countries Panel</span></p>")

      $("#countries-toggle span").click(function(event) {
        ($("#countries.panel").css("visibility") == "visible") ? (updateSettings("panels", "countries", false)) : (updateSettings("panels", "countries", true))
      })

      if (panelSetting) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

    })

  })

  addPanelEvents(panel)

}
