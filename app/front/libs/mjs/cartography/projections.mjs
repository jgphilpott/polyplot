// See all map projections here: github.com/d3/d3-geo-projection/blob/master/README.md

import {width, height} from "../env/window.mjs"

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

// export function polymorph(projectionName, duration=1000) {
//
//   let steps = 5
//   let progress = 0
//
//   let mapProperties = data.plot.GeoJSON.properties
//   let mapSettings = data.client.settings.map
//
//   let orientation = mapSettings.orientation
//
//   let projection = newProjection(projectionName)
//
//   let projectionOne = mapProperties.projection
//   let projectionTwo = projection
//
//   let morphInterval = setInterval(function() {
//
//     duration ? progress += 1 / steps : progress += 1
//
//     if (progress <= 1) {
//       // console.log("morph");
//       d3.select("#canvas").selectAll("path").attr("d", morph)
//       // d3.select("#canvas").selectAll(".airport").attr("d", console.log(morph))
//       // console.log(morph([]));
//     } else {
//       clearInterval(morphInterval)
//       mapProperties.projection = projection
//       $(".graticule").css("visibility", "visible")
//     }
//
//   }, duration / steps)
//
//   function morph(coordinate) {
//
//     let clip = Math.PI
//     let extent = projectionName == "orthographic" ? 0.95 : 1
//
//     let morphProjection = d3.geoProjection(project)
//                             .fitExtent([[0, 0], [width() * extent, height() * extent]], {type: "Sphere"})
//                             .clipExtent([[0, 0], [width(), height()]])
//                             .translate([width() / 2, height() / 2])
//                             .preclip(function(preclip) { return d3.geoClipCircle(clip)(d3.geoClipAntimeridian(preclip)) })
//                             .rotate([orientation.λ, orientation.φ, orientation.γ])
//
//     function project(λ, φ) {
//
//       λ *= 180 / Math.PI
//       φ *= 180 / Math.PI
//
//       let coordinateOne = projectionOne([λ, φ])
//       let coordinateTwo = projectionTwo([λ, φ])
//
//       clip = projectionName == "orthographic" ? Math.PI/2 + (1 - progress) * Math.PI/2 : Math.PI/2 + progress * Math.PI/2
//
//       return [(1 - progress) * coordinateOne[0] + progress * coordinateTwo[0], (1 - progress) * -coordinateOne[1] + progress * -coordinateTwo[1]]
//
//     }
//
//     let morphPath = d3.geoPath(morphProjection)
//
//     // mapProperties.projection = morphProjection
//
//     return morphPath(coordinate)
//
//   }
//
// }
