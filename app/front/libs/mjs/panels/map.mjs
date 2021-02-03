import {drawMaps} from "../draw/maps.mjs"
import {startRotation} from "../cartography/rotation.mjs"
import {toggleCheckbox} from "./menu.mjs"
import {addPanelEvents} from "./events/all.mjs"

let plot = data.plot

export function addMapPanel(panelSetting) {

  $("body").append("<div id='map' class='panel'></div>")

  let panel = $("#map.panel")

  let rotation = localRead("settings").general.rotation

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  if (rotation) {

    panel.append("<img id='rotationIcon' src='/front/imgs/panels/map/rotation-dark.png'>")

  } else {

    panel.append("<img id='rotationIcon' src='/front/imgs/panels/map/rotation-light.png'>")

  }

  panel.append("<svg id='miniMap'></svg>")

  panel.append("<h1 id='name'>Geographic Regions</h1>")

  socket.emit("get_maps")

  socket.on("new_maps", function(maps) {

    plot.GeoJSON = {"type": "FeatureCollection", "features": maps, "properties": {"λ": 0, "φ": 0, "γ": 0}}

    drawMaps("miniMap")

    if (rotation) { startRotation() }

    $("#rotationIcon").click(function(event) {

      toggleCheckbox("general", "rotation", event)

    })

    socket.emit("get_meta", "regions-map")

    socket.on("new_regions-map", function(regions) {

      for (let i = 0; i < regions.length; i++) {

        panel.append("<div class='regions-box'><div id='" + camalize(regions[i]) + "' class='region-key'></div><p class='region-name'><b>" + regions[i] + "</b></p></div>")

      }

      panel.append("<p id='countriesToggle'>Toggle Countries Panel</p>")

      $("#countriesToggle").click(function(event) {

        toggleCheckbox("panels", "countries", event)

      })

      if (panelSetting) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

    })

  })

  addPanelEvents(panel)

}
