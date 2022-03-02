let plot = data.plot
let plots = plot.plots

export function animateTimeline(duration) {

  let easement = d3.easeLinear

  let offset = $("#timeline")[0].offsetLeft
  let pointWidth = $("#point")[0].width

  let scaledMinCap = plot.t.scale(plot.t.minCap)
  let scaledYear = plot.t.scale(plot.t.year)
  let scaledMaxCap = plot.t.scale(plot.t.maxCap)

  d3.select("#min-cap")
    .transition()
    .ease(easement)
    .duration(duration)
    .style("left", offset + scaledMinCap + "px")

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

  d3.select("#max-cap")
    .transition()
    .ease(easement)
    .duration(duration)
    .style("left", offset + (pointWidth * 2) + scaledMaxCap + "px")

  $("#year").text(plot.t.year)

}