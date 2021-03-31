import {updateSettings} from "./menu.mjs"
import {addPanelEvents} from "./events/all.mjs"

import {animateMaps} from "../animation/types/maps.mjs"
import {animatePanels} from "../animation/types/panels.mjs"
import {animateCircles} from "../animation/types/circles.mjs"
import {animateSpheres} from "../animation/types/spheres.mjs"

import {scaleR, scaleX, scaleY, scaleZ} from "../scales/axes.mjs"

let plot = data.plot
let plots = plot.plots

export function addIndicatorsPanel(panelSetting) {

  $("body").append("<div id='indicators' class='panel'></div>")

  let panel = $("#indicators.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  let head = "<div class='indicators-head'>"

  head += "<a href='/indicators'><h1 id='name'>Indicators by Category</h1></a>"
  head += "<div id='axes-box'>"

  let scelection = "x"

  if (plot.type == "Map") {

    head += "<div id='x-box' class='axis-selector scelection'><h3 id='x-key'>X</h3></div>"

  } else if (plot.type == "Poly2") {

    head += "<div id='r-box' class='axis-selector'><h3 id='r-key'>R</h3></div>"
    head += "<div id='x-box' class='axis-selector scelection'><h3 id='x-key'>X</h3></div>"
    head += "<div id='y-box' class='axis-selector'><h3 id='y-key'>Y</h3></div>"

  } else if (plot.type == "Poly3") {

    head += "<div id='r-box' class='axis-selector'><h3 id='r-key'>R</h3></div>"
    head += "<div id='x-box' class='axis-selector scelection'><h3 id='x-key'>X</h3></div>"
    head += "<div id='y-box' class='axis-selector'><h3 id='y-key'>Y</h3></div>"
    head += "<div id='z-box' class='axis-selector'><h3 id='z-key'>Z</h3></div>"

  }

  head += "</div>"

  panel.append(head)

  $(".axis-selector").click(function() {

    scelection = this.id[0]

    $(".axis-selector").removeClass("scelection")
    $(this).addClass("scelection")

  })

  socket.emit("get_meta", "categories")

  socket.on("new_categories", function(categories) {

    socket.emit("get_indicators", {"code": {"$in": localRead("settings").general.indicatorExceptions}}, {"_id": 0, "code": 1, "name": 1, "categories": 1}, [["name", 1]])

    socket.on("new_indicators", function(indicators) {

      addCategoryBoxes(categories)
      addIndicatorBoxes(indicators)

      $(".category-icon, .category-fold").click(function() {
        toggleFold(this, panel)
      })

      $(".indicator-name").click(function() {
        socket.emit("get_indicator", {"code": $(this).parent().attr("id").replaceAll("-", ".")}, {"_id": 0, "code": 1, "name": 1, "countries": 1, "min_value": 1, "max_value": 1})
      })

      addPanelEvents(panel)

      if (panelSetting) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

    })

  })

  socket.on("new_indicator", function(indicator) {

    writeCookie(scelection, indicator.code)

    let legendKey = $("#" + scelection + "-data")
    legendKey.text(indicator.name)
    legendKey.parent().attr("id", indicator.code)

    plot[scelection].code = indicator.code
    plot[scelection].name = indicator.name

    plot[scelection].min = indicator.min_value
    plot[scelection].max = indicator.max_value

    for (let i = 0; i < plots.length; i++) {

      for (let j = 0; j < indicator.countries.length; j++) {

        if (plots[i].code == indicator.countries[j].code) {

          plots[i][scelection] = indicator.countries[j].history

          break

        }

      }

    }

    if (scelection == "r") {
      scaleR(plot.type)
    } else if (scelection == "x") {
      scaleX(plot.type)
    } else if (scelection == "y") {
      scaleY(plot.type)
    } else if (scelection == "z") {
      scaleZ(plot.type)
    }

    let speed = plot.animation.speed / plot.animation.speedMultiplier

    animatePanels()

    if (plot.type == "Map") {
      animateMaps(speed)
    } else if (plot.type == "Poly2") {
      animateCircles(speed)
    } else if (plot.type == "Poly3") {
      animateSpheres(speed)
    }

  })

}

export function toggleFold(element, panel) {

  let duration = 1000

  let id = $(element).parent().parent().attr("id")

  let fold = $("#" + id + ".category-box .category-fold")
  let folds = $(".category-fold")

  let categoryBox = $("#" + id + ".category-box")
  let headHeight = $("#" + id + ".category-box .category-head").height() + Number(categoryBox.css("padding").replace(/[a-z]/gi, "")) * 2
  let indicatorsBox = $("#" + id + ".category-box .indicators-box")

  if (indicatorsBox.css("display") == "none") {

    if (plot.type != "Indicators" && plot.type != "Country") {

      $(".category-box").animate({height: headHeight}, {duration: duration, queue: false})
      $(".indicators-box").css("display", "none")
      categoryBox.animate({width: 700}, {duration: duration, queue: false})
      for (let i = 0; i < folds.length; i++) { rotate($(folds[i]), 0, duration) }

    }

    indicatorsBox.css("display", "block")
    let height = indicatorsBox.height()
    indicatorsBox.css("display", "none")

    categoryBox.animate({height: height + headHeight}, {duration: duration, queue: false})
    indicatorsBox.css("display", "block")
    rotate(fold, 90, duration)

  } else {

    if (plot.type != "Indicators" && plot.type != "Country") { $(".category-box").animate({width: 350}, {duration: duration, queue: false}) }
    categoryBox.animate({height: headHeight}, {duration: duration, complete: function() { indicatorsBox.css("display", "none") }})
    rotate(fold, 0, duration)

  }

}

export function addCategoryBoxes(categories) {

  let panel = null

  if (plot.type == "Country") {
    panel = $("#country.panel")
  } else {
    panel = $("#indicators.panel")
  }

  for (let i = 0; i < categories.length; i++) {

    let categoryBox = "<div id='" + camalize(categories[i]) + "' class='category-box'>"

    categoryBox += "<div class='category-head'>"
    categoryBox += "<img class='category-icon' src='/front/imgs/panels/indicators/categories/" + camalize(categories[i]) + ".png'>"
    categoryBox += "<img class='category-fold' src='/front/imgs/panels/indicators/fold.png'>"
    categoryBox += "<h3 class='category-name'>" + categories[i] + "</h3></div>"
    categoryBox += "<div class='indicators-box'></div></div>"

    panel.append(categoryBox)

  }

}

export function addIndicatorBoxes(indicators) {

  let size = 0
  let year = readCookie("year")

  let r = readCookie("r")
  let x = readCookie("x")
  let y = readCookie("y")
  let z = readCookie("z")

  let indicatorExceptions = localRead("settings").general.indicatorExceptions

  for (let i = 0; i < indicators.length; i++) {

    let exception = indicatorExceptions.includes(indicators[i].code)

    for (let j = 0; j < indicators[i].categories.length; j++) {

      let indicatorsBox = $("#" + camalize(indicators[i].categories[j]) + ".category-box .indicators-box")
      let indicatorBox = "<div id='" + indicators[i].code.replaceAll(".", "-") + "' class='indicator-box'>"

      if (plot.type == "Indicators") {

        if (exception) {
          indicatorBox += "<img class='indicator-visibility' src='/front/imgs/panels/indicators/visible.png'>"
        } else {
          indicatorBox += "<img class='indicator-visibility' src='/front/imgs/panels/indicators/hidden.png'>"
        }

        indicatorBox += "<svg class='indicator-completeness'></svg>"

      } else if (plot.type == "Country") {

        indicatorBox += "<svg class='indicator-completeness'></svg>"

      }

      indicatorBox += "<p class='indicator-name'>" + indicators[i].name + "</p>"

      if (plot.type == "Country") {

        indicatorBox += "<p class='indicator-value'>" + format(indicators[i].history.find(date => date.year == Number(year)).value, "oodles") + "</p>"
        indicatorBox += "<a href='https://data.worldbank.org/indicator/" + indicators[i].code + "'><img class='indicator-link' src='/front/imgs/panels/indicators/link.png'></a>"

      }

      indicatorsBox.append(indicatorBox + "</div>")

      if (!exception) { $("#" + camalize(indicators[i].categories[j]) + ".category-box .indicators-box #" + indicators[i].code.replaceAll(".", "-") + ".indicator-box .indicator-name").css("color", "gray") }

      if (plot.type == "Indicators" || plot.type == "Country") {

        $("#" + camalize(indicators[i].categories[j]) + ".category-box .indicators-box #" + indicators[i].code.replaceAll(".", "-") + ".indicator-box .indicator-name").on("click", function() { window.location = "/indicators/" + indicators[i].code + "" })

        let pie = d3.pie().sort(null)
        let arc = d3.arc().innerRadius(8).outerRadius(12)
        let svg = d3.select("#" + camalize(indicators[i].categories[j]) + ".category-box .indicators-box #" + indicators[i].code.replaceAll(".", "-") + ".indicator-box svg")

        svg.selectAll(".indicator-completeness")
           .data(pie([indicators[i].completeness, 100 - indicators[i].completeness]))
           .enter()
           .append("path")
           .attr("d", arc)
           .attr("transform", "translate(14, 14)")
           .style("fill", function(data) {

             let scale = d3.scaleLinear().range(["red", "orange", "green"]).domain([0, 50, 100])

             return [scale(indicators[i].completeness), "none"][data.index]

           })

      }

    }

    if (plot.type == "Indicators") {

      size += indicators[i].size

      if (indicators[i].code == r) { $("#r").append("<a href='/indicators/" + indicators[i].code + "'>" + indicators[i].name + "</a>") }
      if (indicators[i].code == x) { $("#x").append("<a href='/indicators/" + indicators[i].code + "'>" + indicators[i].name + "</a>") }
      if (indicators[i].code == y) { $("#y").append("<a href='/indicators/" + indicators[i].code + "'>" + indicators[i].name + "</a>") }
      if (indicators[i].code == z) { $("#z").append("<a href='/indicators/" + indicators[i].code + "'>" + indicators[i].name + "</a>") }

    }

  }

  $("#size-stat").append("" + format(size, "data") + "")

}

export function toggleIndicatorVisibility(element) {

    let code = null

    if (plot.type == "Indicator") {
      code = plots.code
    } else {
      code = $(element).parent().attr("id")
    }

    let value = $(element).attr("src").split("/").pop().split(".")[0]
    let indicatorExceptions = localRead("settings").general.indicatorExceptions

    if (value == "visible") {

      if (plot.type == "Indicator") { $(element).attr("src", "/front/imgs/panels/indicators/hidden.png") }

      $("#" + code + ".indicator-box .indicator-visibility").attr("src", "/front/imgs/panels/indicators/hidden.png")
      $("#" + code + ".indicator-box .indicator-name").css("color", "gray")

      indicatorExceptions = indicatorExceptions.filter(item => item != code.replaceAll("-", "."))

    } else if (value == "hidden") {

      if (plot.type == "Indicator") { $(element).attr("src", "/front/imgs/panels/indicators/visible.png") }

      $("#" + code + ".indicator-box .indicator-visibility").attr("src", "/front/imgs/panels/indicators/visible.png")
      $("#" + code + ".indicator-box .indicator-name").css("color", "black")

      indicatorExceptions.push(code.replaceAll("-", "."))

    }

    updateSettings("general", "indicatorExceptions", indicatorExceptions)

}
