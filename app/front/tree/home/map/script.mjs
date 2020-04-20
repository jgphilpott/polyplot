import {scaleAxes} from "../../../libs/mjs/scales/axes.mjs"
import {addAllPanels} from "../../../libs/mjs/panels/all.mjs"
import {width, height} from "../../../libs/mjs/env/dimensions.mjs"
import {updateMetaPanel, clearMetaPanel} from "../../../libs/mjs/panels/meta.mjs"

$(document).ready(function() {

  let plot = data.plot

  $("body").append("<svg id='canvas'></svg>")

  let canvas = d3.select("#canvas")

  addAllPanels()

  let geoMercator = d3.geoMercator()
  let geoOrthographic = d3.geoOrthographic()
  let geoEquirectangular = d3.geoEquirectangular()

  let projection = geoEquirectangular.fitSize([width(), height()], plot.GeoJSON)

  let path = d3.geoPath().projection(projection)

  scaleAxes()

  canvas.selectAll(".map")
        .data(plot.GeoJSON.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("id", function(feature) {

          return feature.properties.code

        })
        .attr("class", "map")
        .attr("fill", function(feature) {

          let history = plot.plots.find(plot => plot.code == feature.properties.code).x
          let value = history.find(year => year.year == plot.t.year).value

          if (value) {

            return plot.x.scale(value)

          } else {

            return "gray"

          }

        })

  let plots = $(".map")

  for (let i = 0; i < plots.length; i++) {

    $("#" + plots[i].id + ".map").mouseenter(function() {

      updateMetaPanel(plots[i].id)

    }).mouseleave(function() {

      clearMetaPanel()

    })

  }

  let zoom = d3.zoom()
               .scaleExtent([1, 42])
               .translateExtent([[0, 0], [width(), height()]])
               .on("zoom", function() {

                 d3.selectAll("path").attr("transform", d3.event.transform)

               })

  canvas.call(zoom)

  console.log(data)

})
