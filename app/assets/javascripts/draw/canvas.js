// Appending the canvas (layer zero) and calling functions that will draw the layer one components of the view.
function drawCanvas() {

  // Creating the canvas data.
  app.view.canvas = {
    name: "Canvas",
    classList: ["canvas", "layer-zero"],
    width: app.view.width,
    height: app.view.height,
    x: 0,
    y: 0
  };

  // Appending the canvas to the HTML body.
  var canvas = d3.select("body")
                 .append("svg")
                 .data([app.view.canvas])
                 .attr("class", listify(app.view.canvas.classList))
                 .attr("width", app.view.canvas.width)
                 .attr("height", app.view.canvas.height)
                 .attr("x", app.view.canvas.x)
                 .attr("y", app.view.canvas.y);

  // Drawing the layer one components of the view.
  drawMenuZone(canvas);
  // drawGraphZone(canvas);

};// End of 'drawCanvas' function.
