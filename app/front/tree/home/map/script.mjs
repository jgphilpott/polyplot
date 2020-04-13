import {width, height} from "../../../libs/mjs/env/dimensions.mjs"
import {scaleAxes} from "../../../libs/mjs/scales/axes.mjs"

import {addTitlePanel} from "../../../libs/mjs/panels/title.mjs"
import {makePanelsDragable} from "../../../libs/mjs/panels/all.mjs"

$(document).ready(function() {

  let canvas = d3.select("#canvas")

  let geoMercator = d3.geoMercator()
  let geoOrthographic = d3.geoOrthographic()
  let geoEquirectangular = d3.geoEquirectangular()

  let projection = geoEquirectangular.fitSize([width(), height()], data.plot.GeoJSON)

  let path = d3.geoPath().projection(projection)

  scaleAxes()

  addTitlePanel()
  makePanelsDragable()

  canvas.selectAll("path")
        .data(data.plot.GeoJSON.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("id", function(feature) {
          return feature.properties.code
        })

  let zoom = d3.zoom()
               .scaleExtent([1, 42])
               .translateExtent([[0, 0], [width(), height()]])
               .on("zoom", function() {
                 d3.selectAll("path").attr("transform", d3.event.transform)
               })

  canvas.call(zoom)

  console.log(data)

})
