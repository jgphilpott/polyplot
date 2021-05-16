import {newProjection} from "../../cartography/projections.mjs"

let plot = data.plot

export function drawRailroads(canvas, railroads=plot.GeoJSON.properties.layers.railroads) {

  let geoProperties = plot.GeoJSON.properties
  let checkpoint = geoProperties.checkpoint
  let transform = geoProperties.transform

  let mapSettings = data.client.settings.map
  let orientation = mapSettings.orientation
  let projection = mapSettings.projection

  $(".railroad").remove()

  canvas.selectAll(".railroad")
        .data(railroads.filter(function(railroad) { return railroad.properties.rank - 2 <= checkpoint }))
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(newProjection(projection, [orientation.λ, orientation.φ, orientation.γ])))
        .attr("class", "railroad")
        .attr("transform", transform ? transform : "translate(0, 0)")
        .style("fill", "none")
        .style("stroke", "red")
        .style("stroke-width", function(railroad) { return [0.1, 0.09, 0.08, 0.07, 0.06, 0.05][checkpoint - 1] })

}
