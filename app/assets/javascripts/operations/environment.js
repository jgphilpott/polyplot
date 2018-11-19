// A function for checking the browser environment..
// This will help define how to draw the graph.
function checkEnvironment() {

  app.view.width = $(window).width();
  app.view.height = $(window).height();

  app.user.agent = navigator.userAgent;
  app.user.language = navigator.language;
  app.user.online = navigator.onLine;
  app.user.java = navigator.javaEnabled();
  app.user.cookies = navigator.cookieEnabled;

};// End of 'Check Environment' function.
