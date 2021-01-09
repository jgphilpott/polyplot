import {rainbow} from "../../../libs/mjs/colors/solid/rainbow.mjs"

$(document).ready(function() {

  $("body").append("<canvas id='canvas'></canvas>")

  summonParticleWeb(42, rainbow)

  $("body").append("<div id='indicators' class='panel'><h1 id='name'>Indicators by Category</h1></div>")

  let panel = $("#indicators.panel")

  socket.emit("get_meta", "categories")

  socket.on("new_categories", function(categories) {

    socket.emit("get_indicators", {})

    socket.on("new_indicators", function(indicators) {

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
        let fold = $("#" + id + ".category-box .fold")
        let categoryBox = $("#" + id + ".category-box")
        let indicatorsBox = $("#" + id + ".category-box .indicators-box")

        if (indicatorsBox.css("display") == "none") {

          $(".category-box").animate({"height": 31}, {"duration": 2000, "queue": false})
          $(".indicators-box").css("display", "none")
          rotate($(".fold"), 1)

          indicatorsBox.css("display", "block")
          let height = indicatorsBox.height() + 36
          indicatorsBox.css("display", "none")

          categoryBox.animate({"height": height}, {"duration": 2000, "queue": false})
          indicatorsBox.css("display", "block")
          rotate(fold, 90)

        } else {

          $(".category-box").animate({"height": 31}, {"duration": 2000, "queue": false})
          $(".indicators-box").css("display", "none")
          rotate($(".fold"), 1)

        }

      })

    })

  })

  $(document).on("wheel", function(event) {

    let margin = 100

    let top = panel.position().top
    let bottom = panel.outerHeight() - $(window).height()

    let wheelDelta = event.originalEvent.wheelDelta
    let position = top + wheelDelta

    if (wheelDelta > 0 && position <= margin) {

      panel.css("top", position)

    } else if (wheelDelta < 0 && position >= -bottom - margin) {

      panel.css("top", position)

    }

  })

})
