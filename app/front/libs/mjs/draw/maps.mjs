import {drawLayers} from "./layers/all.mjs"

import {contextMenu} from "../env/context.mjs"
import {width, height} from "../env/window.mjs"
import {regionsColourSwitch} from "../colors/switches/regions.mjs"

import {makeZoomable} from "../cartography/zoom.mjs"
import {equirectangular, mercator, orthographic} from "../cartography/projections.mjs"

import {updateMetaPanel, clearMetaPanel} from "../panels/meta.mjs"

let plot = data.plot
let plots = plot.plots

export function drawMaps(plotType=plot.type, λ=0, φ=0, γ=0) {

  let GeoJSON = plot.GeoJSON
  let features = GeoJSON.features
  let properties = GeoJSON.properties
  let projectionSetting = data.client.settings.map.projection
  let projections = {equirectangular: equirectangular, mercator: mercator, orthographic: orthographic}

  let canvas, size, projection, path = null
  let graticule = d3.geoGraticule().step([15, 15])

  let buffer = projectionSetting == "orthographic" ? 0.85 : 1
  let clipAngle = projectionSetting == "orthographic" ? 90 : null

  if (plotType == "Map") {

    canvas = d3.select("#canvas")

    projection = projections[projectionSetting].fitExtent([[0, 0], [width() * buffer, height() * buffer]], {type: "Sphere"})
                                               .clipExtent([[0, 0], [width(), height()]])
                                               .translate([width() / 2, height() / 2])
                                               .clipAngle(clipAngle)
                                               .rotate([0, 0])

    path = d3.geoPath().projection(projection)

  } else if (plotType == "mini-map") {

    canvas = d3.select("#mini-map")

    size = (plot.type != "Country") ? (125) : (150)

    projection = orthographic.scale(size).translate([size, size])

    path = (plot.type != "Country") ? (d3.geoPath().projection(projection.rotate([λ, φ, γ]))) : (d3.geoPath().projection(projection.rotate([-properties.centroid[0], -properties.centroid[1], 0])))

    canvas.append("g")
          .append("path")
          .datum(graticule)
          .attr("d", path)
          .attr("class", "graticule")
          .style("stroke", "gray")
          .style("fill", "none")

  }

  properties.projection = projection

  canvas.selectAll(".map")
        .data(features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("id", function(map) { return map.properties.code })
        .attr("class", "map")
        .style("fill", function(map) {

          if (plotType == "Map" && data.client.settings.general.countryExceptions.includes(map.properties.code) != true) {

            let history = plots.find(plot => plot.code == map.properties.code).x
            let value = history.find(date => date.year == plot.t.year).value

            if (typeof(value) == "number") { return plot.x.scale(value) } else { return "gray" }

          } else if (plotType == "mini-map") {

            if (plot.type == "Country" && map.properties.code != plots.code) {
              return "gray"
            } else {
              return regionsColourSwitch(map.properties.region)
            }

          } else { return "gray" }

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

    makeZoomable()
    drawLayers()

  } else if (plotType == "mini-map") {

    if (plot.type == "Country") {

      canvas.call(d3.drag()
                    .on("drag", function drag() {

                      $("#mini-map").css("cursor", "grabbing")

                      let rotate = projection.rotate()
                      let scale = 75 / projection.scale()

                      projection.rotate([
                        rotate[0] + d3.event.dx * scale,
                        rotate[1] - d3.event.dy * scale
                      ])

                      let pathGenerator = d3.geoPath().projection(projection)

                      canvas.selectAll(".graticule").attr("d", pathGenerator)
                      canvas.selectAll(".map").attr("d", pathGenerator)

                    })
                    .on("end", function end() { $("#mini-map").css("cursor", "grab") }))

    }

  }

}
