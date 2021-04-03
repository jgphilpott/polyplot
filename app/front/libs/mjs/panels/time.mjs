import {scaleAxes} from "../scales/axes.mjs"

import {startAnimation} from "../animation/plots.mjs"
import {clearAnimation} from "../animation/plots.mjs"

import {animateMaps} from "../animation/types/maps.mjs"
import {animatePanels} from "../animation/types/panels.mjs"
import {animateCircles} from "../animation/types/circles.mjs"
import {animateSpheres} from "../animation/types/spheres.mjs"
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

  scaleAxes()

  // makeDragable($("#minCap"), [dragTimeControls, animateTimeline])
  // makeDragable($("#point"), [dragTimeControls, animateTimeline])
  // makeDragable($("#maxCap"), [dragTimeControls, animateTimeline])
  //
  // let buttons = $(".button")
  //
  // for (let i = 0; i < buttons.length; i++) {
  //
  //   let button = $("#" + buttons[i].id)
  //
  //   button.mouseover(function() {
  //
  //     if ((buttons[i].id == "playForward" || buttons[i].id == "playBackward") && plot.animation.status == "active") {
  //       button.attr("src", "/front/imgs/panels/time/hover/pause.svg")
  //     } else {
  //       button.attr("src", "/front/imgs/panels/time/hover/" + buttons[i].id + ".svg")
  //     }
  //
  //   }).mouseout(function() {
  //
  //     if (!((buttons[i].id == "fastForward" || buttons[i].id == "fastBackward") && plot.animation.speedMultiplier != 1)) {
  //
  //       if ((buttons[i].id == "playForward" || buttons[i].id == "playBackward") && plot.animation.status == "active") {
  //         button.attr("src", "/front/imgs/panels/time/pause.svg")
  //       } else {
  //         button.attr("src", "/front/imgs/panels/time/" + buttons[i].id + ".svg")
  //       }
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
  //         if (plot.animation.status == "inactive") {
  //           startAnimation("forward")
  //         } else {
  //           clearAnimation()
  //         }
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
  //         if (plot.animation.status == "inactive") {
  //           startAnimation("backward")
  //         } else {
  //           clearAnimation()
  //         }
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
  //
  // let offset = $("#timeline")[0].offsetLeft
  //
  // $("#minCap").css({"left": offset + plot.t.scale(plot.t.minCap) + "px"})
  //
  // $("#point").css({"left": offset + $("#minCap")[0].width + plot.t.scale(plot.t.year) + "px"})
  // $("#year").css({"left": offset + $("#minCap")[0].width + plot.t.scale(plot.t.year) + "px"})
  //
  // $("#maxCap").css({"left": offset + $("#minCap")[0].width + $("#point")[0].width + plot.t.scale(plot.t.maxCap) + "px"})

  if (floatingPanel) { addPanelEvents(panel) }

  if (panelSetting) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

}

export function skip(direction) {

  // clearAnimation()
  //
  // if (direction == "forward") {
  //
  //   plot.t.year = plot.t.maxCap
  //
  // } else if (direction == "backward") {
  //
  //   plot.t.year = plot.t.minCap
  //
  // }
  //
  // animatePanels()
  // animateTimeline(0)
  //
  // if (plotType == "Map") {
  //   animateMaps(0)
  // } else if (plotType == "Poly2") {
  //   animateCircles(0)
  // } else if (plotType == "Poly3") {
  //   animateSpheres(0)
  // }
  //
  // writeCookie("year", plot.t.year)

}

export function toggleSpeed(direction) {

  // if (plot.animation.speedMultiplier == 1) {
  //
  //   plot.animation.direction = direction
  //   plot.animation.speedMultiplier = 3
  //
  // } else {
  //
  //   if (plot.animation.direction == direction) {
  //
  //     plot.animation.speedMultiplier = 1
  //
  //   } else {
  //
  //     plot.animation.direction = direction
  //
  //   }
  //
  // }
  //
  // if (plot.animation.status == "active") {
  //
  //   clearInterval(plot.animation.interval)
  //   startAnimation(direction)
  //
  // }
  //
  // if (direction == "forward") {
  //
  //   $("#fastBackward").attr("src", "/front/imgs/panels/time/fastBackward.svg")
  //
  // } else if (direction == "backward") {
  //
  //   $("#fastForward").attr("src", "/front/imgs/panels/time/fastForward.svg")
  //
  // }

}

export function dragTimeControls(controller, eventCoordinates) {

  // let minOffset = $("#timeline")[0].offsetLeft
  // let maxOffset = minOffset + $("#timeline")[0].offsetWidth
  //
  // let minCap = $("#minCap")[0].offsetLeft
  //
  // let point = $("#point")[0].offsetLeft
  // let pointWidth = $("#point")[0].width
  //
  // let maxCap = $("#maxCap")[0].offsetLeft
  //
  // if (controller[0].id == "minCap" && eventCoordinates[0] > minOffset && eventCoordinates[0] < point - pointWidth + 1) {
  //
  //   plot.t.minCap = Math.floor(plot.t.scale.invert(minCap - minOffset))
  //
  //   clearAnimation()
  //   scaleAxes()
  //
  //   if (plotType == "Map") {
  //     animateMaps(0)
  //   } else if (plotType == "Poly2") {
  //     animateCircles(0)
  //   } else if (plotType == "Poly3") {
  //     animateSpheres(0)
  //   }
  //
  //   controller.css({"left": eventCoordinates[0]})
  //
  //   $("#minYear").text(plot.t.minCap)
  //
  //   writeCookie("minCap", plot.t.minCap)
  //
  // } else if (controller[0].id == "point" && eventCoordinates[0] > minCap + pointWidth && eventCoordinates[0] < maxCap - pointWidth + 1) {
  //
  //   plot.t.year = Math.floor(plot.t.scale.invert(point - pointWidth - minOffset))
  //
  //   clearAnimation()
  //   animatePanels()
  //
  //   if (plotType == "Map") {
  //     animateMaps(0)
  //   } else if (plotType == "Poly2") {
  //     animateCircles(0)
  //   } else if (plotType == "Poly3") {
  //     animateSpheres(0)
  //   }
  //
  //   controller.css({"left": eventCoordinates[0]})
  //
  //   $("#year").css({"left": eventCoordinates[0]})
  //   $("#year").text(plot.t.year)
  //
  //   writeCookie("year", plot.t.year)
  //
  // } else if (controller[0].id == "maxCap" && eventCoordinates[0] > point + pointWidth && eventCoordinates[0] < maxOffset + 1) {
  //
  //   plot.t.maxCap = Math.floor(plot.t.scale.invert(maxCap - (pointWidth * 2) - minOffset))
  //
  //   clearAnimation()
  //   scaleAxes()
  //
  //   if (plotType == "Map") {
  //     animateMaps(0)
  //   } else if (plotType == "Poly2") {
  //     animateCircles(0)
  //   } else if (plotType == "Poly3") {
  //     animateSpheres(0)
  //   }
  //
  //   controller.css({"left": eventCoordinates[0]})
  //
  //   $("#maxYear").text(plot.t.maxCap)
  //
  //   writeCookie("maxCap", plot.t.maxCap)
  //
  // }

}
