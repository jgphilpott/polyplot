// A function for setting a variety of useful variables based on the browser window dimensions...
// This will help define how to draw the graph.
function checkEnvironment() {

  // Saving Window Width and Height variables.
  var windowWidth = $(window).width();
  var windowHeight = $(window).height() - 3.51;// The minus 3.51 removes the scroll bars (any number greater than 3.5 works).

  // Determining the Top Margin.
  function topM() {
    if (windowHeight <= 340) {
      return 110;
    } else if (windowHeight > 340 && windowHeight <= 680) {
      return 120;
    } else if (windowHeight > 680) {
      return 130;
    };
  };

  // Determining the Right Margin.
  function rightM() {
    if (windowWidth <= 640) {
      return 50;
    } else if (windowWidth > 640 && windowWidth <= 1280) {
      return 60;
    } else if (windowWidth > 1280) {
      return 70;
    };
  };

  // Determining the Bottom Margin.
  function bottomM() {
    if (windowHeight <= 340) {
      return 50;
    } else if (windowHeight > 340 && windowHeight <= 680) {
      return 60;
    } else if (windowHeight > 680) {
      return 70;
    };
  };

  // Determining the Left Margin.
  function leftM() {
    if (windowWidth <= 640) {
      return 50;
    } else if (windowWidth > 640 && windowWidth <= 1280) {
      return 60;
    } else if (windowWidth > 1280) {
      return 70;
    };
  };

  // Saving Margin Variables.
  topMargin = topM();
  rightMargin = rightM();
  bottomMargin = bottomM();
  leftMargin = leftM();

  // Setting the default Menu Width.
  var menuWidth = 0;

  // Saving Graph Dimensions.
  graphZoneWidth = windowWidth - menuWidth;
  graphZoneHeight = windowHeight;
  graphWidth = windowWidth - menuWidth - leftMargin - rightMargin;
  graphHeight = windowHeight - topMargin - bottomMargin;

  // Appending an SVG container equal to Window Width and Height.
  graphZone = d3.select("body")
                .append("svg")
                .attr("width", graphZoneWidth)
                .attr("height", graphZoneHeight);

};// End of 'Check Environment' function.
