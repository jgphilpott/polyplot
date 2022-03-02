import {updateSettings} from "../panels/menu.mjs"

export function addTextbox(panel, type, id, text) {

  let generalSettings = localRead("settings").general

  let textbox = "<div id='" + type + id + "' class='textbox'><div class='textbox-head'>"

  if (data.plot.type == "Country") {

    textbox += "<img class='textbox-fold' src='/front/imgs/panels/countries/fold.png'>"
    textbox += "<p><b>" + id + ":</b> <a href='" + data.plot.plots.factbook + "'>Factbook</a></p></div><div class='textbox-body'>"

    for (let i = 0; i < text.length; i++) {
      textbox += "<p>" + text[i] + "</p><br>"
    }

  } else if (data.plot.type == "Indicator") {

    textbox += "<img class='textbox-fold' src='/front/imgs/panels/indicators/fold.png'>"
    textbox += "<p><b>" + id + ":</b></p></div>"
    textbox += "<div class='textbox-body'><p>" + text + "</p><br>"

  }

  panel.append(textbox + "</div></div>")

  for (let i = 0; i < $(".textbox").length; i++) {

    let id = $(".textbox")[i].id
    let fold = $("#" + id + ".textbox .textbox-fold")

    rotate(fold, 90, 0)

    if (!generalSettings[id]) {
      toggleTextbox(fold, 0)
    }

  }

}

export function toggleTextbox(element, duration=1000) {

  let id = $(element).parent().parent().attr("id")
  let textbox = $("#" + id + ".textbox")
  let headHeight = $("#" + id + ".textbox .textbox-head").height()
  let textboxBody = $("#" + id + ".textbox .textbox-body")

  if (getRotation($(element)) == 90) {

    textbox.animate({height: headHeight}, {duration: duration, complete: function() { textboxBody.css("display", "none") }})

    rotate($(element), 0, duration)

    updateSettings("general", id, false)

  } else if (getRotation($(element)) == 0) {

    textboxBody.css("display", "block")
    let height = textboxBody.height()

    textbox.animate({height: height + headHeight}, {duration: duration, queue: false})

    rotate($(element), 90, duration)

    updateSettings("general", id, true)

  }

}