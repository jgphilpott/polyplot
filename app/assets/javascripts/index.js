// Only loads JavaScript once DOM is ready.
$(document).on('ready', function() {

  // 'Initial Setup' function.
  function initialSetup() {

    // Saving Window Width and Height Variables.
    windowWidth = windowW();
    windowHeight = windowH() - 3.51;// The Minus 3.51 Removes the Scroll Bars (any number greater than 3.5 works).

    // Appending an SVG Container equal to Window Width and Height.
    fullScreen  = d3.select("body").append("svg").attr("width", windowWidth).attr("height", windowHeight);

    // Saving Margin Variables.
    topMargin = topM();
    rightMargin = rightM();
    bottomMargin = bottomM();
    leftMargin = leftM();

    // Saving Graph Dimensions.
    graphWidth = windowWidth - leftMargin - rightMargin;
    graphHeight = windowHeight - topMargin - bottomMargin;

    // Retrieving and organizing the currently selected datasets.
    getData();

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
    drawGraph(svg, windowWidth, windowHeight, topMargin, rightMargin, bottomMargin, leftMargin, xScale, yScale, xAxisLabel, yAxisLabel, graphWidth, graphHeight);

    // Calling the function that draws the circles 'Country Objects'.
    drawCircles(svg, drawData, radiusMax, currentYear, topMargin, leftMargin);

    // Calling the function that initiates the animation.
    // animate(svg, animationData, speed, topMargin, leftMargin, radiusMax);

  };// End of 'Initial Setup' function.

  // Adjusting for Window Resize.
  $(window).resize(function(){
    $("svg").remove();
    initialSetup();
  });

  // Calling 'Initial Setup' function.
  initialSetup();

});// End of file.
