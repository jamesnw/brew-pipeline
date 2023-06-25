const req = import.meta.glob('../batches/*.json', { eager: true })
const beers = []
Object.keys(req).forEach(key => {
  const json = req[key]
  if (json.beers) {
    beers.push(...json.beers)
  } else {
    beers.push(json)
  }
})

export default {
  beers
}
