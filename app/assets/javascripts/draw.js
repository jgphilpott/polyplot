// Calling a series of functions that will draw the graph, data points and user controls.
function drawAll() {
  drawGraph();
  drawGraphLabels();
  drawCircles();
  drawTimeControls();
};

// A function that defines how to draw the graph.
function drawGraph() {

  // Appending the X Gridlines.
  graphZone.append("g")
           .attr("class", "grid")
           .attr("transform", "translate(" + leftMargin + ", " + (graphZoneHeight - bottomMargin) + ")")
           .call(d3.axisBottom(xScale)
                   .tickSize( -(graphZoneHeight - topMargin - bottomMargin) )
                   .tickFormat("")
                   .ticks(5));

  // Appending the Y Gridlines.
  graphZone.append("g")
           .attr("class", "grid")
           .attr("transform", "translate(" + leftMargin + ", " + topMargin + ")")
           .call(d3.axisLeft(yScale)
                   .tickSize( -(graphZoneWidth - leftMargin - rightMargin) )
                   .tickFormat("")
                   .ticks(5));

  // Appending the X Axis.
  graphZone.append("g")
           .attr("class", "axis")
           .attr("transform", "translate(" + leftMargin + ", " + (graphZoneHeight - bottomMargin) + ")")
           .call(d3.axisBottom(xScale)
                   .ticks(10));

  // Appending the Y Axis.
  graphZone.append("g")
           .attr("class", "axis")
           .attr("transform", "translate(" + leftMargin + ", " + topMargin + ")")
           .call(d3.axisLeft(yScale)
                   .ticks(10));

};// End of 'Draw Graph' function.

function drawGraphLabels() {

  // Appending the 'Graph Title'.
  graphZone.append("text")
           .attr("class", "graph-title")
           .attr("x", (leftMargin + graphWidth/2))
           .attr("y",  "1em")
           .attr("dy", ".35em")
           .text("World Development Indicators");

  // Appending the graph 'Date Range' label.
  graphZone.append("text")
           .attr("class", "date-range")
           .attr("x", (leftMargin + graphWidth/2))
           .attr("y",  "2.5em")
           .attr("dy", ".35em")
           .text(firstYear + " - " + lastYear);

  // Appending 'Current Year Label'.
  graphZone.append("text")
           .attr("class", "current-year-label")
           .attr("x", currentYearScale(currentYear) + leftMargin + 13)
           .attr("y",  "70")
           .attr("dy", ".35em")
           .text(currentYear);

  // Appending X Axis Label.
  graphZone.append("text")
           .attr("class", "axis-label")
           .attr("id", "x-axis-label")
           .attr("x", (leftMargin + graphWidth/2))
           .attr("y",  (graphZoneHeight - bottomMargin/2))
           .attr("dy", ".35em")
           .text(xAxisLabel);

  // Appending Y Axis Label.
  graphZone.append("text")
           .attr("class", "axis-label")
           .attr("id", "y-axis-label")
           .attr("transform", "rotate(-90)")
           .attr("x", -(topMargin + graphHeight/2))
           .attr("y",  leftMargin/2)
           .attr("dy", ".35em")
           .text(yAxisLabel);

  $("#y-axis-label").mouseover(function() {
    $(this).css('cursor', 'vertical-text');
  });
};

// A function that defines how to draw the circles.
function drawCircles() {

  // Creating the 'Circle Data' array to store the result of the following operations.
  var circleData = [];

  // Appending a new SVG so that if a circles body extends over the graph area it will be cutoff, rather than obstructing the view.
  graphArea = graphZone.append("svg")
                       .attr("class", "graph-area")
                       .attr("width", graphWidth)
                       .attr("height", graphHeight)
                       .attr("x", leftMargin)
                       .attr("y", topMargin);

  // Looping over the 'Scaled Graph Data'.
  for (var i = 0; i < scaledGraphData.length; i++) {

    // Looping over each index of the 'Scaled Graph Data'.
    for (var j = 0; j < scaledGraphData[i].length; j++) {

      // Checking if the year of the current 'Country Object' matches the 'Current Year' variable.
      if (scaledGraphData[i][j]["Year"] === currentYear) {

        // Pushing the current 'Country Object' into the 'Circle Data' array.
        circleData.push(scaledGraphData[i][j]);
      };// End of matching year check.
    };// End of 'Country Objects' array loop.
  };// End of 'Scaled Graph Data' loop.

  // Sorting the 'Circle Data' by radius so that the larger circles get apended first.
  circleData.sort(function(a, b) {
    return b.R - a.R;
  });

  // Looping over the 'Circle Data' array.
  for (var i = 0; i < circleData.length; i++) {

    // Appending the 'Country Object' as a circle onto the graph.
    graphArea.append("circle")
             .attr("class", "country-circle")
             .attr("id", circleData[i].Code)
             .attr("cx", circleData[i].X)
             .attr("cy", circleData[i].Y)
             .attr("r", circleData[i].R)
             .attr("fill", circleData[i].Colour);

  };// End of FOR loop.

  // 'Mouse Over Country' is a Boolean variable used to check if the mouse is currently hovering over a country circle.
  var mouseOverCountry  = false;

  // Adding an event handler to change style properties of a country circle while the mouse is hovering over it.
  $(".country-circle").mouseover(function(event) {
    mouseOverCountry = true;
    $(this).css('cursor', 'pointer');
    $(this).css('stroke-width', 2.5);
  }).mouseout(function(event) {
    mouseOverCountry = false;
    $(this).css('stroke-width', 1.25);
  });

};// End of 'Draw Circles' function.

// A function that defines how to draw the time controls.
function drawTimeControls() {

    // Turning graph animation off by default .
    animatingGraph = false;

    var forwardSpeedModifier = 1;
    var backwardSpeedModifier = 1;
    var forward = "FORWARD";
    var backward = "BACKWARD";

  // Appending a new SVG to simplify the positioning of child elements.
  var timeControls = graphZone.append("svg")
                              .attr("class", "time-controls")
                              .attr("width", graphWidth)
                              .attr("height", 34)
                              .attr("x", leftMargin)
                              .attr("y", 75);

  // A function to define how to draw the 'Time Buttons'.
  function drawTimeButtons () {

    // Appending the skip backward button background.
    timeControls.append("circle")
                .attr("class", "time-button")
                .attr("id", "skip-backward-background")
                .attr("cx", 26)
                .attr("cy", 17)
                .attr("r", 16);

    // Appending the skip backward button.
    timeControls.append("path")
                .attr("class", "time-button")
                .attr("id", "skip-backward")
                .attr("transform", "translate(10, 1)")
                .attr("d", "M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13 M14 16l8-6v12 M10 10h4v12h-4v-12z");

    // Appending the play forward button background.
    timeControls.append("circle")
                .attr("class", "time-button")
                .attr("id", "play-forward-background")
                .attr("cx", 69)
                .attr("cy", 17)
                .attr("r", 16);

    // Appending the play forward button.
    timeControls.append("path")
                .attr("class", "time-button")
                .attr("id", "play-forward")
                .attr("transform", "translate(53, 1)")
                .attr("d", "M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM12 9l12 7-12 7z");

    // Appending the pause one button background.
    timeControls.append("circle")
                .attr("class", "time-button")
                .attr("id", "pause-one-background")
                .attr("cx", 69)
                .attr("cy", 17)
                .attr("r", 16);

    // Appending the pause one button.
    timeControls.append("path")
                .attr("class", "time-button")
                .attr("id", "pause-one")
                .attr("transform", "translate(53, 1)")
                .attr("d", "M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM10 10h4v12h-4zM18 10h4v12h-4z");

    // Appending the fast forward button background.
    timeControls.append("circle")
                .attr("class", "time-button")
                .attr("id", "fast-forward-background")
                .attr("cx", 112)
                .attr("cy", 17)
                .attr("r", 16);

    // Appending the fast forward button.
    timeControls.append("path")
                .attr("class", "time-button")
                .attr("id", "fast-forward")
                .attr("transform", "translate(96, 1)")
                .attr("d", "M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13z");

  // Appending the fast forward button arrow one.
  timeControls.append("path")
              .attr("class", "time-button")
              .attr("id", "fast-forward-arrow-one")
              .attr("transform", "translate(96, 1)")
              .attr("d", "M18 11l7 5-7 5z");

  // Appending the fast forward button arrow two.
  timeControls.append("path")
              .attr("class", "time-button")
              .attr("id", "fast-forward-arrow-two")
              .attr("transform", "translate(96, 1)")
              .attr("d", "M10 11l7 5-7 5z");

    // Appending the fast backward button background.
    timeControls.append("circle")
                .attr("class", "time-button")
                .attr("id", "fast-backward-background")
                .attr("cx", graphWidth - 113)
                .attr("cy", 17)
                .attr("r", 16);

    // Appending the fast backward button.
    timeControls.append("path")
                .attr("class", "time-button")
                .attr("id", "fast-backward")
                .attr("transform", "translate(" + (graphWidth - 129) + ", 1)")
                .attr("d", "M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13z");

  // Appending the fast backward button arrow one.
  timeControls.append("path")
              .attr("class", "time-button")
              .attr("id", "fast-backward-arrow-one")
              .attr("transform", "translate(" + (graphWidth - 129) + ", 1)")
              .attr("d", "M14 21l-7-5 7-5z");

  // Appending the fast backward button arrow two.
  timeControls.append("path")
              .attr("class", "time-button")
              .attr("id", "fast-backward-arrow-two")
              .attr("transform", "translate(" + (graphWidth - 129) + ", 1)")
              .attr("d", "M22 21l-7-5 7-5z");

    // Appending the play backward button background.
    timeControls.append("circle")
                .attr("class", "time-button")
                .attr("id", "play-backward-background")
                .attr("cx", graphWidth - 70)
                .attr("cy", 17)
                .attr("r", 16);

    // Appending the play backward button.
    timeControls.append("path")
                .attr("class", "time-button")
                .attr("id", "play-backward")
                .attr("transform", "translate(" + (graphWidth - 86) + ", 1)")
                .attr("d", "M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM20 23l-12-7 12-7z");

    // Appending the pause two button background.
    timeControls.append("circle")
                .attr("class", "time-button")
                .attr("id", "pause-two-background")
                .attr("cx", graphWidth - 70)
                .attr("cy", 17)
                .attr("r", 16);

    // Appending the pause two button.
    timeControls.append("path")
                .attr("class", "time-button")
                .attr("id", "pause-two")
                .attr("transform", "translate(" + (graphWidth - 86) + ", 1)")
                .attr("d", "M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM10 10h4v12h-4zM18 10h4v12h-4z");

    // Appending the skip forward button background.
    timeControls.append("circle")
                .attr("class", "time-button")
                .attr("id", "skip-forward-background")
                .attr("cx", graphWidth - 27)
                .attr("cy", 17)
                .attr("r", 16);

    // Appending the skip forward button.
    timeControls.append("path")
                .attr("class", "time-button")
                .attr("id", "skip-forward")
                .attr("transform", "translate(" + (graphWidth - 43) + ", 1)")
                .attr("d", "M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16zM16 29c7.18 0 13-5.82 13-13s-5.82-13-13-13-13 5.82-13 13 5.82 13 13 13 M18 16l-8-6v12 M22 10h-4v12h4v-12z");

    // Adding an event handler to style the 'Time Buttons' on mouse over.
    $(".time-button").mouseover(function() {

      // Changing the cursor to a pointer.
      $(this).css('cursor', 'pointer');

      // Checking which button the mouse is currently over using  the element ID.
      if (this.id === "skip-backward" || this.id === "skip-backward-background") {

        // Changing the button background the lightgrey.
        $("#skip-backward-background").css("fill", "lightgrey");

        // All of the following code blocks follow the same pattern.

      } else if (this.id === "play-forward" || this.id === "play-forward-background") {
        $("#play-forward-background").css("fill", "lightgrey");
      } else if (this.id === "fast-forward" || this.id === "fast-forward-background" || this.id === "fast-forward-arrow-one" || this.id === "fast-forward-arrow-two") {
        $("#fast-forward-background").css("fill", "lightgrey");
      } else if (this.id === "fast-backward" || this.id === "fast-backward-background" || this.id === "fast-backward-arrow-one" || this.id === "fast-backward-arrow-two") {
        $("#fast-backward-background").css("fill", "lightgrey");
      } else if (this.id === "play-backward" || this.id === "play-backward-background") {
        $("#play-backward-background").css("fill", "lightgrey");
      } else if (this.id === "skip-forward" || this.id === "skip-forward-background") {
        $("#skip-forward-background").css("fill", "lightgrey");
      } else if (this.id === "pause-one" || this.id === "pause-one-background") {
        $("#pause-one-background").css("fill", "lightgrey");
      } else if (this.id === "pause-two" || this.id === "pause-two-background") {
        $("#pause-two-background").css("fill", "lightgrey");
      } else {

        // If an appropriate ID is not found log an error.
        console.log("Error in time button event handeler!");
      };// End of 'Time Button' ID check.

    }).mouseout(function() {

      // Restoring the button background to white after the mouse leaves.
      $("#skip-backward-background, #play-forward-background, #pause-one-background, #fast-forward-background, #fast-backward-background, #play-backward-background, #pause-two-background, #skip-forward-background").css("fill", "white");

    });// End of 'Time Buttons' styleing event handler.

    // Adding an event handler for clicking the 'Skip Backward Time Button'.
    $("#skip-backward, #skip-backward-background").click(function() {

      if (animatingGraph) {

        var stop = d3.selectAll(".country-circle, #current-year-controller, .current-year-label");

        stop.transition()
            .duration(0);

        clearInterval(variableIncrement);

        animatingGraph = false;

      };

      // Checking if the 'Current Year' is already the 'First Year'.
      if (currentYear !== firstYear) {

        // Updating 'Current Year' variable.
        currentYear = firstYear;

        // Removing old elements.
        $(".year-control").remove();
        $(".time-line").remove();
        $(".graph-title").remove();
        $(".date-range").remove();
        $(".current-year-label").remove();
        $(".axis-label").remove();
        $(".country-circle").remove();

        // Redrawing elements.
        drawTimeControllers();
        drawGraphLabels();
        drawCircles();

      };// End of year check;

    });// End of event handler for 'Skip Backward Time Button'.

    // Adding an event handler for clicking the 'Play Forward Time Button'.
    $("#play-forward, #play-forward-background").click(function() {

      if (animatingGraph) {

        var stop = d3.selectAll(".country-circle, #current-year-controller, .current-year-label");

        stop.transition()
            .duration(0);

        clearInterval(variableIncrement);

        animatingGraph = false;

        $(".graph-area").remove();
        drawCircles();

      };

      $(".year-control").remove();
      $(".time-line").remove();

      drawTimeControllers();

      $("#play-forward, #play-forward-background").css("visibility", "hidden");
      $("#pause-one, #pause-one-background").css("visibility", "visible");
      $("#play-backward, #play-backward-background").css("visibility", "visible");
      $("#pause-two, #pause-two-background").css("visibility", "hidden");

      // Calling the 'Animate Graph' function
      animateGraph(forward);

    });// End of play forward event handler.

    $("#pause-one, #pause-one-background").click(function() {

      var stop = d3.selectAll(".country-circle, #current-year-controller, .current-year-label");

      stop.transition()
          .duration(0);

      clearInterval(variableIncrement);

      animatingGraph = false;

      $(".graph-area").remove();
      drawCircles();

      $("#play-forward, #play-forward-background").css("visibility", "visible");
      $("#pause-one, #pause-one-background").css("visibility", "hidden");
    });

    // Adding an event handler for clicking the 'Fast Forward Time Button'.
    $("#fast-forward, #fast-forward-background, #fast-forward-arrow-one, #fast-forward-arrow-two").click(function() {
      if (forwardSpeedModifier === 1) {

        forwardSpeedModifier = 1.5;
        backwardSpeedModifier = 1;

        $("#fast-forward-arrow-one").css({"stroke": "#3168C5", "fill": "#3168C5"});
        $("#fast-backward-arrow-one, #fast-backward-arrow-two").css({"stroke": "#009AC2", "fill": "#009AC2"});

        if (animatingGraph) {

          var stop = d3.selectAll(".country-circle, #current-year-controller, .current-year-label");

          stop.transition()
              .duration(0);

          clearInterval(variableIncrement);

          animatingGraph = false;

          $(".graph-area").remove();
          drawCircles();

          animateGraph(forward, forwardSpeedModifier);

        };

      } else if (forwardSpeedModifier === 1.5) {

        forwardSpeedModifier = 2;
        backwardSpeedModifier = 1;

        $("#fast-forward-arrow-two").css({"stroke": "#3168C5", "fill": "#3168C5"});

        if (animatingGraph) {

          var stop = d3.selectAll(".country-circle, #current-year-controller, .current-year-label");

          stop.transition()
              .duration(0);

          clearInterval(variableIncrement);

          animatingGraph = false;

          $(".graph-area").remove();
          drawCircles();

          animateGraph(forward, forwardSpeedModifier);

        };

      } else if (forwardSpeedModifier === 2) {

        forwardSpeedModifier = 1;
        backwardSpeedModifier = 1;

        $("#fast-forward-arrow-one, #fast-forward-arrow-two").css({"stroke": "#009AC2", "fill": "#009AC2"});

        if (animatingGraph) {

          var stop = d3.selectAll(".country-circle, #current-year-controller, .current-year-label");

          stop.transition()
              .duration(0);

          clearInterval(variableIncrement);

          animatingGraph = false;

          $(".graph-area").remove();
          drawCircles();

          animateGraph(forward, forwardSpeedModifier);

        };

      };
    });

    // Adding an event handler for clicking the 'Fast Backward Time Button'.
    $("#fast-backward, #fast-backward-background, #fast-backward-arrow-one, #fast-backward-arrow-two").click(function() {
      if (backwardSpeedModifier === 1) {

        backwardSpeedModifier = 1.5;
        forwardSpeedModifier = 1;

        $("#fast-backward-arrow-one").css({"stroke": "#3168C5", "fill": "#3168C5"});
        $("#fast-forward-arrow-one, #fast-forward-arrow-two").css({"stroke": "#009AC2", "fill": "#009AC2"});

        if (animatingGraph) {

          var stop = d3.selectAll(".country-circle, #current-year-controller, .current-year-label");

          stop.transition()
              .duration(0);

          clearInterval(variableIncrement);

          animatingGraph = false;

          $(".graph-area").remove();
          drawCircles();

          animateGraph(backward, backwardSpeedModifier);

        };

      } else if (backwardSpeedModifier === 1.5) {

        backwardSpeedModifier = 2;
        forwardSpeedModifier = 1;

        $("#fast-backward-arrow-two").css({"stroke": "#3168C5", "fill": "#3168C5"});

        if (animatingGraph) {

          var stop = d3.selectAll(".country-circle, #current-year-controller, .current-year-label");

          stop.transition()
              .duration(0);

          clearInterval(variableIncrement);

          animatingGraph = false;

          $(".graph-area").remove();
          drawCircles();

          animateGraph(backward, backwardSpeedModifier);

        };

      } else if (backwardSpeedModifier === 2) {

        backwardSpeedModifier = 1;
        forwardSpeedModifier = 1;

        $("#fast-backward-arrow-one, #fast-backward-arrow-two").css({"stroke": "#009AC2", "fill": "#009AC2"});

        if (animatingGraph) {

          var stop = d3.selectAll(".country-circle, #current-year-controller, .current-year-label");

          stop.transition()
              .duration(0);

          clearInterval(variableIncrement);

          animatingGraph = false;

          $(".graph-area").remove();
          drawCircles();

          animateGraph(backward, backwardSpeedModifier);

        };

      };
    });

    // Adding an event handler for clicking the 'Play Backward Time Button'.
    $("#play-backward, #play-backward-background").click(function() {

      if (animatingGraph) {

        var stop = d3.selectAll(".country-circle, #current-year-controller, .current-year-label");

        stop.transition()
            .duration(0);

        clearInterval(variableIncrement);

        animatingGraph = false;

        $(".graph-area").remove();
        drawCircles();

      };

      $(".year-control").remove();
      $(".time-line").remove();

      drawTimeControllers();

      $("#play-backward, #play-backward-background").css("visibility", "hidden");
      $("#pause-two, #pause-two-background").css("visibility", "visible");
      $("#play-forward, #play-forward-background").css("visibility", "visible");
      $("#pause-one, #pause-one-background").css("visibility", "hidden");

      // Calling the 'Animate Graph' function
      animateGraph(backward);

    });

    $("#pause-two, #pause-two-background").click(function() {
      var stop = d3.selectAll(".country-circle, #current-year-controller, .current-year-label");

      stop.transition()
          .duration(0);

      clearInterval(variableIncrement);

      animatingGraph = false;

      $(".graph-area").remove();
      drawCircles();

      $("#play-backward, #play-backward-background").css("visibility", "visible");
      $("#pause-two, #pause-two-background").css("visibility", "hidden");
    });

    // Adding an event handler for clicking the 'Skip Forward Time Button'.
    $("#skip-forward, #skip-forward-background").click(function() {

      if (animatingGraph) {

        var stop = d3.selectAll(".country-circle, #current-year-controller, .current-year-label");

        stop.transition()
            .duration(0);

        clearInterval(variableIncrement);

        animatingGraph = false;

      };

      // Checking if the 'Current Year' is already the 'Last Year'.
      if (currentYear !== lastYear) {

        // Updating 'Current Year' variable.
        currentYear = lastYear;

        // Removing old elements
        $(".year-control").remove();
        $(".time-line").remove();
        $(".graph-title").remove();
        $(".date-range").remove();
        $(".current-year-label").remove();
        $(".axis-label").remove();
        $(".country-circle").remove();

        // Redrawing elements.
        drawTimeControllers();
        drawGraphLabels();
        drawCircles();

      };// End of year check.

    });// End of event handler for 'Skip Forward Time Button'.

  };// End of 'Draw Time Buttons' function.

  // Calling the 'Draw Time Buttons' function.
  drawTimeButtons ();

  // A function to define how to draw the 'Time Controllers'.
  function drawTimeControllers() {

    // Appending a line to represent the date range.
    timeControls.append("line")
                .attr("class", "time-line")
                .attr("x1", 150)
                .attr("y1", 17)
                .attr("x2", graphWidth - 150)
                .attr("y2", 17);

    // Appending a new SVG to act as the dragable controller for first year.
    var firstYearController = timeControls.append("svg")
                                          .attr("class", "year-control")
                                          .attr("id", "first-year-controller")
                                          .attr("width", 28)
                                          .attr("height", 28)
                                          .attr("x", firstYearScale(firstYear))
                                          .attr("y", 3);

    // Appending a new SVG to act as the dragable controller for last year.
    var lastYearController = timeControls.append("svg")
                                         .attr("class", "year-control")
                                         .attr("id", "last-year-controller")
                                         .attr("width", 28)
                                         .attr("height", 28)
                                         .attr("x", lastYearScale(lastYear))
                                         .attr("y", 3);

    // Appending a new SVG to act as the dragable controller for current year.
    var currentYearController = timeControls.append("svg")
                                            .attr("class", "year-control")
                                            .attr("id", "current-year-controller")
                                            .attr("width", 28)
                                            .attr("height", 28)
                                            .attr("x", currentYearScale(currentYear))
                                            .attr("y", 3);

    // Appending the background for the 'First Year Controller'.
    firstYearController.append("circle")
                       .attr("cx", 14)
                       .attr("cy", 14)
                       .attr("r", 14);

    // Appending the 'First Year Controller'.
    firstYearController.append("path")
                       .attr("transform", "translate(3, 3)")
                       .attr("d", "M11.2 0c-6.186 0-11.2 5.014-11.2 11.2s5.014 11.2 11.2 11.2 11.2-5.014 11.2-11.2-5.014-11.2-11.2-11.2zM11.2 19.6c-4.639 0-8.4-3.761-8.4-8.4s3.761-8.4 8.4-8.4c4.639 0 8.4 3.761 8.4 8.4s-3.761 8.4-8.4 8.4zM7 11.2c0-2.32 1.88-4.2 4.2-4.2s4.2 1.88 4.2 4.2c0 2.32-1.88 4.2-4.2 4.2s-4.2-1.88-4.2-4.2z");

    // Appending the background for the 'Last Year Controller'.
    lastYearController.append("circle")
                      .attr("cx", 14)
                      .attr("cy", 14)
                      .attr("r", 14);

    // Appending the 'Last Year Controller'.
    lastYearController.append("path")
                      .attr("transform", "translate(3, 3)")
                      .attr("d", "M11.2 0c-6.186 0-11.2 5.014-11.2 11.2s5.014 11.2 11.2 11.2 11.2-5.014 11.2-11.2-5.014-11.2-11.2-11.2zM11.2 19.6c-4.639 0-8.4-3.761-8.4-8.4s3.761-8.4 8.4-8.4c4.639 0 8.4 3.761 8.4 8.4s-3.761 8.4-8.4 8.4zM7 11.2c0-2.32 1.88-4.2 4.2-4.2s4.2 1.88 4.2 4.2c0 2.32-1.88 4.2-4.2 4.2s-4.2-1.88-4.2-4.2z");

    // Appending the background for the 'Current Year Controller'.
    currentYearController.append("circle")
                         .attr("cx", 14)
                         .attr("cy", 14)
                         .attr("r", 14);

    // Appending the 'Current Year Controller'.
    currentYearController.append("path")
                         .attr("transform", "translate(3, 3)")
                         .attr("d", "M11.2 0c-6.186 0-11.2 5.014-11.2 11.2s5.014 11.2 11.2 11.2 11.2-5.014 11.2-11.2-5.014-11.2-11.2-11.2zM11.2 14c-1.546 0-2.8-1.254-2.8-2.8s1.254-2.8 2.8-2.8c1.546 0 2.8 1.254 2.8 2.8s-1.254 2.8-2.8 2.8z");

    // Adding and event handler for hovering over the year controls.
    $(".year-control").mouseover(function() {

      // Changing the cursor to horizontal resize.
      $(this).css('cursor', 'ew-resize');
    });

    // Assigning number variables equal to the controller starting positions.
    firstYearControllerPosition = firstYearScale(firstYear) + leftMargin;
    currentYearControllerPosition = currentYearScale(currentYear) + leftMargin;
    lastYearControllerPosition = lastYearScale(lastYear) + leftMargin;

    // Adding a event handler for dragging the year controllers.
    $(".year-control").draggable().bind('drag', function(event, ui) {

      // Checking if the selected controller is for the first year.
      if (event.target.id === "first-year-controller") {

        // Checking if the selected controller is within the permitted range.
        if (ui.position.left > (leftMargin + 151) && ui.position.left < currentYearControllerPosition - 26) {

          if (animatingGraph) {

            var stop = d3.selectAll(".country-circle, #current-year-controller, .current-year-label");

            stop.transition()
                .duration(0);

            clearInterval(variableIncrement);

            animatingGraph = false;

          };

          // Updating the 'Controller Position' variable.
          firstYearControllerPosition = ui.position.left;

          // Updating the 'First Year' variable.
          firstYear = Math.round(firstYearScale.invert(ui.position.left - leftMargin));

          // Updating the 'Date Range' text.
          $(".date-range").text(firstYear + " - " + lastYear);

          // Indicating a new domain is now in effect and rescaling the 'Graph Data'.
          var newDomain = true;
          scaleAllData(newDomain);

          // Removing graph elements based on old data.
          $(".grid").remove();
          $(".axis").remove();
          $(".graph-area").remove();
          $(".country-circle").remove();

          // Redrawing the graph elements with the new data.
          drawGraph();
          drawCircles();

          // Updating the 'Controller Position'.
          event.target.setAttribute("x", (ui.position.left - leftMargin));
        };// End of range check.

        // The following code blocks follow the same pattern as above.

      } else if (event.target.id === "last-year-controller") {

        if (ui.position.left > (currentYearControllerPosition + 26) && ui.position.left < (leftMargin + (graphWidth - 179))) {

          if (animatingGraph) {

            var stop = d3.selectAll(".country-circle, #current-year-controller, .current-year-label");

            stop.transition()
                .duration(0);

            clearInterval(variableIncrement);

            animatingGraph = false;

          };

          lastYearControllerPosition = ui.position.left;
          lastYear = Math.round(lastYearScale.invert(ui.position.left - leftMargin));
          $(".date-range").text(firstYear + " - " + lastYear);

          var newDomain = true;
          scaleAllData(newDomain);

          $(".grid").remove();
          $(".axis").remove();
          $(".graph-area").remove();
          $(".country-circle").remove();

          drawGraph();
          drawCircles();

          event.target.setAttribute("x", (ui.position.left - leftMargin));
        };

      } else if (event.target.id === "current-year-controller") {

        if (ui.position.left > (firstYearControllerPosition + 26) && ui.position.left < lastYearControllerPosition - 26) {

          if (animatingGraph) {

            var stop = d3.selectAll(".country-circle, #current-year-controller, .current-year-label");

            stop.transition()
                .duration(0);

            clearInterval(variableIncrement);

            animatingGraph = false;

          };

          currentYearControllerPosition = ui.position.left;
          currentYear = Math.round(currentYearScale.invert(ui.position.left - leftMargin));

          $(".country-circle").remove();
          $(".graph-area").remove();

          drawCircles();

          var label = d3.select(".current-year-label");

          label.transition()
               .duration(1)
               .ease(d3.easeLinear)
               .attr("x", ui.position.left + 13);

          label.text(currentYear);

          event.target.setAttribute("x", (ui.position.left - leftMargin));
        };

      };// End of target ID check.
    });// End of draggable event handler.
  };// End of draw 'Time Controllers' function.

  // Calling the draw 'Time Controllers' function.
  drawTimeControllers();

};// End of 'Draw Time Controls' function.

// A function that defines how to draw the 'Menu'.
function drawMenu() {

  var open = false;
  var locked = false;

  var menu = svg.append("svg")
                .attr("id", "menu")
                .attr("width", 205)
                .attr("height", graphZoneHeight)
                .attr("x", graphZoneWidth - 55)
                .attr("y", 0);

  menu.append("rect")
      .attr("x", 0)
      .attr("y", -2)
      .attr("width", 205)
      .attr("height", graphZoneHeight + 4)
      .attr("stroke", "grey")
      .attr("stroke-width", 2)
      .attr("fill", "lightgrey");

  $("svg").mousemove(function(event) {

    if (event.pageX > (graphZoneWidth - 55) && open === false) {

      d3.selectAll("#menu").transition()
                           .duration(1000)
                           .ease(d3.easeLinear)
                           .attr("x", graphZoneWidth - 200);

      open = true;

    } else if (open === true && locked === false && event.pageX < graphZoneWidth - 200) {

      d3.selectAll("#menu").transition()
                           .duration(1000)
                           .ease(d3.easeLinear)
                           .attr("x", graphZoneWidth - 55)

      open = false;

    };
  });

  menu.append("path")
      .attr("class", "nav-icon")
      .attr("stroke", "grey")
      .attr("fill", "grey")
      .attr("stroke-width", 1)
      .attr("transform", "translate(11, 22)")
      .attr("d", "M15 2c-8.284 0-15 6.716-15 15s6.716 15 15 15c8.284 0 15-6.716 15-15s-6.716-15-15-15zM23.487 22c0.268-1.264 0.437-2.606 0.492-4h3.983c-0.104 1.381-0.426 2.722-0.959 4h-3.516zM6.513 12c-0.268 1.264-0.437 2.606-0.492 4h-3.983c0.104-1.381 0.426-2.722 0.959-4h3.516zM21.439 12c0.3 1.28 0.481 2.62 0.54 4h-5.979v-4h5.439zM16 10v-5.854c0.456 0.133 0.908 0.355 1.351 0.668 0.831 0.586 1.625 1.488 2.298 2.609 0.465 0.775 0.867 1.638 1.203 2.578h-4.852zM10.351 7.422c0.673-1.121 1.467-2.023 2.298-2.609 0.443-0.313 0.895-0.535 1.351-0.668v5.854h-4.852c0.336-0.94 0.738-1.803 1.203-2.578zM14 12v4h-5.979c0.059-1.38 0.24-2.72 0.54-4h5.439zM2.997 22c-0.533-1.278-0.854-2.619-0.959-4h3.983c0.055 1.394 0.224 2.736 0.492 4h-3.516zM8.021 18h5.979v4h-5.439c-0.3-1.28-0.481-2.62-0.54-4zM14 24v5.854c-0.456-0.133-0.908-0.355-1.351-0.668-0.831-0.586-1.625-1.488-2.298-2.609-0.465-0.775-0.867-1.638-1.203-2.578h4.852zM19.649 26.578c-0.673 1.121-1.467 2.023-2.298 2.609-0.443 0.312-0.895 0.535-1.351 0.668v-5.854h4.852c-0.336 0.94-0.738 1.802-1.203 2.578zM16 22v-4h5.979c-0.059 1.38-0.24 2.72-0.54 4h-5.439zM23.98 16c-0.055-1.394-0.224-2.736-0.492-4h3.516c0.533 1.278 0.855 2.619 0.959 4h-3.983zM25.958 10h-2.997c-0.582-1.836-1.387-3.447-2.354-4.732 1.329 0.636 2.533 1.488 3.585 2.54 0.671 0.671 1.261 1.404 1.766 2.192zM5.808 7.808c1.052-1.052 2.256-1.904 3.585-2.54-0.967 1.285-1.771 2.896-2.354 4.732h-2.997c0.504-0.788 1.094-1.521 1.766-2.192zM4.042 24h2.997c0.583 1.836 1.387 3.447 2.354 4.732-1.329-0.636-2.533-1.488-3.585-2.54-0.671-0.671-1.261-1.404-1.766-2.192zM24.192 26.192c-1.052 1.052-2.256 1.904-3.585 2.54 0.967-1.285 1.771-2.896 2.354-4.732h2.997c-0.504 0.788-1.094 1.521-1.766 2.192z");

  menu.append("path")
      .attr("class", "nav-icon")
      .attr("stroke", "grey")
      .attr("fill", "grey")
      .attr("stroke-width", 1)
      .attr("transform", "translate(11, 75)")
      .attr("d", "M14 4v-0.5c0-0.825-0.675-1.5-1.5-1.5h-5c-0.825 0-1.5 0.675-1.5 1.5v0.5h-6v4h6v0.5c0 0.825 0.675 1.5 1.5 1.5h5c0.825 0 1.5-0.675 1.5-1.5v-0.5h18v-4h-18zM8 8v-4h4v4h-4zM26 13.5c0-0.825-0.675-1.5-1.5-1.5h-5c-0.825 0-1.5 0.675-1.5 1.5v0.5h-18v4h18v0.5c0 0.825 0.675 1.5 1.5 1.5h5c0.825 0 1.5-0.675 1.5-1.5v-0.5h6v-4h-6v-0.5zM20 18v-4h4v4h-4zM14 23.5c0-0.825-0.675-1.5-1.5-1.5h-5c-0.825 0-1.5 0.675-1.5 1.5v0.5h-6v4h6v0.5c0 0.825 0.675 1.5 1.5 1.5h5c0.825 0 1.5-0.675 1.5-1.5v-0.5h18v-4h-18v-0.5zM8 28v-4h4v4h-4z");

  menu.append("path")
      .attr("class", "nav-icon")
      .attr("stroke", "grey")
      .attr("fill", "grey")
      .attr("stroke-width", 1)
      .attr("transform", "translate(11, 128)")
      .attr("d", "M16 0c-8.837 0-16 2.239-16 5v4c0 2.761 7.163 5 16 5s16-2.239 16-5v-4c0-2.761-7.163-5-16-5 M16 17c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5 M16 26c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z");

  menu.append("path")
      .attr("class", "nav-icon")
      .attr("stroke", "grey")
      .attr("fill", "grey")
      .attr("stroke-width", 1)
      .attr("transform", "translate(11, 181)")
      .attr("d", "M16 0c-8.837 0-16 2.239-16 5v3l12 12v10c0 1.105 1.791 2 4 2s4-0.895 4-2v-10l12-12v-3c0-2.761-7.163-5-16-5zM2.95 4.338c0.748-0.427 1.799-0.832 3.040-1.171 2.748-0.752 6.303-1.167 10.011-1.167s7.262 0.414 10.011 1.167c1.241 0.34 2.292 0.745 3.040 1.171 0.494 0.281 0.76 0.519 0.884 0.662-0.124 0.142-0.391 0.38-0.884 0.662-0.748 0.427-1.8 0.832-3.040 1.171-2.748 0.752-6.303 1.167-10.011 1.167s-7.262-0.414-10.011-1.167c-1.24-0.34-2.292-0.745-3.040-1.171-0.494-0.282-0.76-0.519-0.884-0.662 0.124-0.142 0.391-0.38 0.884-0.662z");

  menu.append("path")
      .attr("class", "nav-icon")
      .attr("stroke", "grey")
      .attr("fill", "grey")
      .attr("stroke-width", 1)
      .attr("transform", "translate(11, 234)")
      .attr("d", "M27 22c-1.411 0-2.685 0.586-3.594 1.526l-13.469-6.734c0.041-0.258 0.063-0.522 0.063-0.791s-0.022-0.534-0.063-0.791l13.469-6.734c0.909 0.94 2.183 1.526 3.594 1.526 2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5c0 0.269 0.022 0.534 0.063 0.791l-13.469 6.734c-0.909-0.94-2.183-1.526-3.594-1.526-2.761 0-5 2.239-5 5s2.239 5 5 5c1.411 0 2.685-0.586 3.594-1.526l13.469 6.734c-0.041 0.258-0.063 0.522-0.063 0.791 0 2.761 2.239 5 5 5s5-2.239 5-5c0-2.761-2.239-5-5-5z");


  menu.append("path")
      .attr("class", "nav-icon")
      .attr("id", "locked")
      .attr("visibility", "hidden")
      .attr("stroke", "grey")
      .attr("fill", "grey")
      .attr("stroke-width", 1)
      .attr("transform", "translate(11, " + (graphZoneHeight - 46) + ")")
      .attr("d", "M18.5 13h-0.5v-6c0-3.308-2.692-6-6-6h-4c-3.308 0-6 2.692-6 6v6h-0.5c-0.825 0-1.5 0.675-1.5 1.5v15c0 0.825 0.675 1.5 1.5 1.5h17c0.825 0 1.5-0.675 1.5-1.5v-15c0-0.825-0.675-1.5-1.5-1.5zM6 7c0-1.103 0.897-2 2-2h4c1.103 0 2 0.897 2 2v6h-8v-6z");

  menu.append("path")
      .attr("class", "nav-icon")
      .attr("id", "unlocked")
      .attr("stroke", "grey")
      .attr("fill", "grey")
      .attr("stroke-width", 1)
      .attr("transform", "translate(11, " + (graphZoneHeight - 46) + ")")
      .attr("d", "M24 1c3.308 0 6 2.692 6 6v6h-4v-6c0-1.103-0.897-2-2-2h-4c-1.103 0-2 0.897-2 2v6h0.5c0.825 0 1.5 0.675 1.5 1.5v15c0 0.825-0.675 1.5-1.5 1.5h-17c-0.825 0-1.5-0.675-1.5-1.5v-15c0-0.825 0.675-1.5 1.5-1.5h12.5v-6c0-3.308 2.692-6 6-6h4z");

  $("#unlocked").on("click", function() {
    $("#unlocked").attr("visibility", "hidden");
    $("#locked").attr("visibility", "visible");
    locked = true;
  });

  $("#locked").on("click", function() {
    $("#locked").attr("visibility", "hidden");
    $("#unlocked").attr("visibility", "visible");
    locked = false;
  });
};
