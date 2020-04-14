// import {animatePlots} from "../animation/plots.mjs"

let plot = data.plot

export function addTimePanel() {

  $("body").append("<div id='time' class='panel'></div>")
  $("#time.panel").append("<h1 id='years'><span id='yearMin'>" + plot.time.yearMin + "</span> - <span id='yearMax'>" + plot.time.yearMax + "</span></h1>")
  $("#time.panel").append("<img id='menu' src='/front/imgs/time/line.svg') }}'>")

  $("body").on("keypress", function(event) {

    if (event.keyCode == 32) {

      // animatePlots()

    }

  })

}
