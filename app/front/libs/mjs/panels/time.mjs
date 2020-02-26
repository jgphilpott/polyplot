import {animatePlots} from "../animation/plots.mjs"

export function addTimeEvents() {

  $("body").on("keypress", function(event) {

    if (event.keyCode == 32) {

      animatePlots()

    }

  })

}
