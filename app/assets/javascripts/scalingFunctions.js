//Creating a scale function for the circle radius.
function radiusScale(maxData, minData, radiusMax, radiusMin) {
  return d3.scaleLinear()
           .domain([minData, maxData])
           .range([radiusMin, radiusMax]);
};//End of radius scale function.

//Creating a scale function for the circle X.
function xCircleScale(maxData, minData, windowWidth, rightMargin, leftMargin, radiusMax) {
  return d3.scaleLinear()
           .domain([minData, maxData])
           .range([0, ((windowWidth - rightMargin - leftMargin) - (radiusMax * 2))]);
};//End of X circle scale function.

//Creating a scale function for the circle Y.
function yCircleScale(maxData, minData, windowHeight, topMargin, bottomMargin, radiusMax) {
  return d3.scaleLinear()
           .domain([minData, maxData])
           .range([((windowHeight - topMargin - bottomMargin) - (radiusMax * 2)), 0]);
};//End of Y circle scale function.

//Creating a scale function for the X Axis.
function xAxisScale(maxData, minData, windowWidth, rightMargin, leftMargin) {
  return d3.scaleLinear()
           .domain([minData, maxData])
           .range([0, (windowWidth - rightMargin - leftMargin)]);
};//End of X axis scale function.

//Creating a scale function for the Y Axis.
function yAxisScale(maxData, minData, windowHeight, topMargin, bottomMargin) {
  return d3.scaleLinear()
           .domain([minData, maxData])
           .range([(windowHeight - topMargin - bottomMargin), 0]);
};//End of Y axis scale function.

//This function will return the first value of a 'Country Object' that is not and empty string...
//ELSE it returns the string ‘No Data’...
//Within a specified date range.
function firstValidData(country, firstYear, lastYear) {

  //Checking if the first year is valid data and returning the value.
  if (country[firstYear] !== "") {
    return country[firstYear];
  } else {

    //Because the first year was not valid...
    //We now loop through the remainder of the date range.
    for (var y = firstYear + 1; y <= lastYear; y++) {

      //Return the first valid data value.
      if (country[y] !== "") {
        return country[y];
      };

    };//End of date loop.

    //Return ‘No Data’ if no valid data was found within the specified date range.
    return "No Data"

  };//End of valid data check.
};//End of 'First Valid Data' function.

//Finding the min/max data value of all countries from the given dataset...
//Within a specified date range.
function CheckMinMax(minORmax, data, firstYear, lastYear) {

  //An array for storing the min/max values from each ‘Country Object’.
  var countryValuesArray = [];

  //Looping over the given array of ‘Country Objects’.
  for (var i = 0; i < data.length; i++) {

    //Assigning the 'Country Value' variable to the first valid data value for this (i) 'Country Object'.
    var countryValue = firstValidData(data[i], firstYear, lastYear);

    //Only execute the following block if there is data available for this (i) 'Country Object'.
    if (countryValue !== "No Data") {

      //Looping through each year of this (i) ‘Country Object’.
      for (var y = firstYear; y <= lastYear; y++) {

        //Checking if this is a MAX call.
        if (minORmax === "MAX") {

          //IF the value of the current year (y) is greater than the 'Country Value' variable...
          //Reassign the 'Country Value' variable to the value of the current year.
          if (data[i][y] > countryValue && data[i][y] !== "") {
            countryValue = data[i][y]
          };

        //Checking if this is a MIN call.
        } else if (minORmax === "MIN") {

          //IF the value of the current year (y) is less than the 'Country Value' variable...
          //Reassign the 'Country Value' variable to the value of the current year.
          if (data[i][y] < countryValue && data[i][y] !== "") {
            countryValue = data[i][y]
          };

        } else {
          console.log("Error in min/max variables!");
        };//End of 'Country Value' variable assignment.
      };//End of date loop.
    };//End of ‘No Data’ Check.

    //Pushing 'Country Value' variable into 'Country Values Array'...
    //IF data is available for this (i) ‘Country Object’.
    if (countryValue !== "No Data") {
      countryValuesArray.push(countryValue);
    };

  };//End of country loop.

  //Assigning the 'Result' variable to the least or greatest value in the ‘Country Values Array’...
  //Checking if this is a MAX call.
  if (minORmax === "MAX") {

    var result = d3.max(countryValuesArray, function(d) { return d; });

  //Checking if this is a MIN call.
  } else if (minORmax === "MIN") {

    var result = d3.min(countryValuesArray, function(d) { return d; });

  } else {
    console.log("Error in min/max variables!");
  };//End of 'Result' variable assignment.

  return result;

};//End of 'Check Min/Max' function.

//A function to scale, compile and reformat the selected datasets...
//Within a specified date range.
function scaleAllData(rData, xData, yData, rScale, xCircleS, yCircleS, firstYear, lastYear) {

  //Array for storing the new ‘Country Objects’ to be created.
  var newData = [];

  //Looping over the existing array of ‘Country Objects’.
  for (var i = 0; i < rData.length; i++) {

    //Looping over the full date range for each ‘Country Object’.
    for (var y = firstYear; y <= lastYear; y++) {

      //Creating a new ‘Country Object’ with scaled data from each dataset...
      //Pushing it onto the ‘New Data’ array.
      newData.push({
        "year": y,
        "name": rData[i]["Country Name"],
        "code": rData[i]["Country Code"],
        "r": rScale(rData[i][y]),
        "x": xCircleS(xData[i][y]),
        "y": yCircleS(yData[i][y])
      });

    };//End of year loop.
  };//End of country loop.

  return newData;

};//End of 'Scale All Data' function.
