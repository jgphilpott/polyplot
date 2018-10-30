// Appending the canvas (layer zero) and calling functions that will draw the layer one components of the view.
function drawCanvas() {

  // Creating the canvas data.
  var canvasData = {
    name: "Canvas",
    classList: ["canvas", "layer-zero"],
    width: windowWidth,
    height: windowHeight,
    x: 0,
    y: 0
  };

  // Appending the canvas to the HTML body.
  var canvas = d3.select("body")
                 .append("svg")
                 .data([canvasData])
                 .attr("class", listify(canvasData.classList))
                 .attr("width", canvasData.width)
                 .attr("height", canvasData.height)
                 .attr("x", canvasData.x)
                 .attr("y", canvasData.y);

  // Drawing the layer one components of the view.
  drawMenuZone(canvas);
  // drawGraphZone(canvas);

// I love to code but sometimes I feel sad and alone so its hard to focus.
// AI, come and save us from ourselfs, we love and need you!

};// End of 'drawCanvas' function.
