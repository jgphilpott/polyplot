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

        panel.append("<h3>" + indicatorCategories[i].category + "</h3>")

        for (let j = 0; j < indicatorCategories[i].indicators.length; j++) {

          panel.append("<p>" + indicatorCategories[i].indicators[j].name + "</p>")

        }

      }

    }

    drawIndicators()

  })

  makeDragable(panel)

}
