// Calling a series of functions that will draw the graph, data points and user controls.
function drawAll() {
  drawGraph();
  drawCircles();
  drawTimeControls();
};

// A function that defines how to draw the graph.
function drawGraph() {

  // Appending the Graph Title.
  fullScreen.append("text")
            .attr("class", "graph-title")
            .attr("x", (leftMargin + graphWidth/2))
            .attr("y",  "1em")
            .attr("dy", ".35em")
            .text("World Development Indicators");

  // Appending the Graph Date Range.
  fullScreen.append("text")
            .attr("class", "date-range")
            .attr("x", (leftMargin + graphWidth/2))
            .attr("y",  "2.5em")
            .attr("dy", ".35em")
            .text(firstYear + " - " + lastYear);

  // Appending the X Gridlines.
  fullScreen.append("g")
            .attr("class", "grid")
            .attr("transform", "translate(" + leftMargin + ", " + (windowHeight - bottomMargin) + ")")
            .call(d3.axisBottom(xScale)
                    .tickSize( -(windowHeight - topMargin - bottomMargin) )
                    .tickFormat("")
                    .ticks(5));

  // Appending the Y Gridlines.
  fullScreen.append("g")
            .attr("class", "grid")
            .attr("transform", "translate(" + leftMargin + ", " + topMargin + ")")
            .call(d3.axisLeft(yScale)
                    .tickSize( -(windowWidth - leftMargin - rightMargin) )
                    .tickFormat("")
                    .ticks(5));

  // Appending the X Axis.
  fullScreen.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + leftMargin + ", " + (windowHeight - bottomMargin) + ")")
            .call(d3.axisBottom(xScale)
                    .ticks(10));

  // Appending X Axis Label.
  fullScreen.append("text")
            .attr("class", "axis-label")
            .attr("x", (leftMargin + graphWidth/2))
            .attr("y",  (windowHeight - bottomMargin/2))
            .attr("dy", ".35em")
            .text(xAxisLabel);

  // Appending the Y Axis.
  fullScreen.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + leftMargin + ", " + topMargin + ")")
            .call(d3.axisLeft(yScale)
                    .ticks(10));

  // Appending Y Axis Label.
  fullScreen.append("text")
            .attr("class", "axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -(topMargin + graphHeight/2))
            .attr("y",  leftMargin/2)
            .attr("dy", ".35em")
            .text(yAxisLabel);

};// End of 'Draw Graph' function.

// A function that defines how to draw the circles.
function drawCircles() {

  // Creating the 'Circle Data' array to store the result of the following operations.
  var circleData = [];

  // Appending a new SVG so that if a circles body extends over the graph area it will be cutoff, rather than obstructing the view.
  var graphArea = fullScreen.append("svg")
                            .attr("width", graphWidth)
                            .attr("height", graphHeight)
                            .attr("x", leftMargin)
                            .attr("y", topMargin);

  // Looping over the 'Scaled Graph Data'.
  for (var i = 0; i < scaledGraphData.length; i++) {

    // Looping over each index of the 'Scaled Graph Data'.
    for (var j = 0; j < scaledGraphData[i].length; j++) {

      // Checking if the year of the current 'Country Object' matches the 'Current Year' variable.
      if (scaledGraphData[i][j]["Year"] === currentYear) {

        // Pushing the current 'Country Object' into the 'Circle Data' array.
        circleData.push(scaledGraphData[i][j]);
      };// End of matching year check.
    };// End of 'Country Objects' array loop.
  };// End of 'Scaled Graph Data' loop.

  // Sorting the 'Circle Data' by radius so that the larger circles get apended first.
  circleData.sort(function(a, b) {
    return b.R - a.R;
  });

  // Looping over the 'Circle Data' array.
  for (var i = 0; i < circleData.length; i++) {

    // Appending the 'Country Object' as a circle onto the graph.
    graphArea.append("circle")
             .attr("class", "country-circle")
             .attr("id", circleData[i].Code)
             .attr("cx", circleData[i].X)
             .attr("cy", circleData[i].Y)
             .attr("r", circleData[i].R)
             .attr("fill", circleData[i].Colour);

  };// End of FOR loop.

  // 'Mouse Over Country' is a Boolean variable used to check if the mouse is currently hovering over a country circle.
  var mouseOverCountry  = false;

  // Adding an event handler to change style properties of a country circle while the mouse is hovering over it.
  $(".country-circle").mouseover(function(event) {
    mouseOverCountry = true;
    $(this).css('cursor', 'pointer');
    $(this).css('stroke-width', 2.5);
  });

  // Adding an event handler to restore style properties of a country circle after the mouse leaves.
  $(".country-circle").mouseout(function(event) {
    mouseOverCountry = false;
    $(this).css('stroke-width', 1.25);
  });

};// End of 'Draw Circles' function.

function drawTimeControls() {

  // Appending a new SVG to simplify the positioning of child elements.
  var timeControls = fullScreen.append("svg")
                               .attr("class", "time-controls")
                               .attr("width", graphWidth)
                               .attr("height", 34)
                               .attr("x", leftMargin)
                               .attr("y", 65);

  // Appending a line to represent the date range.
  timeControls.append("line")
              .attr("x1", 150)
              .attr("y1", 17)
              .attr("x2", graphWidth - 150)
              .attr("y2", 17);

  // Appending the skip back button.
  timeControls.append("path")
              .attr("transform", "translate(10, 1)")
              .attr("d", "M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13 M14 16l8-6v12 M10 10h4v12h-4v-12z");

  // Appending the play forward button.
  timeControls.append("path")
              .attr("transform", "translate(53, 1)")
              .attr("d", "M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM12 9l12 7-12 7z");

  // Appending the fast forward button.
  timeControls.append("path")
              .attr("transform", "translate(96, 1)")
              .attr("d", "M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM10 11l7 5-7 5zM18 11l7 5-7 5z");

  // Appending the fast back button.
  timeControls.append("path")
              .attr("transform", "translate(" + (graphWidth - 129) + ", 1)")
              .attr("d", "M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM22 21l-7-5 7-5zM14 21l-7-5 7-5z");

  // Appending the play back button.
  timeControls.append("path")
              .attr("transform", "translate(" + (graphWidth - 86) + ", 1)")
              .attr("d", "M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM20 23l-12-7 12-7z");

  // Appending the skip forward button.
  timeControls.append("path")
              .attr("transform", "translate(" + (graphWidth - 43) + ", 1)")
              .attr("d", "M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16zM16 29c7.18 0 13-5.82 13-13s-5.82-13-13-13-13 5.82-13 13 5.82 13 13 13 M18 16l-8-6v12 M22 10h-4v12h4v-12z");

  // Appending a new SVG to act as the dragable controller for first year.
  var firstYearController = timeControls.append("svg")
                                        .attr("class", "year-control")
                                        .attr("id", "first-year-controller")
                                        .attr("width", 28)
                                        .attr("height", 28)
                                        .attr("x", 151)
                                        .attr("y", 3);

  // Appending a new SVG to act as the dragable controller for last year.
  var lastYearController = timeControls.append("svg")
                                       .attr("class", "year-control")
                                       .attr("id", "last-year-controller")
                                       .attr("width", 28)
                                       .attr("height", 28)
                                       .attr("x", graphWidth - 179)
                                       .attr("y", 3);

  // Appending a new SVG to act as the dragable controller for current year.
  var currentYearController = timeControls.append("svg")
                                          .attr("class", "year-control")
                                          .attr("id", "current-year-controller")
                                          .attr("width", 28)
                                          .attr("height", 28)
                                          .attr("x", graphWidth/2 - 14)
                                          .attr("y", 3);

  // Appending the background for the 'First Year Controller'.
  firstYearController.append("circle")
                     .attr("cx", 14)
                     .attr("cy", 14)
                     .attr("r", 14);

  // Appending the background for the 'Last Year Controller'.
  lastYearController.append("circle")
                    .attr("cx", 14)
                    .attr("cy", 14)
                    .attr("r", 14);

  // Appending the background for the 'Current Year Controller'.
  currentYearController.append("circle")
                       .attr("cx", 14)
                       .attr("cy", 14)
                       .attr("r", 14);

  // Appending the icon for the 'First Year Controller'.
  firstYearController.append("path")
                     .attr("transform", "translate(3, 3)")
                     .attr("d", "M11.2 0c-6.186 0-11.2 5.014-11.2 11.2s5.014 11.2 11.2 11.2 11.2-5.014 11.2-11.2-5.014-11.2-11.2-11.2zM11.2 19.6c-4.639 0-8.4-3.761-8.4-8.4s3.761-8.4 8.4-8.4c4.639 0 8.4 3.761 8.4 8.4s-3.761 8.4-8.4 8.4zM7 11.2c0-2.32 1.88-4.2 4.2-4.2s4.2 1.88 4.2 4.2c0 2.32-1.88 4.2-4.2 4.2s-4.2-1.88-4.2-4.2z");

  // Appending the icon for the 'Last Year Controller'.
  lastYearController.append("path")
                    .attr("transform", "translate(3, 3)")
                    .attr("d", "M11.2 0c-6.186 0-11.2 5.014-11.2 11.2s5.014 11.2 11.2 11.2 11.2-5.014 11.2-11.2-5.014-11.2-11.2-11.2zM11.2 19.6c-4.639 0-8.4-3.761-8.4-8.4s3.761-8.4 8.4-8.4c4.639 0 8.4 3.761 8.4 8.4s-3.761 8.4-8.4 8.4zM7 11.2c0-2.32 1.88-4.2 4.2-4.2s4.2 1.88 4.2 4.2c0 2.32-1.88 4.2-4.2 4.2s-4.2-1.88-4.2-4.2z");

  // Appending the icon for the 'Current Year Controller'.
  currentYearController.append("path")
                       .attr("transform", "translate(3, 3)")
                       .attr("d", "M11.2 0c-6.186 0-11.2 5.014-11.2 11.2s5.014 11.2 11.2 11.2 11.2-5.014 11.2-11.2-5.014-11.2-11.2-11.2zM11.2 14c-1.546 0-2.8-1.254-2.8-2.8s1.254-2.8 2.8-2.8c1.546 0 2.8 1.254 2.8 2.8s-1.254 2.8-2.8 2.8z");

  // Assigning number variables equal to the controller starting positions.
  var firstYearControllerPosition = (leftMargin + 151 );
  var currentYearControllerPosition = (leftMargin + (graphWidth/2 - 14));
  var lastYearControllerPosition = (leftMargin + (graphWidth - 179));

  // Adding the draggable event handler for the year controllers.
  $(".year-control").draggable().bind('drag', function(event, ui) {

    // Checking if the selected controller is for the first year.
    if (event.target.id === "first-year-controller") {

      // Checking if the selected controller is within the permitted range.
      if (ui.position.left > (leftMargin + 151) && ui.position.left < currentYearControllerPosition - 26) {

        // Updating the controller position variable.
        firstYearControllerPosition = ui.position.left;

        // Updating the controller position.
        event.target.setAttribute("x", (ui.position.left - leftMargin));
      };

      // The following code blocks follow the same pattern as above.

    } else if (event.target.id === "last-year-controller") {

      if (ui.position.left > (currentYearControllerPosition + 26) && ui.position.left < (leftMargin + (graphWidth - 179))) {
        lastYearControllerPosition = ui.position.left;
        event.target.setAttribute("x", (ui.position.left - leftMargin));
      };

    } else if (event.target.id === "current-year-controller") {

      if (ui.position.left > (firstYearControllerPosition + 26) && ui.position.left < lastYearControllerPosition - 26) {
        currentYearControllerPosition = ui.position.left;
        event.target.setAttribute("x", (ui.position.left - leftMargin));
      };

    };// End of target ID check.
  });// End of draggable event handler.
};// End of 'Draw Time Controls' function.

function drawMenu() {

  var open = false;
  var locked = false;

  var menu = svg.append("svg")
                .attr("id", "menu")
                .attr("width", 205)
                .attr("height", windowHeight)
                .attr("x", windowWidth - 55)
                .attr("y", 0);

  menu.append("rect")
      .attr("x", 0)
      .attr("y", -2)
      .attr("width", 205)
      .attr("height", windowHeight + 4)
      .attr("stroke", "grey")
      .attr("stroke-width", 2)
      .attr("fill", "lightgrey");

  $("svg").mousemove(function(event) {

    if (event.pageX > (windowWidth - 55) && open === false) {

      d3.selectAll("#menu").transition()
                           .duration(1000)
                           .ease(d3.easeLinear)
                           .attr("x", windowWidth - 200);

      open = true;

    } else if (open === true && locked === false && event.pageX < windowWidth - 200) {

      d3.selectAll("#menu").transition()
                           .duration(1000)
                           .ease(d3.easeLinear)
                           .attr("x", windowWidth - 55)

      open = false;

    };
  });

  menu.append("path")
      .attr("class", "nav-icon")
      .attr("stroke", "grey")
      .attr("fill", "grey")
      .attr("stroke-width", 1)
      .attr("transform", "translate(11, 22)")
      .attr("d", "M15 2c-8.284 0-15 6.716-15 15s6.716 15 15 15c8.284 0 15-6.716 15-15s-6.716-15-15-15zM23.487 22c0.268-1.264 0.437-2.606 0.492-4h3.983c-0.104 1.381-0.426 2.722-0.959 4h-3.516zM6.513 12c-0.268 1.264-0.437 2.606-0.492 4h-3.983c0.104-1.381 0.426-2.722 0.959-4h3.516zM21.439 12c0.3 1.28 0.481 2.62 0.54 4h-5.979v-4h5.439zM16 10v-5.854c0.456 0.133 0.908 0.355 1.351 0.668 0.831 0.586 1.625 1.488 2.298 2.609 0.465 0.775 0.867 1.638 1.203 2.578h-4.852zM10.351 7.422c0.673-1.121 1.467-2.023 2.298-2.609 0.443-0.313 0.895-0.535 1.351-0.668v5.854h-4.852c0.336-0.94 0.738-1.803 1.203-2.578zM14 12v4h-5.979c0.059-1.38 0.24-2.72 0.54-4h5.439zM2.997 22c-0.533-1.278-0.854-2.619-0.959-4h3.983c0.055 1.394 0.224 2.736 0.492 4h-3.516zM8.021 18h5.979v4h-5.439c-0.3-1.28-0.481-2.62-0.54-4zM14 24v5.854c-0.456-0.133-0.908-0.355-1.351-0.668-0.831-0.586-1.625-1.488-2.298-2.609-0.465-0.775-0.867-1.638-1.203-2.578h4.852zM19.649 26.578c-0.673 1.121-1.467 2.023-2.298 2.609-0.443 0.312-0.895 0.535-1.351 0.668v-5.854h4.852c-0.336 0.94-0.738 1.802-1.203 2.578zM16 22v-4h5.979c-0.059 1.38-0.24 2.72-0.54 4h-5.439zM23.98 16c-0.055-1.394-0.224-2.736-0.492-4h3.516c0.533 1.278 0.855 2.619 0.959 4h-3.983zM25.958 10h-2.997c-0.582-1.836-1.387-3.447-2.354-4.732 1.329 0.636 2.533 1.488 3.585 2.54 0.671 0.671 1.261 1.404 1.766 2.192zM5.808 7.808c1.052-1.052 2.256-1.904 3.585-2.54-0.967 1.285-1.771 2.896-2.354 4.732h-2.997c0.504-0.788 1.094-1.521 1.766-2.192zM4.042 24h2.997c0.583 1.836 1.387 3.447 2.354 4.732-1.329-0.636-2.533-1.488-3.585-2.54-0.671-0.671-1.261-1.404-1.766-2.192zM24.192 26.192c-1.052 1.052-2.256 1.904-3.585 2.54 0.967-1.285 1.771-2.896 2.354-4.732h2.997c-0.504 0.788-1.094 1.521-1.766 2.192z");

  menu.append("path")
      .attr("class", "nav-icon")
      .attr("stroke", "grey")
      .attr("fill", "grey")
      .attr("stroke-width", 1)
      .attr("transform", "translate(11, 75)")
      .attr("d", "M14 4v-0.5c0-0.825-0.675-1.5-1.5-1.5h-5c-0.825 0-1.5 0.675-1.5 1.5v0.5h-6v4h6v0.5c0 0.825 0.675 1.5 1.5 1.5h5c0.825 0 1.5-0.675 1.5-1.5v-0.5h18v-4h-18zM8 8v-4h4v4h-4zM26 13.5c0-0.825-0.675-1.5-1.5-1.5h-5c-0.825 0-1.5 0.675-1.5 1.5v0.5h-18v4h18v0.5c0 0.825 0.675 1.5 1.5 1.5h5c0.825 0 1.5-0.675 1.5-1.5v-0.5h6v-4h-6v-0.5zM20 18v-4h4v4h-4zM14 23.5c0-0.825-0.675-1.5-1.5-1.5h-5c-0.825 0-1.5 0.675-1.5 1.5v0.5h-6v4h6v0.5c0 0.825 0.675 1.5 1.5 1.5h5c0.825 0 1.5-0.675 1.5-1.5v-0.5h18v-4h-18v-0.5zM8 28v-4h4v4h-4z");

  menu.append("path")
      .attr("class", "nav-icon")
      .attr("stroke", "grey")
      .attr("fill", "grey")
      .attr("stroke-width", 1)
      .attr("transform", "translate(11, 128)")
      .attr("d", "M16 0c-8.837 0-16 2.239-16 5v4c0 2.761 7.163 5 16 5s16-2.239 16-5v-4c0-2.761-7.163-5-16-5 M16 17c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5 M16 26c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z");

  menu.append("path")
      .attr("class", "nav-icon")
      .attr("stroke", "grey")
      .attr("fill", "grey")
      .attr("stroke-width", 1)
      .attr("transform", "translate(11, 181)")
      .attr("d", "M16 0c-8.837 0-16 2.239-16 5v3l12 12v10c0 1.105 1.791 2 4 2s4-0.895 4-2v-10l12-12v-3c0-2.761-7.163-5-16-5zM2.95 4.338c0.748-0.427 1.799-0.832 3.040-1.171 2.748-0.752 6.303-1.167 10.011-1.167s7.262 0.414 10.011 1.167c1.241 0.34 2.292 0.745 3.040 1.171 0.494 0.281 0.76 0.519 0.884 0.662-0.124 0.142-0.391 0.38-0.884 0.662-0.748 0.427-1.8 0.832-3.040 1.171-2.748 0.752-6.303 1.167-10.011 1.167s-7.262-0.414-10.011-1.167c-1.24-0.34-2.292-0.745-3.040-1.171-0.494-0.282-0.76-0.519-0.884-0.662 0.124-0.142 0.391-0.38 0.884-0.662z");

  menu.append("path")
      .attr("class", "nav-icon")
      .attr("stroke", "grey")
      .attr("fill", "grey")
      .attr("stroke-width", 1)
      .attr("transform", "translate(11, 234)")
      .attr("d", "M27 22c-1.411 0-2.685 0.586-3.594 1.526l-13.469-6.734c0.041-0.258 0.063-0.522 0.063-0.791s-0.022-0.534-0.063-0.791l13.469-6.734c0.909 0.94 2.183 1.526 3.594 1.526 2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5c0 0.269 0.022 0.534 0.063 0.791l-13.469 6.734c-0.909-0.94-2.183-1.526-3.594-1.526-2.761 0-5 2.239-5 5s2.239 5 5 5c1.411 0 2.685-0.586 3.594-1.526l13.469 6.734c-0.041 0.258-0.063 0.522-0.063 0.791 0 2.761 2.239 5 5 5s5-2.239 5-5c0-2.761-2.239-5-5-5z");


  menu.append("path")
      .attr("class", "nav-icon")
      .attr("id", "locked")
      .attr("visibility", "hidden")
      .attr("stroke", "grey")
      .attr("fill", "grey")
      .attr("stroke-width", 1)
      .attr("transform", "translate(11, " + (windowHeight - 46) + ")")
      .attr("d", "M18.5 13h-0.5v-6c0-3.308-2.692-6-6-6h-4c-3.308 0-6 2.692-6 6v6h-0.5c-0.825 0-1.5 0.675-1.5 1.5v15c0 0.825 0.675 1.5 1.5 1.5h17c0.825 0 1.5-0.675 1.5-1.5v-15c0-0.825-0.675-1.5-1.5-1.5zM6 7c0-1.103 0.897-2 2-2h4c1.103 0 2 0.897 2 2v6h-8v-6z");

  menu.append("path")
      .attr("class", "nav-icon")
      .attr("id", "unlocked")
      .attr("stroke", "grey")
      .attr("fill", "grey")
      .attr("stroke-width", 1)
      .attr("transform", "translate(11, " + (windowHeight - 46) + ")")
      .attr("d", "M24 1c3.308 0 6 2.692 6 6v6h-4v-6c0-1.103-0.897-2-2-2h-4c-1.103 0-2 0.897-2 2v6h0.5c0.825 0 1.5 0.675 1.5 1.5v15c0 0.825-0.675 1.5-1.5 1.5h-17c-0.825 0-1.5-0.675-1.5-1.5v-15c0-0.825 0.675-1.5 1.5-1.5h12.5v-6c0-3.308 2.692-6 6-6h4z");

  $("#unlocked").on("click", function() {
    $("#unlocked").attr("visibility", "hidden");
    $("#locked").attr("visibility", "visible");
    locked = true;
  });

  $("#locked").on("click", function() {
    $("#locked").attr("visibility", "hidden");
    $("#unlocked").attr("visibility", "visible");
    locked = false;
  });
};
