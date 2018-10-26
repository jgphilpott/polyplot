function reDraw() {

  // Removing the current view.
  $("svg").remove();
  $(".menu-zone").remove();

  // Checking the new browser dimensions and rescaling the data.
  checkEnvironment();
  setup();
  scaleAllData();

  // Redrawing the view.
  drawCanvas();

};
