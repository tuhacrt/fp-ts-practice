import { describe, expect, it } from 'vitest'

import { onePlusTwo } from '../src'

describe('test', () => {
  it(`Given:
        a function that returns 1 + 2
      When:
        it is called
      Then:
        it returns 3`, () => {
    const example = onePlusTwo
    const expected = 3

    expect(example).toEqual(expected)
  })
})
