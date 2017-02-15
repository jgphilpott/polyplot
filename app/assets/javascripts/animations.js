// A function for animating the ‘Country Objects’ along their defined paths.
function animate(svg, animationData, speed, topMargin, leftMargin, radiusMax) {

  // This function will generate a unique path for each ‘Country Object’ it is passed.
  var generator = d3.line()
                    .x(function(d) { return ((d.x) + leftMargin + radiusMax); })
                    .y(function(d) { return ((d.y) + topMargin + radiusMax); })
                    .curve(d3.curveCatmullRom);

  // Looping over the given array of ‘Country Objects’ to generate a path for each.
  for (var i = 0; i < animationData.length; i++) {

    // Appending the paths to the SVG container.
    svg.append("path")
       .attr("d", generator(animationData[i]))
       .attr("class", "countryPath")
       .attr("id", animationData[i][0].code)
       .attr("fill", "none");

  };// End of country loop.

  // Looping over the array of countries.
  for (var i = 0; i < animationData.length; i++) {

    // Selecting the ‘Circle’ and 'Path' that correspond to the current 'Country Object' (i) in our loop.
    var country = d3.selectAll("#" + animationData[i][0].code + ".countryCircle");
    var path = d3.selectAll("#" + animationData[i][0].code + ".countryPath");

    // Initiating an animation for the current ‘Country Object’.
    country.transition()
           .duration(speed)
           .ease(d3.easeLinear)
           .attrTween("transform", translate(path.node()));

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
};// End of ‘Animate’ function.
