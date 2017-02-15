// Setting a variety of useful variables that will help define how to draw the graph.

// Getting Window Width.
function windowW() {
  var w = $(window).width();
  return w;
};

// Getting Window Height.
function windowH() {
  var h = $(window).height();
  return h;
};

// Defining the Top Margin.
function topM() {
  return 50;
};

// Defining the Right Margin.
function rightM() {
  return 50;
};

// Defining the Bottom Margin.
function bottomM() {
  return 50;
};

// Defining the Left Margin.
function leftM() {
  return 50;
};

// Setting the Default Dataset Keys.
var rDataKey = "population";
var xDataKey = "lifeExpectancy";
var yDataKey = "fertility";

// Creating variables to hold the various datasets.
var rData;
var xData;
var yData;

// Setting the Default Date Range.
var firstYear = 1960;
var lastYear = 2014;
var currentYear = 1960;

// These basic string variables are keys for the 'Check Min/Max' function...
// This helps keep code DRY by eliminating the need for two essentially identical functions ('Check Min' and 'Check Max').
var min = "MIN";
var max = "MAX";

// Temporarily hard coded variables for the radius range.
var radiusMin = 5;
var radiusMax = 25;

// Setting the default animation speed.
var speed = 15000;
