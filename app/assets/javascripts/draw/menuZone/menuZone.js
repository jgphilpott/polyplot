// A function that defines how to draw the 'Menu'.
function drawMenuZone() {

  menuZone = d3.select("body").append("div")
               .attr("class","menu-zone")
               .style("width", menuWidth - 15 + "px")
               .style("height", graphZoneHeight + 3.51 + "px");

  menu = menuZone.append("svg")
                 .attr("class", "menu")
                 .attr("width", menuWidth - 30)
                 .attr("height", graphZoneHeight + 3.51)
                 .attr("x", 0)
                 .attr("y", 0);

  menuBackground =  menu.append("rect")
                        .attr("x", 0)
                        .attr("y", -2)
                        .attr("width", 350)
                        .attr("height", graphZoneHeight + 7.51);

  drawMenuOptions();

};
