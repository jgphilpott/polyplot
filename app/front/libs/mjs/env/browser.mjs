export function findBrowser() {

  // Credit: https://stackoverflow.com/a/9851769/1544937
  let firefox = typeof InstallTrigger != "undefined"
  let chrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)
  let safari = /constructor/i.test(window.HTMLElement) || (function(p) {return p.toString() == "[object SafariRemoteNotification]"})(!window["safari"] || (typeof safari != "undefined" && safari.pushNotification))
  let ie = !!document.documentMode || false
  let edge = !ie && !!window.StyleMedia
  let opera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0
  let blink = (chrome || opera) && !!window.CSS

  let browsers = [{"name": "firefox", "status": firefox},
                  {"name": "chrome", "status": chrome},
                  {"name": "safari", "status": safari},
                  {"name": "ie", "status": ie},
                  {"name": "edge", "status": edge},
                  {"name": "opera", "status": opera},
                  {"name": "blink", "status": blink}]

  for (let i = 0; i < browsers.length; i++) {

    if (browsers[i]["status"]) {

      return browsers[i]["name"]

    }

  }

  return null

}