import {newProjection} from "../../cartography/projections.mjs"

let plot = data.plot

export function drawRivers(canvas, rivers=plot.GeoJSON.properties.layers.rivers) {

  let geoProperties = plot.GeoJSON.properties
  let checkpoint = geoProperties.checkpoint
  let transform = geoProperties.transform

  let mapSettings = data.client.settings.map
  let orientation = mapSettings.orientation
  let projection = mapSettings.projection

  $(".river").remove()

  canvas.selectAll(".river")
        .data(rivers.filter(function(river) { return river.properties.rank <= checkpoint }))
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(newProjection(projection, [orientation.λ, orientation.φ, orientation.γ])))
        .attr("class", "river")
        .attr("transform", transform ? transform : "translate(0, 0)")
        .style("fill", "none")
        .style("stroke", "lightblue")
        .style("stroke-width", function(river) { return [0.1, 0.09, 0.08, 0.07, 0.06, 0.05][river.properties.rank - 1] })

}