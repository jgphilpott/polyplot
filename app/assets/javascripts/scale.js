// Creating a scale function for the circle radius.
function rScale() {
  return d3.scaleLinear()
           .domain([rDataMin, rDataMax])
           .range([radiusMin, radiusMax]);
};// End of radius scale function.

// Creating a scale function for the X axis.
function xScale() {
  return d3.scaleLinear()
           .domain([xDataMin, xDataMax])
           .range([0, (windowWidth - rightMargin - leftMargin - (radiusMax * 2))]);
};// End of X axis scale function.

// Creating a scale function for the Y axis.
function yScale() {
  return d3.scaleLinear()
           .domain([yDataMin, yDataMax])
           .range([(windowHeight - topMargin - bottomMargin - (radiusMax * 2)), 0]);
};// End of Y axis scale function.

// Creating a function to scale the organized 'Graph Data'.
function scaleAllData() {

  // Creating the 'Scaled Graph Data' array to store the result of the following operations.
  scaledGraphData = [];

  // Storing the scaling functions into local variables.
  var RScale = rScale();
  var XScale = xScale();
  var YScale = yScale();

  // Looping over the 'Graph Data' array.
  for (var i = 0; i < graphData.length; i++) {

    // Creating the 'Country Objects' array to store the result of the following operations.
    var countryObjects = [];

    // Looping over the 'Country Objects' array at 'Graph Data' array index (i).
    for (var j = 0; j < graphData[i].length; j++) {

      // Pushing a new object into the 'Country Objects' array with scaled values.
      countryObjects.push({
        "Year": graphData[i][j]["Year"],
        "Code": graphData[i][j]["Code"],
        "Colour": graphData[i][j]["Colour"],
        "R": RScale(graphData[i][j]["R"]),
        "X": XScale(graphData[i][j]["X"]),
        "Y": YScale(graphData[i][j]["Y"])
      });// End of push.

    };// End of 'Country Objects' loop.

    // Pushing 'Country Objects' array into Scaled Graph Data array.
    scaledGraphData.push(countryObjects);
  };// End of 'Graph Data' loop.
};// End of 'Scale All Data' function.
