function drawMenuOptions(menuZone) {
  // Menu is unlocked by default.
  menuLock = false;
  iconSize = 32;
  var menuOptionsData = {
    options: [{
      name: "Home",
      icon: "M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z",
      visible: true,
      open: false
    }, {
      name: "Settings",
      icon: "M14 4v-0.5c0-0.825-0.675-1.5-1.5-1.5h-5c-0.825 0-1.5 0.675-1.5 1.5v0.5h-6v4h6v0.5c0 0.825 0.675 1.5 1.5 1.5h5c0.825 0 1.5-0.675 1.5-1.5v-0.5h18v-4h-18zM8 8v-4h4v4h-4zM26 13.5c0-0.825-0.675-1.5-1.5-1.5h-5c-0.825 0-1.5 0.675-1.5 1.5v0.5h-18v4h18v0.5c0 0.825 0.675 1.5 1.5 1.5h5c0.825 0 1.5-0.675 1.5-1.5v-0.5h6v-4h-6v-0.5zM20 18v-4h4v4h-4zM14 23.5c0-0.825-0.675-1.5-1.5-1.5h-5c-0.825 0-1.5 0.675-1.5 1.5v0.5h-6v4h6v0.5c0 0.825 0.675 1.5 1.5 1.5h5c0.825 0 1.5-0.675 1.5-1.5v-0.5h18v-4h-18v-0.5zM8 28v-4h4v4h-4z",
      visible: true,
      open: false
    }, {
      name: "Datasets",
      icon: "M16 0c-8.837 0-16 2.239-16 5v4c0 2.761 7.163 5 16 5s16-2.239 16-5v-4c0-2.761-7.163-5-16-5 M16 17c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5 M16 26c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z",
      visible: true,
      open: false
    }, {
      name: "Filter",
      icon: "M16 0c-8.837 0-16 2.239-16 5v3l12 12v10c0 1.105 1.791 2 4 2s4-0.895 4-2v-10l12-12v-3c0-2.761-7.163-5-16-5zM2.95 4.338c0.748-0.427 1.799-0.832 3.040-1.171 2.748-0.752 6.303-1.167 10.011-1.167s7.262 0.414 10.011 1.167c1.241 0.34 2.292 0.745 3.040 1.171 0.494 0.281 0.76 0.519 0.884 0.662-0.124 0.142-0.391 0.38-0.884 0.662-0.748 0.427-1.8 0.832-3.040 1.171-2.748 0.752-6.303 1.167-10.011 1.167s-7.262-0.414-10.011-1.167c-1.24-0.34-2.292-0.745-3.040-1.171-0.494-0.282-0.76-0.519-0.884-0.662 0.124-0.142 0.391-0.38 0.884-0.662z",
      visible: true,
      open: false
    }, {
      name: "Share",
      icon: "M27 22c-1.411 0-2.685 0.586-3.594 1.526l-13.469-6.734c0.041-0.258 0.063-0.522 0.063-0.791s-0.022-0.534-0.063-0.791l13.469-6.734c0.909 0.94 2.183 1.526 3.594 1.526 2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5c0 0.269 0.022 0.534 0.063 0.791l-13.469 6.734c-0.909-0.94-2.183-1.526-3.594-1.526-2.761 0-5 2.239-5 5s2.239 5 5 5c1.411 0 2.685-0.586 3.594-1.526l13.469 6.734c-0.041 0.258-0.063 0.522-0.063 0.791 0 2.761 2.239 5 5 5s5-2.239 5-5c0-2.761-2.239-5-5-5z",
      visible: true,
      open: false
    }],
    lock: {
      names: ["Locked", "Unlocked"],
      icons: ["M18.5 13h-0.5v-6c0-3.308-2.692-6-6-6h-4c-3.308 0-6 2.692-6 6v6h-0.5c-0.825 0-1.5 0.675-1.5 1.5v15c0 0.825 0.675 1.5 1.5 1.5h17c0.825 0 1.5-0.675 1.5-1.5v-15c0-0.825-0.675-1.5-1.5-1.5zM6 7c0-1.103 0.897-2 2-2h4c1.103 0 2 0.897 2 2v6h-8v-6z", "M24 1c3.308 0 6 2.692 6 6v6h-4v-6c0-1.103-0.897-2-2-2h-4c-1.103 0-2 0.897-2 2v6h0.5c0.825 0 1.5 0.675 1.5 1.5v15c0 0.825-0.675 1.5-1.5 1.5h-17c-0.825 0-1.5-0.675-1.5-1.5v-15c0-0.825 0.675-1.5 1.5-1.5h12.5v-6c0-3.308 2.692-6 6-6h4z"],
      visible: true,
      color: "#000000"
    }
  };

  var iconSpaceingY = -15;
  var iconSpaceingX = 10;
  var iconColor = 0;

  for (var i = 0; i < menuOptionsData.options.length; i++) {
    if (menuOptionsData.options[i].visible) {

      iconSpaceingY += 25;

      menuOptionsData.options[i].color = colors[iconColor];
      iconColor += 1;

      menuZone.append("rect")
              .data([menuOptionsData.options[i]])
              .attr("class", "menu-icon-background layer-two")
              .attr("id", menuOptionsData.options[i].name.toLowerCase() + "-icon-background")
              .attr("width", iconSize)
              .attr("height", iconSize)
              .attr("x", iconSpaceingX)
              .attr("y", iconSpaceingY);

      menuZone.append("path")
              .data([menuOptionsData.options[i]])
              .attr("class", "menu-icon layer-two")
              .attr("id", menuOptionsData.options[i].name.toLowerCase() + "-icon")
              .attr("transform", "translate(" + iconSpaceingX + ", " + iconSpaceingY + ")")
              .attr("d", menuOptionsData.options[i].icon);

      iconSpaceingY += 32;

    };
  };

  if (menuOptionsData.lock.visible) {

    menuZone.append("rect")
            .data([menuOptionsData.lock])
            .attr("class", "menu-icon-background layer-two")
            .attr("id", "lock-icon-background")
            .attr("width", iconSize)
            .attr("height", iconSize)
            .attr("x", iconSpaceingX)
            .attr("y", windowHeight - (iconSize * 1.5));

    menuZone.append("path")
            .data([menuOptionsData.lock])
            .attr("class", "lock menu-icon layer-two")
            .attr("id", menuOptionsData.lock.names[0].toLowerCase() + "-icon")
            .attr("visibility", function () {
              if (menuLock) {
                return "visible";
              } else {
                return "hidden";
              };
            })
            .attr("transform", "translate(" + iconSpaceingX + ", " + (windowHeight - (iconSize * 1.5)) + ")")
            .attr("d", menuOptionsData.lock.icons[0]);

    menuZone.append("path")
            .data([menuOptionsData.lock])
            .attr("class", "lock menu-icon layer-two")
            .attr("id", menuOptionsData.lock.names[1].toLowerCase() + "-icon")
            .attr("visibility", function () {
              if (menuLock) {
                return "hidden";
              } else {
                return "visible";
              };
            })
            .attr("transform", "translate(" + iconSpaceingX + ", " + (windowHeight - (iconSize * 1.5)) + ")")
            .attr("d", menuOptionsData.lock.icons[1]);

    $(".lock, #lock-icon-background").click(function() {
      if (menuLock) {
        $("#locked-icon").attr("visibility", "hidden");
        $("#unlocked-icon").attr("visibility", "visible");
        menuLock = false;
      } else {
        $("#locked-icon").attr("visibility", "visible");
        $("#unlocked-icon").attr("visibility", "hidden");
        menuLock = true;
      };
    });
  };

  $(".menu-icon, .menu-icon-background").mouseover(function() {
    $(this).css("cursor", "pointer");
  });

  $(".menu-zone").mouseover(function() {
    if (menuWidth === 52) {
      for (var i = 0; i < menuOptionsData.options.length; i++) {
        if (menuOptionsData.options[i].visible) {
          $("#" + menuOptionsData.options[i].name.toLowerCase() + "-icon").css({"fill": menuOptionsData.options[i].color});
        };
      };
      $(".lock").css({"fill": menuOptionsData.lock.color});
    };
  }).mouseout(function() {
    if (menuWidth === 52) {
      for (var i = 0; i < menuOptionsData.options.length; i++) {
        if (menuOptionsData.options[i].visible) {
          $("#" + menuOptionsData.options[i].name.toLowerCase() + "-icon").css({"fill": "grey"});
        };
      };
      $(".lock").css({"fill": "grey"});
    };
  });

  $(".menu-icon, .menu-icon-background").click(function() {

    // switch (this.id) {
    //
    //   case "home":
    //     $(".nav-icon").css({"fill": "grey"});
    //     $(".globe").css({"fill": colors[0]});
    //     iconOneColor = colors[0];
    //     iconTwoColor = "grey";
    //     iconThreeColor = "grey";
    //     iconFourColor = "grey";
    //     iconFiveColor = "grey";
    //     $(".icon-two-item").remove();
    //     $(".icon-three-item").remove();
    //     $(".icon-four-item").remove();
    //     $(".icon-five-item").remove();
    //     iconOneOpen = true;
    //     iconTwoOpen = false;
    //     iconThreeOpen = false;
    //     iconFourOpen = false;
    //     iconFiveOpen = false;
    //     drawHomeMenu();
    //     break;
    //
    //   case "settings":
    //     $(".nav-icon").css({"fill": "grey"});
    //     $(".settings").css({"fill": colors[1]});
    //     iconOneColor = "grey";
    //     iconTwoColor = colors[1];
    //     iconThreeColor = "grey";
    //     iconFourColor = "grey";
    //     iconFiveColor = "grey";
    //     $(".icon-one-item").remove();
    //     $(".icon-three-item").remove();
    //     $(".icon-four-item").remove();
    //     $(".icon-five-item").remove();
    //     iconOneOpen = false;
    //     iconTwoOpen = true;
    //     iconThreeOpen = false;
    //     iconFourOpen = false;
    //     iconFiveOpen = false;
    //     drawSettingsMenu();
    //     break;
    //
    //   case "datasets":
    //     $(".nav-icon").css({"fill": "grey"});
    //     $(".datasets").css({"fill": colors[2]});
    //     iconOneColor = "grey";
    //     iconTwoColor = "grey";
    //     iconThreeColor = colors[2];
    //     iconFourColor = "grey";
    //     iconFiveColor = "grey";
    //     $(".icon-one-item").remove();
    //     $(".icon-two-item").remove();
    //     $(".icon-four-item").remove();
    //     $(".icon-five-item").remove();
    //     iconOneOpen = false;
    //     iconTwoOpen = false;
    //     iconThreeOpen = true;
    //     iconFourOpen = false;
    //     iconFiveOpen = false;
    //     drawDatasetsMenu();
    //     break;
    //
    //   case "filter":
    //     $(".nav-icon").css({"fill": "grey"});
    //     $(".filter").css({"fill": colors[3]});
    //     iconOneColor = "grey";
    //     iconTwoColor = "grey";
    //     iconThreeColor = "grey";
    //     iconFourColor = colors[3];
    //     iconFiveColor = "grey";
    //     $(".icon-one-item").remove();
    //     $(".icon-two-item").remove();
    //     $(".icon-three-item").remove();
    //     $(".icon-five-item").remove();
    //     iconOneOpen = false;
    //     iconTwoOpen = false;
    //     iconThreeOpen = false;
    //     iconFourOpen = true;
    //     iconFiveOpen = false;
    //     drawFiltersMenu();
    //     break;
    //
    //   case "share":
    //     $(".nav-icon").css({"fill": "grey"});
    //     $(".share").css({"fill": colors[4]});
    //     iconOneColor = "grey";
    //     iconTwoColor = "grey";
    //     iconThreeColor = "grey";
    //     iconFourColor = "grey";
    //     iconFiveColor = colors[4];
    //     $(".icon-one-item").remove();
    //     $(".icon-two-item").remove();
    //     $(".icon-three-item").remove();
    //     $(".icon-four-item").remove();
    //     iconOneOpen = false;
    //     iconTwoOpen = false;
    //     iconThreeOpen = false;
    //     iconFourOpen = false;
    //     iconFiveOpen = true;
    //     drawShareMenu();
    //     break;
    //
    //   default:
    //     console.log("Error in menu switch!");
    //
    // };
    //
    // menuOpen = true;
    //
    // menuResize = setInterval(openMenu, 100);

  });

  // $("body").mousemove(function(event) {
  //   if (menuOpen === true && event.pageX < graphZoneWidth && menuLocked === false) {
  //
  //     menuOpen = false;
  //     clearInterval(menuResize);
  //
  //     menuResize = setInterval(closeMenu, 100)
  //
  //   } else if (event.pageX > graphZoneWidth && menuOpen === false && menuWidth !== 85) {
  //
  //     menuOpen = true;
  //     clearInterval(menuResize);
  //
  //     menuResize = setInterval(openMenu, 100)
  //
  //   };
  // });

};
