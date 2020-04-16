import {width, height} from "../../../libs/mjs/env/dimensions.mjs"
import {scaleAxes} from "../../../libs/mjs/scales/axes.mjs"
import {addAllPanels} from "../../../libs/mjs/panels/all.mjs"

$(document).ready(function() {

  $("body").append("<svg id='canvas'></svg>")

  let canvas = d3.select("#canvas")

  let plot = data.plot

  let geoMercator = d3.geoMercator()
  let geoOrthographic = d3.geoOrthographic()
  let geoEquirectangular = d3.geoEquirectangular()

  let projection = geoEquirectangular.fitSize([width(), height()], plot.GeoJSON)

  let path = d3.geoPath().projection(projection)

  scaleAxes()

  addAllPanels()

  canvas.selectAll("path")
        .data(plot.GeoJSON.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("id", function(feature) {

          return feature.properties.code

        })
        .attr("class", "country")
        .attr("fill", function(feature) {

          let history = plot.plots.find(plot => plot.code == feature.properties.code).x
          let value = history.find(year => year.year == plot.time.year).value

          if (value) {

            return plot.x.scale(value)

          } else {

            return "gray"

          }

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
