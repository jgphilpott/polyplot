// Only loads JavaScript once DOM is ready.
$(document).on('ready', function() {

  // Main JS Function.
  function mainFunction() {

    // Saving Window Width and Height Variables.
    var windowWidth = windowW();
    var windowHeight = windowH() - 3.51;// The Minus 3.51 Removes the Scroll Bars (any number greater than 3.5 works).

    // Appending an SVG Container equal to Window Width and Height.
    var svg = d3.select("body").append("svg").attr("width", windowWidth).attr("height", windowHeight);

    // Saving Margin Variables.
    var topMargin = topM();
    var rightMargin = rightM();
    var bottomMargin = bottomM();
    var leftMargin = leftM();

    // The following AJAX requests retrieve a JSON blob using the dataset key variables...
    // These requests are synchronous because we can’t proceed without our data.

    // Retrieving JSON for the 'rData' dataset.
    $.ajax({
      url: "/data/" + rDataKey + ".json",
      method: "GET",
      dataType: "json",
      async: false
    }).done(function(data) {
      rData = data;
    }).fail(function() {
      console.log("Failed to retrieve the requested dataset for rData!");
    });

    // Retrieving JSON for the 'xData' dataset.
    $.ajax({
      url: "/data/" + xDataKey + ".json",
      method: "GET",
      dataType: "json",
      async: false
    }).done(function(data) {
      xData = data;
    }).fail(function() {
      console.log("Failed to retrieve the requested dataset for xData!");
    });

    // Retrieving JSON for the 'yData' dataset.
    $.ajax({
      url: "/data/" + yDataKey + ".json",
      method: "GET",
      dataType: "json",
      async: false
    }).done(function(data) {
      yData = data;
    }).fail(function() {
      console.log("Failed to retrieve the requested dataset for yData!");
    });

// A function for filtering the datasets will go here.

    // Finding the Min and Max values for the selected R, X and Y datasets...
    // To be passed to the scaling functions.
    var rDataMax = CheckMinMax(max, rData, firstYear, lastYear);
    var rDataMin = CheckMinMax(min, rData, firstYear, lastYear);
    var xDataMax = CheckMinMax(max, xData, firstYear, lastYear);
    var xDataMin = CheckMinMax(min, xData, firstYear, lastYear);
    var yDataMax = CheckMinMax(max, yData, firstYear, lastYear);
    var yDataMin = CheckMinMax(min, yData, firstYear, lastYear);

    // Saving the Scaling Functions into appropriate variables.
    var rScale = radiusS(rDataMin, rDataMax, radiusMin, radiusMax);
    var xCircleScale = xCircleS(xDataMin, xDataMax, windowWidth, rightMargin, leftMargin, radiusMax);
    var yCircleScale = yCircleS(yDataMin, yDataMax, windowHeight, topMargin, bottomMargin, radiusMax);
    var xScale = xAxisS(xDataMin, xDataMax, windowWidth, rightMargin, leftMargin);
    var yScale = yAxisS(yDataMin, yDataMax, windowHeight, topMargin, bottomMargin);

    // A function to scale, filter and reformat the selected datasets...
    // Within the specified date range.
    var drawData = scaleDrawData(rData, xData, yData, rScale, xCircleScale, yCircleScale, firstYear, lastYear, currentYear);

    // A function to format the data for animation.
    var animationData = scaleAnimationData(rData, xData, yData, rScale, xCircleScale, yCircleScale, firstYear, lastYear, currentYear);

    // Calling the function that draws the graph.
    drawGraph(svg, windowWidth, windowHeight, topMargin, rightMargin, bottomMargin, leftMargin, xScale, yScale);

    // Calling the function that draws the circles 'Country Objects'.
    drawCircles(svg, drawData, radiusMax, currentYear, topMargin, leftMargin);

    // Calling the function that initiates the animation.
    animate(svg, animationData, speed, topMargin, leftMargin, radiusMax);

  };// End of Main Function.

  // Adjusting for Window Resize.
  $(window).resize(function(){
    $("svg").remove();
    mainFunction();
  });

  // Calling the Main Function.
  mainFunction();

});// End of file.
