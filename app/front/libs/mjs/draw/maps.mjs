import {drawLayers} from "./layers/all.mjs"

import {contextMenu} from "../env/context.mjs"
import {width, height} from "../env/window.mjs"

import {regionsColourSwitch} from "../colors/switches/regions.mjs"

import {makeZoomable} from "../cartography/zoom.mjs"
import {orthographic, equirectangular} from "../cartography/projections.mjs"

import {updateMetaPanel, clearMetaPanel} from "../panels/meta.mjs"

let plot = data.plot
let plots = plot.plots

export function drawMaps(plotType=plot.type, λ=0, φ=0, γ=0) {

  let canvas, projection, path = null

  if (plotType == "Map") {

    canvas = d3.select("#canvas")
    projection = equirectangular.fitSize([width(), height()], plot.GeoJSON)
    path = d3.geoPath().projection(projection)

  } else if (plotType == "miniMap") {

    canvas = d3.select("#miniMap")
    projection = orthographic.scale(125).translate([125, 125])
    path = d3.geoPath().projection(projection.rotate([λ, φ, γ]))

  }

  plot.GeoJSON.properties.projection = projection

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

          if (plotType == "Map") {

            let history = plots.find(plot => plot.code == feature.properties.code).x
            let value = history.find(date => date.year == plot.t.year).value

            if (typeof(value) == "number") {

              return plot.x.scale(value)

            } else {

              return "gray"

            }

          } else if (plotType == "miniMap") {

            return regionsColourSwitch(feature.properties.region)

          }

        })

  if (plotType == "Map") {

    let maps = $(".map")

    maps.mouseenter(function() {

      updateMetaPanel(this.id)

    }).mouseleave(function() {

      clearMetaPanel()

    })

    maps.contextmenu(function(event) {

      contextMenu(this.id, event)

    })

    drawLayers()
    makeZoomable(canvas)

  } else if (plotType == "miniMap") {

    socket.emit("get_graticule", 30)

    socket.on("new_graticule", function(graticule) {

      canvas.selectAll(".graticule")
            .data(graticule.grid)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", "graticule")
            .style("fill", "none")
            .style("stroke", "gray")
            .style("stroke-width", 1)

      d3.selectAll(".graticule").setAsBackLayer()

    })

  }

}
