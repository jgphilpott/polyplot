import {makeDragable} from "../ui/dragable.mjs"

export function addIndicatorsPanel() {

  $("body").append("<div id='indicators' class='panel'></div>")

  let panel = $("#indicators.panel")

  panel.append("<h1 id='title'>Indicators by Category</h1>")

  socket.emit("get_indicators")

  socket.on("new_indicators", function(indicators) {

    function organizeIndicators() {

      let categories = []

      for (let i = 0; i < indicators.length; i++) {

        for (let j = 0; j < indicators[i].categories.length; j++) {

          if (categories.some(category => category.category == indicators[i].categories[j])) {

            let category = categories.find(category => category.category == indicators[i].categories[j])

            category.indicators.push(indicators[i])

            category.indicators.sort((a, b) => (a.name > b.name) ? 1 : -1)

          } else {

            categories.push({"category": indicators[i].categories[j], "indicators": [indicators[i]]})

          }

        }

      }

      return categories.sort((a, b) => (a.category > b.category) ? 1 : -1)

    }

    function drawIndicators() {

      let indicatorCategories = organizeIndicators()

      for (let i = 0; i < indicatorCategories.length; i++) {

        let categoryBox = "<div id='" + camalize(indicatorCategories[i].category) + "' class='category-box'>"

        categoryBox += "<h3 class='category'>" + indicatorCategories[i].category + "</h3>"
        categoryBox += "<div class='indicators-box'>"

        for (let j = 0; j < indicatorCategories[i].indicators.length; j++) {

          categoryBox += "<p id='" + indicatorCategories[i].indicators[j].code + "' class='indicator'>" + indicatorCategories[i].indicators[j].name + "</p>"

        }

        panel.append(categoryBox += "</div></div>")

      }

      $(".category").click(function() {

        let id = $(this).parent().attr("id")

        let thisCategoryBox = $("#" + id + ".category-box")
        let thisIndicatorsBox = $("#" + id + ".category-box .indicators-box")

        if (thisIndicatorsBox.css("display") == "none") {

          $(".category-box").animate({"width": 700}, {"duration": 1000, "queue": false})
          $(".category-box").animate({"height": 30}, {"duration": 1000, "queue": false})
          $(".indicators-box").css("display", "none")

          thisIndicatorsBox.css("display", "block")
          let height = thisIndicatorsBox.height() + 35
          thisIndicatorsBox.css("display", "none")

          thisCategoryBox.animate({"width": 700}, {"duration": 1000, "queue": false})
          thisCategoryBox.animate({"height": height}, {"duration": 1000, "queue": false})
          thisIndicatorsBox.css("display", "block")

        } else {

          $(".category-box").animate({"width": 350}, {"duration": 1000, "queue": false})
          $(".category-box").animate({"height": 30}, {"duration": 1000, "queue": false})
          $(".indicators-box").css("display", "none")

        }

      })

      $(".indicator").click(function() {

        socket.emit("get_indicator", this.id)

      })

    }

    drawIndicators()

  })

  socket.on("new_indicator", function(indicator) {

    console.log(indicator)

  })

  makeDragable(panel)

}
