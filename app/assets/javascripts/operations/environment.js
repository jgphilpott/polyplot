// A function for checking the browser environment..
// This will help define how to draw the graph.
function checkEnvironment() {

  app.view = {
    "width": $(window).width(),
    "height": $(window).height()
  };

  app.user = {
    "agent": navigator.userAgent,
    "language": navigator.language,
    "online": navigator.onLine,
    "java": navigator.javaEnabled(),
    "cookies": navigator.cookieEnabled
  };

};// End of 'Check Environment' function.
