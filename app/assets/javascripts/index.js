// Only loads JavaScript once DOM is ready.
$(document).on('ready', function() {

  // 'Initial Setup' function.
  function initialSetup() {

    // Checking the users unique browser environment.
    environmentCheck();

    // Retrieving and organizing the currently selected datasets.
    getData();

    // Scaling the organized 'Graph Data'.
    scaleAllData();

    // Calling a series of functions that will draw the graph, data points and user controls.
    drawAll();

  };// End of 'Initial Setup' function.

  // Calling the 'Initial Setup' function.
  initialSetup();

  // Adjusting for Window Resize.
  $(window).resize(function(){
    $("svg").remove();
    environmentCheck();
    scaleAllData();
    drawAll();
  });

});// End of file.
