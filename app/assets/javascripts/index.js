//
// This data visualization software is a replication of Hans Rosling's original Trendalyzer (https://en.wikipedia.org/wiki/Trendalyzer).
// This version of the software was created by Jacob Philpott (https://www.linkedin.com/in/jgphilpott).
// The full source code is available for free on GitHub (https://github.com/jgphilpott/iGraph).
// A live demo is available on Heroku (https://i-graph.herokuapp.com).
// Please do not remove this comment!
//

// Only loads JavaScript once DOM is ready.
$(document).on('ready', function() {

  // Calling the 'Initial Setup' function.
  initialSetup();

  // Initiating the initial setup .
  function initialSetup() {

    // Checking the users browser dimensions.
    checkEnvironment();

    // Setting the default Dataset Keys.
    var datasetKeys = ["population", "lifeExpectancy", "fertility"];

    // Retrieving and organizing the currently selected datasets.
    getData(datasetKeys);

    // Scaling the organized 'Graph Data'.
    scaleAllData();

    // Calling a series of functions that will draw the graph, data points and user controls.
    drawAll();

  };// End of 'Initial Setup' function.

  // Adjusting for Window Resize.
  $(window).resize(function(){
    $("svg").remove();
    checkEnvironment();
    scaleAllData();
    drawAll();
  });

});// End of file.
