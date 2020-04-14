// import {animatePlots} from "../animation/plots.mjs"

export function addTimePanel() {

  $("body").append("<div id='time' class='panel'></div>")
  $("#time.panel").append("<h1 id='name'>Time</h1>")

  $("body").on("keypress", function(event) {

    if (event.keyCode == 32) {

      // animatePlots()

    }

  })

}
