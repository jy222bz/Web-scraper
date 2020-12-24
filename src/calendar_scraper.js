/**
 * @author Jacob Yousif
 * A field for the value.
 */
var values = []

/**
 * A field for the value.
 */
var days = []

/**
 * A field for the value.
 */
var status = []

/**
 * Exporting the function.
 */
exports.scrapTable = scrapTable

/**
 * Exporting the function.
 */
exports.getValue = getValue

/**
 * It scraps the tables after the body structure to extract the tables.
 *
 * @param {object} selector the query selector.
 */
async function scrapTable (selector) {
  selector('body > table > thead > tr').each((index, element) => {
    const ths = selector(element).find('th')
    for (let i = 0; i < ths.length; i++) {
      days.push(selector(ths[i]).text().toUpperCase())
    }
  })
  selector('body > table > tbody > tr').each((index, element) => {
    const tds = selector(element).find('td')
    for (let i = 0; i < tds.length; i++) {
      var val = false
      if (selector(tds[i]).text().toUpperCase() === 'OK') {
        val = true
      }
      status.push(val)
    }
  })
}

/**
 * It returns the value.
 *
 * @returns {string} the value.
 */
function getValue () {
  for (let i = 0; i < days.length; i++) {
    values.push({ day: days[i], available: status[i] })
  }
  console.log('Scraping available days...OK \n')
  return values
}
