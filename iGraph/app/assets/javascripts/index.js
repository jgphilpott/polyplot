//Only loads JavaScript once DOM is ready
$(document).on('ready', function() {

  //Test Data
  var data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
    var windowHeight = windowH() - 3.51;//The Minus 3.51 Removes the Scroll Bars (any number greater than 3.5 works)

    //Appending SVG Container equal to Window Width and Height
    var svg = d3.select("body").append("svg").attr("width", windowWidth).attr("height", (windowHeight));

    //Creating a scale function for the X Axis
    var xAxisScale = d3.scaleLinear()
                       .domain([0, d3.max(data, function(d) { return d; })])
                       .range([0, (windowWidth - rightMargin - leftMargin)]);

    //Creating a scale function for the Y Axis
    var yAxisScale = d3.scaleLinear()
                       .domain([0, d3.max(data, function(d) { return d; })])
                       .range([(windowHeight - topMargin - bottomMargin), 0]);

     //Creating function for X axis Gridlines
     function xGridlines() {
       return d3.axisBottom(xAxisScale)
                .ticks(5);
     };

     //Creating function for Y axis Gridlines
     function yGridlines() {
       return d3.axisLeft(yAxisScale)
                .ticks(5);
     };

    //Calling the Function that Draws the Chart
    drawChart(svg, topMargin, rightMargin, bottomMargin, leftMargin, xAxisScale, yAxisScale, windowWidth, windowHeight, xGridlines, yGridlines);

    //Adding Event Listener for Mouse Move
    //This is to create Mouse Guidelines and Tooltips
    $("svg").mousemove(function(event) {

      //Checking if the mouse is within the chart area
      if (event.pageX > leftMargin && event.pageX < (windowWidth - rightMargin) && event.pageY > topMargin && event.pageY < (windowHeight - bottomMargin)) {

        //Removing old Guidelines
        $(".mouseGuide").remove();

        //Hiding cursor while over the chart area
        $('body').css('cursor', 'none');

        //Adding mouse guide for X
        svg.append("line")
           .attr("class", "mouseGuide")
           .attr("x1", event.pageX)
           .attr("y1", topMargin)
           .attr("x2", event.pageX)
           .attr("y2", (windowHeight - bottomMargin));

        //Adding mouse guide for Y
        svg.append("line")
           .attr("class", "mouseGuide")
           .attr("x1", leftMargin)
           .attr("y1", event.pageY)
           .attr("x2", (windowWidth - rightMargin))
           .attr("y2", event.pageY);

      } else {

        //Removing old Guidelines
        $(".mouseGuide").remove();

        //Restoring default cursor
        $('body').css('cursor', 'default');

      };//End of Mouse Location Check

    });//End of Mouse Move Event Listener

  };//End of Main Function

  //Adjusting for Window Resize
  $(window).resize(function(){
    $("svg").remove();
    mainFunction();
  });

  //Calling the Main Function
  mainFunction();

});//End of file
