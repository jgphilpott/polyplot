import {addMenuPanel} from "../libs/mjs/panels/menu.mjs"

$(document).ready(function() {

  console.log("Welcome to Polyplot!")

  addMenuPanel()

  $("#nav #menu").click(function() {

    toggleMenu()

  })

  $(document).keypress(function(event) {

    if (event.keyCode == 13) {

      event.preventDefault()
      event.stopPropagation()

      toggleMenu()

    }

  })

  function toggleMenu() {

    let menu = $("#menu.panel")
    let home = $("#home.panel")
    let error = $("#error.panel")

    if (menu.css("visibility") == "hidden") {

      menu.css("visibility", "visible")
      home.css("visibility", "hidden")
      error.css("visibility", "hidden")

    } else {

      menu.css("visibility", "hidden")
      home.css("visibility", "visible")
      error.css("visibility", "visible")

    }

  }

  $("#nav, #forkme").mouseover(function() {

    $(".crosshair").remove()
    $("#context-menu").remove()

  })

})
