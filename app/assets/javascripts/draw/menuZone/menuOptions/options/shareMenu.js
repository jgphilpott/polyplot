function drawShareMenu() {
  if (iconFiveOpen) {

    menuSize = 145;

    menu.append("rect")
        .attr("class", "icon-five-item nav-icon-background")
        .attr("width", 24)
        .attr("height", 24)
        .attr("x", 70)
        .attr("y", 24)
        .on("click", function() { window.open("mailto:?&subject=iGraph - Data Visualization&body=Take%20a%20look%20at%20this%20awesome%20data%20visualization%20tool%20made%20by%20Jacob%20Philpott%20with%20D3.js%3A%20i-graph.herokuapp.com"); });

    menu.append("path")
        .attr("class", "icon-five-item icon-five-icon")
        .attr("transform", "translate(66, 20)")
        .attr("d", "M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM8 8h16c0.286 0 0.563 0.061 0.817 0.177l-8.817 10.286-8.817-10.287c0.254-0.116 0.531-0.177 0.817-0.177zM6 22v-12c0-0.042 0.002-0.084 0.004-0.125l5.864 6.842-5.8 5.8c-0.045-0.167-0.069-0.34-0.069-0.517zM24 24h-16c-0.177 0-0.35-0.024-0.517-0.069l5.691-5.691 2.826 3.297 2.826-3.297 5.691 5.691c-0.167 0.045-0.34 0.069-0.517 0.069zM26 22c0 0.177-0.024 0.35-0.069 0.517l-5.8-5.8 5.865-6.842c0.003 0.041 0.004 0.083 0.004 0.125v12z")
        .on("click", function() { window.open("mailto:?&subject=iGraph - Data Visualization&body=Take%20a%20look%20at%20this%20awesome%20data%20visualization%20tool%20made%20by%20Jacob%20Philpott%20with%20D3.js%3A%20i-graph.herokuapp.com"); });

    menu.append("rect")
        .attr("class", "icon-five-item nav-icon-background")
        .attr("width", 32)
        .attr("height", 32)
        .attr("x", 66)
        .attr("y", 80)
        .on("click", function() { window.open("https://www.linkedin.com/shareArticle?mini=true&url=https%3A//i-graph.herokuapp.com/&title=iGraph&summary=Take%20a%20look%20at%20this%20awesome%20data%20visualization%20tool%20made%20by%20Jacob%20Philpott%20with%20D3.js!&source=https%3A//www.linkedin.com/in/jgphilpott/"); });

    menu.append("path")
        .attr("class", "icon-five-item icon-five-icon")
        .attr("transform", "translate(66, 80)")
        .attr("d", "M12 11h5.535v2.837h0.079c0.77-1.381 2.655-2.837 5.464-2.837 5.842 0 6.922 3.637 6.922 8.367v9.633h-5.769v-8.54c0-2.037-0.042-4.657-3.001-4.657-3.005 0-3.463 2.218-3.463 4.509v8.688h-5.767v-18M2 11h6v18h-6v-18M8 6c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3z")
        .on("click", function() { window.open("https://www.linkedin.com/shareArticle?mini=true&url=https%3A//i-graph.herokuapp.com/&title=iGraph&summary=Take%20a%20look%20at%20this%20awesome%20data%20visualization%20tool%20made%20by%20Jacob%20Philpott%20with%20D3.js!&source=https%3A//www.linkedin.com/in/jgphilpott/"); });

    menu.append("rect")
        .attr("class", "icon-five-item nav-icon-background")
        .attr("width", 32)
        .attr("height", 32)
        .attr("x", 66)
        .attr("y", 140)
        .on("click", function() { window.open("https://twitter.com/home?status=Take%20a%20look%20at%20this%20awesome%20data%20visualization%20tool%20made%20by%20%40Jacob_Philpott%20iGraph%3A%20i-graph.herokuapp.com%20%23D3%20%23D3js%20%23Development"); });

    menu.append("path")
        .attr("class", "icon-five-item icon-five-icon")
        .attr("transform", "translate(66, 140)")
        .attr("d", "M32.003 6.075c-1.175 0.525-2.444 0.875-3.769 1.031 1.356-0.813 2.394-2.1 2.887-3.631-1.269 0.75-2.675 1.3-4.169 1.594-1.2-1.275-2.906-2.069-4.794-2.069-3.625 0-6.563 2.938-6.563 6.563 0 0.512 0.056 1.012 0.169 1.494-5.456-0.275-10.294-2.888-13.531-6.862-0.563 0.969-0.887 2.1-0.887 3.3 0 2.275 1.156 4.287 2.919 5.463-1.075-0.031-2.087-0.331-2.975-0.819 0 0.025 0 0.056 0 0.081 0 3.181 2.263 5.838 5.269 6.437-0.55 0.15-1.131 0.231-1.731 0.231-0.425 0-0.831-0.044-1.237-0.119 0.838 2.606 3.263 4.506 6.131 4.563-2.25 1.762-5.075 2.813-8.156 2.813-0.531 0-1.050-0.031-1.569-0.094 2.913 1.869 6.362 2.95 10.069 2.95 12.075 0 18.681-10.006 18.681-18.681 0-0.287-0.006-0.569-0.019-0.85 1.281-0.919 2.394-2.075 3.275-3.394z")
        .on("click", function() { window.open("https://twitter.com/home?status=Take%20a%20look%20at%20this%20awesome%20data%20visualization%20tool%20made%20by%20%40Jacob_Philpott%20iGraph%3A%20i-graph.herokuapp.com%20%23D3%20%23D3js%20%23Development"); });

    menu.append("rect")
        .attr("class", "icon-five-item nav-icon-background")
        .attr("width", 32)
        .attr("height", 32)
        .attr("x", 66)
        .attr("y", 200)
        .on("click", function() { window.open("https://www.facebook.com/sharer/sharer.php?u=https%3A//i-graph.herokuapp.com/"); });

    menu.append("path")
        .attr("class", "icon-five-item icon-five-icon")
        .attr("transform", "translate(66, 200)")
        .attr("d", "M19 6h5v-6h-5c-3.86 0-7 3.14-7 7v3h-4v6h4v16h6v-16h5l1-6h-6v-3c0-0.542 0.458-1 1-1z")
        .on("click", function() { window.open("https://www.facebook.com/sharer/sharer.php?u=https%3A//i-graph.herokuapp.com/"); });

    menu.append("rect")
        .attr("class", "icon-five-item nav-icon-background")
        .attr("width", 32)
        .attr("height", 32)
        .attr("x", 66)
        .attr("y", 260)
        .on("click", function() { window.open("https://plus.google.com/share?url=https%3A//i-graph.herokuapp.com/"); });

    menu.append("path")
        .attr("class", "icon-five-item icon-five-icon")
        .attr("transform", "translate(66, 260)")
        .attr("d", "M10.181 14.547v3.494h5.775c-0.231 1.5-1.744 4.394-5.775 4.394-3.475 0-6.313-2.881-6.313-6.431s2.838-6.431 6.313-6.431c1.981 0 3.3 0.844 4.056 1.569l2.762-2.662c-1.775-1.656-4.075-2.662-6.819-2.662-5.631 0.006-10.181 4.556-10.181 10.188s4.55 10.181 10.181 10.181c5.875 0 9.775-4.131 9.775-9.95 0-0.669-0.075-1.181-0.163-1.688h-9.613M32 14.253h-3v-3h-3v3h-3v3h3v3h3v-3h3z")
        .on("click", function() { window.open("https://plus.google.com/share?url=https%3A//i-graph.herokuapp.com/"); });

    $(".icon-five-item").mouseover(function() {
      $(this).css('cursor', 'pointer');
    });

  };
};
