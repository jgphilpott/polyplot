// A function that defines how to draw the graph.
function drawGraph(svg, windowWidth, windowHeight, topMargin, rightMargin, bottomMargin, leftMargin, xAxisScale, yAxisScale, xAxisLabel, yAxisLabel) {

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

  // Adding Event Listener for Mousemove...
  // This is to create Guidelines and Tooltips.
  $("svg").mousemove(function(event) {

    // Checking if the mouse is within the graph area.
    if (event.pageX > leftMargin && event.pageX < (windowWidth - rightMargin) && event.pageY > topMargin && event.pageY < (windowHeight - bottomMargin)) {

      // Removing old Guidelines.
      $(".mouseGuide").remove();

      // Hiding cursor while over the graph area.
      $('body').css('cursor', 'none');

      // Adding Guideline for X.
      svg.append("line")
         .attr("class", "mouseGuide")
         .attr("x1", event.pageX)
         .attr("y1", topMargin)
         .attr("x2", event.pageX)
         .attr("y2", (windowHeight - bottomMargin));

      // Adding Guideline for Y.
      svg.append("line")
         .attr("class", "mouseGuide")
         .attr("x1", leftMargin)
         .attr("y1", event.pageY)
         .attr("x2", (windowWidth - rightMargin))
         .attr("y2", event.pageY);

    } else {

      // Removing old Guidelines.
      $(".mouseGuide").remove();

      // Restoring default cursor.
      $('body').css('cursor', 'default');

    };// End of Mouse location check.
  });// End of Mousemove Event Listener.
};// End of 'Draw Graph' function.

// A function that defines how to draw the circles.
function drawCircles(svg, circleData, radiusMax, theYear, topMargin, leftMargin) {

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
};// End of 'Draw Circles' function.
