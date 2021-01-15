import {rainbow} from "../../../../libs/mjs/colors/solid/rainbow.mjs"

$(document).ready(function() {

  $("body").append("<canvas id='canvas'></canvas>")

  summonParticleWeb(42, rainbow)

  let indicator = data.indicator

  $("body").append("<div id='indicator' class='panel'><a href='/api/indicators/" + indicator.code + "'><h1 id='name'>" + indicator.name + "</h1></a></div>")

  let panel = $("#indicator.panel")

  let stats = "<div id='stats'><h2>Stats</h2>"

  stats += "<svg class='completeness'></svg>"
  stats += "<p><b>Source:</b> World Bank</p>"
  stats += "<p><b>Date:</b> " + indicator.last_updated + "</p>"
  stats += "<p><b>Size:</b> " + indicator.size + "</p></div>"

  let categories = "<div id='categories'>"

  if (indicator.categories.length > 1) {
    categories += "<h2>Categories</h2>"
  } else {
    categories += "<h2>Category</h2>"
  }

  for (let i = 0; i < indicator.categories.length; i++) {

    categories += "<div class='category-box'>"
    categories += "<img class='icon' src='/front/imgs/panels/indicators/categories/" + camalize(indicator.categories[i]) + ".png'>"
    categories += "<p class='category'><b>" + indicator.categories[i] + "</b></p></div>"

  }

  categories += "</div>"

  panel.append(stats + categories)

  let pie = d3.pie().sort(null)
  let arc = d3.arc().innerRadius(40).outerRadius(50)

  d3.select("svg")
    .selectAll(".completeness")
    .data(pie([indicator.completeness, 100 - indicator.completeness]))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("transform", "translate(60, 60)")
    .attr("fill-opacity", function(data) {

      return [1, 0][data.index]

    })
    .style("fill", function(data) {

      let scale = d3.scaleLinear().range(["red", "orange", "green"]).domain([0, 50, 100])

      return [scale(indicator.completeness), "black"][data.index]

    })

    d3.select("svg")
      .selectAll(".label")
      .data([indicator.completeness])
      .enter()
      .append("text")
      .text(format(indicator.completeness, "percent"))
      .attr("font-size", "16px")
      .attr("transform", "translate(60, 60)")
      .attr("text-anchor", "middle")

    d3.select("svg")
      .selectAll(".label-name")
      .data([indicator.completeness])
      .enter()
      .append("text")
      .text("Complete")
      .attr("font-size", "12px")
      .attr("transform", "translate(60, 60)")
      .attr("text-anchor", "middle")
      .attr("dy", "1.3em")

})
