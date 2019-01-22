// @flow

const { getManpage } = require('..')
const { expect } = require('chai')

describe('getManpage', function() {
  this.timeout(15000)
  it('returns GitHub readme URL for ulp', function() {
    expect(getManpage('ulp')).to.equal('https://github.com/jcoreio/ulp#readme')
  })
  it('returns GitHub readme URL for p-timeout', function() {
    expect(getManpage({ cwd: '/', packageName: 'p-timeout' })).to.equal(
      'https://github.com/sindresorhus/p-timeout#readme'
    )
  })
  it(`returns homepage for react`, function() {
    expect(getManpage('react')).to.equal('https://reactjs.org/')
  })
  it(`returns local file for opn`, function() {
    expect(getManpage('opn')).to.equal(require.resolve('opn/readme.md'))
  })
})
