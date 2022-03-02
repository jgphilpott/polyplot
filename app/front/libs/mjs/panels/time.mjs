import {scaleT, scaleAxes} from "../scales/axes.mjs"

import {startAnimation} from "../animation/plots.mjs"
import {clearAnimation} from "../animation/plots.mjs"
import {animationSwitch} from "../animation/plots.mjs"
import {animateTimeline} from "../animation/types/timeline.mjs"

import {makeDragable} from "./events/drag.mjs"
import {addPanelEvents} from "./events/all.mjs"

let plot = data.plot
let plotType = plot.type

export function addTimePanel(panelSetting, parentPanel=null) {

  let timePanel = "<div id='time' class='panel'></div>"
  let floatingPanel = (plotType != "Country" && plotType != "Indicator")

  if (floatingPanel) { $("body").append(timePanel) } else { parentPanel.append(timePanel) }

  let panel = $("#time.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  plot.animation = {"direction": "forward", "speed": 600, "speedMultiplier": 1, "status": "inactive"}

  panel.append("<h1 id='years'><span id='min-year'>" + readCookie("minCap") + "</span> - <span id='max-year'>" + readCookie("maxCap") + "</span></h1>")

  panel.append("<img id='timeline' src='/front/imgs/panels/time/timeline.svg'>")

  panel.append("<img id='skip-backward' class='button' src='/front/imgs/panels/time/skip-backward.svg'>")
  panel.append("<img id='play-forward' class='button' src='/front/imgs/panels/time/play-forward.svg'>")
  panel.append("<img id='fast-forward' class='button' src='/front/imgs/panels/time/fast-forward.svg'>")

  panel.append("<img id='min-cap' class='controller' src='/front/imgs/panels/time/cap.svg'>")
  panel.append("<img id='point' class='controller' src='/front/imgs/panels/time/point.svg'>")
  panel.append("<img id='max-cap' class='controller' src='/front/imgs/panels/time/cap.svg'>")

  panel.append("<img id='fast-backward' class='button' src='/front/imgs/panels/time/fast-backward.svg'>")
  panel.append("<img id='play-backward' class='button' src='/front/imgs/panels/time/play-backward.svg'>")
  panel.append("<img id='skip-forward' class='button' src='/front/imgs/panels/time/skip-forward.svg'>")

  panel.append("<p id='year'>" + readCookie("year") + "</p>")

  scaleT()

  makeDragable($("#min-cap"), [dragController])
  makeDragable($("#point"), [dragController])
  makeDragable($("#max-cap"), [dragController])

  let buttons = $("#time.panel .button")

  for (let i = 0; i < buttons.length; i++) {

    let button = $("#" + buttons[i].id)

    button.mouseover(function() {

      if ((buttons[i].id == "play-forward" || buttons[i].id == "play-backward") && plot.animation.status == "active") {
        button.attr("src", "/front/imgs/panels/time/hover/pause.svg")
      } else {
        button.attr("src", "/front/imgs/panels/time/hover/" + buttons[i].id + ".svg")
      }

    }).mouseout(function() {

      if (!((buttons[i].id == "fast-forward" || buttons[i].id == "fast-backward") && plot.animation.speedMultiplier != 1)) {

        if ((buttons[i].id == "play-forward" || buttons[i].id == "play-backward") && plot.animation.status == "active") {
          button.attr("src", "/front/imgs/panels/time/pause.svg")
        } else {
          button.attr("src", "/front/imgs/panels/time/" + buttons[i].id + ".svg")
        }

      } else if (buttons[i].id == "fast-forward" && plot.animation.direction != "forward") {

        button.attr("src", "/front/imgs/panels/time/" + buttons[i].id + ".svg")

      } else if (buttons[i].id == "fast-backward" && plot.animation.direction != "backward") {

        button.attr("src", "/front/imgs/panels/time/" + buttons[i].id + ".svg")

      }

    })

    button.click(function() {

      switch (button.attr("id")) {

        case "skip-backward":
          skip("backward", button)
          break

        case "play-forward":
          play("forward", button)
          break

        case "fast-forward":
          speed("forward", button)
          break

        case "fast-backward":
          speed("backward", button)
          break

        case "play-backward":
          play("backward", button)
          break

        case "skip-forward":
          skip("forward", button)
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

  let offset = $("#timeline")[0].offsetLeft

  $("#min-cap").css({"left": offset + plot.t.scale(plot.t.minCap) + "px"})
  $("#point").css({"left": offset + $("#min-cap")[0].width + plot.t.scale(plot.t.year) + "px"})
  $("#year").css({"left": offset + $("#min-cap")[0].width + plot.t.scale(plot.t.year) + "px"})
  $("#max-cap").css({"left": offset + $("#min-cap")[0].width + $("#point")[0].width + plot.t.scale(plot.t.maxCap) + "px"})

  if (floatingPanel) { addPanelEvents(panel) }

  if (panelSetting) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

}

export function skip(direction, button=null) {

  clearAnimation()

  if (direction == "forward") {
    plot.t.year = plot.t.maxCap
  } else if (direction == "backward") {
    plot.t.year = plot.t.minCap
  }

  writeCookie("year", plot.t.year)

  animateTimeline(0)
  animationSwitch(0)

}

export function play(direction, button=null) {

  if (plot.animation.status == "inactive") {

    if (plot.animation.speedMultiplier != 1 && plot.animation.direction != direction) {

      plot.animation.speedMultiplier = 1

      $("#fast-forward").attr("src", "/front/imgs/panels/time/fast-forward.svg")
      $("#fast-backward").attr("src", "/front/imgs/panels/time/fast-backward.svg")

    }

    startAnimation(direction)
    button.attr("src", "/front/imgs/panels/time/hover/pause.svg")

  } else {

    clearAnimation()
    button.attr("src", "/front/imgs/panels/time/hover/" + button.attr("id") + ".svg")

  }

}

export function speed(direction, button=null) {

  if (plot.animation.speedMultiplier == 1) {

    plot.animation.speedMultiplier = 3
    plot.animation.direction = direction

    button.attr("src", "/front/imgs/panels/time/hover/" + button.attr("id") + ".svg")

  } else {

    if (plot.animation.direction == direction) {

      plot.animation.speedMultiplier = 1

      button.attr("src", "/front/imgs/panels/time/" + button.attr("id") + ".svg")

    } else {

      plot.animation.direction = direction

    }

  }

  if (plot.animation.status == "active") {

    clearInterval(plot.animation.interval)
    startAnimation(direction)

  }

  if (direction == "forward") {
    $("#fast-backward").attr("src", "/front/imgs/panels/time/fast-backward.svg")
  } else if (direction == "backward") {
    $("#fast-forward").attr("src", "/front/imgs/panels/time/fast-forward.svg")
  }

}

export function dragController(controller, eventCoordinates) {

  let minOffset = $("#timeline")[0].offsetLeft
  let maxOffset = minOffset + $("#timeline")[0].offsetWidth

  let minCap = $("#min-cap")[0].offsetLeft

  let point = $("#point")[0].offsetLeft
  let pointWidth = $("#point")[0].width

  let maxCap = $("#max-cap")[0].offsetLeft

  if (controller[0].id == "min-cap" && eventCoordinates[0] > minOffset && eventCoordinates[0] < point - pointWidth + 1) {

    plot.t.minCap = Math.floor(plot.t.scale.invert(minCap - minOffset))

    writeCookie("minCap", plot.t.minCap)

    $("#min-year").text(plot.t.minCap)

    clearAnimation()
    scaleAxes()
    animationSwitch(0)

    controller.css({"left": eventCoordinates[0]})

  } else if (controller[0].id == "point" && eventCoordinates[0] > minCap + pointWidth && eventCoordinates[0] < maxCap - pointWidth + 1) {

    plot.t.year = Math.floor(plot.t.scale.invert(point - pointWidth - minOffset))

    writeCookie("year", plot.t.year)

    $("#year").css({"left": eventCoordinates[0]})
    $("#year").text(plot.t.year)

    clearAnimation()
    animationSwitch(0)

    controller.css({"left": eventCoordinates[0]})

  } else if (controller[0].id == "max-cap" && eventCoordinates[0] > point + pointWidth && eventCoordinates[0] < maxOffset + 1) {

    plot.t.maxCap = Math.floor(plot.t.scale.invert(maxCap - (pointWidth * 2) - minOffset))

    writeCookie("maxCap", plot.t.maxCap)

    $("#max-year").text(plot.t.maxCap)

    clearAnimation()
    scaleAxes()
    animationSwitch(0)

    controller.css({"left": eventCoordinates[0]})

  }

}