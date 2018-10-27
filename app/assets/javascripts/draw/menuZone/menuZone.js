// A function that defines how to draw the 'Menu Zone'.
function drawMenuZone(canvas) {

  var menuZoneData = {
    name: "Menu Zone",
    classList: ["menu-zone", "layer-one"],
    width: menuWidth,
    height: windowHeight,
    x: windowWidth - menuWidth,
    y: 0
  };

  var menuZone = canvas.append("svg")
                       .data([menuZoneData])
                       .attr("class", listify(menuZoneData.classList))
                       .attr("width", menuZoneData.width)
                       .attr("height", menuZoneData.height)
                       .attr("x", menuZoneData.x)
                       .attr("y", menuZoneData.y);

  menuZone.append("rect")
          .data([menuZoneData])
          .attr("class", listify(menuZoneData.classList))
          .attr("width", menuZoneData.width)
          .attr("height", menuZoneData.height)
          .attr("x", 0)
          .attr("y", 0);

  drawMenuOptions(menuZone);

};
