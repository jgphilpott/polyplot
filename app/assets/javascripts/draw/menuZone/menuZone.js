// A function that defines how to draw the 'Menu'.
function drawMenuZone() {

  menuZone = d3.select("body").append("div")
               .attr("class","menu-zone")
               .style("width", menuWidth + "px")
               .style("height", graphZoneHeight + "px");

  menu = menuZone.append("svg")
                 .attr("class", "menu")
                 .attr("width", menuWidth)
                 .attr("height", graphZoneHeight)
                 .attr("x", 0)
                 .attr("y", 0);

  menuBackground =  menu.append("rect")
                        .attr("x", 0)
                        .attr("y", 0)
                        .attr("width", 350)
                        .attr("height", graphZoneHeight);

  drawMenuOptions();

};
