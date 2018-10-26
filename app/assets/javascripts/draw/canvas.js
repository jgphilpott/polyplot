// Appending the canvas (layer zero) and calling functions that will draw the layer one components of the view.
function drawCanvas() {

    menuSize = 85; // What's this?

    iconOneColor = "grey"; // Okay serious refactoring needed!
    iconTwoColor = "grey";
    iconThreeColor = "grey";
    iconFourColor = "grey";
    iconFiveColor = "grey";

    iconOneOpen = false;
    iconTwoOpen = false;
    iconThreeOpen = false;
    iconFourOpen = false;
    iconFiveOpen = false;

    // Development ONLY!
    menuOpen = false;
    menuResize = setInterval(openMenu, 100);

    drawRegionsExceptionList = [];
    drawCountriesExceptionList = [];
    openFoldersList = [];


  drawMenuZone();
  drawGraphZone();

};// End of 'drawCanvas' function.
