//Only loads JavaScript once DOM is ready.
$(document).on('ready', function() {

  //Main JS Function.
  function mainFunction() {

    //Saving Width and Height Variables.
    var windowWidth = windowW();
    var windowHeight = windowH() - 3.51;//The Minus 3.51 Removes the Scroll Bars (any number greater than 3.5 works).

    //Appending SVG Container equal to Window Width and Height.
    var svg = d3.select("body").append("svg").attr("width", windowWidth).attr("height", (windowHeight));

    //Saving Margin Variables.
    var topMargin = topM();
    var rightMargin = rightM();
    var bottomMargin = bottomM();
    var leftMargin = leftM();

    //Setting the Default Date Range.
    var firstYear = 1960;
    var lastYear = 2014;
    var currentYear = 1960;

    //Setting the Default Datasets.
    var rData = populationData;
    var xData = lifeExpectancyData;
    var yData = fertilityData;

    //These basic string variables are assigned for the purpose of the 'Check Min/Max' function call...
    //This helps keep code DRY by eliminating the need for two essentially identical functions ('Check Min' and 'Check Max').
    var max = "MAX";
    var min = "MIN";

    //Temporarily hard coded variables for radius range.
    var radiusMax = 25;
    var radiusMin = 5;

    //Finding the Min and Max Values for the selected R, X and Y datasets...
    //To be passed to the scaling functions.
    var rDataMax = CheckMinMax(max, rData, firstYear, lastYear);
    var rDataMin = CheckMinMax(min, rData, firstYear, lastYear);
    var xDataMax = CheckMinMax(max, xData, firstYear, lastYear);
    var xDataMin = CheckMinMax(min, xData, firstYear, lastYear);
    var yDataMax = CheckMinMax(max, yData, firstYear, lastYear);
    var yDataMin = CheckMinMax(min, yData, firstYear, lastYear);

    //Saving the return value of the Scaling Functions.
    var rScale = radiusScale(rDataMax, rDataMin, radiusMax, radiusMin);
    var xCircleS = xCircleScale(xDataMax, xDataMin, windowWidth, rightMargin, leftMargin, radiusMax);
    var yCircleS = yCircleScale(yDataMax, yDataMin, windowHeight, topMargin, bottomMargin, radiusMax);
    var xScale = xAxisScale(xDataMax, xDataMin, windowWidth, rightMargin, leftMargin);
    var yScale = yAxisScale(yDataMax, yDataMin, windowHeight, topMargin, bottomMargin);

    //A function to scale, compile and reformat the selected datasets...
    //Within a specified date range.
    var drawData = scaleAllData(rData, xData, yData, rScale, xCircleS, yCircleS, firstYear, lastYear);

    //Calling the function that draws the chart.
    drawChart(svg, windowWidth, windowHeight, topMargin, rightMargin, bottomMargin, leftMargin, xScale, yScale);

    //Draw circles based on selected datasets.
    drawCircles(svg, drawData, radiusMax, currentYear, topMargin, leftMargin);

    //Adding Event Listener for Mouse Move...
    //This is to create Mouse Guidelines and Tooltips.
    $("svg").mousemove(function(event) {

      //Checking if the mouse is within the chart area.
      if (event.pageX > leftMargin && event.pageX < (windowWidth - rightMargin) && event.pageY > topMargin && event.pageY < (windowHeight - bottomMargin)) {

        //Removing old Guidelines.
        $(".mouseGuide").remove();

        //Hiding cursor while over the chart area.
        $('body').css('cursor', 'none');

        //Adding mouse guide for X.
        svg.append("line")
           .attr("class", "mouseGuide")
           .attr("x1", event.pageX)
           .attr("y1", topMargin)
           .attr("x2", event.pageX)
           .attr("y2", (windowHeight - bottomMargin));

        //Adding mouse guide for Y.
        svg.append("line")
           .attr("class", "mouseGuide")
           .attr("x1", leftMargin)
           .attr("y1", event.pageY)
           .attr("x2", (windowWidth - rightMargin))
           .attr("y2", event.pageY);

      } else {

        //Removing old Guidelines.
        $(".mouseGuide").remove();

        //Restoring default cursor.
        $('body').css('cursor', 'default');

      };//End of Mouse Location Check.

    });//End of Mouse Move Event Listener.

    animate(currentYear, lastYear);

  };//End of Main Function.

  //Adjusting for Window Resize.
  $(window).resize(function(){
    $("svg").remove();
    mainFunction();
  });

  //Calling the Main Function.
  mainFunction();

});//End of file.
