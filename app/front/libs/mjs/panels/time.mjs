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

  makeDragable($("#minCap.controller"))
  makeDragable($("#point.controller"))
  makeDragable($("#maxCap.controller"))

  $("body").on("keypress", function(event) {

    if (event.keyCode == 32) {

      // animatePlots()

    }

  })

  makeDragable(panel)

}
