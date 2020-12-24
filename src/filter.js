/**
 * @author Jacob Yousif
 * Exporting the function.
 */
exports.filter = filter

/**
 * It filters the data to hold only the available days.
 *
 * @param {object[]} data the data to be filtered.
 * @param {number} amount of persons.
 * @returns {string[]} the free days.
 */
function filter (data, amount) {
  var result = []
  var friCount = 0
  var satCount = 0
  var sunCount = 0
  for (const info of data) {
    if (info.day === 'FRIDAY' && info.available) {
      ++friCount
      if (friCount === amount) { result.push('FRIDAY') }
    } else if (info.day === 'SATURDAY' && info.available) {
      ++satCount
      if (satCount === amount) { result.push('SATURDAY') }
    } else if (info.day === 'SUNDAY' && info.available) {
      ++sunCount
      if (sunCount === amount) { result.push('SUNDAY') }
    }
  }
  return result
}
