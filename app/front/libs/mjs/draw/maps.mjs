import {drawLayers} from "./layers/all.mjs"

import {contextMenu} from "../env/context.mjs"
import {width, height} from "../env/window.mjs"
import {regionsColourSwitch} from "../colors/switches/regions.mjs"

import {makePanable} from "../cartography/pan.mjs"
import {makeZoomable} from "../cartography/zoom.mjs"
import {projections, newProjection, polymorph} from "../cartography/projections.mjs"

import {updateMetaPanel, clearMetaPanel} from "../panels/meta.mjs"

let plot = data.plot
let plots = plot.plots

export function drawMaps(plotType=plot.type) {

  let GeoJSON = plot.GeoJSON
  let features = GeoJSON.features
  let properties = GeoJSON.properties

  let mapSettings = data.client.settings.map
  let projectionSetting = mapSettings.projection
  let orientationSetting = mapSettings.orientation

  let λ = orientationSetting.λ
  let φ = orientationSetting.φ
  let γ = orientationSetting.γ

  let canvas, size, projection, path = null
  let graticule = d3.geoGraticule().step([15, 15])

  if (plotType == "Map") {

    canvas = d3.select("#canvas")

    projection = newProjection(projectionSetting, [λ, φ, γ])

    path = d3.geoPath().projection(projection)

    canvas.selectAll("#ocean")
          .data([{type: "Feature", geometry: {type: "Sphere"}}])
          .enter()
          .append("path")
          .attr("d", path)
          .attr("id", "ocean")
          .attr("class", "water")
          .style("fill", "lightblue")

  } else if (plotType == "mini-map") {

    canvas = d3.select("#mini-map")

    size = plot.type != "Country" ? 125 : 150

    projection = projections["orthographic"].translate([size, size]).scale(size)

    path = plot.type != "Country" ? d3.geoPath().projection(projection.rotate([λ, 0, 0])) : d3.geoPath().projection(projection.rotate([-properties.centroid[0], -properties.centroid[1], 0]))

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

    drawLayers()

    makePanable(canvas)
    makeZoomable(canvas)

    polymorph(projectionSetting, 0)

  } else if (plotType == "mini-map") {

    plot.type == "Country" ? makePanable(canvas) : null

  }

}
