// Creating a scale function for the circle radius.
function RScale() {

  // Setting the default radius range.
  var radiusMin = 7;
  var radiusMax = 70;

  // Returning the appropriate scaling function.
  return d3.scaleLinear()
           .domain([rDataMin, rDataMax])
           .range([radiusMin, radiusMax]);

};

// Creating a scale function for the X axis.
function XScale() {
  return d3.scaleLinear()
           .domain([xDataMin - ((xDataMax - xDataMin) * 0.01), xDataMax + ((xDataMax - xDataMin) * 0.01)])
           .range([0, (graphZoneWidth - rightMargin - leftMargin)]);
};

// Creating a scale function for the Y axis.
function YScale() {
  return d3.scaleLinear()
           .domain([yDataMin - ((yDataMax - yDataMin) * 0.01), yDataMax + ((xDataMax - xDataMin) * 0.01)])
           .range([(graphZoneHeight - topMargin - bottomMargin), 0]);
};

// Creating a scale function for the ‘First Year’ controller.
function firstYearS() {
  return d3.scaleLinear()
           .domain([1960, 2014])
           .range([151, (graphWidth - 233)]);
};

// Creating a scale function for the 'Current Year’ controller.
function currentYearS() {
  return d3.scaleLinear()
           .domain([1960, 2014])
           .range([178, (graphWidth - 206)]);
};

// Creating a scale function for the 'Last Year’ controller.
function lastYearS() {
  return d3.scaleLinear()
           .domain([1960, 2014])
           .range([205, (graphWidth - 179)]);
};

// Creating a function to scale the organized 'Graph Data'.
function scaleAllData(newDomain) {

  // Checking if the ‘New Domain’ variable is true...
  // This will only be the case if the ‘First Year’ or ‘Last Year’ variables have been changed by the user with the time controls...
  // This block will not run on ‘Initial Setup’.
  if (newDomain) {

    // Clearing all the min/max variables.
    rDataMax = undefined;
    rDataMin = undefined;
    xDataMax = undefined;
    xDataMin = undefined;
    yDataMax = undefined;
    yDataMin = undefined;

    // Looping over the ‘Graph Data’ array.
    for (var i = 0; i < graphData.length; i++) {

      // Looping over each index of the ‘Graph Data’ array.
      for (var j = 0; j < graphData[i].length; j++) {

        // Checking if the current ‘Country Object’ is within the new domain.
        if (graphData[i][j]["Year"] >= firstYear && graphData[i][j]["Year"] <= lastYear) {

          // The following code block is used to assign the 'R Data Max' variable.
          if (rDataMax !== undefined && graphData[i][j]["R"] !== "" && graphData[i][j]["R"] > rDataMax) {
            rDataMax = graphData[i][j]["R"];
          } else if (rDataMax === undefined && graphData[i][j]["R"] !== "") {
            rDataMax = graphData[i][j]["R"];
          };

          // The following code block is used to assign the 'R Data Min' variable.
          if (rDataMin !== undefined && graphData[i][j]["R"] !== "" && graphData[i][j]["R"] < rDataMin) {
            rDataMin = graphData[i][j]["R"];
          } else if (rDataMin === undefined && graphData[i][j]["R"] !== "") {
            rDataMin = graphData[i][j]["R"];
          };

          // The following code block is used to assign the 'X Data Max' variable.
          if (xDataMax !== undefined && graphData[i][j]["X"] !== "" && graphData[i][j]["X"] > xDataMax) {
            xDataMax = graphData[i][j]["X"];
          } else if (xDataMax === undefined && graphData[i][j]["X"] !== "") {
            xDataMax = graphData[i][j]["X"];
          };

          // The following code block is used to assign the 'X Data Min' variable.
          if (xDataMin !== undefined && graphData[i][j]["X"] !== "" && graphData[i][j]["X"] < xDataMin) {
            xDataMin = graphData[i][j]["X"];
          } else if (xDataMin === undefined && graphData[i][j]["X"] !== "") {
            xDataMin = graphData[i][j]["X"];
          };

          // The following code block is used to assign the 'Y Data Max' variable.
          if (yDataMax !== undefined && graphData[i][j]["Y"] !== "" && graphData[i][j]["Y"] > yDataMax) {
            yDataMax = graphData[i][j]["Y"];
          } else if (yDataMax === undefined && graphData[i][j]["Y"] !== "") {
            yDataMax = graphData[i][j]["Y"];
          };

          // The following code block is used to assign the 'Y Data Min' variable.
          if (yDataMin !== undefined && graphData[i][j]["Y"] !== "" && graphData[i][j]["Y"] < yDataMin) {
            yDataMin = graphData[i][j]["Y"];
          } else if (yDataMin === undefined && graphData[i][j]["Y"] !== "") {
            yDataMin = graphData[i][j]["Y"];
          };
        };// End of year check.
      };// End of 'Graph Data' index loop.
    };// end of 'Graph Data' loop.
  };// End of 'New Domain' check.

  // Creating the 'Scaled Graph Data' array to store the result of the following operations.
  scaledGraphData = [];

  // Storing the scaling functions into variables.
  rScale = RScale();
  xScale = XScale();
  yScale = YScale();
  firstYearScale = firstYearS();
  currentYearScale = currentYearS();
  lastYearScale = lastYearS();

  // Looping over the 'Graph Data' array.
  for (var i = 0; i < graphData.length; i++) {

    // Creating the 'Country Objects' array to store the result of the following operations.
    var countryObjects = [];

    // Looping over the 'Graph Data' array index.
    for (var j = 0; j < graphData[i].length; j++) {

      // Checking if the current 'Country Object' has any missing data points and is within the date range.
      if (graphData[i][j]["X"] !== "" && graphData[i][j]["R"] !== "" && graphData[i][j]["Y"] !== "" && graphData[i][j]["Year"] >= firstYear && graphData[i][j]["Year"] <= lastYear) {

        // Pushing a new object into the 'Country Objects' array with scaled values.
        countryObjects.push({
          "Year": graphData[i][j]["Year"],
          "Name": graphData[i][j]["Name"],
          "Code": graphData[i][j]["Code"],
          "Region": graphData[i][j]["Region"],
          "Colour": graphData[i][j]["Colour"],
          "R": rScale(graphData[i][j]["R"]),
          "X": xScale(graphData[i][j]["X"]),
          "Y": yScale(graphData[i][j]["Y"])
        });
      };// End of missing data check.
    };// End of 'Graph Data' index loop.

    // Pushing the 'Country Objects' array into 'Scaled Graph Data' array.
    scaledGraphData.push(countryObjects);

  };// End of 'Graph Data' loop.
};// End of 'Scale All Data' function.
