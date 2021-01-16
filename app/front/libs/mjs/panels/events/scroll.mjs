export function makeScrollable(panel) {

  $(document).on("wheel", function(event) {

    let margin = 100

    let top = panel.position().top
    let bottom = panel.outerHeight() - $(window).height()

    let wheelDelta = event.originalEvent.wheelDelta
    let position = top + wheelDelta

    if (wheelDelta > 0 && position <= margin) {
      panel.css("top", position)
    } else if (wheelDelta < 0 && position >= -bottom - margin) {
      panel.css("top", position)
    }

  })

}
