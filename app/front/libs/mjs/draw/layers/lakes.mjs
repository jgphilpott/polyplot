import {newProjection} from "../../cartography/projections.mjs"

let plot = data.plot

export function drawLakes(canvas, lakes=plot.GeoJSON.properties.layers.lakes) {

  let geoProperties = plot.GeoJSON.properties
  let checkpoint = geoProperties.checkpoint
  let transform = geoProperties.transform

  let mapSettings = data.client.settings.map
  let orientation = mapSettings.orientation
  let projection = mapSettings.projection

  $(".lake").remove()

  canvas.selectAll(".lake")
        .data(lakes.filter(function(lake) { return lake.properties.rank <= checkpoint }))
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(newProjection(projection, [orientation.λ, orientation.φ, orientation.γ])))
        .attr("class", "lake")
        .attr("transform", transform ? transform : "translate(0, 0)")
        .style("fill", "lightblue")

}