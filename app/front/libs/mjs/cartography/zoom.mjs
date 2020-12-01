import {width, height} from "../env/window.mjs"
import {drawLayers} from "../draw/layers.mjs"

export function makeZoomable(canvas) {

  let zoom = d3.zoom()
               .scaleExtent([1, 1000])
               .translateExtent([[0, 0], [width(), height()]])
               .on("zoom", function(event) {

                 d3.selectAll(".map").attr("transform", d3.event.transform)

                 data.plot.GeoJSON.properties.zoom = d3.event.transform.k

                 drawLayers(d3.event.transform.k)

               })

  canvas.call(zoom)

}
