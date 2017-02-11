//Only loads JavaScript once DOM is ready
$(document).on('ready', function() {

  //Main JS Function
  function mainFunction() {

    //Getting Window Width
    var windowW = function() {
      var w = $(window).width();
      return w;
    };

    //Getting Window Height
    var windowH = function() {
      var h = $(window).height();
      return h;
    };

    //Saving Width and Height
    var windowWidth = windowW();
    var windowHeight = windowH() - 3.51;//The Minus Removes Scroll Bars

    //Appending SVG Container equal to Window Width and Height
    var svg = d3.select("body").append("svg").attr("width", windowWidth).attr("height", (windowHeight));

  };//End of Main Function

  //Calling the Main Function
  mainFunction();

  //Adjusting for Window Resize
  $(window).resize(function(){
    $("svg").remove();
    mainFunction();
  });

});//End of file
