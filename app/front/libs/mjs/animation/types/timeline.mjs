export function animateTimeline(direction) {

  let plot = data.plot

  let offset = $("#line")[0].offsetLeft
  let pointWidth = $("#point")[0].width

  let easement = d3.easeLinear
  let duration = plot.animation.speed
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
