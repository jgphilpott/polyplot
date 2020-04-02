import {width, height} from "../../../libs/mjs/env/dimensions.mjs"

$(document).ready(function() {

  console.log(data)

  let canvas = d3.select("#canvas")

  let geoJSON = {"type": "FeatureCollection", "features": data}

  let geoMercator = d3.geoMercator()
  let geoOrthographic = d3.geoOrthographic()
  let geoEquirectangular = d3.geoEquirectangular()

  let projection = geoEquirectangular.fitExtent([[0, 0], [width(), height()]], geoJSON)

  let map = d3.geoPath().projection(projection)

  canvas.selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr("d", map)

  let zoom = d3.zoom()
               .scaleExtent([1, 42])
               .translateExtent([[0, 0], [width(), height()]])
               .on("zoom", function() {
                 d3.selectAll("path").attr("transform", d3.event.transform)
               })

  canvas.call(zoom)

})
