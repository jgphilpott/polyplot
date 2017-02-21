// A function for retrieving the currently selected datasets.
function getData() {

  // Creating the 'Graph Data' variable as an empty array to be populated by the 'Organize' function.
  graphData = [];

  // The following AJAX calls retrieve a JSON blob using the 'Dataset Keys' array...
  // These calls are synchronous because we can’t proceed without our data.
  for (var i = 0; i < datasetKeys.length; i++) {

    // This is the AJAX call.
    $.ajax({

      // Specifying the parameters of our call.
      url: "/data/" + datasetKeys[i] + ".json",
      method: "GET",
      dataType: "json",
      async: false

    // This only executes if the AJAX call was successful.
    }).done(function(data) {

      // The following code block resets the min/max variables on each ‘Get Data’ function call.
      if (i === 0) {
        rDataMax = undefined;
        rDataMin = undefined;
      } else if (i === 1) {
        xAxisLabel = data[0]["Indicator Name"];
        xDataMax = undefined;
        xDataMin = undefined;
      } else if (i === 2) {
        yAxisLabel = data[0]["Indicator Name"];
        yDataMax = undefined;
        yDataMin = undefined;
      } else {
        console.log("Error in 'Get Data' function!");
      };

      //Calling the 'Organize' function on the response data.
      organize(data, i);

    // This only executes if the AJAX call failed.
    }).fail(function() {

      // Loging an error.
      console.log("Failed to retrieve the requested dataset!");

    });// End of AJAX call.
  };// End of 'Dataset Keys' loop.
};// End of 'Get Data' function.

// A function for organizing the currently selected datasets.
function organize(data, index) {

  // Creating the 'Country Objects' array to store the result of the following operations.
  var countryObjects = [];

  // Creating and sorting a concatenate array of the selected geographic and/or income level catagories.
  var countryCodesArray = [];
  countryCodesArray = countryCodesArray.concat(europeAndCentralAsia, subSaharanAfrica, latinAmericaAndCaribbean, eastAsiaAndPacific, midleEastAndNorthAfrica, southAsia, northAmerica);
  countryCodesArray.sort();

  // Cloning the individual category arrays for splicing.
  var EuropeAndCentralAsia = europeAndCentralAsia.slice();
  var SubSaharanAfrica = subSaharanAfrica.slice();
  var LatinAmericaAndCaribbean = latinAmericaAndCaribbean.slice();
  var EastAsiaAndPacific = eastAsiaAndPacific.slice();
  var MidleEastAndNorthAfrica = midleEastAndNorthAfrica.slice();
  var SouthAsia = southAsia.slice();
  var NorthAmerica = northAmerica.slice();

  // Looping over the current dataset.
  for (var i = 0; i < data.length; i++) {

    // For each object in the current dataset, loop over the 'Country Codes Array' checking for a matching code.
    for (var j = 0; j < countryCodesArray.length; j++) {

      // If a matching code is found then execute the following operations.
      if (data[i]["Country Code"] === countryCodesArray[j]) {

        // Splice the 'Country Codes Array' at the current index, so that we don’t double check codes that have already been matched.
        countryCodesArray.splice(j, 1);

        // Checking if this is the first dataset being passed to the 'Organize' function...
        // 'Index' here refers to the argument passed in by the 'Get Data' function.
        if (index === 0) {

          // For the currently matched object, iterate over the full date range.
          for (var k = firstYear; k <= lastYear; k++) {

            // Pushing a new object into the 'Country Objects' array with the current year, code and corresponding data value...
            // The "R" key will be used to calculate the radius for this Country Object.
            countryObjects.push({
              "Year": k,
              "Code": data[i]["Country Code"],
              "R": data[i][k]
            });

            // The following code block is used to assign the 'R Data Max' variable.
            if (rDataMax !== undefined && data[i][k] !== "" && data[i][k] > rDataMax) {
              rDataMax = data[i][k];
            } else if (rDataMax === undefined && data[i][k] !== "") {
              rDataMax = data[i][k];
            };

            // The following code block is used to assign the 'R Data Min' variable.
            if (rDataMin !== undefined && data[i][k] !== "" && data[i][k] < rDataMin) {
              rDataMin = data[i][k];
            } else if (rDataMin === undefined && data[i][k] !== "") {
              rDataMin = data[i][k];
            };

            // The following loops are used to determine which category the current data object belongs in, and colors it appropriately.
            // 'Match' is a boolean variable used to 'continue' the year loop after a match is found.
            var match = false;

            // Looping over the first category array.
            for (var l = 0; l < EuropeAndCentralAsia.length; l++) {

              // Checking if the current index in the category array matches the current data object code.
              if (EuropeAndCentralAsia[l] === data[i]["Country Code"]) {

                // Switch the match variable to true.
                match = true;

                // Find the current object in the 'Country Objects' array and assign the appropriate color for this category.
                countryObjects[k - firstYear]["Colour"] = colors[1];

                // Break the category array loop, so that we don’t pointlessly iterate after a match has already been found.
                break;
              };// End of matching code check.
            };// End of category array loop.

            // If a match was found in the preceding category array loop then, skip the following category array loops and continue with the next iteration in the year (k) loop.
            if (match) { continue; }

            // The following category array loops are essentially identical to the first one, so no comments will be provided.

            for (var l = 0; l < SubSaharanAfrica.length; l++) {
              if (SubSaharanAfrica[l] === data[i]["Country Code"]) {
                match = true;
                countryObjects[k - firstYear]["Colour"] = colors[6];
                break;
              };
            };

            if (match) { continue; }

            for (var l = 0; l < LatinAmericaAndCaribbean.length; l++) {
              if (LatinAmericaAndCaribbean[l] === data[i]["Country Code"]) {
                match = true;
                countryObjects[k - firstYear]["Colour"] = colors[2];
                break;
              };
            };

            if (match) { continue; }

            for (var l = 0; l < EastAsiaAndPacific.length; l++) {
              if (EastAsiaAndPacific[l] === data[i]["Country Code"]) {
                match = true;
                countryObjects[k - firstYear]["Colour"] = colors[0];
                break;
              };
            };

            if (match) { continue; }

            for (var l = 0; l < MidleEastAndNorthAfrica.length; l++) {
              if (MidleEastAndNorthAfrica[l] === data[i]["Country Code"]) {
                match = true;
                countryObjects[k - firstYear]["Colour"] = colors[3];
                break;
              };
            };

            if (match) { continue; }

            for (var l = 0; l < SouthAsia.length; l++) {
              if (SouthAsia[l] === data[i]["Country Code"]) {
                match = true;
                countryObjects[k - firstYear]["Colour"] = colors[5];
                break;
              };
            };

            if (match) { continue; }

            for (var l = 0; l < NorthAmerica.length; l++) {
              if (NorthAmerica[l] === data[i]["Country Code"]) {
                match = true;
                countryObjects[k - firstYear]["Colour"] = colors[4];
                break;
              };
            };
          };// End of year (k) loop.

        // Pushing the 'Country Objects' array into the 'Graph Data' array.
        graphData.push(countryObjects);

        // Clearing the 'Country Objects' array for the next iteration.
        countryObjects = [];

        // Checking if this is the second or third dataset being passed to the 'Organize' function...
        // 'Index' here refers to the argument passed in by the 'Get Data' function.
        } else if (index === 1 || index === 2) {

          // Looping over the 'Graph Data' array.
          for (var k = 0; k < graphData.length; k++) {

            // Checking if the current index in the 'Graph Data' array has a code that matches the current data object code.
            if (graphData[k][0]["Code"] === data[i]["Country Code"]) {

              // Iterate over each object  in the matched Country Objects array.
              for (var l = 0; l < graphData[k].length; l++) {

                // Checking if this is the second dataset being passed to the 'Organize' function...
                if (index === 1) {

                  // Assigning the “X” key in the country object to the appropriate data value.
                  graphData[k][l]["X"] = data[i][graphData[k][l]["Year"]];

                  // The following code block is used to assign the 'X Data Max' variable.
                  if (xDataMax !== undefined && data[i][graphData[k][l]["Year"]] !== "" && data[i][graphData[k][l]["Year"]] > xDataMax) {
                    xDataMax = data[i][graphData[k][l]["Year"]];
                  } else if (xDataMax === undefined && data[i][graphData[k][l]["Year"]] !== "") {
                    xDataMax = data[i][graphData[k][l]["Year"]];
                  };

                  // The following code block is used to assign the 'X Data Min' variable.
                  if (xDataMin !== undefined && data[i][graphData[k][l]["Year"]] !== "" && data[i][graphData[k][l]["Year"]] < xDataMin) {
                    xDataMin = data[i][graphData[k][l]["Year"]];
                  } else if (xDataMin === undefined && data[i][graphData[k][l]["Year"]] !== "") {
                    xDataMin = data[i][graphData[k][l]["Year"]];
                  };

                // Checking if this is the third dataset being passed to the 'Organize' function...
                } else if (index === 2) {

                  // Assigning the “Y” key in the country object to the appropriate data value.
                  graphData[k][l]["Y"] = data[i][graphData[k][l]["Year"]];

                  // The following code block is used to assign the 'Y Data Max' variable.
                  if (yDataMax !== undefined && data[i][graphData[k][l]["Year"]] !== "" && data[i][graphData[k][l]["Year"]] > yDataMax) {
                    yDataMax = data[i][graphData[k][l]["Year"]];
                  } else if (yDataMax === undefined && data[i][graphData[k][l]["Year"]] !== "") {
                    yDataMax = data[i][graphData[k][l]["Year"]];
                  };

                  // The following code block is used to assign the 'Y Data Min' variable.
                  if (yDataMin !== undefined && data[i][graphData[k][l]["Year"]] !== "" && data[i][graphData[k][l]["Year"]] < yDataMin) {
                    yDataMin = data[i][graphData[k][l]["Year"]];
                  } else if (yDataMin === undefined && data[i][graphData[k][l]["Year"]] !== "") {
                    yDataMin = data[i][graphData[k][l]["Year"]];
                  };

                };// End of index check.
              };// End of 'Country Objects' array loop.

              // Breaking the 'Graph Data' array loop if a matching code was found.
              break;
            };// End of matching code check.
          };// End of 'Graph Data' loop.

        // If no matching index was found.
        } else {

          // Logging an error.
          console.log("Error in 'Organize' function!");
        };

        // Breaking the 'Country Codes Array' loop, so that we don’t pointlessly iterate after a match has already been found.
        break;
      };// End of 'Country Codes Array' matching code check.
    };// End of 'Country Codes Array' loop.
  };// End of 'Data' loop.
};// End of 'Organize' function.
