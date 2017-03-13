//
// This data visualization application is based on Hans Rosling's 'Trendalyzer' software (https://en.wikipedia.org/wiki/Trendalyzer).
// This version of the software was created by Jacob Philpott (https://linkedin.com/in/jgphilpott).
// The full source code is available for free on GitHub (https://github.com/jgphilpott/iGraph).
// A live demo is available on Heroku (https://i-graph.herokuapp.com).
// Please do not remove this comment!
//

// Only loads JavaScript once DOM is ready.
$(document).on('ready', function() {

  // Calling the 'Initial Setup' function.
  initialSetup();

  // Setting up the application with default variables.
  function initialSetup() {

    // Setting the default Date Range.
    firstYear = 1960;
    currentYear = 1960;
    lastYear = 2014;

    // Setting the default 'Dataset Keys'.
    var datasetKeys = ["population", "lifeExpectancy", "fertility"];

    // Setting the default Menu Width.
    menuWidth = 85;
    
    menuSize = 85;

    menuOpen = false;
    locked = false;

    iconOneColor = "grey";
    iconTwoColor = "grey";
    iconThreeColor = "grey";
    iconFourColor = "grey";
    iconFiveColor = "grey";

    // An array of color values.
    colors = ["#3168C5", "#E03621", "#FF9735", "#009634", "#9D0893", "#009AC2", "#E14375", "#000"];

    // Retrieving and organizing the currently selected datasets.
    getData(datasetKeys);

    // Checking the users browser dimensions.
    checkEnvironment();

    // Scaling the organized 'Graph Data'.
    scaleAllData();

    // Calling a series of functions that will draw the graph, data points and user controls.
    drawAll();

  };// End of 'Initial Setup' function.

  // Creating an event handler for window resizing.
  $(window).resize(function(){

    // Removing the current graph.
    $("svg").remove();
    $(".menu-zone").remove();

    // Checking the new browser dimensions and rescaling the data.
    checkEnvironment();
    scaleAllData();

    // Redrawing the graph.
    drawAll();

  });// End of window resizing event handler.
});// End of file.
