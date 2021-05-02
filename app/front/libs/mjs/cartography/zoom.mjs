import {updateLayers} from "../draw/layers/all.mjs"
import {width, height} from "../env/window.mjs"

export function makeZoomable() {

  let zoom = d3.zoom()
               .scaleExtent([1, 64])
               .translateExtent([[0, 0], [width(), height()]])
               .on("zoom", function(event) { transform(d3.event.transform) })
               .on("end", function(event) {

                 data.plot.GeoJSON.properties.zoom = d3.event.transform

                 updateLayers(d3.event.transform.k)
                 transform(d3.event.transform)

               })

  d3.select("#canvas").call(zoom)

}

function transform(event) {

  d3.selectAll(".airport").attr("transform", event)
  d3.selectAll(".city").attr("transform", event)
  d3.selectAll(".graticule").attr("transform", event)
  d3.selectAll(".lake").attr("transform", event)
  d3.selectAll(".map").attr("transform", event)
  d3.selectAll(".port").attr("transform", event)
  d3.selectAll(".railroad").attr("transform", event)
  d3.selectAll(".river").attr("transform", event)
  d3.selectAll(".road").attr("transform", event)

}
