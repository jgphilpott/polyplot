import {rainbow} from "../../../libs/mjs/colors/solid/rainbow.mjs"
import {makeScrollable} from "../../../libs/mjs/panels/events/scroll.mjs"

$(document).ready(function() {

  $("body").append("<canvas id='canvas'></canvas>")

  summonParticleWeb(42, rainbow)

  $("body").append("<div id='indicators' class='panel'><a href='/api/indicators'><h1 id='name'>Indicators by Category</h1></a></div>")

  let panel = $("#indicators.panel")

  let stats = "<div id='stats'><h2>Stats</h2>"

  stats += "<p class='categories'><b>Categories:</b> </p>"
  stats += "<p class='indicators'><b>Indicators:</b> </p>"
  stats += "<p class='size'><b>Size:</b> </p></div>"

  let size = 0

  let axes = "<div id='axes'><h2>Axes</h2>"

  axes += "<p id='r'><b id='r-key'>R:</b> </p>"
  axes += "<p id='x'><b id='x-key'>X:</b> </p>"
  axes += "<p id='y'><b id='y-key'>Y:</b> </p>"
  axes += "<p id='z'><b id='z-key'>Z:</b> </p></div>"

  let r = readCookie("r")
  let x = readCookie("x")
  let y = readCookie("y")
  let z = readCookie("z")

  panel.append(stats + axes)

  socket.emit("get_meta", "categories")

  socket.on("new_categories", function(categories) {

    $(".categories").append("" + categories.length + "")

    socket.emit("get_indicators", {})

    socket.on("new_indicators", function(indicators) {

      $(".indicators").append("" + indicators.length + "")

      for (let i = 0; i < categories.length; i++) {

        let categoryBox = "<div id='" + camalize(categories[i]) + "' class='category-box'>"

        categoryBox += "<div class='head'>"
        categoryBox += "<img class='icon' src='/front/imgs/panels/indicators/categories/" + camalize(categories[i]) + ".png'>"
        categoryBox += "<img class='fold' src='/front/imgs/panels/indicators/fold.png'>"
        categoryBox += "<h3 class='category'>" + categories[i] + "</h3></div>"

        let indicatorsBox = "<div class='indicators-box'>"

        for (let j = 0; j < indicators.length; j++) {

          if (indicators[j].categories.includes(categories[i])) {

            indicatorsBox += "<div id='" + indicators[j].code.replaceAll(".", "-") + "' class='indicator-box'>"
            indicatorsBox += "<svg class='completeness'></svg>"
            indicatorsBox += "<a href='/indicators/" + indicators[j].code + "' class='indicator'><p>" + indicators[j].name + "</p></a></div>"

          }

          if (i == 0) {

            size += indicators[j].size

            if (j == indicators.length - 1) {
              $(".size").append("" + size + "")
            }

            if (indicators[j].code == r) {
              $("#r").append("" + indicators[j].name + "")
            } else if (indicators[j].code == x) {
              $("#x").append("" + indicators[j].name + "")
            } else if (indicators[j].code == y) {
              $("#y").append("" + indicators[j].name + "")
            } else if (indicators[j].code == z) {
              $("#z").append("" + indicators[j].name + "")
            }

          }

        }

        panel.append(categoryBox + indicatorsBox + "</div></div>")

        for (let j = 0; j < indicators.length; j++) {

          if (indicators[j].categories.includes(categories[i])) {

            let pie = d3.pie().sort(null)
            let arc = d3.arc().innerRadius(6).outerRadius(8)
            let svg = d3.select("#" + camalize(categories[i]) + " .indicators-box #" + indicators[j].code.replaceAll(".", "-") + " svg")

            svg.selectAll(".completeness")
               .data(pie([indicators[j].completeness, 100 - indicators[j].completeness]))
               .enter()
               .append("path")
               .attr("d", arc)
               .attr("transform", "translate(10, 10)")
               .attr("fill-opacity", function(data) {

                 return [1, 0][data.index]

               })
               .style("fill", function(data) {

                 let scale = d3.scaleLinear().range(["red", "orange", "green"]).domain([0, 50, 100])

                 return [scale(indicators[j].completeness), "black"][data.index]

               })

          }

        }

      }

      $(".icon, .fold").click(function() {

        let id = $(this).parent().parent().attr("id")
        let fold = $("#" + id + ".category-box .fold")
        let categoryBox = $("#" + id + ".category-box")
        let indicatorsBox = $("#" + id + ".category-box .indicators-box")

        if (indicatorsBox.css("display") == "none") {

          $(".category-box").animate({"height": 30}, {"duration": 2000, "queue": false})
          $(".indicators-box").css("display", "none")
          rotate($(".fold"), 1)

          indicatorsBox.css("display", "block")
          let height = indicatorsBox.height() + 35
          indicatorsBox.css("display", "none")

          categoryBox.animate({"height": height}, {"duration": 2000, "queue": false})
          indicatorsBox.css("display", "block")
          rotate(fold, 90)

        } else {

          $(".category-box").animate({"height": 30}, {"duration": 2000, "queue": false})
          $(".indicators-box").css("display", "none")
          rotate($(".fold"), 1)

        }

      })

    })

  })

  makeScrollable(panel)

})
