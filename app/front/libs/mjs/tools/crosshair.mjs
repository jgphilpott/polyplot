import {width, height} from "../env/window.mjs"

let plot = data.plot

export function addCrosshairTool() {

  $("#canvas").mousemove(function(event) {

    $(".crosshair").remove()

    let settings = data.client.settings

    if (settings.poly2.crosshairs && !plot.animation.hover) {

      $("#canvas").css("cursor", "crosshair")

      $("body").append("<div id='tooltip' class='panel crosshair'><p><b>X:</b> " + format(plot.x.scale.invert(event.pageX), "oodles") + "</p><p><b>Y:</b> " + format(plot.y.scale.invert(event.pageY), "oodles") + "</p></div>")

      let canvas = d3.select("#canvas")
      let tooltip = $("#tooltip")
      let tooltipMargin = 10

      tooltip.css("z-index", settings.panels.zIndex + 1)
      setBackground(tooltip, settings.general.opacity)

      let tooltipWidth = tooltip.outerWidth()
      let tooltipHeight = tooltip.outerHeight()

      if (event.pageX >= width() / 2) {
        tooltip.css("left", event.pageX - tooltipWidth - tooltipMargin)
      } else if (event.pageX < width() / 2) {
        tooltip.css("left", event.pageX + tooltipMargin)
      }

      if (event.pageY >= height() / 2) {
        tooltip.css("top", event.pageY - tooltipHeight - tooltipMargin)
      } else if (event.pageY < height() / 2) {
        tooltip.css("top", event.pageY + tooltipMargin)
      }

      canvas.append("line")
            .attr("class", "crosshair")
            .attr("x1", 0)
            .attr("y1", event.pageY)
            .attr("x2", width())
            .attr("y2", event.pageY)

      canvas.append("line")
            .attr("class", "crosshair")
            .attr("x1", event.pageX)
            .attr("y1", 0)
            .attr("x2", event.pageX)
            .attr("y2", height())

      d3.selectAll(".crosshair").setAsBackLayer()
      d3.selectAll(".axis").setAsBackLayer()

    } else {

      $("#canvas").css("cursor", "default")

    }

  })

}
