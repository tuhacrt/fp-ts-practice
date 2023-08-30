import { describe, expect, it } from 'vitest'

import * as O from 'fp-ts/lib/Option'

import { getEven } from './fromPredicate'

describe('When getEven', () => {
  it(`Given:
        even number: 2
      Then:
        return O.some(2)`, () => {
    const number = 2
    const received = getEven(number)
    const expected = O.some(2)

    expect(received).toEqual(expected)
  })

  it(`Given:
        non-even number: 5
      Then:
        return O.none`, () => {
    const number = 5
    const received = getEven(number)
    const expected = O.none

    expect(received).toEqual(expected)
  })
})
