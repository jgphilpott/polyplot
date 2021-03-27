export function toggleTextbox(element) {

  let duration = 1000

  let id = $(element).parent().parent().attr("id")
  let textbox = $("#" + id + ".textbox")
  let headHeight = $("#" + id + ".textbox .textbox-head").height()
  let textboxBody = $("#" + id + ".textbox .textbox-body")

  if (getRotation($(element)) == 90) {

    textbox.animate({height: headHeight}, {duration: duration, complete: function() { textboxBody.css("display", "none") }})

    rotate($(element), 0, duration)

  } else if (getRotation($(element)) == 0) {

    textboxBody.css("display", "block")
    let height = textboxBody.height()

    textbox.animate({height: height + headHeight}, {duration: duration, queue: false})

    rotate($(element), 90, duration)

  }

}
