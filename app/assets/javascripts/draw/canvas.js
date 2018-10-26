// Appending the canvas (layer zero) and calling functions that will draw the layer one components of the view.
function drawCanvas() {

  // This should be refactored to be one base canvas with the 'menuZone' and 'graphZone' on top.
  graphZone = d3.select("body")
                .append("svg")
                .attr("class", "graph-zone")
                .attr("width", graphZoneWidth)
                .attr("height", graphZoneHeight);

  drawMenuZone();
  drawGraphZone();

};// End of 'drawCanvas' function.
