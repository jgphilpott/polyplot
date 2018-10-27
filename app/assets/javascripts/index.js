//
// This data visualization application is based on Hans Rosling's 'Trendalyzer' software (https://en.wikipedia.org/wiki/Trendalyzer).
// This version of the software was created by Jacob Philpott (https://linkedin.com/in/jgphilpott).
// The full source code is available for free on GitHub (https://github.com/jgphilpott/iGraph).
// A live demo is available online (https://i-graph.herokuapp.com).
// Please do not remove this comment!
//

// Only executes JavaScript once DOM is ready.
$(document).on('ready', function() {

  // Checking the users browser environment.
  checkEnvironment();

  // Setting up the application with default variables.
  setup();

  // Retrieving and organizing the currently selected datasets.
  getData();

  // Scaling the organized 'Graph Data'.
  scaleAllData();

  // Calling a function that will draw the graph, data points and user menu.
  drawCanvas();

});// End of file.
