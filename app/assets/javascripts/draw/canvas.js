// Appending the canvas (layer zero) and calling functions that will draw the layer one components of the view.
function drawCanvas() {

  // Creating the canvas data.
  var canvasData = {
    name: "canvas",
    classList: ["canvas", "layer-zero"],
    width: windowWidth,
    height: windowHeight
  };

  // Appending the canvas to the HTML body.
  var canvas = d3.select("body")
                 .append("svg")
                 .data([canvasData])
                 .attr("class", "canvas layer-zero")
                 .attr("width", canvasData.width)
                 .attr("height", canvasData.height);

  // Drawing the layer one components of the view.
  drawMenuZone(canvas);
  drawGraphZone(canvas);

};// End of 'drawCanvas' function.
