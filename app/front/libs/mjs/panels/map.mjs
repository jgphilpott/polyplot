import {drawMaps} from "../draw/maps.mjs"
import {rotateMap} from "../cartography/rotation.mjs"
import {addPanelEvents} from "./events/all.mjs"

let plot = data.plot

export function addMapPanel() {

  $("body").append("<div id='map' class='panel'></div>")

  let panel = $("#map.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<svg id='miniMap'></svg>")

  socket.emit("get_maps")

  socket.on("new_maps", function(maps) {

    plot.GeoJSON = {"type": "FeatureCollection", "features": maps}

    panel.css("visibility", "visible")

    drawMaps("miniMap")

    rotateMap()

  })

  addPanelEvents(panel)

}
