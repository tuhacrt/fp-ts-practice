import { describe, expect, it } from 'vitest'
import * as O from 'fp-ts/lib/Option'
import { getBestMovie, head, inverseHead } from './basic'

describe('head', () => {
  describe('Given: a array: [5, 6, 7]', () => {
    const xs = [5, 6, 7]
    describe('When: head', () => {
      const received = head(xs)
      it('Then: return O.some(5)', () => {
        const expected = O.some(5)
        expect(received).toEqual(expected)
      })
    })
  })

  describe('Given: a empty array: []', () => {
    const xs: number[] = []
    describe('When: head', () => {
      const received = head(xs)
      it('Then: return O.none', () => {
        const expected = O.none
        expect(received).toEqual(expected)
      })
    })
  })
})

describe('getBestMovie', () => {
  describe('Given: a array: ["An American in Rome", "Winter Holidays"]', () => {
    const movies = ['An American in Rome', 'Winter Holidays']
    describe('When: getBestMovie', () => {
      const received = getBestMovie(movies)
      it('Then: return O.some("Best - AN AMERICAN IN ROME")', () => {
        const expected = O.some('Best - AN AMERICAN IN ROME')
        expect(received).toEqual(expected)
      })
    })
  })

  describe('Given: a empty array: []', () => {
    const movies: string[] = []
    describe('When: getBestMovie', () => {
      const received = getBestMovie(movies)
      it('Then: return O.none', () => {
        const expected = O.none
        expect(received).toEqual(expected)
      })
    })
  })
})

describe('inverseHead', () => {
  describe('Given: a array: [5, 6, 7]', () => {
    const xs = [5, 6, 7]
    describe('When: inverseHead', () => {
      const received = inverseHead(xs)
      it('Then: return O.some(0.2)', () => {
        const expected = O.some(0.2)
        expect(received).toEqual(expected)
      })
    })
  })

  describe('Given: a empty array: []', () => {
    const xs: number[] = []
    describe('When: inverseHead', () => {
      const received = inverseHead(xs)
      it('Then: return O.none', () => {
        const expected = O.none
        expect(received).toEqual(expected)
      })
    })
  })
})
