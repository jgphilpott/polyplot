// A function for animating the ‘Country Objects’ along their defined paths.
function animateGraph(direction) {

  animatingGraph = true;

  // This function will generate a unique path for each ‘Country Objects’ array it is passed.
  var generator = d3.line()
                    .x(function(d) { return d.X; })
                    .y(function(d) { return d.Y; })
                    .curve(d3.curveCatmullRom);

  pathData = [];

  for (var i = 0; i < scaledGraphData.length; i++) {

    var countryObjects = [];

    for (var j = 0; j < scaledGraphData[i].length; j++) {
      if (direction === "FORWARD") {

        if (scaledGraphData[i][j]["Year"] === currentYear && scaledGraphData[i][scaledGraphData[i].length - 1]["Year"] === lastYear) {
          for (var k = j; k < scaledGraphData[i].length; k++) {
            countryObjects.push(scaledGraphData[i][k]);
          };
          pathData.push(countryObjects);
          break;
        } else if (scaledGraphData[i][j]["Year"] === currentYear && scaledGraphData[i][scaledGraphData[i].length - 1]["Year"] !== lastYear) {
          $("#" + scaledGraphData[i][0].Code + ".country-circle").remove();
        };

      } else if (direction === "BACKWARD") {

        if (scaledGraphData[i][j]["Year"] === currentYear && scaledGraphData[i][0]["Year"] === firstYear) {
          for (var k = j; k >= 0; k--) {
            countryObjects.push(scaledGraphData[i][k]);
          };
          pathData.push(countryObjects);
          break;
        } else if (scaledGraphData[i][j]["Year"] === currentYear && scaledGraphData[i][0]["Year"] !== firstYear) {
          $("#" + scaledGraphData[i][0].Code + ".country-circle").remove();
        };
      };
    };
  };

  // Looping over the given array of ‘Country Objects’ to generate a path for each.
  for (var i = 0; i < pathData.length; i++) {

    // Appending the paths to the SVG container.
    graphArea.append("path")
              .attr("class", "country-path")
              .attr("id", pathData[i][0].Code)
              .attr("d", generator(pathData[i]))
              .attr("stroke-width", 1)
              .attr("stroke", "black")
              .attr("fill", "none");

  };// End of country loop.

  // Looping over the array of countries.
  for (var i = 0; i < pathData.length; i++) {

    // Selecting the ‘Circle’ and 'Path' that correspond to the current 'Country Object' (i) in our loop.
    var country = d3.selectAll("#" + pathData[i][0].Code + ".country-circle");
    var path = d3.selectAll("#" + pathData[i][0].Code + ".country-path");

    if (direction === "FORWARD") {

      // Initiating an animation for the current ‘Country Object’.
      country.transition()
             .duration(speed * (lastYear - currentYear))
             .ease(d3.easeLinear)
             .attr("r", pathData[i][pathData[i].length - 1].R)
             .attrTween("transform", translate(path.node()));

    } else if (direction === "BACKWARD") {

      // Initiating an animation for the current ‘Country Object’.
      country.transition()
             .duration(speed * (currentYear - firstYear))
             .ease(d3.easeLinear)
             .attr("r", pathData[i][pathData[i].length - 1].R)
             .attrTween("transform", translate(path.node()));

    };

    // This function defines how to animate along the given 'Path'.
    function translate(path) {

      // Determining the 'Length' of the given path.
      var length = path.getTotalLength();

      // Returns nested functions to be repeatedly executed throughout the duration of the animation.
      return function() {
        return function(time) {

          // ‘Time’ in this context is an float between 0 and 1...
          // It represents the amount of time since the animation began divided by the duration of the animation...
          // At the beginning of the animation ‘Time’ is 0 and at the end it is 1.

          // For each millisecond of the animation the current ‘Point’ can be determined by multiplying ‘Time’ and ‘Length’...
          // And referencing the result of that operation against our path data.
          var point = path.getPointAtLength(time * length);

          // These variables are simply used to rectify the coordinate offset.
          var xStart = path.getPointAtLength(0).x
          var yStart =path.getPointAtLength(0).y

          // Returning the appropriate coordinates.
          return "translate(" + ((point.x) - xStart) + "," + ((point.y) - yStart) + ")";

        };// End of inner function.
      };//End of outer function.
    };// End of 'Translate' function.
  };// End of FOR loop.

  var controller = d3.selectAll("#current-year-controller");
  var yearLabel = d3.selectAll(".current-year-label");

  if (direction === "FORWARD") {

    controller.transition()
              .duration(speed * (lastYear - currentYear))
              .ease(d3.easeLinear)
              .attr("x", currentYearScale(lastYear));

    yearLabel.transition()
              .duration(speed * (lastYear - currentYear))
              .ease(d3.easeLinear)
              .attr("x", currentYearScale(lastYear) + leftMargin + 13)
              .text(currentYear);

  } else if (direction === "BACKWARD") {

    controller.transition()
              .duration(speed * (currentYear - firstYear))
              .ease(d3.easeLinear)
              .attr("x", currentYearScale(firstYear));

    yearLabel.transition()
              .duration(speed * (currentYear - firstYear))
              .ease(d3.easeLinear)
              .attr("x", currentYearScale(firstYear) + leftMargin + 13)
              .text(currentYear);

  };

  var currentYearIncrement = setInterval(increment, speed);

  function increment(){
    if (direction === "FORWARD") {
      if (currentYear < lastYear) {
        currentYear = currentYear + 1;
        currentYearControllerPosition = currentYearScale(currentYear) + leftMargin;
      } else {
        animatingGraph = false;
        clearInterval(currentYearIncrement);
        $(".graph-area").remove();
        drawCircles();
      };
    } else if (direction === "BACKWARD") {
      if (currentYear > firstYear) {
        currentYear = currentYear - 1;
        currentYearControllerPosition = currentYearScale(currentYear) + leftMargin;
      } else {
        animatingGraph = false;
        clearInterval(currentYearIncrement);
        $(".graph-area").remove();
        drawCircles();
      };
    };
  };

  $(".country-path").remove();

};// End of ‘Animate’ function.
