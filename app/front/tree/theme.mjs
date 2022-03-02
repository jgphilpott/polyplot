import {addMenuPanel, updateSettings} from "../libs/mjs/panels/menu.mjs"

console.log("Welcome to Polyplot!")

$(document).ready(function() {

  addMenuPanel()

  $("#nav #menu").click(function() { toggleMenu() })

  $("#nav, #forkme").mouseover(function() {

    $(".crosshair").remove()
    $("#context-menu").remove()

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

    let settings = data.client.settings

    if (menu.css("visibility") == "hidden") {

      updateSettings("panels", "menu", true)

      home.css("visibility", "hidden")
      error.css("visibility", "hidden")

      home.children().css("visibility", "hidden")
      error.children().css("visibility", "hidden")

    } else {

      updateSettings("panels", "menu", false)

      home.css("visibility", "visible")
      error.css("visibility", "visible")

      home.children().css("visibility", "visible")
      error.children().css("visibility", "visible")

    }

  }

})