/**
 * @author Jacob Yousif
 * Exporting the function.
 */
exports.processURL = processURL

/**
 * Exporting the function.
 */
exports.getURLs = getURLs

/**
 * A field for the urls.
 */
var urls = []

/**
 * It processes the urls.
 *
 * @param {object} selector the query selector.
 */
async function processURL (selector) {
  selector('a').each((index, element) => {
    urls.push(selector(element).attr('href'))
  })
}
/**
 * It returns the processed urls.
 *
 *@param {string} message to be printed.
 * @returns {string[]} the array of the urls.
 */
function getURLs (message) {
  var temp = urls
  urls = []
  if (message !== '') {
    console.log(message)
  }
  return temp
}
