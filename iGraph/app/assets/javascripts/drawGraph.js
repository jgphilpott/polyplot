function drawChart(svg, topMargin, rightMargin, bottomMargin, leftMargin, xAxisScale, yAxisScale, windowWidth, windowHeight, xGridlines, yGridlines) {

  //Appending the X Gridlines
  svg.append("g")
     .attr("class", "grid")
     .attr("transform", "translate("+ leftMargin +"," + (windowHeight - bottomMargin) + ")")
     .call(xGridlines()
     .tickSize( -(windowHeight - topMargin - bottomMargin) )
     .tickFormat(""));

  //Appending the Y Gridlines
  svg.append("g")
     .attr("class", "grid")
     .attr("transform", "translate("+ leftMargin +", "+ topMargin +")")
     .call(yGridlines()
     .tickSize( -(windowWidth - leftMargin - rightMargin) )
     .tickFormat(""));
     
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
