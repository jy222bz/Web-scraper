/**
 * @author Jacob Yousif
 * The requires to import modules.
 */
const handler = require('./cinema_fetch_handler.js')
const domHandler = require('cheerio')

/**
 * Exporting the function.
 */
exports.scrapCinema = scrapCinema

/**
 * It scraps the cinema.
 *
 * @param {string} url the query selector.
 * @param {string[]} availableDays the available days.
 * @returns {object[]} the information of the cinema; available movies and their times.
 */
async function scrapCinema (url, availableDays) {
  var movies = []
  var values = []
  try {
    const result = await handler.getHTML(url)
    var selector = domHandler.load(result)
    selector('option').each((index, element) => {
      if (index > 4) {
        movies.push(selector(element).text())
      }
    })
    for await (const day of availableDays) {
      let counter = 0
      for await (const movie of movies) {
        const response = await handler.getJSON(url, day, ++counter)
        const json = await response.json()
        for await (const element of json) {
          if (element.status !== 0) {
            values.push({
              status: element.status,
              day: day,
              time: parseInt(element.time.substring(0, 2)),
              movie: movie
            })
          }
        }
      }
    }
    console.log('Scraping showtimes...OK\n')
    return values
  } catch (error) {
    throw new Error(error)
  }
}
