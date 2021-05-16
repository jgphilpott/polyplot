import {width, height} from "../env/window.mjs"

import {updateLayers} from "../draw/layers/all.mjs"
import {updateSettings} from "../panels/menu.mjs"

export function makeZoomable(canvas) {

  let zoomSpeed = data.client.settings.map.zoomSpeed

  let zoom = d3.zoom()
               .scaleExtent([1, 64])
               .translateExtent([[0, 0], [width(), height()]])
               .on("zoom", function(event) {

                 d3.selectAll(".airport").attr("transform", d3.event.transform)
                 d3.selectAll(".city").attr("transform", d3.event.transform)
                 d3.selectAll(".graticule").attr("transform", d3.event.transform)
                 d3.selectAll(".lake").attr("transform", d3.event.transform)
                 d3.selectAll(".map").attr("transform", d3.event.transform)
                 d3.selectAll(".port").attr("transform", d3.event.transform)
                 d3.selectAll(".railroad").attr("transform", d3.event.transform)
                 d3.selectAll(".river").attr("transform", d3.event.transform)
                 d3.selectAll(".road").attr("transform", d3.event.transform)

               })
               .on("end", function(event) {

                 data.plot.GeoJSON.properties.transform = d3.event.transform

                 updateSettings("map", "transform", d3.event.transform)
                 updateLayers("zoom", d3.event.transform.k)

               })

  canvas.call(zoom)

}
