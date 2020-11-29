export function makeClosable(panel) {

  let id = panel.attr("id")
  let close = $("#" + id + " .close")

  close.click(function() {

    if (panel.hasClass("plot")) {
      panel.remove()
    } else {
      panel.css({"visibility": "hidden"})
    }

  })

}
