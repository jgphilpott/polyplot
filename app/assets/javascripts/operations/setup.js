// Setting up the application with default variables.
function setup() {

  // Setting the default dataset keys.
  datasetKeys = ["population", "lifeExpectancy", "fertility"];

  // Setting the default date range.
  firstYear = 1960;
  currentYear = 1960;
  lastYear = 2014;

  // An array of geographic region names.
  geographicRegionNames = ["East Asia & Pacific", "Europe & Central Asia", "Latin America & Caribbean", "Midle East & North Africa", "North America", "South Asia", "Sub Saharan Africa"];

  // An array of color values.
  colors = ["#3168C5", "#E03621", "#FF9735", "#009634", "#9D0893", "#009AC2", "#E14375", "#000000"];

  // Menu is locked by default.
  menuLocked = true;

  // Setting the default menu width.
  menuWidth = 52;

  menuSize = 52;

  menuOpen = false;

  iconOneOpen = false;
  iconTwoOpen = false;
  iconThreeOpen = false;
  iconFourOpen = false;
  iconFiveOpen = false;

  // Setting graph zone dimensions.
  graphZoneWidth = windowWidth - menuWidth;
  graphZoneHeight = windowHeight;

  // Setting the graph margin dimensions.
  function setupMargins() {

    var widthBreakpoints = [640, 1280];
    var heightBreakpoints = [340, 680];

    // Determining the Right Margin.
    function rightM() {
      if (graphZoneWidth <= widthBreakpoints[0]) {
        return 10;
      } else if (graphZoneWidth > widthBreakpoints[0] && graphZoneWidth <= widthBreakpoints[1]) {
        return 20;
      } else if (graphZoneWidth > widthBreakpoints[1]) {
        return 30;
      };
    };

    // Determining the Left Margin.
    function leftM() {
      if (graphZoneWidth <= widthBreakpoints[0]) {
        return 50;
      } else if (graphZoneWidth > widthBreakpoints[0] && graphZoneWidth <= widthBreakpoints[1]) {
        return 60;
      } else if (graphZoneWidth > widthBreakpoints[1]) {
        return 70;
      };
    };

    // Determining the Top Margin.
    function topM() {
      if (graphZoneHeight <= heightBreakpoints[0]) {
        return 110;
      } else if (graphZoneHeight > heightBreakpoints[0] && graphZoneHeight <= heightBreakpoints[1]) {
        return 120;
      } else if (graphZoneHeight > heightBreakpoints[1]) {
        return 130;
      };
    };

    // Determining the Bottom Margin.
    function bottomM() {
      if (graphZoneHeight <= heightBreakpoints[0]) {
        return 50;
      } else if (graphZoneHeight > heightBreakpoints[0] && graphZoneHeight <= heightBreakpoints[1]) {
        return 60;
      } else if (graphZoneHeight > heightBreakpoints[1]) {
        return 70;
      };
    };

    // Saving margin variables.
    rightMargin = rightM();
    leftMargin = leftM();
    topMargin = topM();
    bottomMargin = bottomM();

  }; setupMargins();

  // Setting graph zone dimensions.
  graphWidth = graphZoneWidth - rightMargin - leftMargin;
  graphHeight = graphZoneHeight - topMargin - bottomMargin;

};// End of 'Initial Setup' function.
