import {makeDragable} from "../ui/dragable.mjs"
import {addPanelEvents} from "../ui/events.mjs"

export function addIndicatorsPanel() {

  $("body").append("<div id='indicators' class='panel'></div>")

  let panel = $("#indicators.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  let head = "<div class='head'>"

  head += "<h1 id='title'>Indicators by Category</h1>"

  head += "<div id='r-box' class='box'><h3 id='r'>R</h3></div>"
  head += "<div id='x-box' class='box'><h3 id='x'>X</h3></div>"
  head += "<div id='y-box' class='box'><h3 id='y'>Y</h3></div>"
  head += "<div id='z-box' class='box'><h3 id='z'>Z</h3></div>"

  head += "</div>"

  panel.append(head)

  // panel.append("<h3 id='r'>R</h3></div>")
  // panel.append("<div id='r-box' class='box'><h3 id='r'>R</h3></div>")
  // panel.append("<div id='x-box' class='box'><h3 id='x'>X</h3></div>")
  // panel.append("<div id='y-box' class='box'><h3 id='y'>Y</h3></div>")
  // panel.append("<div id='z-box' class='box'><h3 id='z'>Z</h3></div>")

  // panel.append("</div>")

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

        console.log(camalize(indicatorCategories[i].category))

        categoryBox += "<div class='head'><img class='icon' src='/front/imgs/panels/indicators/categories/" + camalize(indicatorCategories[i].category) + ".png'>"
        categoryBox += "<img id='" + camalize(indicatorCategories[i].category) + "' class='fold' src='/front/imgs/panels/indicators/fold.png'>"
        categoryBox += "<h3 class='category'>" + indicatorCategories[i].category + "</h3></div>"
        categoryBox += "<div class='indicators-box'>"

        for (let j = 0; j < indicatorCategories[i].indicators.length; j++) {

          categoryBox += "<p id='" + indicatorCategories[i].indicators[j].code + "' class='indicator'>" + indicatorCategories[i].indicators[j].name + "</p>"

        }

        panel.append(categoryBox += "</div></div>")

      }

      $(".category").click(function() {

        let id = $(this).parent().parent().attr("id")

        let thisFold = $("#" + id + ".category-box .fold")
        let thisCategoryBox = $("#" + id + ".category-box")
        let thisIndicatorsBox = $("#" + id + ".category-box .indicators-box")

        if (thisIndicatorsBox.css("display") == "none") {

          rotate($(".fold"), 0)
          $(".category-box").animate({"width": 700}, {"duration": 1000, "queue": false})
          $(".category-box").animate({"height": 30}, {"duration": 1000, "queue": false})
          $(".indicators-box").css("display", "none")

          thisIndicatorsBox.css("display", "block")
          let height = thisIndicatorsBox.height() + 35
          thisIndicatorsBox.css("display", "none")

          rotate(thisFold, 90)
          thisCategoryBox.animate({"width": 700}, {"duration": 1000, "queue": false})
          thisCategoryBox.animate({"height": height}, {"duration": 1000, "queue": false})
          thisIndicatorsBox.css("display", "block")

        } else {

          rotate($(".fold"), 0)
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
  addPanelEvents(panel)

}
