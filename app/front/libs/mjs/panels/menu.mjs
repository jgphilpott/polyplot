import {addPanelEvents} from "./events/all.mjs"
import {startRotation, stopRotation} from "../cartography/rotation.mjs"

let client = data.client

export function addMenuPanel() {

  $("body").append("<div id='menu' class='panel'></div>")

  let panel = $("#menu.panel")

  let main = "<div id='main'>"

  main += "<img class='close' src='/front/imgs/panels/all/close.png'>"

  main += "<div id='head'><a href='/'><img id='logo' src='/front/imgs/theme/logo.png'></a><h1 id='name'>Polyplot</h1></div>"

  main += "<div id='panels' class='option'><h3>Panels</h3></div>"
  main += "<div id='settings' class='option'><h3>Settings</h3></div>"
  main += "<div id='sources' class='option'><h3>Sources</h3></div>"
  main += "<a href='https://github.com/jgphilpott/polyplot/blob/master/docs/api/README.md'><div id='api' class='option'><h3>API</h3></div></a>"

  if (!client) {

    main += "<div id='signup' class='option opt'><h3>Sign Up</h3></div>"
    main += "<div id='login' class='option opt'><h3>Login</h3></div>"

  } else {

    main += "<div id='profile' class='option opt'><h3>Profile</h3></div>"
    main += "<div id='logout' class='option opt'><h3>Logout</h3></div>"

  }

  main += "</div>"

  panel.append(main)

  let mainWidth = panel.width()
  let mainHeight = panel.height()

  let mainBorder = Number(panel.css("border-width")[0])
  let mainPadding = Number(panel.css("padding")[0])

  let buffer = (mainBorder * 2) + (mainPadding * 2)

  $("#menu.panel #main").width(mainWidth).height(mainHeight)

  function appendPanels() {

    let panels = "<div id='panels-panel' class='sub-panel'><h1>Panels</h1>"

    panels += "<div class='setting'><input id='countries' class='checkbox' type='checkbox'><label>Countries Panel</label></div>"
    panels += "<div class='setting'><input id='indicators' class='checkbox' type='checkbox'><label>Indicators Panel</label></div>"
    panels += "<div class='setting'><input id='layers' class='checkbox' type='checkbox'><label>Layers Panel</label></div>"
    panels += "<div class='setting'><input id='legend' class='checkbox' type='checkbox'><label>Legend Panel</label></div>"
    panels += "<div class='setting'><input id='line' class='checkbox' type='checkbox'><label>Line Panel</label></div>"
    panels += "<div class='setting'><input id='map' class='checkbox' type='checkbox'><label>Map Panel</label></div>"
    panels += "<div class='setting'><input id='meta' class='checkbox' type='checkbox'><label>Meta Panel</label></div>"
    panels += "<div class='setting'><input id='time' class='checkbox' type='checkbox'><label>Time Panel</label></div>"
    panels += "<div class='setting'><input id='title' class='checkbox' type='checkbox'><label>Title Panel</label></div>"

    panels += "</div>"

    panel.append(panels)

    $("#panels").click(function() {
      togglePanel($("#panels-panel"))
    })

    $("#panels-panel .checkbox").click(function(event) {
      toggleCheckbox("panels", this.id, event)
    })

  }

  function appendSettings() {

    let settings = "<div id='settings-panel' class='sub-panel'><h1>Settings</h1>"

    settings += "<div id='general'><div class='setting'><input id='rotation' class='checkbox' type='checkbox'><label>Rotate miniMap</label></div></div>"
    settings += "<div id='poly2'><div class='setting'><input id='crosshairs' class='checkbox' type='checkbox'><label>Show Crosshairs</label></div></div>"

    settings += "</div>"

    panel.append(settings)

    $("#settings").click(function() {
      togglePanel($("#settings-panel"))
    })

    if (client) {

      let clientSettings = client.settings

      checkCheckboxes(clientSettings)
      localWrite("settings", clientSettings)

    } else if (localKeys().includes("settings")) {

      let localSettings = localRead("settings")

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
          "rotation": false
        },

        "poly3": {

        },

        "poly2": {
          "crosshairs": true
        },

        "map": {

        }

      }

      checkCheckboxes(defaultSettings)
      localWrite("settings", defaultSettings)

    }

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

      $(".setting #crosshairs").prop("checked", settings.poly2.crosshairs)

    }

    $("#settings-panel .checkbox").click(function(event) {
      toggleCheckbox(this.parentElement.parentElement.id, this.id, event)
    })

  }

  function appendSources() {

    let sources = "<div id='sources-panel' class='sub-panel'><h1>Sources</h1>"

    sources += "<h3>Indicators</h3><a href='https://data.worldbank.org/indicator'><p>World Bank</p></a>"
    sources += "<h3>Maps</h3><a href='http://www.naturalearthdata.com'><p>Natural Earth</p></a>"

    sources += "</div>"

    panel.append(sources)

    $("#sources").click(function() {
      togglePanel($("#sources-panel"))
    })

  }

  function appendSignup() {

    let signup = "<div id='signup-panel' class='sub-panel'><h1>Sign Up</h1>"

    signup += "<input class='email' type='email' placeholder='Email'>"
    signup += "<input class='password' type='password' placeholder='Password'>"
    signup += "<input class='retype-password' type='password' placeholder='Retype Password'>"
    signup += "<input class='submit' type='submit' placeholder='Submit'>"

    signup += "</div>"

    panel.append(signup)

    $("#signup").click(function() {
      togglePanel($("#signup-panel"))
    })

    $("#signup-panel .submit").click(function() {

      if (validEmail($("#signup-panel .email").val()) && $("#signup-panel .password").val() === $("#signup-panel .retype-password").val() && $("#signup-panel .password").val().length > 0) {

        socket.emit("signup", {"email": $("#signup-panel .email").val(), "password": sha256($("#signup-panel .password").val())})

      } else {

        alert("Invalid, please try again.")

      }

    })

    socket.on("signup_failed", function() {

      alert("Email already exists.")

    })

    socket.on("signup_success", function(id) {

      writeCookie("id", id)
      location.reload()

    })

  }

  function appendLogin() {

    let login = "<div id='login-panel' class='sub-panel'><h1>Login</h1>"

    login += "<input class='email' type='email' placeholder='Email'>"
    login += "<input class='password' type='password' placeholder='Password'>"
    login += "<input class='submit' type='submit' placeholder='Submit'>"

    login += "</div>"

    panel.append(login)

    $("#login").click(function() {
      togglePanel($("#login-panel"))
    })

    $("#login-panel .submit").click(function() {

      if (validEmail($("#login-panel .email").val()) && $("#login-panel .password").val().length > 0) {

        socket.emit("login", {"email": $("#login-panel .email").val(), "password": sha256($("#login-panel .password").val())})

      } else {

        alert("Invalid, please try again.")

      }

    })

    socket.on("login_failed", function() {

      alert("Invalid, please try again.")

    })

    socket.on("login_success", function(id) {

      writeCookie("id", id)
      location.reload()

    })

  }

  function appendProfile() {

    let profile = "<div id='profile-panel' class='sub-panel'><h1>Profile</h1>"

    profile += "<img src='/front/imgs/panels/menu/profile.png'>"
    profile += "<h3>Email</h3><p>" + client.email + "</p>"

    profile += "</div>"

    panel.append(profile)

    $("#profile").click(function() {
      togglePanel($("#profile-panel"))
    })

  }

  function appendLogout() {

    $("#logout").click(function() {

      localDelete("settings")
      deleteCookie("id")
      location.reload()

    })

  }

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

      localWrite("settings", settings)

    })

    settingSwitch(type, key)

  } else {

    $("#" + key + ".checkbox").prop("checked", category[key])

    localWrite("settings", settings)

    settingSwitch(type, key)

  }

  function settingSwitch(type, key) {

    switch (type) {

      case "panels":

        let panel = $("#" + key + ".panel")

        if (category[key]) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

        break

      case "general":

        if (key == "rotation") {

          if (category[key]) {

            startRotation()
            $("#rotationIcon").attr("src", "/front/imgs/panels/map/rotation-dark.png")

          } else {

            stopRotation()
            $("#rotationIcon").attr("src", "/front/imgs/panels/map/rotation-light.png")

          }

        }

        break

      case "poly3":

        break

      case "poly2":

        break

      case "map":

        break

    }

  }

}
