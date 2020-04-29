export function addPanelEvents(panel) {

  let id = panel.attr("id")
  let close = $("#" + id + " .close")

  panel.mouseover(function() {

    close.css({"visibility": "visible"})

  }).mouseout(function() {

    close.css({"visibility": "hidden"})

  })

  close.click(function() {

    close.css({"visibility": "hidden"})
    panel.css({"visibility": "hidden"})

  })

}
