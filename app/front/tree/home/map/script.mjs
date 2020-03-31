$(document).ready(function() {

  let projection = d3.geoEquirectangular()

  let geoGenerator = d3.geoPath().projection(projection)

  let svg = d3.select("#canvas").selectAll("path").data(data)

  svg.enter().append("path").attr("d", geoGenerator)

})
