import {updateLayers} from "../draw/layers/all.mjs"
import {width, height} from "../env/window.mjs"

export function makePanable(canvas) {

  let drag = d3.drag()
               .on("start", function(event) {})
               .on("drag", function(event) {

                 let properties = data.plot.GeoJSON.properties

                 let projection = properties.projection
                 let rotate = projection.rotate()

                 let φLimit = 90
                 let panSpeed = 0.5

                 let λ = rotate[0] + d3.event.dx / properties.zoom.k * panSpeed
                 let φ = rotate[1] - d3.event.dy / properties.zoom.k * panSpeed

                 if (Math.abs(φ) > φLimit) { if (φ > 0) { φ = φLimit } else if (φ < 0) { φ = -φLimit } }

                 projection.rotate([λ, φ])

                 let pathGenerator = d3.geoPath().projection(projection)

                 canvas.selectAll("path").attr("d", pathGenerator)

                 updateLayers("pan", d3.event)

               })
               .on("end", function(event) {})

  canvas.call(drag)

}
