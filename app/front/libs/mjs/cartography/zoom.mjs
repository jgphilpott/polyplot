import {width, height} from "../env/window.mjs"

export function makeZoomable(canvas) {

  let zoom = d3.zoom()
               .scaleExtent([1, 42])
               .translateExtent([[0, 0], [width(), height()]])
               .on("zoom", function(event) {

                 d3.selectAll(".map").attr("transform", d3.event.transform)

               })

  canvas.call(zoom)

}
