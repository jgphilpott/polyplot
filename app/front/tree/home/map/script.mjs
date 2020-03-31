$(document).ready(function() {

  console.log(data)

  let projection = d3.geoEquirectangular()

  let geoGenerator = d3.geoPath().projection(projection)

  let canvas = d3.select("#canvas").selectAll("path").data(data)

  canvas.enter().append("path").attr("d", geoGenerator)

})
