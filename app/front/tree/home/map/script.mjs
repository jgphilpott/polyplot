import {width, height} from "../../../libs/mjs/env/dimensions.mjs"

$(document).ready(function() {

  console.log(data)

  let geoJSON = {"type": "FeatureCollection", "features": data}

  let geoMercator = d3.geoMercator()
  let geoOrthographic = d3.geoOrthographic()
  let geoEquirectangular = d3.geoEquirectangular()

  let projection = geoEquirectangular.fitExtent([[0, 0], [width(), height()]], geoJSON)

  let geoGenerator = d3.geoPath().projection(projection)

  let canvas = d3.select("#canvas").selectAll("path").data(data)

  canvas.enter().append("path").attr("d", geoGenerator)

})
