function drawChart(svg, windowWidth, windowHeight, topMargin, rightMargin, bottomMargin, leftMargin, xAxisScale, yAxisScale) {

  //Appending the X Gridlines
  svg.append("g")
     .attr("class", "grid")
     .attr("transform", "translate("+ leftMargin +"," + (windowHeight - bottomMargin) + ")")
     .call(d3.axisBottom(xAxisScale)
             .tickSize( -(windowHeight - topMargin - bottomMargin) )
             .tickFormat("")
             .ticks(5));

  //Appending the Y Gridlines
  svg.append("g")
     .attr("class", "grid")
     .attr("transform", "translate("+ leftMargin +", "+ topMargin +")")
     .call(d3.axisLeft(yAxisScale)
             .tickSize( -(windowWidth - leftMargin - rightMargin) )
             .tickFormat("")
             .ticks(5));

  //Appending the X Axis
  svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate("+ leftMargin +", "+ (windowHeight - bottomMargin) +")")
     .call(d3.axisBottom(xAxisScale)
             .ticks(10));

  //Appending the Y Axis
  svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate("+ leftMargin +", "+ topMargin +")")
     .call(d3.axisLeft(yAxisScale)
             .ticks(10));

};
