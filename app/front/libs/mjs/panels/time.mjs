// import {animatePlots} from "../animation/plots.mjs"
import {makeDragable} from "../ui/dragable.mjs"

export function addTimePanel() {

  let plot = data.plot

  $("body").append("<div id='time' class='panel'></div>")

  let panel = $("#time.panel")

  plot.t.minCap = plot.t.minYear
  plot.t.maxCap = plot.t.maxYear

  panel.append("<h1 id='years'><span id='yearMin'>" + plot.t.minYear + "</span> - <span id='yearMax'>" + plot.t.maxYear + "</span></h1>")
  panel.append("<img id='line' src='/front/imgs/time/line.svg') }}'>")

  panel.append("<img id='skipBackward' class='button' src='/front/imgs/time/skipBackward.svg') }}'>")
  panel.append("<img id='playForward' class='button' src='/front/imgs/time/playForward.svg') }}'>")
  panel.append("<img id='fastForward' class='button' src='/front/imgs/time/fastForward.svg') }}'>")

  panel.append("<img id='minCap' class='controller' src='/front/imgs/time/cap.svg') }}'>")
  panel.append("<img id='point' class='controller' src='/front/imgs/time/point.svg') }}'>")
  panel.append("<img id='maxCap' class='controller' src='/front/imgs/time/cap.svg') }}'>")

  panel.append("<img id='fastBackward' class='button' src='/front/imgs/time/fastBackward.svg') }}'>")
  panel.append("<img id='playBackward' class='button' src='/front/imgs/time/playBackward.svg') }}'>")
  panel.append("<img id='skipForward' class='button' src='/front/imgs/time/skipForward.svg') }}'>")

  panel.append("<p id='year'>" + plot.t.year + "</p>")

  makeDragable($("#minCap.controller"), [updateTimeControllers])
  makeDragable($("#point.controller"), [updateTimeControllers])
  makeDragable($("#maxCap.controller"), [updateTimeControllers])

  $("body").on("keypress", function(event) {

    if (event.keyCode == 32) {

      // animatePlots()

    }

  })

  makeDragable(panel)

}

export function updateTimeControllers(controller, eventCoordinates) {

  let minOffset = 110
  let maxOffset = 540

  let point = $("#point")[0].offsetLeft
  let pointWidth = $("#point")[0].width

  if (controller[0].id == "minCap" && eventCoordinates[0] >= minOffset && eventCoordinates[0] <= point - pointWidth) {

    controller.css({"left": eventCoordinates[0]})

  } else if (controller[0].id == "point" && eventCoordinates[0] >= $("#minCap")[0].offsetLeft + pointWidth && eventCoordinates[0] <= $("#maxCap")[0].offsetLeft - pointWidth) {

    data.plot.t.year = Math.floor(data.plot.t.scale.invert($("#point")[0].offsetLeft - minOffset - 24))

    controller.css({"left": eventCoordinates[0]})

    $("#year").css({"left": eventCoordinates[0]})
    $("#year").text(data.plot.t.year)

  } else if (controller[0].id == "maxCap" && eventCoordinates[0] <= maxOffset && eventCoordinates[0] >= point + pointWidth) {

    controller.css({"left": eventCoordinates[0]})

  }

}
