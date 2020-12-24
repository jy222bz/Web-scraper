/**
 * @author Jacob Yousif
 * The requires to import modules.
 */
const fetch = require('node-fetch')
const request = require('request-promise')

/**
 * Exporting the functions.
 */
exports.getJSON = getJSON

/**
 * Exporting the functions.
 */
exports.getDay = dayToString

/**
 * Exporting the functions.
 */
exports.getHTML = getHTML

/**
 * It fecthes the reuest of the cinema and returns the result as JSON.
 *
 * @param {string} url the url of the cinema
 * @param {string} day the day of the week.
 * @param {string} movie the movie number.
 * @returns {object} the JSON of response.
 */
async function getJSON (url, day, movie) {
  try {
    return fetch(url + '/check?day=' + getDay(day) + '&movie=' + getMovie(movie))
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * It fecthes the reuest of the cinema and returns the result as HTML.
 *
 * @param {string} url the url of the cinema.
 * @returns {object} the HTML of response.
 */
async function getHTML (url) {
  try {
    return request.get(url)
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * It returns the day.
 *
 * @param {string} day the day of the weekend.
 * @returns {string} the number of the day.
 */
function getDay (day) {
  if (day === 'FRIDAY') {
    return '05'
  } else if (day === 'SATURDAY') {
    return '06'
  } else if (day === 'SUNDAY') {
    return '07'
  }
  return null
}

/**
 * It returns the day as string.
 *
 * @param {string} day the number of the day of the weekend.
 * @returns {string} the day.
 */
function dayToString (day) {
  if (day === '05') {
    return 'FRIDAY'
  } else if (day === '06') {
    return 'SATURDAY'
  } else if (day === '07') {
    return 'SUNDAY'
  }
  return null
}

/**
 * It returns the number of the movie.
 *
 * @param {number} number the number of the movie.
 * @returns {string} the number of the movie.
 */
function getMovie (number) {
  if (number < 10) {
    return '0' + number
  } else {
    return '' + number
  }
}
