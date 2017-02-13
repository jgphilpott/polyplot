//Creating a scale function for the X Axis
function xAxisScale(data, windowWidth, rightMargin, leftMargin) {
  return d3.scaleLinear()
           .domain([0, d3.max(data, function(d) { return d; })])
           .range([0, (windowWidth - rightMargin - leftMargin)]);
};

//Creating a scale function for the Y Axis
function yAxisScale(data, windowHeight, topMargin, bottomMargin) {
  return d3.scaleLinear()
           .domain([0, d3.max(data, function(d) { return d; })])
           .range([(windowHeight - topMargin - bottomMargin), 0]);
};
