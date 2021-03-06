import {width, height} from "../env/window.mjs"

let plot = data.plot

export function addCrosshairTool() {

  $("#canvas").mousemove(function(event) {

    $(".crosshair").remove()

    if (localRead("settings").poly2.crosshairs && !plot.animation.hover) {

      $("#canvas").css("cursor", "crosshair")

      $("body").append("<div id='tooltip' class='panel crosshair'><p><b>X:</b> " + format(plot.x.scale.invert(event.pageX)) + "</p><p><b>Y:</b> " + format(plot.y.scale.invert(event.pageY)) + "</p></div>")

      let tooltip = $("#tooltip")
      let tooltipMargin = 10

      let tooltipWidth = tooltip.outerWidth()
      let tooltipHeight = tooltip.outerHeight()

      tooltip.css("z-index", tooltipMargin)

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

      let canvas = d3.select("#canvas")

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
