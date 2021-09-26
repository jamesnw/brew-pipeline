const req = require.context('../batches/', true, /^\.\/.*.json$/)
const beers = []
req.keys().forEach(key => {
  const json = req(key)
  if (json.beers) {
    beers.push(...json.beers)
  } else {
    beers.push(json)
  }
})

export default {
  beers
}
