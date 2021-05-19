import {width, height} from "../env/window.mjs"

import {updateLayers} from "../draw/layers/all.mjs"
import {transformLayers} from "./transform.mjs"

import {updateSettings} from "../panels/menu.mjs"

export function makeZoomable(canvas) {

  let zoomSpeed = data.client.settings.map.zoomSpeed

  let zoom = d3.zoom()
               .scaleExtent([1, 64])
               .translateExtent([[0, 0], [width(), height()]])
               .on("zoom", function(event) { transformLayers(d3.event) })
               .on("end", function(event) {

                 data.plot.GeoJSON.properties.transform = d3.event.transform

                 updateSettings("map", "transform", d3.event.transform)
                 updateLayers("zoom", d3.event.transform.k)

               })

  canvas.call(zoom)

}
