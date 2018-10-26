// Creating an event handler for window resizing.
$(window).resize(function(){

  // Removing the current view.
  $("svg").remove();
  $(".menu-zone").remove();

  // Checking the new browser dimensions and rescaling the data.
  checkEnvironment();
  setup();
  scaleAllData();

  // Redrawing the view.
  drawCanvas();

});// End of window resizing event handler.
