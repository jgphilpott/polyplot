// Creating a scale function for the circle radius.
function RScale() {
  return d3.scaleLinear()
           .domain([rDataMin, rDataMax])
           .range([radiusMin, radiusMax]);
};// End of radius scale function.

// Creating a scale function for the X axis.
function XScale() {
  return d3.scaleLinear()
           .domain([xDataMin - ((xDataMax - xDataMin) * 0.01), xDataMax + ((xDataMax - xDataMin) * 0.01)])
           .range([0, (windowWidth - rightMargin - leftMargin)]);
};// End of X axis scale function.

// Creating a scale function for the Y axis.
function YScale() {
  return d3.scaleLinear()
           .domain([yDataMin - ((yDataMax - yDataMin) * 0.01), yDataMax + ((xDataMax - xDataMin) * 0.01)])
           .range([(windowHeight - topMargin - bottomMargin), 0]);
};// End of Y axis scale function.

// Creating a function to scale the organized 'Graph Data'.
function scaleAllData() {

  // Creating the 'Scaled Graph Data' array to store the result of the following operations.
  scaledGraphData = [];

  // Storing the scaling functions into global variables.
  rScale = RScale();
  xScale = XScale();
  yScale = YScale();

  // Looping over the 'Graph Data' array.
  for (var i = 0; i < graphData.length; i++) {

    // Creating the 'Country Objects' array to store the result of the following operations.
    var countryObjects = [];

    // Looping over the 'Country Objects' array at 'Graph Data' array index (i).
    for (var j = 0; j < graphData[i].length; j++) {

      // Checking if the current 'Country Object' has any missing data points.
      if (graphData[i][j]["X"] !== "" && graphData[i][j]["R"] !== "" && graphData[i][j]["Y"] !== "") {

        // Pushing a new object into the 'Country Objects' array with scaled values.
        countryObjects.push({
          "Year": graphData[i][j]["Year"],
          "Code": graphData[i][j]["Code"],
          "Colour": graphData[i][j]["Colour"],
          "R": rScale(graphData[i][j]["R"]),
          "X": xScale(graphData[i][j]["X"]),
          "Y": yScale(graphData[i][j]["Y"])
        });// End of push.
      };// End of missing data check.
    };// End of 'Country Objects' loop.

    // Pushing 'Country Objects' array into Scaled Graph Data array.
    scaledGraphData.push(countryObjects);
  };// End of 'Graph Data' loop.
};// End of 'Scale All Data' function.
