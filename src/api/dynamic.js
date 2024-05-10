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

var ontap = beers
  .filter(function (o) {
    return o.status === 'ontap'
  })
  .sort(function (o, p) {
    return o.tap > p.tap ? 1 : -1
  })

let beersPerTap = [...Array(4).keys()]
beersPerTap = beersPerTap.map(i => {
  i = i + 1
  let tap = ontap.filter(x => x.tap === i)
  if (tap.length === 0) {
    return { tap: i, status: 'empty' }
  } else return JSON.parse(JSON.stringify(tap[0]))
})
const upcoming = beers.filter(function (o) {
  var upcoming = ['fermenting', 'planned', 'kegged']
  return upcoming.includes(o.status)
})
const kicked = beers.filter(function (o) {
  return ['kicked'].includes(o.status)
});

export default {
  beers,
  ontap: beersPerTap,
  upcoming,
  kicked,
}
