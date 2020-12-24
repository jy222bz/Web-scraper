/**
 * @author Jacob Yousif
 * The requires to import modules.
 */
const request = require('request-promise')
const urlHandler = require('./process_url.js')
const calendarHandler = require('./calendar_scraper.js')
const handler = require('cheerio')
const cinemaHandler = require('./cinema_scraper.js')
const trickle = require('./filter.js')
const resHandler = require('./restaurant_fetch_handler.js')
const scraper = require('./restaurant_scraper.js')
const solver = require('./solution_provider.js')

/**
 * Exporting the function.
 */
exports.scrap = scrap

/**
 * It scraps the links, days and the resturant to find recommendations.
 *
 * @returns {void}
 */
async function scrap () {
  const url = process.argv[2]
  try {
    if (typeof url !== 'undefined' && url !== '') {
      urlHandler.processURL(handler.load(await request.get(url)))
      const urls = urlHandler.getURLs('')
      urlHandler.processURL(handler.load(await request.get(urls[0])))
      const calendars = urlHandler.getURLs('Scraping links...OK\n')
      for await (const calendar of calendars) {
        calendarHandler.scrapTable(handler.load(await request.get(urls[0] + calendar)))
      }
      const days = trickle.filter(calendarHandler.getValue(), calendars.length)
      if (days.length > 0) {
        for await (const recommendation of solver.getSolution(await cinemaHandler.scrapCinema(urls[1], days),
          await scraper.scrapRestaurant(handler.load(await resHandler.fetchResult(urls[2])), days))) {
          console.log(recommendation)
        }
      } else {
        console.log('Unfortunately, there is no recommendation at this time.')
      }
    } else {
      console.log('\x1b[33m', 'No URL was provided in the COMMAND LINE!\n', ' \x1b[0m ')
    }
  } catch (error) {
    console.log('\x1b[31m', 'An error has occurred! The error name is:' + '\x1b[31m', error.name + '\n', ' \x1b[0m ')
  }
}
