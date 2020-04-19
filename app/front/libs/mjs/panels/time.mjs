import {animatePlots} from "../animation/plots.mjs"
import {makeDragable} from "../ui/dragable.mjs"

let plot = data.plot

export function addTimePanel() {

  $("body").append("<div id='time' class='panel'></div>")

  let panel = $("#time.panel")

  plot.t.minCap = plot.t.minYear
  plot.t.maxCap = plot.t.maxYear

  panel.append("<h1 id='years'><span id='minYear'>" + plot.t.minCap + "</span> - <span id='maxYear'>" + plot.t.maxCap + "</span></h1>")
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

  }

  $("body").on("keypress", function(event) {

    if (event.keyCode == 32) {

      // animatePlots()

    }

  })

  makeDragable(panel)

}

export function updateTimeControls(controller, eventCoordinates) {

  let minOffset = $("#line")[0].offsetLeft
  let maxOffset = minOffset + $("#line")[0].offsetWidth

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

    controller.css({"left": eventCoordinates[0]})

    $("#year").css({"left": eventCoordinates[0]})
    $("#year").text(plot.t.year)

  } else if (controller[0].id == "maxCap" && eventCoordinates[0] <= maxOffset && eventCoordinates[0] >= point + pointWidth) {

    plot.t.maxCap = Math.floor(data.plot.t.scale.invert(maxCap - (pointWidth * 2) - minOffset))

    controller.css({"left": eventCoordinates[0]})

    $("#maxYear").text(plot.t.maxCap)

  }

}
