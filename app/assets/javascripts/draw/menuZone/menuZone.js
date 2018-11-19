// A function that defines how to draw the 'Menu Zone'.
function drawMenuZone(canvas) {

  // Setting the default menu width.
  menuWidth = 52;

  app.view.canvas.menu = {
    name: "Menu",
    classList: ["menu", "layer-one"],
    width: menuWidth,
    height: app.view.canvas.height,
    x: app.view.canvas.width - menuWidth,
    y: 0
  };

  var menu = canvas.append("svg")
                   .data([app.view.canvas.menu])
                   .attr("class", listify(app.view.canvas.menu.classList))
                   .attr("width", app.view.canvas.menu.width)
                   .attr("height", app.view.canvas.menu.height)
                   .attr("x", app.view.canvas.menu.x)
                   .attr("y", app.view.canvas.menu.y);

  menu.append("rect")
      .data([app.view.canvas.menu])
      .attr("class", listify(app.view.canvas.menu.classList))
      .attr("width", app.view.canvas.menu.width)
      .attr("height", app.view.canvas.menu.height)
      .attr("x", 0)
      .attr("y", 0)
      .attr("fill", app.view.theme.grayScale[1]);

  drawMenuOptions(menu);

};
