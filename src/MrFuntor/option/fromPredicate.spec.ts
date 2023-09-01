import { describe, expect, it } from 'vitest'

import * as O from 'fp-ts/lib/Option'

import { getEven } from './fromPredicate'

describe('getEven()', () => {
  describe('Given: a even number: 2', () => {
    const number = 2
    describe('When: getEven', () => {
      const received = getEven(number)
      it('Then: return O.some(2)', () => {
        const expected = O.some(2)
        expect(received).toEqual(expected)
      })
    })
  })

  describe('Given: a non-even number: 5', () => {
    const number = 5
    describe('When: getEven', () => {
      const received = getEven(number)
      it('Then: return O.none', () => {
        const expected = O.none
        expect(received).toEqual(expected)
      })
    })
  })
})
