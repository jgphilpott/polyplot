import {polymorph} from "./projections.mjs"
import {translateLayers} from "./translate.mjs"

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

                 translateLayers(projection)

               })
               .on("end", function(event) {

                 mapProperties.projection = projection

                 updateSettings("map", "orientation", {λ: λ, φ: φ, γ: γ})

                 if (data.plot.type == "Country") { $("#mini-map").css("cursor", "grab") } else { polymorph(data.client.settings.map.projection, 0) }

               })

  canvas.call(drag)

}