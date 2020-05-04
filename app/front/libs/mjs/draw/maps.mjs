import {width, height} from "../env/window.mjs"

import {makeZoomable} from "../cartography/zoom.mjs"
import {orthographic, equirectangular} from "../cartography/projections.mjs"

import {updateMetaPanel, clearMetaPanel} from "../panels/meta.mjs"

let plot = data.plot
let plots = plot.plots

export function drawMaps(plotType=plot.type) {

  let canvas = d3.select("#canvas")

  let projection = equirectangular.fitSize([width(), height()], plot.GeoJSON)

  let path = d3.geoPath().projection(projection)

  canvas.selectAll(".map")
        .data(plot.GeoJSON.features)
        .enter()
        .append("path")
        .attr("id", function(feature) {

          return feature.properties.code

        })
        .attr("class", "map")
        .attr("d", path)
        .attr("fill", function(feature) {

          let history = plots.find(plot => plot.code == feature.properties.code).x
          let value = history.find(date => date.year == plot.t.year).value

          if (typeof(value) == "number") {

            return plot.x.scale(value)

          } else {

            return "gray"

          }

        })

  let maps = $(".map")

  for (let i = 0; i < maps.length; i++) {

    $("#" + maps[i].id + ".map").mouseenter(function() {

      updateMetaPanel(maps[i].id)

    }).mouseleave(function() {

      clearMetaPanel()

    })

  }

  makeZoomable(canvas)

}
