$(document).ready(function() {

  let plot = data.plot
  let plotType = plot.type

  $("#nav #menu").click(function() {

    let error = $("#error.panel")
    let home = $("#home.panel")
    let menu = $("#menu.panel")

    if (menu.css("visibility") == "hidden") {

      error.css("visibility", "hidden")
      home.css("visibility", "hidden")
      menu.css("visibility", "visible")

    } else {

      error.css("visibility", "visible")
      home.css("visibility", "visible")
      menu.css("visibility", "hidden")

    }

  })

  if (plotType != "Home" && plotType != "Error") {

    $("#nav, #forkme").mouseover(function() {

      $(".crosshair").remove()
      plot.animation.showCrosshair = false

    }).mouseout(function() {

      plot.animation.showCrosshair = true

    })

  }

})
