// See all map projections here: github.com/d3/d3-geo-projection/blob/master/README.md

import {width, height} from "../env/window.mjs"
import {translateLayers} from "./translate.mjs"

export let equirectangular = d3.geoEquirectangular()
export let mercator = d3.geoMercator()
export let orthographic = d3.geoOrthographic()

export let projections = {equirectangular: equirectangular,
                          mercator: mercator,
                          orthographic: orthographic}

export function newProjection(name, rotate=[0, 0, 0]) {

  let clip = name == "orthographic" ? 90 : null
  let extent = name == "orthographic" ? 0.95 : 1

  return projections[name].fitExtent([[0, 0], [width() * extent, height() * extent]], {type: "Sphere"})
                          .clipExtent([[0, 0], [width(), height()]])
                          .translate([width() / 2, height() / 2])
                          .clipAngle(clip)
                          .rotate(rotate)

}

export function isProjected(feature, projection) {

  let path = d3.geoPath().projection(projection)
  let projected = path({type: "Point", coordinates: feature.geometry.coordinates})

  return projected ? "visible" : "hidden"

}

export function polymorph(name, duration=1000) {

  let steps = 10
  let progress = 0

  let white = "#ffffff"
  let lightblue = "#add8e6"
  let backgroundColor = name == "orthographic" ? white : lightblue

  $("#canvas").animate({backgroundColor: backgroundColor}, {duration: duration, queue: false})

  let mapProperties = data.plot.GeoJSON.properties
  let mapSettings = data.client.settings.map

  let projectionOne = mapProperties.projection
  let projectionTwo = newProjection(name)

  let morphInterval = setInterval(function() {

    duration ? progress += 1 / steps : progress += 1

    if (progress <= 1) {

      translateLayers(morph())

    } else {

      clearInterval(morphInterval)

      mapProperties.projection = projectionTwo

    }

  }, duration / steps)

  function morph(coordinate) {

    let clip = Math.PI
    let extent = name == "orthographic" ? 0.95 : 1

    let orientation = mapSettings.orientation

    let λ = orientation.λ
    let φ = orientation.φ
    let γ = orientation.γ

    let morphProjection = d3.geoProjection(project)
                            .fitExtent([[0, 0], [width() * extent, height() * extent]], {type: "Sphere"})
                            .preclip(function(preclip) { return d3.geoClipCircle(clip)(d3.geoClipAntimeridian(preclip)) })
                            .clipExtent([[0, 0], [width(), height()]])
                            .translate([width() / 2, height() / 2])
                            .rotate([λ, φ, γ])

    function project(λ, φ) {

      λ *= 180 / Math.PI
      φ *= 180 / Math.PI

      let coordinateOne = projectionOne([λ, φ])
      let coordinateTwo = projectionTwo([λ, φ])

      clip = name == "orthographic" ? Math.PI/2 + (1 - progress) * Math.PI/2 : Math.PI/2 + progress * Math.PI/2

      return [(1 - progress) * coordinateOne[0] + progress * coordinateTwo[0], (1 - progress) * -coordinateOne[1] + progress * -coordinateTwo[1]]

    }

    return morphProjection

  }

}