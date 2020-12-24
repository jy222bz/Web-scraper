/**
 * @author Jacob Yousif
 * Exporting the function after its content.
 */
exports.scrapRestaurant = scrapRestaurant

/**
 * It scraps the restaurant.
 *
 * @param {object} selector the query selector.
 * @param {object[]} days the available.
 * @returns {object[]} the result data.
 */
async function scrapRestaurant (selector, days) {
  const values = []
  const pars = selector('body').find('p')
  for (const day of days) {
    var isHunting = false
    var tracker = false
    for (let iIX = 0; iIX < pars.length; iIX++) {
      if (isHunting &&
      selector(pars[iIX]).text().trim() !== 'undefined' && selector(pars[iIX]).text().trim() !== '') {
        const isItBooked = selector(pars[iIX]).text().trim().split(/[\s,?,.!]+/).some(target => target === 'booked')
        var time = selector(pars[iIX]).text().trim()
        if (!isItBooked) {
          values.push({ day: day, time: parseInt(time.substring(0, 2)) })
          tracker = true
        }
      } else if (selector(pars[iIX]).text().toUpperCase().trim() === day) {
        isHunting = true
      } else if (tracker && selector(pars[iIX]).text().toUpperCase().trim() === '') {
        break
      }
    }
  }
  console.log('Scraping possible reservations...OK\n')
  return values
}
