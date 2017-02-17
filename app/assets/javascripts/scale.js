// Creating a scale function for the circle radius.
function radiusS(minData, maxData, radiusMin, radiusMax) {
  return d3.scaleLinear()
           .domain([minData, maxData])
           .range([radiusMin, radiusMax]);
};// End of radius scale function.

// Creating a scale function for the circle X.
function xCircleS(minData, maxData, windowWidth, rightMargin, leftMargin, radiusMax) {
  return d3.scaleLinear()
           .domain([minData, maxData])
           .range([0, ((windowWidth - rightMargin - leftMargin) - (radiusMax * 2))]);
};// End of X circle scale function.

// Creating a scale function for the circle Y.
function yCircleS(minData, maxData, windowHeight, topMargin, bottomMargin, radiusMax) {
  return d3.scaleLinear()
           .domain([minData, maxData])
           .range([((windowHeight - topMargin - bottomMargin) - (radiusMax * 2)), 0]);
};// End of Y circle scale function.

// Creating a scale function for the X Axis.
function xAxisS(minData, maxData, windowWidth, rightMargin, leftMargin) {
  return d3.scaleLinear()
           .domain([minData, maxData])
           .range([0, (windowWidth - rightMargin - leftMargin)]);
};// End of X axis scale function.

// Creating a scale function for the Y Axis.
function yAxisS(minData, maxData, windowHeight, topMargin, bottomMargin) {
  return d3.scaleLinear()
           .domain([minData, maxData])
           .range([(windowHeight - topMargin - bottomMargin), 0]);
};// End of Y axis scale function.

// A function to scale, filter and reformat the selected datasets...
// Within the specified date range.
function scaleDrawData(rData, xData, yData, rScale, xCircleScale, yCircleScale, firstYear, lastYear, currentYear) {

  // Array for storing the new ‘Country Objects’ to be created.
  var newData = [];

  // Looping over the existing array of ‘Country Objects’.
  for (var i = 0; i < rData.length; i++) {

    // Only add this (i) ‘Country Object’ to the 'New Data' array IF there are no missing data values.
    if ((rData[i][currentYear] !== "" && xData[i][currentYear] !== "" && yData[i][currentYear] !== "") && (rData[i][lastYear] !== "" && xData[i][lastYear] !== "" && yData[i][lastYear] !== "")) {

      // Creating a new ‘Country Object’ with scaled data from each dataset...
      // Pushing it onto the ‘New Data’ array.
      newData.push({
        "year": currentYear,
        "code": rData[i]["Country Code"],
        "colour": rData[i]["Colour"],
        "r": rScale(rData[i][currentYear]),
        "x": xCircleScale(xData[i][currentYear]),
        "y": yCircleScale(yData[i][currentYear])
      });// End of push.
    };// End of missing data check.
  };// End of country loop.

  return newData;

};// End of 'Scale Draw Data' function.

// A function to format the data for animation.
function scaleAnimationData(rData, xData, yData, rScale, xCircleScale, yCircleScale, firstYear, lastYear, currentYear) {

  // An array for storing the animation data for each 'Country Object'.
  var newData = [];

  // Looping over the existing array of ‘Country Objects’.
  for (var i = 0; i < rData.length; i++) {

    // An array for storing the animation data for each year.
    var data = [];

    // Only generate animation data if information is available for the 'Current Year' and 'Last Year'.
    if ((rData[i][currentYear] !== "" && xData[i][currentYear] !== "" && yData[i][currentYear] !== "") && (rData[i][lastYear] !== "" && xData[i][lastYear] !== "" && yData[i][lastYear] !== "")) {

      // Loop over each year for this (i) ‘Country Object’.
      for (var y = currentYear; y <= lastYear; y++) {

        // If no data is missing for the current year (y) then add a new object to the 'Data' array.
        if ((rData[i][y] !== "" && xData[i][y] !== "" && yData[i][y] !== "")) {
          data.push({
            "year": y,
            "code": rData[i]["Country Code"],
            "r": rScale(rData[i][y]),
            "x": xCircleScale(xData[i][y]),
            "y": yCircleScale(yData[i][y])
          });// End of push.
        };// End of missing data check.
      };// End of year loop.

      // Pushing the ‘Data’ array into the ‘New Data’ array.
      newData.push(data);
    };// End of country loop.

  };// End of country loop.

  return newData;

};// End of 'Scale Animation Data' function.
