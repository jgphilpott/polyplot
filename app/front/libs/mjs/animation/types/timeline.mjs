let plot = data.plot

export function animateTimeline(duration = plot.animation.speed) {

  let offset = $("#timeline")[0].offsetLeft
  let pointWidth = $("#point")[0].width

  let easement = d3.easeLinear
  let scaledYear = plot.t.scale(plot.t.year)

  d3.select("#point")
    .transition()
    .ease(easement)
    .duration(duration)
    .style("left", offset + pointWidth + scaledYear + "px")

  d3.select("#year")
    .transition()
    .ease(easement)
    .duration(duration)
    .style("left", offset + pointWidth + scaledYear + "px")

  $("#year").text(plot.t.year)

}
