// A function for animating the ‘Country Objects’ along their defined paths.
function animateGraph(direction, currentSpeed) {

  // Indicating that an animation is in process.
  animatingGraph = true;

  // This function will generate a unique path for each ‘Country Objects’ array it is passed.
  var pathGenerator = d3.line()
                    .x(function(d) { return d.X; })
                    .y(function(d) { return d.Y; })
                    .curve(d3.curveLinear);

  // Creating the ‘Path Data’ array to store the result of the following operations.
  var pathData = [];

  // Looping over the 'Scaled Graph Data' array.
  for (var i = 0; i < scaledGraphData.length; i++) {

    // Creating the ‘Country Objects’ array to store the result of the following operation.
    var countryObjects = [];

    // Looping over each index of the 'Scaled Graph Data' array.
    for (var j = 0; j < scaledGraphData[i].length; j++) {

      // Checking the direction of animation.
      if (direction === "FORWARD") {

        // Checking if the current ‘Country Object’ matches the current year...
        // And that the proceeding ‘Country Object’ both exists and matches the following year.
        if (scaledGraphData[i][j]["Year"] === currentYear && scaledGraphData[i][j + 1] && scaledGraphData[i][j + 1]["Year"] === currentYear + 1) {

          // Pushing the current and proceeding ‘Country Objects’ into the ‘Country Objects’ array.
          countryObjects.push(scaledGraphData[i][j]);
          countryObjects.push(scaledGraphData[i][j + 1]);

          // Pushing the ‘Country Objects’ array into the ‘Path Data’ array.
          pathData.push(countryObjects);

          // Breaking the 'Scaled Graph Data' index loop.
          break;

        // Checking if the current ‘Country Object’ matches the current year...
        // But the proceeding ‘Country Object’ doesn’t match the following year.
        } else if (scaledGraphData[i][j]["Year"] === currentYear && scaledGraphData[i][j + 1] && scaledGraphData[i][j + 1]["Year"] !== currentYear + 1) {

          // In this case remove the corresponding ‘Country Circle’ because data is missing for it’s path.
          $("#" + scaledGraphData[i][0].Code + ".country-circle").remove();

        };// End of matching year check.

        // The following code block follows the same pattern, but for backward animation.

      } else if (direction === "BACKWARD") {

        if (scaledGraphData[i][j]["Year"] === currentYear && scaledGraphData[i][j - 1] && scaledGraphData[i][j - 1]["Year"] === currentYear - 1) {

          countryObjects.push(scaledGraphData[i][j]);
          countryObjects.push(scaledGraphData[i][j - 1]);
          pathData.push(countryObjects);
          break;

        } else if (scaledGraphData[i][j]["Year"] === currentYear && scaledGraphData[i][j - 1] && scaledGraphData[i][j - 1]["Year"] !== currentYear - 1) {

          $("#" + scaledGraphData[i][0].Code + ".country-circle").remove();

        };
      };// End of direction check.
    };// End of 'Scaled Graph Data' index loop.
  };// End of 'Scaled Graph Data' loop.

  // Looping over the 'Path Data' array to generate a path for each ‘Country Object’.
  for (var i = 0; i < pathData.length; i++) {

    // Appending the paths to the 'Graph Area'.
    graphArea.append("path")
              .attr("class", "country-path")
              .attr("id", pathData[i][0].Code)
              .attr("d", pathGenerator(pathData[i]))
              .attr("fill", "none");

  };// End of 'Path Data' loop.

  // Looping over the 'Path Data' array to generate a transition for each ‘Country Object’.
  for (var i = 0; i < pathData.length; i++) {

    // Selecting the ‘Circle’ and 'Path' that correspond to the current 'Country Object' in our loop.
    var circle = d3.selectAll("#" + pathData[i][0].Code + ".country-circle");
    var path = d3.selectAll("#" + pathData[i][0].Code + ".country-path");

    // Initiating a transition for the current ‘Country Object’.
    circle.transition()
          .duration(currentSpeed)
          .ease(d3.easeLinear)
          .attr("r", pathData[i][1].R)
          .attrTween("transform", translate(path.node()));

    // This function defines how to animate along the given 'Path'.
    function translate(path) {

      // Determining the 'Length' of the given 'Path'.
      var length = path.getTotalLength();

      // Returns nested functions to be repeatedly executed throughout the duration of the animation.
      return function() {
        return function(time) {

          // ‘Time’ in this context is a float between 0 and 1...
          // It represents the amount of time since the animation began divided by the duration of the animation...
          // At the beginning of the animation ‘Time’ is 0 and at the end it is 1.

          // For each millisecond of the animation the current ‘Point’ can be determined by multiplying ‘Time’ and ‘Length’...
          // And referencing the result of that operation against our 'Path' data.
          var point = path.getPointAtLength(time * length);

          // These variables are simply used to rectify the coordinate offset.
          var xStart = path.getPointAtLength(0).x
          var yStart = path.getPointAtLength(0).y

          // Returning the appropriate coordinates.
          return "translate(" + (point.x - xStart) + ", " + (point.y - yStart) + ")";

        };// End of inner function.
      };// End of outer function.
    };// End of 'Translate' function.
  };// End of 'Path Data' loop.

  // Saving the 'Current Year Controller' and 'Current Year Label' into variables.
  var controller = d3.selectAll("#current-year-controller");
  var yearLabel = d3.selectAll(".current-year-label");

  // Checking the direction of animation.
  if (direction === "FORWARD") {

    // Initiating a transition for the 'Controller'.
    controller.transition()
              .duration(currentSpeed)
              .ease(d3.easeLinear)
              .attr("x", currentYearScale(currentYear + 1));

    // Initiating a transition for the 'Label'.
    yearLabel.transition()
              .duration(currentSpeed)
              .ease(d3.easeLinear)
              .attr("x", currentYearScale(currentYear + 1) + leftMargin + 13)
              .text(currentYear);


    // Incrementing the current year by one.
    currentYear = currentYear + 1;

    // Updating the controller position variable.
    currentYearControllerPosition = currentYearScale(currentYear) + leftMargin;

    // The following code block follows the same pattern, but for backward animation.

  } else if (direction === "BACKWARD") {

    controller.transition()
              .duration(currentSpeed)
              .ease(d3.easeLinear)
              .attr("x", currentYearScale(currentYear - 1));

    yearLabel.transition()
              .duration(currentSpeed)
              .ease(d3.easeLinear)
              .attr("x", currentYearScale(currentYear - 1) + leftMargin + 13)
              .text(currentYear);

    currentYear = currentYear - 1;
    currentYearControllerPosition = currentYearScale(currentYear) + leftMargin;

  };// End of direction check.
};// End of ‘Animate Graph’ function.

// A function to update the graph at the end of each forward animation cycle.
function animateForward() {

  // Checking if the curent year is not already the last year.
  if (currentYear !== lastYear) {

    // Removing and redrawing the graph.
    $(".graph-area").remove();
    drawCircles();

    // Calling the 'Animate Graph' function for the next animation cycle.
    animateGraph(forward, currentSpeed);

  // Else the ‘Current Year’ must equal the ‘Last Year’.
  } else {

    // Indicating the animation is now finished.
    animatingGraph = false;

    // Updating the controller position variable.
    currentYearControllerPosition = currentYearScale(currentYear) + leftMargin;

    // Updating the 'Current Year Label' text.
    $(".current-year-label").text(currentYear);

    // Toggling the play/pause buttons.
    $("#play-forward, #play-forward-background").css("visibility", "visible");
    $("#pause-one, #pause-one-background").css("visibility", "hidden");

    // Removing and redrawing the graph.
    $(".graph-area").remove();
    drawCircles();

    // Ending the animation interval.
    clearInterval(animationInterval);

  };// End of year check.
};// End of 'Animate Forward' function.

// A function to update the graph at the end of each backward animation cycle.
// This function follows the same pattern as the 'Animate Forward' function.
function animateBackward() {

  if (currentYear !== firstYear) {

    $(".graph-area").remove();
    drawCircles();
    animateGraph(backward, currentSpeed);

  } else {

    animatingGraph = false;
    currentYearControllerPosition = currentYearScale(currentYear) + leftMargin;

    $(".current-year-label").text(currentYear);

    $("#play-backward, #play-backward-background").css("visibility", "visible");
    $("#pause-two, #pause-two-background").css("visibility", "hidden");

    $(".graph-area").remove();
    drawCircles();

    clearInterval(animationInterval);

  };
};// End of 'Animate Backward' function.

// A function for stoping the animation.
function stopAnimatingGraph() {

  // Indicating the animation is now finished.
  animatingGraph = false;

  // Saving all the animating objects into a single variable.
  var stop = d3.selectAll(".country-circle, #current-year-controller, .current-year-label");

  // Calling a transition with a zero duration on all the animating objects.
  stop.transition()
      .duration(0);

  // Toggling the play/pause buttons.
  $("#pause-one, #pause-one-background, #pause-two, #pause-two-background").css("visibility", "hidden");
  $("#play-forward, #play-forward-background, #play-backward, #play-backward-background").css("visibility", "visible")

  // Ending the animation interval.
  clearInterval(animationInterval);

};// End of 'Stop Animating Graph' function.
