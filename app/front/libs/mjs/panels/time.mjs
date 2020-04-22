import {startAnimation} from "../animation/plots.mjs"
import {clearAnimation} from "../animation/plots.mjs"

import {animateMaps} from "../animation/types/maps.mjs"
import {animateCircles} from "../animation/types/circles.mjs"
import {animateSpheres} from "../animation/types/spheres.mjs"
import {animateTimeline} from "../animation/types/timeline.mjs"

import {makeDragable} from "../ui/dragable.mjs"

let plot = data.plot

export function addTimePanel() {

  $("body").append("<div id='time' class='panel'></div>")

  let panel = $("#time.panel")

  plot.t.minCap = plot.t.minYear
  plot.t.maxCap = plot.t.maxYear

  plot.animation = {"direction": "forward", "speed": 360, "speedMultiplier": 1, "status": "inactive", "interval": null}

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

  makeDragable($("#minCap"), [dragTimeControls])
  makeDragable($("#point"), [dragTimeControls])
  makeDragable($("#maxCap"), [dragTimeControls])

  let buttons = $(".button")

  for (let i = 0; i < buttons.length; i++) {

    let button = $("#" + buttons[i].id)

    button.mouseover(function() {

      button.attr("src", "/front/imgs/time/hover/" + buttons[i].id + ".svg")

    }).mouseout(function() {

      if (!((buttons[i].id == "fastForward" || buttons[i].id == "fastBackward") && plot.animation.speedMultiplier != 1)) {

        button.attr("src", "/front/imgs/time/" + buttons[i].id + ".svg")

      } else if (buttons[i].id == "fastForward" && plot.animation.direction != "forward") {

        button.attr("src", "/front/imgs/time/" + buttons[i].id + ".svg")

      } else if (buttons[i].id == "fastBackward" && plot.animation.direction != "backward") {

        button.attr("src", "/front/imgs/time/" + buttons[i].id + ".svg")

      }

    })

    button.click(function() {

      switch (buttons[i].id) {

        case "skipBackward":

          skip("backward")

          break

        case "playForward":

          startAnimation("forward")

          break

        case "pauseLeft":

          clearAnimation()

          break

        case "fastForward":

          toggleSpeed("forward")

          break

        case "fastBackward":

          toggleSpeed("backward")

          break

        case "playBackward":

          startAnimation("backward")

          break

        case "pauseRight":

          clearAnimation()

          break

        case "skipForward":

          skip("forward")

          break

      }

    })

  }

  $("body").on("keypress", function(event) {

    if (event.keyCode == 32) {

      if (plot.animation.status == "inactive") {

        startAnimation()

      } else if (plot.animation.status == "active") {

        clearAnimation()

      }

    }

  })

  makeDragable(panel)

}

export function skip(direction) {

  clearAnimation()

  if (direction == "forward") {

    plot.t.year = plot.t.maxCap

  } else if (direction == "backward") {

    plot.t.year = plot.t.minCap

  }

  animateTimeline(0)

  if (plot.type == "Map") {

    animateMaps(0)

  } else if (plot.type == "Poly2") {

    animateCircles(0)

  } else if (plot.type == "Poly3") {

    animateSpheres(0)

  }

}

export function toggleSpeed(direction) {

  if (plot.animation.speedMultiplier != 1) {

    if (plot.animation.direction == direction) {

      plot.animation.speedMultiplier = 1

    } else {

      plot.animation.direction = direction

    }

  } else {

    plot.animation.direction = direction
    plot.animation.speedMultiplier = 3

  }

  if (plot.animation.status == "active") {

    clearInterval(plot.animation.interval)
    startAnimation(direction)

  }

  if (direction == "forward") {

    $("#fastBackward").attr("src", "/front/imgs/time/fastBackward.svg")

  } else if (direction == "backward") {

    $("#fastForward").attr("src", "/front/imgs/time/fastForward.svg")

  }

}

export function dragTimeControls(controller, eventCoordinates) {

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

    clearAnimation()

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
