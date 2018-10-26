// A function that defines how to draw the filter menu.
function drawFiltersMenu() {

  drawRegionsExceptionList = [];
  drawCountriesExceptionList = [];
  openFoldersList = [];

  // Checking if the corresponding 'Open' variable is true.
  if (iconFourOpen) {

    // Reassigning the 'Menu Size' variable.
    menuSize = 355;

    // Declaring the 'Total Extension' variable to track how far the menu expends past the window height.
    var totalExtension = 0;

    // Declaring a variable to control the spacing of elements.
    var spaceing = 20;

    // Declaring an array of strings equal to the 'Geographic Region Names' array in a class name format.
    var classifiedGeographicRegionNames = geographicRegionNames.map(function(item) {
      return item.replace(/&/g, "and").replace(/\s/g, "-").toLowerCase();
    });

    // Adding category folders and filter controls.
    for (var i = 0; i < geographicRegionNames.length; i++) {

      menu.append("rect")
          .attr("class", "icon-four-item " + classifiedGeographicRegionNames[i] + " colour-legend")
          .attr("width", 13)
          .attr("height", 13)
          .attr("x", 66)
          .attr("y", 12 + (i * spaceing))
          .style("fill", colors[i]);

      menu.append("rect")
          .attr("class", "icon-four-item " + classifiedGeographicRegionNames[i] + " checkbox-unchecked-background")
          .attr("width", 11)
          .attr("height", 11)
          .attr("x", 88.5)
          .attr("y", 12.5 + (i * spaceing));

      menu.append("path")
          .attr("class", "icon-four-item " + classifiedGeographicRegionNames[i] + " checkbox-unchecked")
          .attr("transform", "translate(86, " + (10 + (i * spaceing)) + ")")
          .attr("d", "M14 0h-12c-1.1 0-2 0.9-2 2v12c0 1.1 0.9 2 2 2h12c1.1 0 2-0.9 2-2v-12c0-1.1-0.9-2-2-2zM14 14h-12v-12h12v12z");

      menu.append("rect")
          .attr("class", "icon-four-item " + classifiedGeographicRegionNames[i] + " checkbox-checked-background")
          .attr("width", 11)
          .attr("height", 11)
          .attr("x", 88.5)
          .attr("y", 12.5 + (i * spaceing))
          .attr("visibility", function() {

            for (var j = 0; j < drawRegionsExceptionList.length; j++) {
              if (drawRegionsExceptionList[j] === classifiedGeographicRegionNames[i]) {

                return "hidden";

              };
            };

            return "visible";

          });

      menu.append("path")
          .attr("class", "icon-four-item " + classifiedGeographicRegionNames[i] + " checkbox-checked")
          .attr("transform", "translate(86, " + (10 + (i * spaceing)) + ")")
          .attr("d", "M14 0h-12c-1.1 0-2 0.9-2 2v12c0 1.1 0.9 2 2 2h12c1.1 0 2-0.9 2-2v-12c0-1.1-0.9-2-2-2zM7 12.414l-3.707-3.707 1.414-1.414 2.293 2.293 4.793-4.793 1.414 1.414-6.207 6.207z")
          .attr("visibility", function() {

            for (var j = 0; j < drawRegionsExceptionList.length; j++) {
              if (drawRegionsExceptionList[j] === classifiedGeographicRegionNames[i]) {

                return "hidden";

              };
            };

            return "visible";

          });

      menu.append("rect")
          .attr("class", "icon-four-item " + classifiedGeographicRegionNames[i] + " folder-minus-background")
          .attr("width", 7)
          .attr("height", 7)
          .attr("x", 114)
          .attr("y", 16 + (i * spaceing))
          .attr("visibility", "hidden");

      menu.append("path")
          .attr("class", "icon-four-item " + classifiedGeographicRegionNames[i] + " folder-minus")
          .attr("transform", "translate(109, " + (10 + (i * spaceing)) + ")")
          .attr("d", "M9 3.5l-2-2h-7v13h16v-11h-7zM11 10.5h-6v-2h6v2z")
          .attr("visibility", "hidden");

      menu.append("rect")
          .attr("class", "icon-four-item " + classifiedGeographicRegionNames[i] + " folder-plus-background")
          .attr("width", 7)
          .attr("height", 7)
          .attr("x", 114)
          .attr("y", 16 + (i * spaceing));

      menu.append("path")
          .attr("class", "icon-four-item " + classifiedGeographicRegionNames[i] + " folder-plus")
          .attr("transform", "translate(109, " + (10 + (i * spaceing)) + ")")
          .attr("d", "M9 3.5l-2-2h-7v13h16v-11h-7zM11 10.5h-2v2h-2v-2h-2v-2h2v-2h2v2h2v2z");

      menu.append("text")
          .attr("class", "icon-four-item " + classifiedGeographicRegionNames[i] + " menu-title")
          .attr("x", 130)
          .attr("y",  20 + (i * spaceing))
          .attr("dy", ".35em")
          .text(geographicRegionNames[i]);

    };

    // A function to transition all the currently drawn objects when opening/closing a folder.
    function transitionObjects(index, extension) {

      // Looping over the list of 'Classified Geographic Region Names' array.
      for (var i = 0; i < classifiedGeographicRegionNames.length; i++) {

        // Checking if the current loop index is greater than the 'Index' argument.
        if (i > index) {

          // Saving all elements below the folder being opened/closed into variables.
          var colourLegend = $("." + classifiedGeographicRegionNames[i] + ".colour-legend");
          var checkboxUnchecked = $("." + classifiedGeographicRegionNames[i] + ".checkbox-unchecked");
          var checkboxUncheckedBackground = $("." + classifiedGeographicRegionNames[i] + ".checkbox-unchecked-background");
          var subCheckboxUnchecked = $("." + classifiedGeographicRegionNames[i] + "-country.sub-checkbox-unchecked");
          var subCheckboxUncheckedBackground = $("." + classifiedGeographicRegionNames[i] + "-country.sub-checkbox-unchecked-background");
          var checkboxChecked = $("." + classifiedGeographicRegionNames[i] + ".checkbox-checked");
          var checkboxCheckedBackground = $("." + classifiedGeographicRegionNames[i] + ".checkbox-checked-background");
          var subCheckboxChecked = $("." + classifiedGeographicRegionNames[i] + "-country.sub-checkbox-checked");
          var subCheckboxCheckedBackground = $("." + classifiedGeographicRegionNames[i] + "-country.sub-checkbox-checked-background");
          var folderMinus = $("." + classifiedGeographicRegionNames[i] + ".folder-minus");
          var folderMinusBackground = $("." + classifiedGeographicRegionNames[i] + ".folder-minus-background");
          var folderPlus = $("." + classifiedGeographicRegionNames[i] + ".folder-plus");
          var folderPlusBackground = $("." + classifiedGeographicRegionNames[i] + ".folder-plus-background");
          var menuTitle = $("." + classifiedGeographicRegionNames[i] + ".menu-title");
          var menuText = $("." + classifiedGeographicRegionNames[i] + "-country.menu-text");

          // The following code blocks transition each element from its curent location to it's new location based on the 'Extension' variable.

          d3.selectAll("." + classifiedGeographicRegionNames[i] + ".colour-legend")
            .transition()
            .duration(1)
            .ease(d3.easeLinear)
            .attr("y", extension + Number(colourLegend[0].attributes[4].value));

          d3.selectAll("." + classifiedGeographicRegionNames[i] + ".checkbox-unchecked")
            .transition()
            .duration(1)
            .ease(d3.easeLinear)
            .attr("transform", "translate(86, " + (extension + checkboxUnchecked[0].transform.animVal[0].matrix.f) + ")");

          d3.selectAll("." + classifiedGeographicRegionNames[i] + ".checkbox-unchecked-background")
            .transition()
            .duration(1)
            .ease(d3.easeLinear)
            .attr("y", extension + Number(checkboxUncheckedBackground[0].attributes[4].value));

          d3.selectAll("." + classifiedGeographicRegionNames[i] + ".checkbox-checked")
            .transition()
            .duration(1)
            .ease(d3.easeLinear)
            .attr("transform", "translate(86, " + (extension + checkboxChecked[0].transform.animVal[0].matrix.f) + ")");

          d3.selectAll("." + classifiedGeographicRegionNames[i] + ".checkbox-checked-background")
            .transition()
            .duration(1)
            .ease(d3.easeLinear)
            .attr("y", extension + Number(checkboxCheckedBackground[0].attributes[4].value));

          d3.selectAll("." + classifiedGeographicRegionNames[i] + ".folder-minus")
            .transition()
            .duration(1)
            .ease(d3.easeLinear)
            .attr("transform", "translate(109 " + (extension + folderMinus[0].transform.animVal[0].matrix.f) + ")");

          d3.selectAll("." + classifiedGeographicRegionNames[i] + ".folder-minus-background")
            .transition()
            .duration(1)
            .ease(d3.easeLinear)
            .attr("y", extension + Number(folderMinusBackground[0].attributes[4].value));

          d3.selectAll("." + classifiedGeographicRegionNames[i] + ".folder-plus")
            .transition()
            .duration(1)
            .ease(d3.easeLinear)
            .attr("transform", "translate(109 " + (extension + folderPlus[0].transform.animVal[0].matrix.f) + ")");

          d3.selectAll("." + classifiedGeographicRegionNames[i] + ".folder-plus-background")
            .transition()
            .duration(1)
            .ease(d3.easeLinear)
            .attr("y", extension + Number(folderPlusBackground[0].attributes[4].value));

          d3.selectAll("." + classifiedGeographicRegionNames[i] + ".menu-title")
            .transition()
            .duration(1)
            .ease(d3.easeLinear)
            .attr("y", extension + Number(menuTitle[0].attributes[2].value));

          // Checking if sub folder items exist for this region...
          if (menuText.length !== 0) {

            // Looping over the array of 'Sub Unchecked Boxs'.
            // Applying the same transition as above for each sub element.
            for (var j = 0; j < subCheckboxUnchecked.length; j++) {

              d3.selectAll("." + subCheckboxUnchecked[j].classList[2] + ".sub-checkbox-unchecked")
                .transition()
                .duration(1)
                .ease(d3.easeLinear)
                .attr("transform", "translate(135, " + (extension + subCheckboxUnchecked[j].transform.animVal[0].matrix.f) + ")");

              d3.selectAll("." + subCheckboxUncheckedBackground[j].classList[2] + ".sub-checkbox-unchecked-background")
                .transition()
                .duration(1)
                .ease(d3.easeLinear)
                .attr("y", extension + Number(subCheckboxUncheckedBackground[j].attributes[4].value));

              d3.selectAll("." + menuText[j].classList[2] + ".menu-text")
                .transition()
                .duration(1)
                .ease(d3.easeLinear)
                .attr("y", extension + Number(menuText[j].attributes[2].value));

            };

            // Looping over the array of 'Sub Checked Boxs'.
            // Applying the same transition as above for each sub element.
            for (var j = 0; j < subCheckboxChecked.length; j++) {

              d3.selectAll("." + subCheckboxChecked[j].classList[2] + ".sub-checkbox-checked")
                .transition()
                .duration(1)
                .ease(d3.easeLinear)
                .attr("transform", "translate(135, " + (extension + subCheckboxChecked[j].transform.animVal[0].matrix.f) + ")");


              d3.selectAll("." + subCheckboxCheckedBackground[j].classList[2] + ".sub-checkbox-checked-background")
                .transition()
                .duration(1)
                .ease(d3.easeLinear)
                .attr("y", extension + Number(subCheckboxCheckedBackground[j].attributes[4].value));

            };
          };// End of 'Sub Items' check.
        };// End of 'Index' check.
      };// End of 'Classified Geographic Region Names' array loop.
    };// End of 'Transition Objects' function.

    // A function that defines how to open a category folder.
    function openFolder(folderName, category) {

      // Saving the index of the ‘Classified Geographic Region Names’ array that matches the ‘Folder Name’.
      for (var i = 0; i < classifiedGeographicRegionNames.length; i++) {
        if (classifiedGeographicRegionNames[i] === folderName) {
          var index = i;
        };
      };

      // Declaring the 'Starting Point' variable as equal to the curent folders 'y' value.
      var startingPoint = Number($("." + classifiedGeographicRegionNames[index] + ".menu-title")[0].attributes[2].value);

      // Determining the extension variable for this category.
      var extension = category.length * spaceing;

      // Reassigning the 'Total Extension' variable with the addition of the 'Extension' variable.
      totalExtension = totalExtension + extension;

      // Checking if the extended menu height is greter than the window height.
      if ((graphZoneHeight + 3.51 + (totalExtension - graphZoneHeight + 3.51) + (classifiedGeographicRegionNames.length * spaceing) + spaceing/2) > (graphZoneHeight + 3.51)) {

        // Transitioning the menu height.
        menu.transition()
            .duration(1)
            .ease(d3.easeLinear)
            .attr("height", graphZoneHeight + 3.51 + (totalExtension - graphZoneHeight + 3.51) + (classifiedGeographicRegionNames.length * spaceing) + spaceing/2)

        // Transitioning the menu background height.
        menuBackground.transition()
                      .duration(1)
                      .ease(d3.easeLinear)
                      .attr("height", graphZoneHeight + 7.51 + (totalExtension - graphZoneHeight + 7.51) + (classifiedGeographicRegionNames.length * spaceing) + spaceing/2)

      };// End of menu height check.

      // Transitioning existing objects to make room for the new 'Sub Folder Objects'.
      transitionObjects(index, extension);

      // A function that defines how to draw the 'Country Filter Objects'.
      function addSubFolderObjects(objectName, data) {

        // Declaring a string equal to the current 'Object Name' in class name format.
        var classifiedCountryName = objectName.replace(/[.,\/#!$%\^&\*;:{}=\-_`'’~()]/g, "").replace(/\s/g, "-").toLowerCase();

        // Appending the 'Unchecked Checkbox Background'.
        menu.append("rect")
            .attr("class", function() {

              // Checking if there is data available for this country...
              // Adding an additional ‘no-data’ class if false.
              if (data) {
                return "icon-four-item " + classifiedGeographicRegionNames[index] + "-country " + classifiedCountryName + " sub-checkbox-unchecked-background";
              } else {
                return "icon-four-item " + classifiedGeographicRegionNames[index] + "-country " + classifiedCountryName + " sub-checkbox-unchecked-background no-data";
              };
            })
            .attr("width", 5.8)
            .attr("height", 5.8)
            .attr("x", 137)
            .attr("y", startingPoint + 17 + (j * spaceing));

        // Appending the 'Unchecked Checkbox'.
        menu.append("path")
            .attr("class", function() {
              if (data) {
                return "icon-four-item " + classifiedGeographicRegionNames[index] + "-country " + classifiedCountryName + " sub-checkbox-unchecked";
              } else {
                return "icon-four-item " + classifiedGeographicRegionNames[index] + "-country " + classifiedCountryName + " sub-checkbox-unchecked no-data";
              };
            })
            .attr("transform", "translate(135, " + (startingPoint + 15 + (j * spaceing)) + ")")
            .attr("d", "M8.4 0h-7.2c-0.66 0-1.2 0.54-1.2 1.2v7.2c0 0.66 0.54 1.2 1.2 1.2h7.2c0.66 0 1.2-0.54 1.2-1.2v-7.2c0-0.66-0.54-1.2-1.2-1.2zM8.4 8.4h-7.2v-7.2h7.2v7.2z");

        // Checking if there is data available for this country.
        if (data) {

          // Appending the 'Checked Checkbox Background'.
          menu.append("rect")
              .attr("class", "icon-four-item " + classifiedGeographicRegionNames[index] + "-country " + classifiedCountryName + " sub-checkbox-checked-background")
              .attr("width", 5.8)
              .attr("height", 5.8)
              .attr("x", 137)
              .attr("y", startingPoint + 17 + (j * spaceing))
              .attr("visibility", function() {

                // Looping over the 'Countries Exception List' array.
                for (var k = 0; k < drawCountriesExceptionList.length; k++) {

                  // Checking if the current countries name is included in the list.
                  if (drawCountriesExceptionList[k] === classifiedCountryName) {
                    return "hidden";
                  };
                };

                // If no match is found in the exception list...
                return "visible";

              });

          // Appending the 'Checked Checkbox'.
          menu.append("path")
              .attr("class", "icon-four-item " + classifiedGeographicRegionNames[index] + "-country " + classifiedCountryName + " sub-checkbox-checked")
              .attr("transform", "translate(135, " + (startingPoint + 15 + (j * spaceing)) + ")")
              .attr("d", "M8.4 0h-7.2c-0.66 0-1.2 0.54-1.2 1.2v7.2c0 0.66 0.54 1.2 1.2 1.2h7.2c0.66 0 1.2-0.54 1.2-1.2v-7.2c0-0.66-0.54-1.2-1.2-1.2zM4.2 7.449l-2.224-2.224 0.849-0.849 1.376 1.376 2.876-2.876 0.849 0.849-3.724 3.724z")
              .attr("visibility", function() {
                for (var k = 0; k < drawCountriesExceptionList.length; k++) {
                  if (drawCountriesExceptionList[k] === classifiedCountryName) {
                    return "hidden";
                  };
                };
                return "visible";
              });

        };

        // Appending the current countries name as a label.
        menu.append("text")
            .attr("class", function() {

              // Checking if there is data available for this country...
              // Adding an additional ‘menu-no-data-text’ class if false.
              if (data) {
                return "icon-four-item " + classifiedGeographicRegionNames[index] + "-country " + classifiedCountryName + " menu-text";
              } else {
                return "icon-four-item " + classifiedGeographicRegionNames[index] + "-country " + classifiedCountryName + " menu-text menu-no-data-text"
              };
            })
            .attr("x", 150)
            .attr("y", startingPoint + 20 + (j * spaceing))
            .attr("dy", ".35em")
            .text(objectName);

      };// End of 'Add Sub Folder Objects' function.

      // Looping over the 'Graph Data' array.
      for (var i = 0; i < graphData.length; i++) {

        // Looping over the current 'Category' array.
        for (var j = 0; j < category.length; j++) {

          // Checking if the first object at the current 'Graph Data' index has a code that matches the current 'Category' index.
          if (graphData[i][0].Code === category[j]) {

            // Looping over the array located at 'i' of the 'Scaled Graph Data' array.
            for (var k = 0; k < scaledGraphData[i].length; k++) {

              // Checking if the year of the object at the current index matches the 'Curent Year' variable.
              if (scaledGraphData[i][k].Year === currentYear) {

                // Declaring 'Data' to be true and calling the function that adds the current country object to the list.
                var data = true;
                addSubFolderObjects(graphData[i][0].Name, data);
                break;

              } else if (scaledGraphData[i][k].Year >= currentYear) {

                // If no object was found with a year matching the 'Curent Year'...
                // Call the function that adds the current country object to the list, without the 'Data' argument.
                addSubFolderObjects(graphData[i][0].Name);
                break;

              };// End of 'Current Year' check.
            };// End of 'Scaled Graph Data' array loop.

            // Checking the length of the array located at 'i' of the 'Scaled Graph Data' array.
            if (scaledGraphData[i].length === 0) {

              // Call the function that adds the current country object to the list, without the 'Data' argument.
              addSubFolderObjects(graphData[i][0].Name);

            };// End of length check.

            // Breaking the 'Category' array loop.
            break;

          };// End of matching code check.
        };// End of 'Category' array loop.
      };// End of 'Graph Data' array loop.

      // Attaching an event handeler for clicking the 'Sub Checked Box'.
      $(".sub-checkbox-checked, .sub-checkbox-checked-background").click(function() {

        // Hideing the 'Sub Checked Box'.
        $("." + this.classList[2] + ".sub-checkbox-checked, ." + this.classList[2] + ".sub-checkbox-checked-background").css("visibility", "hidden");

        // Removing the corresponding 'Country Circle'.
        $("." + this.classList[2] + ".country-circle").remove();

        // Adding the corresponding 'Country Name' to the exception list.
        drawCountriesExceptionList.push(this.classList[2]);

      });// End of 'Sub Checked Box' event handeler.

      // Attaching an event handeler for clicking the 'Sub Unchecked Box'.
      $(".sub-checkbox-unchecked, .sub-checkbox-unchecked-background").click(function() {

        // Makeing the 'Sub Checked Box' visible.
        $("." + this.classList[2] + ".sub-checkbox-checked, ." + this.classList[2] + ".sub-checkbox-checked-background").css("visibility", "visible");

        // Looping over the 'Countries Exception List'...
        // Checking if the 'Country Name' of the clicked object matches the string at the index of the loop...
        // Removing the 'Country Name' from the exception list and breaking the loop.
        for (var i = 0; i < drawCountriesExceptionList.length; i++) {
          if (drawCountriesExceptionList[i] === this.classList[2]) {
            drawCountriesExceptionList.splice(i, 1);
            break;
          };
        };

        // Looping over the 'Regions Exception List'...
        // Checking if the 'Regions Name' of the clicked object matches the string at the index of the loop...
        // Removing the 'Regions Name' from the exception list and breaking the loop.
        for (var i = 0; i < drawRegionsExceptionList.length; i++) {
          if (drawRegionsExceptionList[i] === this.classList[1].replace(/-country/, "")) {
            drawRegionsExceptionList.splice(i, 1);
            $("." + this.classList[1].replace(/-country/, "") + ".checkbox-checked").css("visibility", "visible");
            break;
          };
        };

        // Removing and redrawing the 'Country Circles'.
        $(".country-circle").remove();
        drawCircles();

      });// End of 'Sub Unchecked Box' event handeler.

      // Attaching an event handeler for styleing the cursor while over the 'Sub Check Boxs'.
      $(".sub-checkbox-checked, .sub-checkbox-checked-background, .sub-checkbox-unchecked, .sub-checkbox-unchecked-background").mouseover(function() {

        // Checking if the 'Check Box' class list contains 'no-data' and styleing the cursor appropriatly.
        if (this.classList.contains("no-data")) {
          $(this).css("cursor", "not-allowed");
        } else {
          $(this).css("cursor", "pointer");
        };
      });// End of cursor styleing event handeler.
    };// End of 'Open Folder Function'.

    // A function that defines how to close a category folder.
    function closeFolder(folderName, category) {

      // Saving the index of the ‘Classified Geographic Region Names’ array that matches the ‘Folder Name’.
      for (var i = 0; i < classifiedGeographicRegionNames.length; i++) {
        if (classifiedGeographicRegionNames[i] === folderName) {
          var index = i;
        };
      };

      // Determining the extension variable for this category.
      var extension = -(category.length * 20);

      // Reassigning the 'Total Extension' variable with the addition of the 'Extension' variable.
      totalExtension = totalExtension + extension;

      // Checking if the extended menu height is greter than the window height.
      if ((graphZoneHeight + 3.51 + (totalExtension - graphZoneHeight + 3.51) + (classifiedGeographicRegionNames.length * spaceing) + spaceing/2) > (graphZoneHeight + 3.51)) {

        // Transitioning the menu height.
        menu.transition()
            .duration(1)
            .ease(d3.easeLinear)
            .attr("height", graphZoneHeight + 3.51 + (totalExtension - graphZoneHeight + 3.51) + (classifiedGeographicRegionNames.length * spaceing) + spaceing/2)

        // Transitioning the menu background height.
        menuBackground.transition()
                      .duration(1)
                      .ease(d3.easeLinear)
                      .attr("height", graphZoneHeight + 7.51 + (totalExtension - graphZoneHeight + 7.51) + (classifiedGeographicRegionNames.length * spaceing) + spaceing/2)

      } else {

        // Transitioning the menu height.
        menu.transition()
            .duration(1)
            .ease(d3.easeLinear)
            .attr("height", graphZoneHeight + 3.51)

        // Transitioning the menu background height.
        menuBackground.transition()
                      .duration(1)
                      .ease(d3.easeLinear)
                      .attr("height", graphZoneHeight + 7.51)

      } // End of menu height check.

      // Removing 'Sub Folder Objects'.
      $("." + folderName + "-country").remove();

      // Transitioning existing objects to account for the removal of the old 'Sub Folder Objects'.
      transitionObjects(index, extension);

    };// End of 'Close Folder' function.

    function modifyCountriesExceptionList(modify, category) {

      if (modify === "add") {
        for (var i = 0; i < graphData.length; i++) {
          for (var j = 0; j < category.length; j++) {
            if (category[j] === graphData[i][0].Code) {
              drawCountriesExceptionList.push(graphData[i][0].Name.replace(/[.,\/#!$%\^&\*;:{}=\-_`'’~()]/g, "").replace(/\s/g, "-").toLowerCase());
              break;
            };
          };
        };
      } else if (modify === "remove") {
        for (var i = 0; i < graphData.length; i++) {
          for (var j = 0; j < category.length; j++) {
            if (category[j] === graphData[i][0].Code) {
              for (var k = 0; k < drawCountriesExceptionList.length; k++) {
                if (drawCountriesExceptionList[k] === graphData[i][0].Name.replace(/[.,\/#!$%\^&\*;:{}=\-_`'’~()]/g, "").replace(/\s/g, "-").toLowerCase()) {
                  drawCountriesExceptionList.splice(k, 1);
                  break;
                };
              };
              break;
            };
          };
        };
      } else {
        console.log("Error in 'Modify Countries Exception List' function!");
      };
    };

    $(".checkbox-checked, .checkbox-checked-background").click(function() {

      $("." + this.classList[1] + ".checkbox-checked, ." + this.classList[1] + ".checkbox-checked-background").css("visibility", "hidden");

      $("." + this.classList[1] + ".country-circle").remove();

      drawRegionsExceptionList.push(this.classList[1]);

      var modify = "add";

      switch (this.classList[1]) {

        case "east-asia-and-pacific":

          modifyCountriesExceptionList(modify, eastAsiaAndPacific)

          for (var i = 0; i < openFoldersList.length; i++) {
            if (openFoldersList[i] === this.classList[1]) {
              $("." + this.classList[1] + "-country.sub-checkbox-checked").css("visibility", "hidden");
              $("." + this.classList[1] + "-country.sub-checkbox-checked-background").css("visibility", "hidden");
              break;
            };
          };

          break;

        case "europe-and-central-asia":

          modifyCountriesExceptionList(modify, europeAndCentralAsia);

          for (var i = 0; i < openFoldersList.length; i++) {
            if (openFoldersList[i] === this.classList[1]) {
              $("." + this.classList[1] + "-country.sub-checkbox-checked").css("visibility", "hidden");
              $("." + this.classList[1] + "-country.sub-checkbox-checked-background").css("visibility", "hidden");
              break;
            };
          };

          break;

        case "latin-america-and-caribbean":

          modifyCountriesExceptionList(modify, latinAmericaAndCaribbean);

          for (var i = 0; i < openFoldersList.length; i++) {
            if (openFoldersList[i] === this.classList[1]) {
              $("." + this.classList[1] + "-country.sub-checkbox-checked").css("visibility", "hidden");
              $("." + this.classList[1] + "-country.sub-checkbox-checked-background").css("visibility", "hidden");
              break;
            };
          };

          break;

        case "midle-east-and-north-africa":

          modifyCountriesExceptionList(modify, midleEastAndNorthAfrica);

          for (var i = 0; i < openFoldersList.length; i++) {
            if (openFoldersList[i] === this.classList[1]) {
              $("." + this.classList[1] + "-country.sub-checkbox-checked").css("visibility", "hidden");
              $("." + this.classList[1] + "-country.sub-checkbox-checked-background").css("visibility", "hidden");
              break;
            };
          };

          break;

        case "north-america":

          modifyCountriesExceptionList(modify, northAmerica);

          for (var i = 0; i < openFoldersList.length; i++) {
            if (openFoldersList[i] === this.classList[1]) {
              $("." + this.classList[1] + "-country.sub-checkbox-checked").css("visibility", "hidden");
              $("." + this.classList[1] + "-country.sub-checkbox-checked-background").css("visibility", "hidden");
              break;
            };
          };

          break;

        case "south-asia":

          modifyCountriesExceptionList(modify, southAsia);

          for (var i = 0; i < openFoldersList.length; i++) {
            if (openFoldersList[i] === this.classList[1]) {
              $("." + this.classList[1] + "-country.sub-checkbox-checked").css("visibility", "hidden");
              $("." + this.classList[1] + "-country.sub-checkbox-checked-background").css("visibility", "hidden");
              break;
            };
          };

          break;

        case "sub-saharan-africa":

          modifyCountriesExceptionList(modify, subSaharanAfrica);

          for (var i = 0; i < openFoldersList.length; i++) {
            if (openFoldersList[i] === this.classList[1]) {
              $("." + this.classList[1] + "-country.sub-checkbox-checked").css("visibility", "hidden");
              $("." + this.classList[1] + "-country.sub-checkbox-checked-background").css("visibility", "hidden");
              break;
            };
          };

          break;

        default:
          console.log("Error in checkbox checked switch!");

      };
    });

    $(".checkbox-unchecked, .checkbox-unchecked-background").click(function() {

      $("." + this.classList[1] + ".checkbox-checked, ." + this.classList[1] + ".checkbox-checked-background").css("visibility", "visible");

      for (var i = 0; i < drawRegionsExceptionList.length; i++) {
        if (drawRegionsExceptionList[i] === this.classList[1]) {
          drawRegionsExceptionList.splice(i, 1);
        };
      };

      var modify = "remove";

      switch (this.classList[1]) {

        case "east-asia-and-pacific":

          modifyCountriesExceptionList(modify, eastAsiaAndPacific);

          for (var i = 0; i < openFoldersList.length; i++) {
            if (openFoldersList[i] === this.classList[1]) {
              $("." + this.classList[1] + "-country.sub-checkbox-checked").css("visibility", "visible");
              $("." + this.classList[1] + "-country.sub-checkbox-checked-background").css("visibility", "visible");
            };
          };

          break;

        case "europe-and-central-asia":

          modifyCountriesExceptionList(modify, europeAndCentralAsia)

          for (var i = 0; i < openFoldersList.length; i++) {
            if (openFoldersList[i] === this.classList[1]) {
              $("." + this.classList[1] + "-country.sub-checkbox-checked").css("visibility", "visible");
              $("." + this.classList[1] + "-country.sub-checkbox-checked-background").css("visibility", "visible");
            };
          };

          break;

        case "latin-america-and-caribbean":

          modifyCountriesExceptionList(modify, latinAmericaAndCaribbean)

          for (var i = 0; i < openFoldersList.length; i++) {
            if (openFoldersList[i] === this.classList[1]) {
              $("." + this.classList[1] + "-country.sub-checkbox-checked").css("visibility", "visible");
              $("." + this.classList[1] + "-country.sub-checkbox-checked-background").css("visibility", "visible");
            };
          };

          break;

        case "midle-east-and-north-africa":

          modifyCountriesExceptionList(modify, midleEastAndNorthAfrica)
          break;

        case "north-america":

          modifyCountriesExceptionList(modify, northAmerica)

          for (var i = 0; i < openFoldersList.length; i++) {
            if (openFoldersList[i] === this.classList[1]) {
              $("." + this.classList[1] + "-country.sub-checkbox-checked").css("visibility", "visible");
              $("." + this.classList[1] + "-country.sub-checkbox-checked-background").css("visibility", "visible");
            };
          };

          break;

        case "south-asia":

          modifyCountriesExceptionList(modify, southAsia)

          for (var i = 0; i < openFoldersList.length; i++) {
            if (openFoldersList[i] === this.classList[1]) {
              $("." + this.classList[1] + "-country.sub-checkbox-checked").css("visibility", "visible");
              $("." + this.classList[1] + "-country.sub-checkbox-checked-background").css("visibility", "visible");
            };
          };

          break;

        case "sub-saharan-africa":

          modifyCountriesExceptionList(modify, subSaharanAfrica)

          for (var i = 0; i < openFoldersList.length; i++) {
            if (openFoldersList[i] === this.classList[1]) {
              $("." + this.classList[1] + "-country.sub-checkbox-checked").css("visibility", "visible");
              $("." + this.classList[1] + "-country.sub-checkbox-checked-background").css("visibility", "visible");
            };
          };

          break;

        default:
          console.log("Error in checkbox checked switch!");

      };

      $(".country-circle").remove();
      drawCircles();

    });

    $(".folder-plus, .folder-plus-background").click(function() {

      $("." + this.classList[1] + ".folder-plus, ." + this.classList[1] + ".folder-plus-background").css("visibility", "hidden");
      $("." + this.classList[1] + ".folder-minus, ." + this.classList[1] + ".folder-minus-background").css("visibility", "visible");

      switch (this.classList[1]) {

        case "east-asia-and-pacific":

          openFolder(this.classList[1], eastAsiaAndPacific);
          openFoldersList.push(this.classList[1]);
          break;

        case "europe-and-central-asia":

          openFolder(this.classList[1], europeAndCentralAsia);
          openFoldersList.push(this.classList[1]);
          break;

        case "latin-america-and-caribbean":

          openFolder(this.classList[1], latinAmericaAndCaribbean);
          openFoldersList.push(this.classList[1]);
          break;

        case "midle-east-and-north-africa":

          openFolder(this.classList[1], midleEastAndNorthAfrica);
          openFoldersList.push(this.classList[1]);
          break;

        case "north-america":

          openFolder(this.classList[1], northAmerica);
          openFoldersList.push(this.classList[1]);
          break;

        case "south-asia":

          openFolder(this.classList[1], southAsia);
          openFoldersList.push(this.classList[1]);
          break;

        case "sub-saharan-africa":

          openFolder(this.classList[1], subSaharanAfrica);
          openFoldersList.push(this.classList[1]);
          break;

        default:
          console.log("Error in folder plus switch!");

      };
    });

    $(".folder-minus, .folder-minus-background").click(function() {

      $("." + this.classList[1] + ".folder-plus, ." + this.classList[1] + ".folder-plus-background").css("visibility", "visible");
      $("." + this.classList[1] + ".folder-minus, ." + this.classList[1] + ".folder-minus-background").css("visibility", "hidden");

      switch (this.classList[1]) {

        case "east-asia-and-pacific":

          closeFolder(this.classList[1], eastAsiaAndPacific);

          for (var i = 0; i < openFoldersList.length; i++) {
            if (openFoldersList[i] === this.classList[1]) {
              openFoldersList.splice(i, 1);
              break;
            };
          };

          break;

        case "europe-and-central-asia":

          closeFolder(this.classList[1], europeAndCentralAsia)

          for (var i = 0; i < openFoldersList.length; i++) {
            if (openFoldersList[i] === this.classList[1]) {
              openFoldersList.splice(i, 1);
              break;
            };
          };

          break;

        case "latin-america-and-caribbean":

          closeFolder(this.classList[1], latinAmericaAndCaribbean)

          for (var i = 0; i < openFoldersList.length; i++) {
            if (openFoldersList[i] === this.classList[1]) {
              openFoldersList.splice(i, 1);
              break;
            };
          };

          break;

        case "midle-east-and-north-africa":

          closeFolder(this.classList[1], midleEastAndNorthAfrica)

          for (var i = 0; i < openFoldersList.length; i++) {
            if (openFoldersList[i] === this.classList[1]) {
              openFoldersList.splice(i, 1);
              break;
            };
          };

          break;

        case "north-america":

          closeFolder(this.classList[1], northAmerica)

          for (var i = 0; i < openFoldersList.length; i++) {
            if (openFoldersList[i] === this.classList[1]) {
              openFoldersList.splice(i, 1);
              break;
            };
          };

          break;

        case "south-asia":

          closeFolder(this.classList[1], southAsia)

          for (var i = 0; i < openFoldersList.length; i++) {
            if (openFoldersList[i] === this.classList[1]) {
              openFoldersList.splice(i, 1);
              break;
            };
          };

          break;

        case "sub-saharan-africa":

          closeFolder(this.classList[1], subSaharanAfrica)

          for (var i = 0; i < openFoldersList.length; i++) {
            if (openFoldersList[i] === this.classList[1]) {
              openFoldersList.splice(i, 1);
              break;
            };
          };

          break;

        default:
          console.log("Error in folder minus switch!");

      };
    });

    $(".checkbox-checked, .checkbox-checked-background, .checkbox-unchecked, .checkbox-unchecked-background, .folder-plus, .folder-plus-background, .folder-minus, .folder-minus-background").css("cursor", "pointer")

  };
};// End of 'Icon Four Menu' function.
