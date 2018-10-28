function reDraw() {

  // Removing the current view.
  $("svg").remove();

  // Checking the new browser dimensions and rescaling the data.
  checkEnvironment();
  setupDefault()
  // scaleAllData();

  // Redrawing the view.
  drawCanvas();

};
