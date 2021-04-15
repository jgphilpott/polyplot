export function addPanelHover(panel) {

  let duration = 1000

  let id = panel.attr("id")
  let close = $("#" + id + " .close")
  let panelSettings = data.client.settings.panels

  panel.mouseover(function(event) {

    panelSettings.zIndex += 1

    $(".crosshair").remove()
    $("#context-menu").remove()

    let backgroundColor = $(this).css("backgroundColor").replace(/[^0-9.,]/g, "").split(",")

    let r = backgroundColor[0]
    let g = backgroundColor[1]
    let b = backgroundColor[2]
    let a = backgroundColor[3]

    panel.css("z-index", panelSettings.zIndex)
    close.animate({opacity: 1}, {duration: duration, queue: false})
    panel.animate({backgroundColor: "rgb(179, 179, 179, " + a + ")"}, {duration: duration, queue: false})

  }).mouseout(function(event) {

    let backgroundColor = $(this).css("backgroundColor").replace(/[^0-9.,]/g, "").split(",")

    let r = backgroundColor[0]
    let g = backgroundColor[1]
    let b = backgroundColor[2]
    let a = backgroundColor[3]

    close.animate({opacity: 0}, {duration: duration, queue: false})
    panel.animate({backgroundColor: "rgb(204, 204, 204, " + a + ")"}, {duration: duration, queue: false})

  })

}
