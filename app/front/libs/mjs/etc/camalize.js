// Credit: https://stackoverflow.com/a/52551910/1544937
function camalize(string) {

  return string.toLowerCase().replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ0-9]+(.)/g, (match, character) => character.toUpperCase())

}
