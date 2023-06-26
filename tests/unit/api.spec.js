import kegData from '../../src/api/dynamic.js'
import Batch from '../../src/schemas/batch.ts'

describe('beers', () => {
  it('has beers', () => {
    expect(kegData.beers).not.toHaveLength(0);
  })

  kegData.beers.forEach(beer=>{
    it(beer.name + ' is valid', ()=>{
      const res = Batch.parse(beer);
      expect(res.name).toBe(beer.name);
    })
  })
})

describe('ontap', ()=>{
  let taps = [...Array(6).keys()];
  taps.forEach(tap=>{
    tap++;
    it('has one item for tap ' + (tap), ()=>{
      const res = kegData.beers.filter(x=>x.tap === tap)
      expect(res).toHaveLength(1)
    })
  })
})
