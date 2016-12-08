import path from 'path'
import fs from 'fs'
import { transformFileSync } from 'babel-core'
import plugin from '../src'

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

describe('babel-plugin-power-log', () => {
  const fixturesDir = path.join(__dirname, 'fixtures')
  fs.readdirSync(fixturesDir).sort().map((caseName) => {
    it(`should ${caseName.replace(/^\d*-/, '').split('-').join(' ')}`, () => {
      const fixtureDir = path.join(fixturesDir, caseName)
      const beforePath = path.join(fixtureDir, 'before.js');
      const before = transformFileSync(beforePath).code

      const after = fs.readFileSync(
          path.join(fixtureDir, 'after.js')
      ).toString()

      expect(trim(before)).toEqual(trim(after))
    })
  })
})
