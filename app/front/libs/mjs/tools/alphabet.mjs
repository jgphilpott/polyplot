export function addAlphabetBox(panel, countries) {

  let alphabetBox = "<div id='alphabet'><p id='all' class='alphabet'>All</p>"
  let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

  for (let i = 0; i < alphabet.length; i++) {

    alphabetBox += "<p id=" + alphabet[i].toLowerCase() + " class='alphabet'>" + alphabet[i] + "</p>"

  }

  panel.append(alphabetBox + "</div>")

  $(".alphabet").click(function(event) {

    $(".alphabet").css("font-weight", "normal")
    $(".alphabet").css("border-bottom", "3px solid rgba(224, 58, 62, 0)")

    $(this).css("font-weight", "bold")
    $(this).css("border-bottom", "3px solid rgba(224, 58, 62, 1)")

    if (this.id == "all") {

      $(".country-box").show()

    } else {

      for (let i = 0; i < countries.length; i++) {

        if (this.id == countries[i].name[0].toLowerCase()) {

          $("#" + countries[i].code + ".country-box").show()

        } else {

          $("#" + countries[i].code + ".country-box").hide()

        }

      }

    }

  })

}