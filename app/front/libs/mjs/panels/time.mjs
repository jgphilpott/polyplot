import {animatePlots} from "../animation/plots.mjs"

import {animateMaps} from "../animation/types/maps.mjs"
import {animateCircles} from "../animation/types/circles.mjs"
import {animateSpheres} from "../animation/types/spheres.mjs"

import {makeDragable} from "../ui/dragable.mjs"

let plot = data.plot

export function addTimePanel() {

  $("body").append("<div id='time' class='panel'></div>")

  let panel = $("#time.panel")

  plot.t.minCap = plot.t.minYear
  plot.t.maxCap = plot.t.maxYear

  plot.animation = {"direction": "forward", "speed": 360, "status": "inactive", "interval": null}

  panel.append("<h1 id='years'><span id='minYear'>" + plot.t.minCap + "</span> - <span id='maxYear'>" + plot.t.maxCap + "</span></h1>")
  panel.append("<img id='timeline' src='/front/imgs/time/timeline.svg') }}'>")

  panel.append("<img id='skipBackward' class='button' src='/front/imgs/time/skipBackward.svg') }}'>")
  panel.append("<img id='playForward' class='button' src='/front/imgs/time/playForward.svg') }}'>")
  panel.append("<img id='pauseLeft' class='button' src='/front/imgs/time/pauseLeft.svg') }}'>")
  panel.append("<img id='fastForward' class='button' src='/front/imgs/time/fastForward.svg') }}'>")

  panel.append("<img id='minCap' class='controller' src='/front/imgs/time/cap.svg') }}'>")
  panel.append("<img id='point' class='controller' src='/front/imgs/time/point.svg') }}'>")
  panel.append("<img id='maxCap' class='controller' src='/front/imgs/time/cap.svg') }}'>")

  panel.append("<img id='fastBackward' class='button' src='/front/imgs/time/fastBackward.svg') }}'>")
  panel.append("<img id='playBackward' class='button' src='/front/imgs/time/playBackward.svg') }}'>")
  panel.append("<img id='pauseRight' class='button' src='/front/imgs/time/pauseRight.svg') }}'>")
  panel.append("<img id='skipForward' class='button' src='/front/imgs/time/skipForward.svg') }}'>")

  panel.append("<p id='year'>" + plot.t.year + "</p>")

  makeDragable($("#minCap"), [updateTimeControls])
  makeDragable($("#point"), [updateTimeControls])
  makeDragable($("#maxCap"), [updateTimeControls])

  let buttons = $(".button")

  for (let i = 0; i < buttons.length; i++) {

    let button = $("#" + buttons[i].id)

    button.mouseover(function() {

      button.attr("src", "/front/imgs/time/hover/" + buttons[i].id + ".svg")

    }).mouseout(function() {

      button.attr("src", "/front/imgs/time/" + buttons[i].id + ".svg")

    })

    button.click(function() {

      switch (buttons[i].id) {

        case "skipBackward":

          break

        case "playForward":

          $(this).css({"visibility": "hidden"})
          $("#playBackward").css({"visibility": "hidden"})

          animatePlots("forward")

          $("#pauseLeft").css({"visibility": "visible"})
          $("#pauseRight").css({"visibility": "visible"})

          break

        case "pauseLeft":

          $(this).css({"visibility": "hidden"})
          $("#pauseRight").css({"visibility": "hidden"})

          clearInterval(plot.animation.interval)
          plot.animation.status = "inactive"

          $("#playForward").css({"visibility": "visible"})
          $("#playBackward").css({"visibility": "visible"})

          break

        case "fastForward":

          break

        case "fastBackward":

          break

        case "playBackward":

          $("#playForward").css({"visibility": "hidden"})
          $(this).css({"visibility": "hidden"})

          animatePlots("backward")

          $("#pauseLeft").css({"visibility": "visible"})
          $("#pauseRight").css({"visibility": "visible"})

          break

        case "pauseRight":

          $("#pauseLeft").css({"visibility": "hidden"})
          $(this).css({"visibility": "hidden"})

          clearInterval(plot.animation.interval)
          plot.animation.status = "inactive"

          $("#playForward").css({"visibility": "visible"})
          $("#playBackward").css({"visibility": "visible"})

          break

        case "skipForward":

          break

      }

    })

  }

  $("body").on("keypress", function(event) {

    if (event.keyCode == 32) {

      if (plot.animation.status == "inactive") {

        $("#playForward").css({"visibility": "hidden"})
        $("#playBackward").css({"visibility": "hidden"})

        animatePlots()

        $("#pauseLeft").css({"visibility": "visible"})
        $("#pauseRight").css({"visibility": "visible"})

      } else if (plot.animation.status == "active") {

        $("#playForward").css({"visibility": "visible"})
        $("#playBackward").css({"visibility": "visible"})

        clearInterval(plot.animation.interval)
        plot.animation.status = "inactive"

        $("#pauseLeft").css({"visibility": "hidden"})
        $("#pauseRight").css({"visibility": "hidden"})

      }

    }

  })

  makeDragable(panel)

}

export function updateTimeControls(controller, eventCoordinates) {

  let minOffset = $("#timeline")[0].offsetLeft
  let maxOffset = minOffset + $("#timeline")[0].offsetWidth

  let minCap = $("#minCap")[0].offsetLeft

  let point = $("#point")[0].offsetLeft
  let pointWidth = $("#point")[0].width

  let maxCap = $("#maxCap")[0].offsetLeft

  if (controller[0].id == "minCap" && eventCoordinates[0] >= minOffset && eventCoordinates[0] <= point - pointWidth) {

    plot.t.minCap = Math.floor(data.plot.t.scale.invert(minCap - minOffset))

    controller.css({"left": eventCoordinates[0]})

    $("#minYear").text(plot.t.minCap)

  } else if (controller[0].id == "point" && eventCoordinates[0] >= minCap + pointWidth && eventCoordinates[0] <= maxCap - pointWidth) {

    plot.t.year = Math.floor(data.plot.t.scale.invert(point - pointWidth - minOffset))

    if (plot.animation.status == "active") {

      $("#playForward").css({"visibility": "visible"})
      $("#playBackward").css({"visibility": "visible"})

      clearInterval(plot.animation.interval)
      plot.animation.status = "inactive"

      $("#pauseLeft").css({"visibility": "hidden"})
      $("#pauseRight").css({"visibility": "hidden"})

    }

    if (plot.type == "Map") {

      animateMaps(0)

    } else if (plot.type == "Poly2") {

      animateCircles(0)

    } else if (plot.type == "Poly3") {

      animateSpheres(0)

    }

    controller.css({"left": eventCoordinates[0]})

    $("#year").css({"left": eventCoordinates[0]})
    $("#year").text(plot.t.year)

  } else if (controller[0].id == "maxCap" && eventCoordinates[0] <= maxOffset && eventCoordinates[0] >= point + pointWidth) {

    plot.t.maxCap = Math.floor(data.plot.t.scale.invert(maxCap - (pointWidth * 2) - minOffset))

    controller.css({"left": eventCoordinates[0]})

    $("#maxYear").text(plot.t.maxCap)

  }

}
