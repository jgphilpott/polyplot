export function transformLayers(event) {

  d3.selectAll(".airport").attr("transform", event.transform)
  d3.selectAll(".city").attr("transform", event.transform)
  d3.selectAll(".graticule").attr("transform", event.transform)
  d3.selectAll(".lake").attr("transform", event.transform)
  d3.selectAll(".map").attr("transform", event.transform)
  d3.selectAll(".port").attr("transform", event.transform)
  d3.selectAll(".railroad").attr("transform", event.transform)
  d3.selectAll(".river").attr("transform", event.transform)
  d3.selectAll(".road").attr("transform", event.transform)

}
