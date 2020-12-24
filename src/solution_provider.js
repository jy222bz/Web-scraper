/**
 * @author Jacob Yousif
 * Exporting the function.
 */
exports.getSolution = getSolution

/**
 * It provides a solution.
 *
 * @param {object[]} cinemaData the available movies and their times.
 * @param {object[]} restaurantData the available times for reservaions.
 * @returns {string[]} recommendatiosn.
 */
function getSolution (cinemaData, restaurantData) {
  console.log('\nRecommendations\n===============\n')
  const recommendations = []
  for (let index = 0; index < cinemaData.length; index++) {
    for (let xV = 0; xV < restaurantData.length; xV++) {
      if ((cinemaData[index].time + 2) <= restaurantData[xV].time && cinemaData[index].day === restaurantData[xV].day &&
      cinemaData[index].status !== 0) {
        const object = '* On ' + cinemaData[index].day +
       ' the movie "' + cinemaData[index].movie +
        '" starts at ' + cinemaData[index].time + ':00' +
        ' and there is a free table between ' + restaurantData[xV].time + ':00-' + (restaurantData[xV].time + 2) + ':00. \n'
        recommendations.push(object)
      }
    }
  }
  if (recommendations.length === 0) {
    recommendations.push('Unfortunately, there is no recommendation at this time.')
  }
  return recommendations
}
