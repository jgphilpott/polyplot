// A function that defines how to draw the graph.
function drawGraph(svg, windowWidth, windowHeight, topMargin, rightMargin, bottomMargin, leftMargin, xAxisScale, yAxisScale, xAxisLabel, yAxisLabel, graphWidth, graphHeight) {

  // Appending Graph Title.
  svg.append("text")
     .attr("class", "graph-title")
     .attr("x", windowWidth/2)
     .attr("y",  "1em")
     .attr("dy", ".35em")
     .text("World Development Indicators");

  // Appending Graph Date Range.
  svg.append("text")
     .attr("class", "date-range")
     .attr("x", windowWidth/2)
     .attr("y",  "2.5em")
     .attr("dy", ".35em")
     .text(firstYear + " - " + lastYear);

  // Appending the X Gridlines.
  svg.append("g")
     .attr("class", "grid")
     .attr("transform", "translate(" + leftMargin + ", " + (windowHeight - bottomMargin) + ")")
     .call(d3.axisBottom(xAxisScale)
             .tickSize( -(windowHeight - topMargin - bottomMargin) )
             .tickFormat("")
             .ticks(5));

  // Appending the Y Gridlines.
  svg.append("g")
     .attr("class", "grid")
     .attr("transform", "translate(" + leftMargin + ", " + topMargin + ")")
     .call(d3.axisLeft(yAxisScale)
             .tickSize( -(windowWidth - leftMargin - rightMargin) )
             .tickFormat("")
             .ticks(5));

  // Appending the X Axis.
  svg.append("g")
     .attr("class", "axis")
     .attr("id", "xAxis")
     .attr("transform", "translate(" + leftMargin + ", " + (windowHeight - bottomMargin) + ")")
     .call(d3.axisBottom(xAxisScale)
             .ticks(10));

  // Appending X Axis Label.
  svg.append("text")
     .attr("class", "axis-label")
     .attr("x", ( leftMargin + (windowWidth - (leftMargin + rightMargin))/2 ))
     .attr("y",  ( windowHeight - (bottomMargin/2) ))
     .attr("dy", ".35em")
     .text(xAxisLabel);

  // Appending the Y Axis.
  svg.append("g")
     .attr("class", "axis")
     .attr("id", "yAxis")
     .attr("transform", "translate(" + leftMargin + ", " + topMargin + ")")
     .call(d3.axisLeft(yAxisScale)
             .ticks(10));

// Appending Y Axis Label.
svg.append("text")
   .attr("class", "axis-label")
   .attr("transform", "rotate(-90)")
   .attr("x", -(topMargin + (windowHeight - (topMargin + bottomMargin))/2))
   .attr("y",  leftMargin/2)
   .attr("dy", ".35em")
   .text(yAxisLabel);

  // // Adding Event Listener for Mousemove...
  // // This is to create Guidelines and Tooltips.
  // $("svg").mousemove(function(event) {
  //
  //   // Checking if the mouse is within the graph area.
  //   if (event.pageX > leftMargin && event.pageX < (windowWidth - rightMargin) && event.pageY > topMargin && event.pageY < (windowHeight - bottomMargin) && overCountry !== true) {
  //
  //     // Removing old Guidelines.
  //     $(".mouseGuide").remove();
  //
  //     // Hiding cursor while over the graph area.
  //     $('body').css('cursor', 'none');
  //
  //     // Adding Guideline for X.
  //     svg.append("line")
  //        .attr("class", "mouseGuide")
  //        .attr("x1", event.pageX)
  //        .attr("y1", topMargin)
  //        .attr("x2", event.pageX)
  //        .attr("y2", (windowHeight - bottomMargin));
  //
  //     // Adding Guideline for Y.
  //     svg.append("line")
  //        .attr("class", "mouseGuide")
  //        .attr("x1", leftMargin)
  //        .attr("y1", event.pageY)
  //        .attr("x2", (windowWidth - rightMargin))
  //        .attr("y2", event.pageY);
  //
  //   } else {
  //
  //     // Removing old Guidelines.
  //     $(".mouseGuide").remove();
  //
  //     // Restoring default cursor.
  //     $('body').css('cursor', 'default');
  //
  //   };// End of Mouse location check.
  // });// End of Mousemove Event Listener.

function drawTimeControls() {

  var timeControls = svg.append("svg")
     .attr("width", graphWidth)
     .attr("height", 34)
     .attr("x", leftMargin)
     .attr("y", 65);

  timeControls.append("line")
     .attr("stroke", "grey")
     .attr("stroke-width", 5)
     .attr("stroke-linecap", "round")
     .attr("x1", 150)
     .attr("y1", 17)
     .attr("x2", graphWidth - 150)
     .attr("y2", 17)

  timeControls.append("path")
     .attr("stroke", "grey")
     .attr("fill", "grey")
     .attr("stroke-width", 1)
     .attr("transform", "translate(53, 1)")
     .attr("d", "M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM12 9l12 7-12 7z");

  timeControls.append("path")
     .attr("stroke", "grey")
     .attr("fill", "grey")
     .attr("stroke-width", 1)
     .attr("transform", "translate(10, 1)")
     .attr("d", "M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16zM16 29c7.18 0 13-5.82 13-13s-5.82-13-13-13-13 5.82-13 13 5.82 13 13 13 M18 16l-8-6v12 M22 10h-4v12h4v-12z");

  timeControls.append("path")
     .attr("stroke", "grey")
     .attr("fill", "grey")
     .attr("stroke-width", 1)
     .attr("transform", "translate(96, 1)")
     .attr("d", "M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM10 11l7 5-7 5zM18 11l7 5-7 5z");

  timeControls.append("path")
     .attr("stroke", "grey")
     .attr("fill", "grey")
     .attr("stroke-width", 1)
     .attr("transform", "translate(" + (graphWidth - 86) + ", 1)")
     .attr("d", "M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM20 23l-12-7 12-7z");

  timeControls.append("path")
     .attr("stroke", "grey")
     .attr("fill", "grey")
     .attr("stroke-width", 1)
     .attr("transform", "translate(" + (graphWidth - 43) + ", 1)")
     .attr("d", "M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13 M14 16l8-6v12 M10 10h4v12h-4v-12z");

  timeControls.append("path")
     .attr("stroke", "grey")
     .attr("fill", "grey")
     .attr("stroke-width", 1)
     .attr("transform", "translate(" + (graphWidth - 129) + ", 1)")
     .attr("d", "M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM22 21l-7-5 7-5zM14 21l-7-5 7-5z");

  var currentYearControl = timeControls.append("svg")
                                       .attr("class", "yearControl")
                                       .attr("id", "currentYearControl")
                                       .attr("width", 28)
                                       .attr("height", 28)
                                       .attr("x", graphWidth/2 - 28)
                                       .attr("y", 3);

  var firstYearControl = timeControls.append("svg")
                                     .attr("class", "yearControl")
                                     .attr("id", "firstYearControl")
                                     .attr("width", 28)
                                     .attr("height", 28)
                                     .attr("x", 155)
                                     .attr("y", 3);

  var lastYearControl = timeControls.append("svg")
                                    .attr("class", "yearControl")
                                    .attr("id", "lastYearControl")
                                    .attr("width", 28)
                                    .attr("height", 28)
                                    .attr("x", graphWidth - 183)
                                    .attr("y", 3);

  var firstYear = (leftMargin + 155 );
  var currentYear = (leftMargin + (graphWidth/2 - 28));
  var lastYear = (leftMargin + (graphWidth - 183));

  currentYearControl.append("circle")
        .attr("cx", 14)
        .attr("cy", 14)
        .attr("r", 14)
        .attr("fill", "white")

  firstYearControl.append("circle")
        .attr("cx", 14)
        .attr("cy", 14)
        .attr("r", 14)
        .attr("fill", "white")

  lastYearControl.append("circle")
        .attr("cx", 14)
        .attr("cy", 14)
        .attr("r", 14)
        .attr("fill", "white")

  firstYearControl.append("path")
     .attr("stroke", "grey")
     .attr("fill", "grey")
     .attr("stroke-width", 1)
     .attr("transform", "translate(3, 3)")
     .attr("d", "M11.2 0c-6.186 0-11.2 5.014-11.2 11.2s5.014 11.2 11.2 11.2 11.2-5.014 11.2-11.2-5.014-11.2-11.2-11.2zM11.2 19.6c-4.639 0-8.4-3.761-8.4-8.4s3.761-8.4 8.4-8.4c4.639 0 8.4 3.761 8.4 8.4s-3.761 8.4-8.4 8.4zM7 11.2c0-2.32 1.88-4.2 4.2-4.2s4.2 1.88 4.2 4.2c0 2.32-1.88 4.2-4.2 4.2s-4.2-1.88-4.2-4.2z");

  lastYearControl.append("path")
     .attr("stroke", "grey")
     .attr("fill", "grey")
     .attr("stroke-width", 1)
     .attr("transform", "translate(3, 3)")
     .attr("d", "M11.2 0c-6.186 0-11.2 5.014-11.2 11.2s5.014 11.2 11.2 11.2 11.2-5.014 11.2-11.2-5.014-11.2-11.2-11.2zM11.2 19.6c-4.639 0-8.4-3.761-8.4-8.4s3.761-8.4 8.4-8.4c4.639 0 8.4 3.761 8.4 8.4s-3.761 8.4-8.4 8.4zM7 11.2c0-2.32 1.88-4.2 4.2-4.2s4.2 1.88 4.2 4.2c0 2.32-1.88 4.2-4.2 4.2s-4.2-1.88-4.2-4.2z");

  currentYearControl.append("path")
     .attr("stroke", "grey")
     .attr("fill", "grey")
     .attr("stroke-width", 1)
     .attr("transform", "translate(3, 3)")
     .attr("d", "M11.2 0c-6.186 0-11.2 5.014-11.2 11.2s5.014 11.2 11.2 11.2 11.2-5.014 11.2-11.2-5.014-11.2-11.2-11.2zM11.2 14c-1.546 0-2.8-1.254-2.8-2.8s1.254-2.8 2.8-2.8c1.546 0 2.8 1.254 2.8 2.8s-1.254 2.8-2.8 2.8z");


    $(".yearControl").draggable().bind('drag', function(event, ui){

    if (event.target.id === "firstYearControl") {

      if (ui.position.left > (leftMargin + 155) && ui.position.left < currentYear - 26) {
        firstYear = ui.position.left;
        event.target.setAttribute("x", (ui.position.left - leftMargin));
      };

    } else if (event.target.id === "currentYearControl") {

      if (ui.position.left > (firstYear + 26) && ui.position.left < lastYear - 26) {
        currentYear = ui.position.left;
        event.target.setAttribute("x", (ui.position.left - leftMargin));
      };

    } else if (event.target.id === "lastYearControl") {

      if (ui.position.left > (currentYear + 26) && ui.position.left < (leftMargin + (graphWidth - 183))) {
        lastYear = ui.position.left;
        event.target.setAttribute("x", (ui.position.left - leftMargin));
      };

    } else {
      console.log("Error in Year Controls!");
    };

  });
};

drawTimeControls();

  // function drawMenu() {
  //
  //   var open = false;
  //   var locked = false;
  //
  //   var menu = svg.append("svg")
  //                 .attr("id", "menu")
  //                 .attr("width", 205)
  //                 .attr("height", windowHeight)
  //                 .attr("x", windowWidth - 55)
  //                 .attr("y", 0);
  //
  //   menu.append("rect")
  //       .attr("x", 0)
  //       .attr("y", -2)
  //       .attr("width", 205)
  //       .attr("height", windowHeight + 4)
  //       .attr("stroke", "grey")
  //       .attr("stroke-width", 2)
  //       .attr("fill", "lightgrey");
  //
  //   $("svg").mousemove(function(event) {
  //
  //     if (event.pageX > (windowWidth - 55) && open === false) {
  //
  //       d3.selectAll("#menu").transition()
  //                            .duration(1000)
  //                            .ease(d3.easeLinear)
  //                            .attr("x", windowWidth - 200);
  //
  //       open = true;
  //
  //     } else if (open === true && locked === false && event.pageX < windowWidth - 200) {
  //
  //       d3.selectAll("#menu").transition()
  //                            .duration(1000)
  //                            .ease(d3.easeLinear)
  //                            .attr("x", windowWidth - 55)
  //
  //       open = false;
  //
  //     };
  //   });
  //
  //   menu.append("path")
  //       .attr("class", "nav-icon")
  //       .attr("stroke", "grey")
  //       .attr("fill", "grey")
  //       .attr("stroke-width", 1)
  //       .attr("transform", "translate(11, 22)")
  //       .attr("d", "M15 2c-8.284 0-15 6.716-15 15s6.716 15 15 15c8.284 0 15-6.716 15-15s-6.716-15-15-15zM23.487 22c0.268-1.264 0.437-2.606 0.492-4h3.983c-0.104 1.381-0.426 2.722-0.959 4h-3.516zM6.513 12c-0.268 1.264-0.437 2.606-0.492 4h-3.983c0.104-1.381 0.426-2.722 0.959-4h3.516zM21.439 12c0.3 1.28 0.481 2.62 0.54 4h-5.979v-4h5.439zM16 10v-5.854c0.456 0.133 0.908 0.355 1.351 0.668 0.831 0.586 1.625 1.488 2.298 2.609 0.465 0.775 0.867 1.638 1.203 2.578h-4.852zM10.351 7.422c0.673-1.121 1.467-2.023 2.298-2.609 0.443-0.313 0.895-0.535 1.351-0.668v5.854h-4.852c0.336-0.94 0.738-1.803 1.203-2.578zM14 12v4h-5.979c0.059-1.38 0.24-2.72 0.54-4h5.439zM2.997 22c-0.533-1.278-0.854-2.619-0.959-4h3.983c0.055 1.394 0.224 2.736 0.492 4h-3.516zM8.021 18h5.979v4h-5.439c-0.3-1.28-0.481-2.62-0.54-4zM14 24v5.854c-0.456-0.133-0.908-0.355-1.351-0.668-0.831-0.586-1.625-1.488-2.298-2.609-0.465-0.775-0.867-1.638-1.203-2.578h4.852zM19.649 26.578c-0.673 1.121-1.467 2.023-2.298 2.609-0.443 0.312-0.895 0.535-1.351 0.668v-5.854h4.852c-0.336 0.94-0.738 1.802-1.203 2.578zM16 22v-4h5.979c-0.059 1.38-0.24 2.72-0.54 4h-5.439zM23.98 16c-0.055-1.394-0.224-2.736-0.492-4h3.516c0.533 1.278 0.855 2.619 0.959 4h-3.983zM25.958 10h-2.997c-0.582-1.836-1.387-3.447-2.354-4.732 1.329 0.636 2.533 1.488 3.585 2.54 0.671 0.671 1.261 1.404 1.766 2.192zM5.808 7.808c1.052-1.052 2.256-1.904 3.585-2.54-0.967 1.285-1.771 2.896-2.354 4.732h-2.997c0.504-0.788 1.094-1.521 1.766-2.192zM4.042 24h2.997c0.583 1.836 1.387 3.447 2.354 4.732-1.329-0.636-2.533-1.488-3.585-2.54-0.671-0.671-1.261-1.404-1.766-2.192zM24.192 26.192c-1.052 1.052-2.256 1.904-3.585 2.54 0.967-1.285 1.771-2.896 2.354-4.732h2.997c-0.504 0.788-1.094 1.521-1.766 2.192z");
  //
  //   menu.append("path")
  //       .attr("class", "nav-icon")
  //       .attr("stroke", "grey")
  //       .attr("fill", "grey")
  //       .attr("stroke-width", 1)
  //       .attr("transform", "translate(11, 75)")
  //       .attr("d", "M14 4v-0.5c0-0.825-0.675-1.5-1.5-1.5h-5c-0.825 0-1.5 0.675-1.5 1.5v0.5h-6v4h6v0.5c0 0.825 0.675 1.5 1.5 1.5h5c0.825 0 1.5-0.675 1.5-1.5v-0.5h18v-4h-18zM8 8v-4h4v4h-4zM26 13.5c0-0.825-0.675-1.5-1.5-1.5h-5c-0.825 0-1.5 0.675-1.5 1.5v0.5h-18v4h18v0.5c0 0.825 0.675 1.5 1.5 1.5h5c0.825 0 1.5-0.675 1.5-1.5v-0.5h6v-4h-6v-0.5zM20 18v-4h4v4h-4zM14 23.5c0-0.825-0.675-1.5-1.5-1.5h-5c-0.825 0-1.5 0.675-1.5 1.5v0.5h-6v4h6v0.5c0 0.825 0.675 1.5 1.5 1.5h5c0.825 0 1.5-0.675 1.5-1.5v-0.5h18v-4h-18v-0.5zM8 28v-4h4v4h-4z");
  //
  //   menu.append("path")
  //       .attr("class", "nav-icon")
  //       .attr("stroke", "grey")
  //       .attr("fill", "grey")
  //       .attr("stroke-width", 1)
  //       .attr("transform", "translate(11, 128)")
  //       .attr("d", "M16 0c-8.837 0-16 2.239-16 5v4c0 2.761 7.163 5 16 5s16-2.239 16-5v-4c0-2.761-7.163-5-16-5 M16 17c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5 M16 26c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z");
  //
  //   menu.append("path")
  //       .attr("class", "nav-icon")
  //       .attr("stroke", "grey")
  //       .attr("fill", "grey")
  //       .attr("stroke-width", 1)
  //       .attr("transform", "translate(11, 181)")
  //       .attr("d", "M16 0c-8.837 0-16 2.239-16 5v3l12 12v10c0 1.105 1.791 2 4 2s4-0.895 4-2v-10l12-12v-3c0-2.761-7.163-5-16-5zM2.95 4.338c0.748-0.427 1.799-0.832 3.040-1.171 2.748-0.752 6.303-1.167 10.011-1.167s7.262 0.414 10.011 1.167c1.241 0.34 2.292 0.745 3.040 1.171 0.494 0.281 0.76 0.519 0.884 0.662-0.124 0.142-0.391 0.38-0.884 0.662-0.748 0.427-1.8 0.832-3.040 1.171-2.748 0.752-6.303 1.167-10.011 1.167s-7.262-0.414-10.011-1.167c-1.24-0.34-2.292-0.745-3.040-1.171-0.494-0.282-0.76-0.519-0.884-0.662 0.124-0.142 0.391-0.38 0.884-0.662z");
  //
  //   menu.append("path")
  //       .attr("class", "nav-icon")
  //       .attr("stroke", "grey")
  //       .attr("fill", "grey")
  //       .attr("stroke-width", 1)
  //       .attr("transform", "translate(11, 234)")
  //       .attr("d", "M27 22c-1.411 0-2.685 0.586-3.594 1.526l-13.469-6.734c0.041-0.258 0.063-0.522 0.063-0.791s-0.022-0.534-0.063-0.791l13.469-6.734c0.909 0.94 2.183 1.526 3.594 1.526 2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5c0 0.269 0.022 0.534 0.063 0.791l-13.469 6.734c-0.909-0.94-2.183-1.526-3.594-1.526-2.761 0-5 2.239-5 5s2.239 5 5 5c1.411 0 2.685-0.586 3.594-1.526l13.469 6.734c-0.041 0.258-0.063 0.522-0.063 0.791 0 2.761 2.239 5 5 5s5-2.239 5-5c0-2.761-2.239-5-5-5z");
  //
  //
  //   menu.append("path")
  //       .attr("class", "nav-icon")
  //       .attr("id", "locked")
  //       .attr("visibility", "hidden")
  //       .attr("stroke", "grey")
  //       .attr("fill", "grey")
  //       .attr("stroke-width", 1)
  //       .attr("transform", "translate(11, " + (windowHeight - 46) + ")")
  //       .attr("d", "M18.5 13h-0.5v-6c0-3.308-2.692-6-6-6h-4c-3.308 0-6 2.692-6 6v6h-0.5c-0.825 0-1.5 0.675-1.5 1.5v15c0 0.825 0.675 1.5 1.5 1.5h17c0.825 0 1.5-0.675 1.5-1.5v-15c0-0.825-0.675-1.5-1.5-1.5zM6 7c0-1.103 0.897-2 2-2h4c1.103 0 2 0.897 2 2v6h-8v-6z");
  //
  //   menu.append("path")
  //       .attr("class", "nav-icon")
  //       .attr("id", "unlocked")
  //       .attr("stroke", "grey")
  //       .attr("fill", "grey")
  //       .attr("stroke-width", 1)
  //       .attr("transform", "translate(11, " + (windowHeight - 46) + ")")
  //       .attr("d", "M24 1c3.308 0 6 2.692 6 6v6h-4v-6c0-1.103-0.897-2-2-2h-4c-1.103 0-2 0.897-2 2v6h0.5c0.825 0 1.5 0.675 1.5 1.5v15c0 0.825-0.675 1.5-1.5 1.5h-17c-0.825 0-1.5-0.675-1.5-1.5v-15c0-0.825 0.675-1.5 1.5-1.5h12.5v-6c0-3.308 2.692-6 6-6h4z");
  //
  //   $("#unlocked").on("click", function() {
  //     $("#unlocked").attr("visibility", "hidden");
  //     $("#locked").attr("visibility", "visible");
  //     locked = true;
  //   });
  //
  //   $("#locked").on("click", function() {
  //     $("#locked").attr("visibility", "hidden");
  //     $("#unlocked").attr("visibility", "visible");
  //     locked = false;
  //   });
  // };
  //
  // drawMenu();

};// End of 'Draw Graph' function.

// A function that defines how to draw the circles.
function drawCircles(svg, circleData, radiusMax, theYear, topMargin, leftMargin) {

  var overCountry  = false;

  circleData.sort(function(a, b) {
    return b.r - a.r;
  });

  // Looping through the array of 'Country Objects' provided.
  for (var i = 0; i < circleData.length; i++) {

    // Appending the 'Country Object' as a circle onto the graph.
    svg.append("circle")
       .attr("class", "countryCircle")
       .attr("id", circleData[i].code)
       .attr("cx", (leftMargin + radiusMax + (circleData[i].x)))
       .attr("cy", (topMargin + radiusMax + (circleData[i].y)))
       .attr("r", circleData[i].r)
       .attr("fill", circleData[i].colour);

  };// End of FOR loop.

  $(".countryCircle").mouseover(function(event) {
    overCountry = true;
    $(this).css('cursor', 'pointer');
    $(this).css('stroke-width', 3);
    // $(this).attr('r', (this.r.animVal.value * 1.2));
  });

  $(".countryCircle").mouseout(function(event) {
    overCountry = false;
    $(this).css('stroke-width', 1.5);
  });

};// End of 'Draw Circles' function.
