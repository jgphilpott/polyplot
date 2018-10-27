// A function for checking the browser environment..
// This will help define how to draw the graph.
function checkEnvironment() {

  // Checking Window Width and Height variables.
  windowWidth = $(window).width();
  windowHeight = $(window).height() + 3.5;

  // Checking the users agent and language settings.
  var userAgent = navigator.userAgent;
  var userLanguage = navigator.language;

  // Checking if the user is online and if java is enabled?
  var userOnline = navigator.onLine;
  var userJava = navigator.javaEnabled();

  // Checking if cookies are enabled?
  var userCookies = navigator.cookieEnabled;

};// End of 'Check Environment' function.
