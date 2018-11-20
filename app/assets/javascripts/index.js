//
// This data visualization application is based on Hans Rosling's 'Trendalyzer' software (https://en.wikipedia.org/wiki/Trendalyzer).
// This version of the software was created by Jacob Philpott (https://linkedin.com/in/jgphilpott).
// The full source code is available for free on GitHub (https://github.com/jgphilpott/iGraph).
// A live demo is available online (https://igraph.herokuapp.com).
// Please do not remove this comment!
//

// Only loads JavaScript once DOM is ready.
$(document).on("ready", function() {

  // Initializing the app with a few basic properties.
  app = {
    "name": "iGraph",
    "version": "0.0",
    "data": {},
    "view": {},
    "user": {}
  };

  // Checking the users browser environment.
  checkEnvironment();

  // Setting up the application with default variables.
  setupDefault();

  // Retrieving and organizing the currently selected datasets.
  // getData();

  // Scaling the organized data.
  // scaleAllData();

  // Calling a function that will draw the graph, data points and user menu.
  drawCanvas();

});// End of file.
