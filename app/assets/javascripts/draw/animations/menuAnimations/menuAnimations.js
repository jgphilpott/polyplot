function openMenu() {
  if (menuWidth < menuSize) {

    menuWidth = menuWidth + 10;

    $(".graph-zone").remove();
    $(".menu-zone").remove();
    checkEnvironment();
    scaleAllData();

    drawCanvas();

  } else if (menuWidth > menuSize) {

    menuWidth = menuWidth - 10;

    $(".graph-zone").remove();
    $(".menu-zone").remove();
    checkEnvironment();
    scaleAllData();

    drawCanvas();

  } else {
    clearInterval(menuResize);
  };
};

function closeMenu() {
  if (menuWidth > 85) {

    menuWidth = menuWidth - 10;

    $(".graph-zone").remove();
    $(".menu-zone").remove();
    checkEnvironment();
    scaleAllData();
setup();
    drawCanvas();

  } else {
    clearInterval(menuResize);
    $(".globe").css({"fill": "grey"});
    $(".settings").css({"fill": "grey"});
    $(".datasets").css({"fill": "grey"});
    $(".filter").css({"fill": "grey"});
    $(".share").css({"fill": "grey"});
    iconOneColor = "grey";
    iconTwoColor = "grey";
    iconThreeColor = "grey";
    iconFourColor = "grey";
    iconFiveColor = "grey";
    $(".icon-one-item").remove();
    $(".icon-two-item").remove();
    $(".icon-three-item").remove();
    $(".icon-four-item").remove();
    $(".icon-five-item").remove();
    iconOneOpen = false;
    iconTwoOpen = false;
    iconThreeOpen = false;
    iconFourOpen = false;
    iconFiveOpen = false;
  };
};
