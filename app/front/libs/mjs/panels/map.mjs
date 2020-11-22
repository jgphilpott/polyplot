import {drawMaps} from "../draw/maps.mjs"
import {rotateMap} from "../cartography/rotation.mjs"
import {addPanelEvents} from "./events/all.mjs"

let plot = data.plot

export function addMapPanel() {

  $("body").append("<div id='map' class='panel'></div>")

  let panel = $("#map.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<img id='rotationIcon' src='/front/imgs/panels/map/rotation-light.png'>")

  panel.append("<svg id='miniMap'></svg>")

  panel.append("<h1 id='name'>Geographic Regions</h1>")

  socket.emit("get_maps")

  socket.on("new_maps", function(maps) {

    plot.GeoJSON = {"type": "FeatureCollection", "features": maps}

    drawMaps("miniMap")

    // rotateMap()

    socket.emit("get_meta", "regions")

    socket.on("new_regions", function(regions) {

      for (let i = 0; i < regions.length; i++) {

        panel.append("<div class='region-box'><div id='" + camalize(regions[i]) + "' class='region-key'></div><p class='region-name'><b>" + regions[i] + "</b></p></div>")

      }

      panel.append("<p id='countriesLink'>View All Countries</p>")

      $("#countriesLink").click(function() {

        let countriesPanel = $("#countries.panel")

        if (countriesPanel.css("visibility") == "hidden") {

          countriesPanel.css("visibility", "visible")

        } else {

          countriesPanel.css("visibility", "hidden")

        }

      })

      panel.css("visibility", "visible")

    })

  })

  addPanelEvents(panel)

}
