function findBrowser() {

  // Credit: https://stackoverflow.com/a/9851769/1544937
  firefox = typeof InstallTrigger !== "undefined"
  chrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)
  safari = /constructor/i.test(window.HTMLElement) || (function(p) {return p.toString() === "[object SafariRemoteNotification]"})(!window["safari"] || (typeof safari !== "undefined" && safari.pushNotification))
  ie = false || !!document.documentMode
  edge = !ie && !!window.StyleMedia
  opera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0
  blink = (chrome || opera) && !!window.CSS

  browsers = [{"name": "firefox", "status": firefox},
              {"name": "chrome", "status": chrome},
              {"name": "safari", "status": safari},
              {"name": "ie", "status": ie},
              {"name": "edge", "status": edge},
              {"name": "opera", "status": opera},
              {"name": "blink", "status": blink}]

  for (var i = 0; i < browsers.length; i++) {

    if (browsers[i]["status"]) {

      return browsers[i]["name"]

    }

  }

}
