import {drawAxes} from "../draw/axes.mjs"
import {addPanelEvents} from "./events/all.mjs"
import {drawLayers, deleteLayers} from "../draw/layers/all.mjs"
import {startRotation, stopRotation} from "../cartography/rotation.mjs"

let plot = data.plot
let plots = plot.plots

let client = data.client

export function addMenuPanel() {

  $("body").append("<div id='menu' class='panel'></div>")

  let panel = $("#menu.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  let main = "<div id='main'>"

  main += "<div class='head'><a href='/'><img id='logo' src='/front/imgs/theme/logo.png'></a><h1 id='name'>Polyplot</h1></div>"

  main += "<div id='panels' class='option'><h3>Panels</h3></div>"
  main += "<div id='settings' class='option'><h3>Settings</h3></div>"
  main += "<div id='sources' class='option'><h3>Sources</h3></div>"
  main += "<a href='https://github.com/jgphilpott/polyplot/blob/master/docs/api/README.md'><div id='api' class='option'><h3>API</h3></div></a>"

  if (client) {

    main += "<div id='profile' class='option opt'><h3>Profile</h3></div>"
    main += "<div id='logout' class='option opt'><h3>Logout</h3></div>"

  } else {

    main += "<div id='signup' class='option opt'><h3>Sign Up</h3></div>"
    main += "<div id='login' class='option opt'><h3>Login</h3></div>"

  }

  panel.append(main + "</div>")

  function appendPanels() {

    $("#panels").click(function() { togglePanel($("#panels-panel")) })

    let panels = "<div id='panels-panel' class='sub-panel'><h1>Panels</h1>"

    let columnOne = "<div class='column'>"

    columnOne += "<h3>General</h3>"

    columnOne += "<div class='setting'><input id='countries' class='checkbox' type='checkbox'><label>Countries Panel</label></div>"
    columnOne += "<div class='setting'><input id='indicators' class='checkbox' type='checkbox'><label>Indicators Panel</label></div>"
    columnOne += "<div class='setting'><input id='legend' class='checkbox' type='checkbox'><label>Legend Panel</label></div>"
    columnOne += "<div class='setting'><input id='meta' class='checkbox' type='checkbox'><label>Meta Panel</label></div>"
    columnOne += "<div class='setting'><input id='time' class='checkbox' type='checkbox'><label>Time Panel</label></div>"
    columnOne += "<div class='setting'><input id='title' class='checkbox' type='checkbox'><label>Title Panel</label></div>"

    columnOne += "</div>"

    let columnTwo = "<div class='column'>"

    columnTwo += "<h3>Poly3</h3>"

    columnTwo += "<div class='setting'><input id='map' class='checkbox' type='checkbox'><label>Map Panel</label></div>"

    columnTwo += "<h3>Poly2</h3>"

    columnTwo += "<div class='setting'><input id='map' class='checkbox' type='checkbox'><label>Map Panel</label></div>"

    columnTwo += "<h3>Map</h3>"

    columnTwo += "<div class='setting'><input id='layers' class='checkbox' type='checkbox'><label>Layers Panel</label></div>"
    columnTwo += "<div class='setting'><input id='line' class='checkbox' type='checkbox'><label>Line Panel</label></div>"

    columnTwo += "</div>"

    panel.append(panels + columnOne + columnTwo + "</div>")

    $("#panels-panel .checkbox").click(function() {
      updateSettings("panels", this.id, $(this).is(":checked"))
    })

  }

  function appendSettings() {

    $("#settings").click(function() { togglePanel($("#settings-panel")) })

    let settings = "<div id='settings-panel' class='sub-panel'><h1>Settings</h1>"

    settings += "<div id='poly3-settings' class='settings-category'><h3>Poly3</h3></div>"
    settings += "<div id='poly2-settings' class='settings-category'><h3>Poly2</h3></div>"
    settings += "<div id='map-settings' class='settings-category'><h3>Map</h3></div>"

    let poly3Settings = "<div id='poly3-settings' class='settings-box'>"

    poly3Settings += "<div class='setting'><input id='rotation' class='general-setting checkbox' type='checkbox'><label>Rotate miniMap</label></div>"
    poly3Settings += "<div class='setting'><input id='caps' class='poly3-setting checkbox' type='checkbox'><label>Show Axes Caps</label></div>"

    poly3Settings += "</div>"

    let poly2Settings = "<div id='poly2-settings' class='settings-box'>"

    poly2Settings += "<div class='setting'><input id='rotation' class='general-setting checkbox' type='checkbox'><label>Rotate miniMap</label></div>"
    poly2Settings += "<div class='setting'><input id='crosshairs' class='poly2-setting checkbox' type='checkbox'><label>Show Crosshairs</label></div>"

    poly2Settings += "</div>"

    let mapSettings = "<div id='map-settings' class='settings-box'>"

    mapSettings += "<div class='setting'><input id='projection' class='map-setting equirectangular radio' type='radio' name='projection' value='equirectangular'><label for='equirectangular'>Equirectangular</label></div>"
    mapSettings += "<div class='setting'><input id='projection' class='map-setting orthographic radio' type='radio' name='projection' value='orthographic'><label for='orthographic'>Orthographic</label></div>"

    mapSettings += "</div>"

    panel.append(settings + poly3Settings + poly2Settings + mapSettings + "</div>")

    if (["poly3", "poly2", "map"].includes(plot.type.toLowerCase())) {
      $("#" + plot.type.toLowerCase() + "-settings.settings-box").css("display", "block")
    } else {
      $("#general-settings.settings-box").css("display", "block")
    }

    $(".settings-category").click(function() {

      $(".settings-box").css("display", "none")
      $("#" + this.id + ".settings-box").css("display", "block")

    })

    $("#settings-panel .checkbox, #settings-panel .radio").click(function() {

      let category = $(this).prop("classList")[0].split("-")[0]
      let setting = this.id
      let value = ($(this).attr("type") == "radio") ? (this.value) : ($(this).is(":checked"))

      updateSettings(category, setting, value)

    })

    if (client) {

      let clientSettings = client.settings

      checkCheckboxes(clientSettings)
      localWrite("settings", clientSettings)

    } else if (localKeys().includes("settings")) {

      let localSettings = localRead("settings")

      data.client = {email: "guest@polyplot.app"}
      data.client.settings = localSettings

      checkCheckboxes(localSettings)

    } else {

      let defaultSettings = {

        "panels": {
          "countries": false,
          "indicators": false,
          "layers": false,
          "legend": true,
          "line": true,
          "map": true,
          "meta": true,
          "time": true,
          "title": true
        },

        "general": {
          "countryExceptions": [],
          "indicatorExceptions": ["SP.POP.TOTL","SP.DYN.LE00.IN","SP.DYN.TFRT.IN","NY.GDP.PCAP.KD.ZG","AG.LND.AGRI.K2","AG.YLD.CREL.KG","AG.PRD.CROP.XD","AG.SRF.TOTL.K2","SH.DYN.MORT","DC.DAC.TOTL.CD","DC.DAC.DEUL.CD","DT.ODA.ALLD.KD","DT.ODA.ALLD.CD","EN.URB.LCTY.UR.ZS","EN.POP.DNST","EN.URB.LCTY","SP.URB.TOTL","SP.URB.TOTL.IN.ZS","SP.URB.GROW","TM.VAL.MRCH.R3.ZS","TM.VAL.MRCH.R4.ZS","TM.VAL.MRCH.R5.ZS","TX.VAL.MRCH.CD.WT","TX.VAL.MRCH.WL.CD","SL.TLF.ACTI.1524.FE.ZS","SL.TLF.ACTI.1524.MA.ZS","SL.UEM.TOTL.MA.ZS","SL.TLF.CACT.MA.ZS","BM.GSR.ROYL.CD","BX.GSR.ROYL.CD","SP.POP.TECH.RD.P6","IP.JRN.ARTC.SC","SG.LAW.NODC.HR","SG.LAW.EQRM.WK","SG.LEG.DVAW","MS.MIL.XPND.CN","TX.VAL.MRCH.R1.ZS","TX.VAL.MRCH.HI.ZS","SI.DST.02ND.20","SI.DST.FRST.20","SI.DST.FRST.10","SI.DST.03RD.20","IT.MLT.MAIN","IT.MLT.MAIN.P2","IT.CEL.SETS","IT.CEL.SETS.P2","SP.ADO.TFRT","SP.POP.DPND","SP.POP.DPND.OL","SP.POP.DPND.YG","BX.KLT.DINV.WD.GD.ZS","BX.KLT.DINV.CD.WD","FM.LBL.BMNY.GD.ZS","FM.LBL.BMNY.CN","DT.ODA.ODAT.PC.ZS","DT.NFL.PROP.CD","BX.TRF.PWKR.CD.DT","BX.PEF.TOTL.CD.WD","EN.ATM.CO2E.SF.ZS","EN.ATM.CO2E.SF.KT","NY.ADJ.DMIN.CD","AG.LND.AGRI.ZS","AG.LND.TOTL.K2"],
          "countryDescription": true,
          "indicatorDescription": true,
          "indicatorRelevance": false,
          "indicatorMethodology": false,
          "indicatorLimitations": false,
          "regression": null,
          "tangent": false,
          "rotation": true
        },

        "poly3": {
          "caps": true
        },

        "poly2": {
          "crosshairs": true
        },

        "map": {
          "projection": "equirectangular",
          "airports": false,
          "cities": true,
          "graticules": false,
          "lakes": true,
          "ports": false,
          "railroads": false,
          "rivers": true,
          "roads": false
        }

      }

      data.client = {email: "guest@polyplot.app"}
      data.client.settings = defaultSettings

      checkCheckboxes(defaultSettings)
      localWrite("settings", defaultSettings)

    }

    data.client.settings.panels.zIndex = 0

    function checkCheckboxes(settings) {

      $(".setting #countries").prop("checked", settings.panels.countries)
      $(".setting #indicators").prop("checked", settings.panels.indicators)
      $(".setting #layers").prop("checked", settings.panels.layers)
      $(".setting #legend").prop("checked", settings.panels.legend)
      $(".setting #line").prop("checked", settings.panels.line)
      $(".setting #map").prop("checked", settings.panels.map)
      $(".setting #meta").prop("checked", settings.panels.meta)
      $(".setting #time").prop("checked", settings.panels.time)
      $(".setting #title").prop("checked", settings.panels.title)

      $(".setting #rotation").prop("checked", settings.general.rotation)

      $(".setting #caps").prop("checked", settings.poly3.caps)

      $(".setting #crosshairs").prop("checked", settings.poly2.crosshairs)

      $(".setting ." + settings.map.projection + "").prop("checked", true)

    }

  }

  function appendSources() {

    $("#sources").click(function() { togglePanel($("#sources-panel")) })

    let sources = "<div id='sources-panel' class='sub-panel'><h1>Sources</h1>"

    sources += "<h3>Indicators</h3>"

    sources += "<a href='https://datahelpdesk.worldbank.org/knowledgebase/articles/898581-api-basic-call-structures'><p>World Bank</p></a>"

    sources += "<h3>GeoJSON</h3>"

    sources += "<a href='https://www.geonames.org'><p>GeoNames</p></a>"
    sources += "<a href='https://www.naturalearthdata.com'><p>Natural Earth</p></a>"

    sources += "<h3>Other</h3>"

    sources += "<a href='https://www.wikipedia.org'><p>Wikipedia</p></a>"

    sources += "</div>"

    panel.append(sources)

  }

  function appendSignup() {

    $("#signup").click(function() { togglePanel($("#signup-panel")) })

    let signup = "<div id='signup-panel' class='sub-panel'><h1>Sign Up</h1>"

    signup += "<input class='email' type='email' placeholder='Email'>"

    signup += "<input class='password' type='password' placeholder='Password'>"
    signup += "<input class='retype-password' type='password' placeholder='Retype Password'>"

    signup += "<input class='submit' type='submit' placeholder='Submit'>"

    panel.append(signup + "</div>")

    $("#signup-panel input").on("keypress", function(event) { event.stopPropagation() })

    $("#signup-panel .submit").click(function() {

      if (validEmail($("#signup-panel .email").val()) && $("#signup-panel .password").val() === $("#signup-panel .retype-password").val() && $("#signup-panel .password").val().length > 0) {
        socket.emit("signup", {"email": $("#signup-panel .email").val(), "password": sha256($("#signup-panel .password").val())})
      } else {
        alert("Invalid, please try again.")
      }

    })

    socket.on("signup_failed", function() { alert("Email already exists.") })
    socket.on("signup_success", function(id) { writeCookie("id", id); location.reload() })

  }

  function appendLogin() {

    $("#login").click(function() { togglePanel($("#login-panel")) })

    let login = "<div id='login-panel' class='sub-panel'><h1>Login</h1>"

    login += "<input class='email' type='email' placeholder='Email'>"

    login += "<input class='password' type='password' placeholder='Password'>"

    login += "<input class='submit' type='submit' placeholder='Submit'>"

    panel.append(login + "</div>")

    $("#login-panel input").on("keypress", function(event) { event.stopPropagation() })

    $("#login-panel .submit").click(function() {

      if (validEmail($("#login-panel .email").val()) && $("#login-panel .password").val().length > 0) {
        socket.emit("login", {"email": $("#login-panel .email").val(), "password": sha256($("#login-panel .password").val())})
      } else {
        alert("Invalid, please try again.")
      }

    })

    socket.on("login_failed", function() { alert("Invalid, please try again.") })
    socket.on("login_success", function(id) { writeCookie("id", id); location.reload() })

  }

  function appendProfile() {

    $("#profile").click(function() { togglePanel($("#profile-panel")) })

    let profile = "<div id='profile-panel' class='sub-panel'><h1>Profile</h1>"

    profile += "<img src='/front/imgs/panels/menu/profile.png'>"

    profile += "<h3>Email</h3>"
    profile += "<p>" + client.email + "</p>"

    panel.append(profile + "</div>")

  }

  function appendLogout() {

    $("#logout").click(function() {

      localDelete("settings")
      deleteCookie("id")
      location.reload()

    })

  }

// HERE

  appendPanels()
  appendSettings()
  appendSources()

  if (!client) {

    appendSignup()
    appendLogin()

  } else {

    appendProfile()
    appendLogout()

  }

  let mainWidth = panel.width()
  let mainHeight = panel.height()

  let mainBorder = Number(panel.css("border-width")[0])
  let mainPadding = Number(panel.css("padding")[0])

  let buffer = (mainBorder * 2) + (mainPadding * 2)

  // $("#menu.panel #main").width(mainWidth).height(mainHeight)

  function togglePanel(panel) {

    if (panel.css("display") == "none") {

      $(".sub-panel").css("display", "none")

      panel.css("display", "block")
      let panelWidth = panel.width() + buffer
      panel.css("display", "none")

      $("#menu.panel").animate({"width": mainWidth + panelWidth}, {"duration": 1000, "queue": false})
      $("#menu.panel").animate({"height": mainHeight + buffer}, {"duration": 1000, "queue": false})

      panel.css("display", "block")

    } else {

      $("#menu.panel").animate({"width": mainWidth + buffer}, {"duration": 1000, "queue": false})
      $("#menu.panel").animate({"height": mainHeight + buffer}, {"duration": 1000, "queue": false})

      panel.css("display", "none")

    }

  }

  $("input").click(function(event) { event.stopPropagation(); this.focus() })
  $("input").keypress(function(event) { event.stopPropagation() })
  $(document).click(function() { $("input").blur() })

  addPanelEvents(panel)

}

export function toggleCheckbox(type, key, event) {

  let settings = localRead("settings")
  let category = settings[type]
  let setting = category[key]

  category[key] = !setting

  if (client) {

    event.preventDefault()
    event.stopPropagation()

    socket.emit("update_settings", {"id": readCookie("id"), "category": type, "setting": key, "value": category[key]})

    socket.on("updated_settings", function(update) {

      $("#" + update.setting + ".checkbox").prop("checked", update.value)

      client.settings[update.category][update.setting] = update.value

    })

  } else {

    $("#" + key + ".checkbox").prop("checked", category[key])

    data.client.settings[type][key] = category[key]

  }

  localWrite("settings", settings)
  settingSwitch(category, type, key)

}

export function updateSettings(type, key, value) {

  let settings = localRead("settings")
  let category = settings[type]

  category[key] = value

  if (client) {

    socket.emit("update_settings", {"id": readCookie("id"), "category": type, "setting": key, "value": category[key]})

    socket.on("updated_settings", function(update) {

      client.settings[update.category][update.setting] = update.value

    })

  } else {

    data.client.settings[type][key] = value

  }

  $("#" + key + ".checkbox").prop("checked", value)

  localWrite("settings", settings)
  settingSwitch(category, type, key)

}

function settingSwitch(category, type, key) {

  switch (type) {

    case "panels":

      let panel = $("#" + key + ".panel")

      if (category[key]) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

      break

    case "general":

      if (key == "rotation") {

        if (category[key]) {

          startRotation()
          $("#rotation-icon").attr("src", "/front/imgs/panels/map/rotation-dark.png")

        } else {

          stopRotation()
          $("#rotation-icon").attr("src", "/front/imgs/panels/map/rotation-light.png")

        }

      }

      break

    case "poly3":

      drawAxes()

      break

    case "poly2":

      break

    case "map":

      if (key != "projection") {

        if (category[key]) {
          drawLayers()
        } else {
          deleteLayers(key)
        }

      }

      break

  }

}
