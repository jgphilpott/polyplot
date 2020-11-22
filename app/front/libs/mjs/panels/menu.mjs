import {addPanelEvents} from "./events/all.mjs"

let client = data.client

export function addMenuPanel() {

  $("body").append("<div id='menu' class='panel'></div>")

  let panel = $("#menu.panel")

  let main = "<div id='main'>"

  main += "<img class='close' src='/front/imgs/panels/all/close.png'>"

  main += "<div id='head'><a href='/'><img id='logo' src='/front/imgs/theme/logo.png'></a><h1 id='name'>Polyplot</h1></div>"

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

  $("#main").width(mainWidth).height(mainHeight)

  function appendSettings() {

    let settings = "<div id='settings-panel' class='sub-panel'><h1>Settings</h1>"

    settings += "<div><input id='crosshairs' class='checkbox' type='checkbox'><label>Show Crosshairs</label></div>"
    settings += "<div><input id='rotation' class='checkbox' type='checkbox'><label>Rotate miniMap</label></div>"

    settings += "</div>"

    panel.append(settings)

    $("#settings").click(function() {
      togglePanel($("#settings-panel"))
    })

    if (client) {

      let clientSettings = client.settings

      $("#crosshairs").prop("checked", clientSettings.crosshairs)
      $("#rotation").prop("checked", clientSettings.rotation)

      localWrite("settings", clientSettings)

    } else if (localKeys().includes("settings")) {

      let localSettings = localRead("settings")

      $("#crosshairs").prop("checked", localSettings.crosshairs)
      $("#rotation").prop("checked", localSettings.rotation)

    } else {

      let defaultSettings = {
        "crosshairs": true,
        "rotation": false
      }

      $("#crosshairs").prop("checked", defaultSettings.crosshairs)
      $("#rotation").prop("checked", defaultSettings.rotation)

      localWrite("settings", defaultSettings)

    }

    $(".checkbox").click(function(event) {

      let checkbox = $("#" + this.id + ".checkbox")

      if (client) {

        event.preventDefault()
        event.stopPropagation()

        socket.emit("settings_update", {"id": readCookie("id"), "setting": this.id, "value": checkbox.is(":checked")})

        socket.on("settings_updated", function(update) {

          client.settings[update.setting] = update.value

          let settings = localRead("settings")
          settings[update.setting] = update.value
          localWrite("settings", settings)

          $("#" + update.setting + ".checkbox").prop("checked", update.value)

        })

      } else {

        let settings = localRead("settings")
        settings[this.id] = checkbox.is(":checked")
        localWrite("settings", settings)

      }

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
