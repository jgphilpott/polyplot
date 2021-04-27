import {black} from "../colors/solid/grayscale.mjs"

let plot = data.plot

export function drawLine2(vertices=[], color=black, id="", clas="line") {

  if (data.client.settings.general.countryExceptions.includes(id) != true) {

    plot.line.generator = d3.line()
                            .x(function(vertex) { return plot.line.x(vertex.year) })
                            .y(function(vertex) { return plot.line.y(vertex.value) })

    d3.select("#linezone")
      .selectAll(clas)
      .data([vertices])
      .enter()
      .append("path")
      .attr("id", id)
      .attr("class", clas)
      .attr("d", function(vertex) { return plot.line.generator(vertex) })
      .style("stroke", color)
      .style("fill", "none")

  }

}
