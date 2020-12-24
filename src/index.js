/**
 * @author Jacob Yousif
 * The require to import module.
 */
const scraper = require('./scraper.js')

main()

/**
 * The main entry point to the application.
 *
 * @returns {void}
 */
function main () {
  scraper.scrap()
}
