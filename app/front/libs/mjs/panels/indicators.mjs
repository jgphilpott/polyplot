import {addPanelEvents} from "./events/all.mjs"

import {scaleR, scaleX, scaleY, scaleZ} from "../scales/axes.mjs"

import {animateMaps} from "../animation/types/maps.mjs"
import {animateCircles} from "../animation/types/circles.mjs"
import {animateSpheres} from "../animation/types/spheres.mjs"

let plot = data.plot
let plots = plot.plots
let plotType = plot.type

export function addIndicatorsPanel() {

  $("body").append("<div id='indicators' class='panel'></div>")

  let panel = $("#indicators.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  let head = "<div class='head'>"

  head += "<h1 id='name'>Indicators by Category</h1>"
  head += "<div class='axes-box'>"

  let scelection = "x"

  if (plotType == "Map") {

    head += "<div id='x-box' class='axis-selector scelection'><h3 id='x-key'>X</h3></div>"

  } else if (plotType == "Poly2") {

    head += "<div id='r-box' class='axis-selector'><h3 id='r-key'>R</h3></div>"
    head += "<div id='x-box' class='axis-selector scelection'><h3 id='x-key'>X</h3></div>"
    head += "<div id='y-box' class='axis-selector'><h3 id='y-key'>Y</h3></div>"

  } else if (plotType == "Poly3") {

    head += "<div id='r-box' class='axis-selector'><h3 id='r-key'>R</h3></div>"
    head += "<div id='x-box' class='axis-selector scelection'><h3 id='x-key'>X</h3></div>"
    head += "<div id='y-box' class='axis-selector'><h3 id='y-key'>Y</h3></div>"
    head += "<div id='z-box' class='axis-selector'><h3 id='z-key'>Z</h3></div>"

  }

  head += "</div></div>"

  panel.append(head)

  $(".axis-selector").click(function() {

    scelection = this.id[0]

    $(".axis-selector").removeClass("scelection")
    $(this).addClass("scelection")

  })

  socket.emit("get_indicators")

  socket.on("new_indicators", function(indicators) {

    socket.emit("get_meta", "categories")

    socket.on("new_categories", function(categories) {

      for (let i = 0; i < categories.length; i++) {

        let categoryBox = "<div id='" + camalize(categories[i]) + "' class='category-box'>"

        categoryBox += "<div class='head'>"
        categoryBox += "<img class='icon' src='/front/imgs/panels/indicators/categories/" + camalize(categories[i]) + ".png'>"
        categoryBox += "<img class='fold' src='/front/imgs/panels/indicators/fold.png'>"
        categoryBox += "<h3 class='category'>" + categories[i] + "</h3></div>"

        let indicatorsBox = "<div class='indicators-box'>"

        for (let j = 0; j < indicators.length; j++) {

          if (indicators[j].categories.includes(categories[i])) {

            indicatorsBox += "<p id='" + indicators[j].code + "' class='indicator'>" + indicators[j].name + "</p>"

          }

        }

        panel.append(categoryBox + indicatorsBox + "</div></div>")

      }

      $(".icon, .fold").click(function() {

        let id = $(this).parent().parent().attr("id")

        let categoryBox = $("#" + id + ".category-box")
        let indicatorsBox = $("#" + id + ".category-box .indicators-box")
        let fold = $("#" + id + ".category-box .fold")

        if (indicatorsBox.css("display") == "none") {

          $(".category-box").animate({"width": 700}, {"duration": 1000, "queue": false})
          $(".category-box").animate({"height": 30}, {"duration": 1000, "queue": false})
          $(".indicators-box").css("display", "none")
          rotate($(".fold"), 1)

          indicatorsBox.css("display", "block")
          let height = indicatorsBox.height() + 35
          indicatorsBox.css("display", "none")

          categoryBox.animate({"width": 700}, {"duration": 1000, "queue": false})
          categoryBox.animate({"height": height}, {"duration": 1000, "queue": false})
          indicatorsBox.css("display", "block")
          rotate(fold, 90)

        } else {

          $(".category-box").animate({"width": 350}, {"duration": 1000, "queue": false})
          $(".category-box").animate({"height": 30}, {"duration": 1000, "queue": false})
          $(".indicators-box").css("display", "none")
          rotate($(".fold"), 1)

        }

      })

      $(".indicator").click(function() {

        socket.emit("get_indicator", this.id)

      })

    })

  })

  socket.on("new_indicator", function(indicator) {

    let legendKey = $("#" + scelection + "-data")
    legendKey.text(indicator.name)
    legendKey.parent().attr("id", indicator.code)

    for (let i = 0; i < plots.length; i++) {

      for (let j = 0; j < indicator.geographies.length; j++) {

        if (plots[i].code == indicator.geographies[j].code) {

          plots[i][scelection] = indicator.geographies[j].history

        }

      }

    }

    if (scelection == "r") {

      scaleR(plotType)

    } else if (scelection == "x") {

      scaleX(plotType)

    } else if (scelection == "y") {

      scaleY(plotType)

    } else if (scelection == "z") {

      scaleZ(plotType)

    }

    let speed = plot.animation.speed / plot.animation.speedMultiplier

    if (plotType == "Map") {

      animateMaps(speed)

    } else if (plotType == "Poly2") {

      animateCircles(speed)

    } else if (plotType == "Poly3") {

      animateSpheres(speed)

    }

  })

  addPanelEvents(panel)

}
