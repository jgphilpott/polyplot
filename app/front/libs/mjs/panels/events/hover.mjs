export function addPanelHover(panel, duration=1000) {

  let id = panel.attr("id")
  let close = $("#" + id + " .close")

  let settings = data.client.settings
  let panelSettings = settings.panels
  let generalSettings = settings.general

  panel.mouseover(function(event) {

    panelSettings.zIndex += 1

    $(".crosshair").remove()
    $("#context-menu").remove()

    panel.css("z-index", panelSettings.zIndex)
    close.animate({opacity: 1}, {duration: duration, queue: false})
    panel.animate({backgroundColor: "rgba(220, 220, 220, " + generalSettings.opacity + ")"}, {duration: duration, queue: false})

  }).mouseout(function(event) {

    close.animate({opacity: 0}, {duration: duration, queue: false})
    panel.animate({backgroundColor: "rgba(230, 230, 230, " + generalSettings.opacity + ")"}, {duration: duration, queue: false})

  })

}