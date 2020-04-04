import {animatePlots} from "../animation/plots.mjs"

export function addTimePanel() {

  let panel = $(".panel#time")

  $("body").on("keypress", function(event) {

    if (event.keyCode == 32) {

      animatePlots()

    }

  })

}
