// See all map projections here: github.com/d3/d3-geo-projection/blob/master/README.md

import {width, height} from "../env/window.mjs"

export let equirectangular = d3.geoEquirectangular()
export let mercator = d3.geoMercator()
export let orthographic = d3.geoOrthographic()

export let projections = {equirectangular: equirectangular,
                          mercator: mercator,
                          orthographic: orthographic}

export function polymorph(projection, duration=1000) {

  let steps = 5
  let progress = 0

  let mapProperties = data.plot.GeoJSON.properties
  let projectionSetting = data.client.settings.map.projection

  let buffer = projectionSetting == "orthographic" ? 0.95 : 1
  let clipAngle = projectionSetting == "orthographic" ? 90 : null

  projection = projections[projection].fitExtent([[0, 0], [width() * buffer, height() * buffer]], {type: "Sphere"})
                                      .clipExtent([[0, 0], [width(), height()]])
                                      .translate([width() / 2, height() / 2])
                                      .clipAngle(clipAngle)
                                      .rotate([0, 0])

  let projectionOne = mapProperties.projection
  let projectionTwo = projection

  mapProperties.projection = projection

  let morphInterval = setInterval(function() {

    progress += 1 / steps

    if (progress <= 1) {
      d3.select("#canvas").selectAll("path").attr("d", morph)
    } else {
      clearInterval(morphInterval)
    }

  }, 1)

  function morph(coordinate) {

    let clip = Math.PI

    let morphProjection = d3.geoProjection(project)
                            .fitExtent([[0, 0], [width() * buffer, height() * buffer]], {type: "Sphere"})
                            .clipExtent([[0, 0], [width(), height()]])
                            .translate([width() / 2, height() / 2])
                            .preclip(function(preclip) { return d3.geoClipCircle(clip)(d3.geoClipAntimeridian(preclip)) })
                            .rotate([0, 0])

    function project(λ, φ) {

      λ *= 180 / Math.PI
      φ *= 180 / Math.PI

      let coordinateOne = projectionOne([λ, φ])
      let coordinateTwo = projectionTwo([λ, φ])

      clip = projectionSetting == "orthographic" ? (Math.PI / 2) + (1 - progress) * (Math.PI / 2) : (Math.PI / 2) + progress * (Math.PI / 2)

      return [(1 - progress) * coordinateOne[0] + progress * coordinateTwo[0], (1 - progress) * -coordinateOne[1] + progress * -coordinateTwo[1]]

    }

    let morphPath = d3.geoPath(morphProjection)

    return morphPath(coordinate)

  }

}
