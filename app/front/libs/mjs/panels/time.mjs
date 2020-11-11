import {startAnimation} from "../animation/plots.mjs"
import {clearAnimation} from "../animation/plots.mjs"

import {animateMaps} from "../animation/types/maps.mjs"
import {animateCircles} from "../animation/types/circles.mjs"
import {animateSpheres} from "../animation/types/spheres.mjs"
import {animateTimeline} from "../animation/types/timeline.mjs"

import {scaleT} from "../scales/axes.mjs"

import {makeDragable} from "./events/drag.mjs"
import {addPanelEvents} from "./events/all.mjs"

let plot = data.plot
let plotType = plot.type

export function addTimePanel() {

  $("body").append("<div id='time' class='panel'></div>")

  let panel = $("#time.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  plot.t.minCap = plot.t.minYear
  plot.t.maxCap = plot.t.maxYear

  plot.animation = {"direction": "forward", "speed": 600, "speedMultiplier": 1, "status": "inactive", "interval": null}

  panel.append("<h1 id='years'><span id='minYear'>" + plot.t.minCap + "</span> - <span id='maxYear'>" + plot.t.maxCap + "</span></h1>")

  panel.append("<img id='timeline' src='/front/imgs/panels/time/timeline.svg'>")

  panel.append("<img id='skipBackward' class='button' src='/front/imgs/panels/time/skipBackward.svg'>")
  panel.append("<img id='playForward' class='button' src='/front/imgs/panels/time/playForward.svg'>")
  panel.append("<img id='pauseLeft' class='button' src='/front/imgs/panels/time/pauseLeft.svg'>")
  panel.append("<img id='fastForward' class='button' src='/front/imgs/panels/time/fastForward.svg'>")

  panel.append("<img id='minCap' class='controller' src='/front/imgs/panels/time/cap.svg'>")
  panel.append("<img id='point' class='controller' src='/front/imgs/panels/time/point.svg'>")
  panel.append("<img id='maxCap' class='controller' src='/front/imgs/panels/time/cap.svg'>")

  panel.append("<img id='fastBackward' class='button' src='/front/imgs/panels/time/fastBackward.svg'>")
  panel.append("<img id='pauseRight' class='button' src='/front/imgs/panels/time/pauseRight.svg'>")
  panel.append("<img id='playBackward' class='button' src='/front/imgs/panels/time/playBackward.svg'>")
  panel.append("<img id='skipForward' class='button' src='/front/imgs/panels/time/skipForward.svg'>")

  panel.append("<p id='year'>" + plot.t.year + "</p>")

  scaleT(plotType)

  makeDragable($("#minCap"), [dragTimeControls])
  makeDragable($("#point"), [dragTimeControls])
  makeDragable($("#maxCap"), [dragTimeControls])

  let buttons = $(".button")

  // for (let i = 0; i < buttons.length; i++) {
  //
  //   let button = $("#" + buttons[i].id)
  //
  //   button.mouseover(function() {
  //
  //     button.attr("src", "/front/imgs/panels/time/hover/" + buttons[i].id + ".svg")
  //
  //   }).mouseout(function() {
  //
  //     if (!((buttons[i].id == "fastForward" || buttons[i].id == "fastBackward") && plot.animation.speedMultiplier != 1)) {
  //
  //       button.attr("src", "/front/imgs/panels/time/" + buttons[i].id + ".svg")
  //
  //     } else if (buttons[i].id == "fastForward" && plot.animation.direction != "forward") {
  //
  //       button.attr("src", "/front/imgs/panels/time/" + buttons[i].id + ".svg")
  //
  //     } else if (buttons[i].id == "fastBackward" && plot.animation.direction != "backward") {
  //
  //       button.attr("src", "/front/imgs/panels/time/" + buttons[i].id + ".svg")
  //
  //     }
  //
  //   })
  //
  //   button.click(function() {
  //
  //     switch (buttons[i].id) {
  //
  //       case "skipBackward":
  //
  //         skip("backward")
  //
  //         break
  //
  //       case "playForward":
  //
  //         startAnimation("forward")
  //
  //         break
  //
  //       case "pauseLeft":
  //
  //         clearAnimation()
  //
  //         break
  //
  //       case "fastForward":
  //
  //         toggleSpeed("forward")
  //
  //         break
  //
  //       case "fastBackward":
  //
  //         toggleSpeed("backward")
  //
  //         break
  //
  //       case "playBackward":
  //
  //         startAnimation("backward")
  //
  //         break
  //
  //       case "pauseRight":
  //
  //         clearAnimation()
  //
  //         break
  //
  //       case "skipForward":
  //
  //         skip("forward")
  //
  //         break
  //
  //     }
  //
  //   })
  //
  // }
  //
  // $("body").on("keypress", function(event) {
  //
  //   if (event.keyCode == 32) {
  //
  //     if (plot.animation.status == "inactive") {
  //
  //       startAnimation()
  //
  //     } else if (plot.animation.status == "active") {
  //
  //       clearAnimation()
  //
  //     }
  //
  //   }
  //
  // })

  let offset = $("#timeline")[0].offsetLeft + $("#minCap")[0].width + plot.t.scale(plot.t.year)

  $("#point").css({"left": offset + "px"})
  $("#year").css({"left": offset + "px"})

  addPanelEvents(panel)

}

export function skip(direction) {

//   clearAnimation()
//
//   if (direction == "forward") {
//
//     plot.t.year = plot.t.maxCap
//
//   } else if (direction == "backward") {
//
//     plot.t.year = plot.t.minCap
//
//   }
//
//   animateTimeline(0)
//
//   if (plotType == "Map") {
//
//     animateMaps(0)
//
//   } else if (plotType == "Poly2") {
//
//     animateCircles(0)
//
//   } else if (plotType == "Poly3") {
//
//     animateSpheres(0)
//
//   }

}

export function toggleSpeed(direction) {

//   if (plot.animation.speedMultiplier != 1) {
//
//     if (plot.animation.direction == direction) {
//
//       plot.animation.speedMultiplier = 1
//
//     } else {
//
//       plot.animation.direction = direction
//
//     }
//
//   } else {
//
//     plot.animation.direction = direction
//     plot.animation.speedMultiplier = 3
//
//   }
//
//   if (plot.animation.status == "active") {
//
//     clearInterval(plot.animation.interval)
//     startAnimation(direction)
//
//   }
//
//   if (direction == "forward") {
//
//     $("#fastBackward").attr("src", "/front/imgs/panels/time/fastBackward.svg")
//
//   } else if (direction == "backward") {
//
//     $("#fastForward").attr("src", "/front/imgs/panels/time/fastForward.svg")
//
//   }

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

    if (plotType == "Map") {

      animateMaps(0)

    } else if (plotType == "Poly2") {

      animateCircles(0)

    } else if (plotType == "Poly3") {

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
