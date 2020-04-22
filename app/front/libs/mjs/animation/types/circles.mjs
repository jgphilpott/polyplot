let plot = data.plot

export function animateCircles(duration) {

  d3.selectAll(".plot")
    .transition()
    .duration(duration)
    .style("fill", function(feature) {

      console.log(feature)
      return "black"

    })

}
