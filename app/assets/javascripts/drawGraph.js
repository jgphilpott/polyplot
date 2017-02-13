//A function that defines how to draw the chart.
function drawChart(svg, windowWidth, windowHeight, topMargin, rightMargin, bottomMargin, leftMargin, xAxisScale, yAxisScale) {

  //Appending the X Gridlines.
  svg.append("g")
     .attr("class", "grid")
     .attr("transform", "translate("+ leftMargin +"," + (windowHeight - bottomMargin) + ")")
     .call(d3.axisBottom(xAxisScale)
             .tickSize( -(windowHeight - topMargin - bottomMargin) )
             .tickFormat("")
             .ticks(5));

  //Appending the Y Gridlines.
  svg.append("g")
     .attr("class", "grid")
     .attr("transform", "translate("+ leftMargin +", "+ topMargin +")")
     .call(d3.axisLeft(yAxisScale)
             .tickSize( -(windowWidth - leftMargin - rightMargin) )
             .tickFormat("")
             .ticks(5));

  //Appending the X Axis.
  svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate("+ leftMargin +", "+ (windowHeight - bottomMargin) +")")
     .call(d3.axisBottom(xAxisScale)
             .ticks(10));

  //Appending the Y Axis.
  svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate("+ leftMargin +", "+ topMargin +")")
     .call(d3.axisLeft(yAxisScale)
             .ticks(10));

};//End of draw chart function.

//A function that defines how to draw the circles.
function drawCircles(svg, circleData, radiusMax, theYear, topMargin, leftMargin) {

  //Looping through the array of 'Country Objects' provided.
  for (var i = 0; i < circleData.length; i++) {

    //If the year for this (i) 'Country Object' is equal to the current year and no data is missing from the object...
    //Append the 'Country Object' as a circle onto the chart.
    if (circleData[i].year === theYear && (circleData[i].x !== "" && circleData[i].y !== "" && circleData[i].r !== "")) {
      svg.append("circle")
         .attr("class", "countryCircle")
         .attr("id", circleData[i].name)
         .attr("cx", (leftMargin + radiusMax + (circleData[i].x)))
         .attr("cy", (topMargin + radiusMax + (circleData[i].y)))
         .attr("r", circleData[i].r)
         .attr("fill", "red");
    };

  };//End of data loop.

};//End of draw circles function.
