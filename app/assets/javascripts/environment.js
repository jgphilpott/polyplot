// A function for setting a variety of useful variables based on the users unique browser environment...
// This will help define how to draw the graph.
function environmentCheck() {

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
    return 120;
  };

  // Defining the Right Margin.
  function rightM() {
    return 70;
  };

  // Defining the Bottom Margin.
  function bottomM() {
    return 70;
  };

  // Defining the Left Margin.
  function leftM() {
    return 70;
  };

  // Saving Window Width and Height Variables.
  windowWidth = windowW();
  windowHeight = windowH() - 3.51;// The Minus 3.51 Removes the Scroll Bars (any number greater than 3.5 works).

  // Saving Margin Variables.
  topMargin = topM();
  rightMargin = rightM();
  bottomMargin = bottomM();
  leftMargin = leftM();

  // Saving Graph Dimensions.
  graphWidth = windowWidth - leftMargin - rightMargin;
  graphHeight = windowHeight - topMargin - bottomMargin;

  // Appending an SVG Container equal to Window Width and Height.
  fullScreen = d3.select("body").append("svg").attr("width", windowWidth).attr("height", windowHeight);

};// End of 'Environment Check' function.

// Setting the Default Dataset Keys.
datasetKeys = ["population", "lifeExpectancy", "fertility"];

// Setting the Default Date Range.
firstYear = 1960;
lastYear = 2014;
currentYear = 1960;

// Temporarily hard coded variables for the radius range.
radiusMin = 7;
radiusMax = 70;

// Setting the default animation speed.
speed = 500;

animatingGraph = false;

// An array of color values.
colors = ["#3168C5", "#E03621", "#FF9735", "#009634", "#9D0893", "#009AC2", "#E14375", "#000000"];

// A series of arrays to group countries by geographic region and income level using country codes.
var europeAndCentralAsia = ["ALB", "AND", "ARM", "AUT", "AZE", "BLR", "BEL", "BIH", "BGR", "CHI", "HRV", "CYP", "CZE", "DNK", "EST", "FRO", "FIN", "FRA", "GEO", "DEU", "GIB", "GRC", "GRL", "HUN", "ISL", "IRL", "IMN", "ITA", "KAZ", "KSV", "KGZ", "LVA", "LIE", "LTU", "LUX", "MKD", "MDA", "MCO", "MNE", "NLD", "NOR", "POL", "PRT", "ROU", "RUS", "SMR", "SRB", "SVK", "SVN", "ESP", "SWE", "CHE", "TJK", "TUR", "TKM", "UKR", "GBR", "UZB"];
var subSaharanAfrica = ["AGO", "BEN", "BWA", "BFA", "BDI", "CPV", "COG", "CIV", "CMR", "CAF", "TCD", "COM", "COD", "GNQ", "ERI", "ETH", "GAB", "GHA", "GIN", "GNB", "KEN", "LSO", "LBR", "MDG", "MWI", "MLI", "MRT", "MUS", "MOZ", "NAM", "NER", "NGA", "RWA", "STP", "SEN", "SYC", "SLE", "SOM", "ZAF", "SSD", "SDN", "SWZ", "TZA", "GMB", "TGO", "UGA", "ZMB", "ZWE"];
var latinAmericaAndCaribbean = ["ATG", "ARG", "ABW", "BRB", "BLZ", "BOL", "BRA", "VGB", "CYM", "CHL", "COL", "CRI", "CUB", "CUW", "DMA", "DOM", "ECU", "SLV", "GRD", "GTM", "GUY", "HTI", "HND", "JAM", "MEX", "NIC", "PAN", "PRY", "PER", "PRI", "SXM", "KNA", "LCA", "MAF", "VCT", "SUR", "BHS", "TTO", "TCA", "URY", "VEN", "VIR"];
var eastAsiaAndPacific = ["ASM", "AUS", "BRN", "KHM", "CHN", "PRK", "FJI", "PYF", "GUM", "HKG", "IDN", "JPN", "KIR", "KOR", "LAO", "MAC", "MYS", "MHL", "FSM", "MNG", "MMR", "NRU", "NCL", "NZL", "MNP", "PLW", "PNG", "PHL", "WSM", "SGP", "SLB", "THA", "TLS", "TON", "TUV", "VUT", "VNM"];
var midleEastAndNorthAfrica = ["DZA", "BHR", "DJI", "EGY", "IRN", "IRQ", "ISR", "JOR", "KWT", "LBN", "LBY", "MLT", "MAR", "OMN", "QAT", "SAU", "SYR", "TUN", "ARE", "PSE", "YEM"];
var regions = ["EAS", "ECS", "LCN", "MEA", "NAC", "SAS", "SSF", "ARB", "CEB", "CSS", "EMU", "EUU", "OSS", "PSS", "SST", "WLD"];
var other = ["EAR", "FCS", "INX", "LDC", "LTE", "OED", "PRE", "PST", "IBD", "IDA", "IDB", "IDX"];
var regionsIDAandIBRD = ["IBT", "TEA", "TEC", "TLA", "TMN", "TSA", "TSS"];
var southAsia = ["AFG", "BGD", "BTN", "IND", "MDV", "NPL", "PAK", "LKA"];
var regionsExcludingHighIncome = ["EAP", "ECA", "LAC", "MNA", "SSA"];
var incomeLevel = ["LIC", "LMC", "LMY", "MIC", "UMC", "HIC", "HPC"];
var northAmerica = ["BMU", "CAN", "USA"];
