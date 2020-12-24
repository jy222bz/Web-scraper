/**
 * @author Jacob Yousif
 * The requires to import modules.
 */
const fetch = require('node-fetch')
const request = require('request-promise')

/**
 * Exporting the function.
 */
exports.fetchResult = getResponse

/**
 * Fields for the new location (URL) and the cockies.
 */
var cockies
var location

/**
 * It makes a POST request, by making first a GTE request to set the cockies.
 * Then, it makes the POST request and get the new location and fetches it.
 *
 * @param {string} url the target url.
 * @returns {object} the response.
 */
async function getResponse (url) {
  try {
    await fetch(url)
    await fetch(url + '/login', {
      method: 'post',
      redirect: 'manual',
      body: new URLSearchParams({
        username: 'zeke',
        password: 'coys',
        submit: 'login'
      })
    }).then((response) => {
      for (const pair of response.headers.entries()) {
        if (pair[0] === 'location') {
          location = pair[1]
        } else if (pair[0] === 'set-cookie') {
          cockies = pair[1]
        }
      }
    })
    return await request.get(location, {
      headers: {
        accept: '*/*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        cookie: cockies
      },
      method: 'GET'
    })
  } catch (error) {
    throw new Error(error)
  }
}
