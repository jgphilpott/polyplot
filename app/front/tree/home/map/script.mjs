import {width, height} from "../../../libs/mjs/env/dimensions.mjs"

import {addTitlePanel} from "../../../libs/mjs/panels/title.mjs"
import {makePanelsDragable} from "../../../libs/mjs/panels/all.mjs"

$(document).ready(function() {

  addTitlePanel()
  makePanelsDragable()

  let canvas = d3.select("#canvas")

  let geoMercator = d3.geoMercator()
  let geoOrthographic = d3.geoOrthographic()
  let geoEquirectangular = d3.geoEquirectangular()

  let projection = geoEquirectangular.fitSize([width(), height()], data.plot.geoJSON)

  let path = d3.geoPath().projection(projection)

  canvas.selectAll("path")
        .data(data.plot.geoJSON.features)
        .enter()
        .append("path")
        .attr("d", path)

  let zoom = d3.zoom()
               .scaleExtent([1, 42])
               .translateExtent([[0, 0], [width(), height()]])
               .on("zoom", function() {
                 d3.selectAll("path").attr("transform", d3.event.transform)
               })

  canvas.call(zoom)

  console.log(data)

})
