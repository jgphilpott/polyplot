import {isProjected} from "./projections.mjs"

import {updateLayers} from "../draw/layers/all.mjs"
import {updateSettings} from "../panels/menu.mjs"

export function makePanable(canvas) {

  let mapProperties = data.plot.GeoJSON.properties
  let mapSettings = data.client.settings.map

  let polarResistance = mapSettings.polarResistance
  let orientation = mapSettings.orientation
  let projection = mapProperties.projection
  let transform = mapSettings.transform
  let tiltLimit = mapSettings.tiltLimit
  let panSpeed = mapSettings.panSpeed

  let λ = data.plot.type == "Country" ? -mapProperties.centroid[0] : mapSettings.orientation.λ
  let φ = data.plot.type == "Country" ? -mapProperties.centroid[1] : mapSettings.orientation.φ
  let γ = data.plot.type == "Country" ? 0 : mapSettings.orientation.γ

  let drag = d3.drag()
               .on("start", function(event) {

                 polarResistance = mapSettings.polarResistance
                 orientation = mapSettings.orientation
                 projection = mapProperties.projection
                 transform = mapSettings.transform
                 tiltLimit = mapSettings.tiltLimit
                 panSpeed = mapSettings.panSpeed

               })
               .on("drag", function(event) {

                 if (data.plot.type == "Country") { $("#mini-map").css("cursor", "grabbing"); transform.k = 1 }

                 λ = λ + d3.event.dx / transform.k * panSpeed
                 φ = φ - d3.event.dy / transform.k * panSpeed

                 if (Math.abs(φ) > tiltLimit) { if (φ > 0) { φ = tiltLimit } else if (φ < 0) { φ = -tiltLimit } else { φ = 0 } }

                 projection = projection.rotate([λ, φ, γ])

                 let airportSize = $(".airport").width()
                 let portSize = $(".port").width()

                 canvas.selectAll("path").attr("d", d3.geoPath().projection(projection))

                 canvas.selectAll(".airport").attr("x", function(airport) { return projection([airport.geometry.coordinates[0], airport.geometry.coordinates[1]])[0] - (airportSize / 2) })
                                             .attr("y", function(airport) { return projection([airport.geometry.coordinates[0], airport.geometry.coordinates[1]])[1] - airportSize })
                                             .style("visibility", function(airport) { return isProjected(airport, projection) })

                 canvas.selectAll(".city-point").attr("cx", function(cityPoint) { return projection([cityPoint.geometry.coordinates[0], cityPoint.geometry.coordinates[1]])[0] })
                                                .attr("cy", function(cityPoint) { return projection([cityPoint.geometry.coordinates[0], cityPoint.geometry.coordinates[1]])[1] })
                                                .style("visibility", function(cityPoint) { return isProjected(cityPoint, projection) })

                 canvas.selectAll(".city-label").attr("x", function(cityLabel) { return projection([cityLabel.geometry.coordinates[0], cityLabel.geometry.coordinates[1]])[0] })
                                                .attr("y", function(cityLabel) { return projection([cityLabel.geometry.coordinates[0], cityLabel.geometry.coordinates[1]])[1] })
                                                .style("visibility", function(cityLabel) { return isProjected(cityLabel, projection) })

                 canvas.selectAll(".port").attr("x", function(port) { return projection([port.geometry.coordinates[0], port.geometry.coordinates[1]])[0] - (portSize / 2) })
                                          .attr("y", function(port) { return projection([port.geometry.coordinates[0], port.geometry.coordinates[1]])[1] - portSize })
                                          .style("visibility", function(port) { return isProjected(port, projection) })

               })
               .on("end", function(event) {

                 mapProperties.projection = projection

                 updateSettings("map", "orientation", {λ: λ, φ: φ, γ: γ})

                 if (data.plot.type == "Country") { $("#mini-map").css("cursor", "grab") } else { updateLayers("pan", {λ: λ, φ: φ, γ: γ}) }

               })

  canvas.call(drag)

}
