import { describe, expect, it } from 'vitest'
import { functional, original } from './basic'

describe('getSearchType()', () => {
  it(`Given: xs = [1, 2, 3], ys = [0, 4, 1]
      When: functional and original
      Then: functional equals original"`, () => {
    const xs = [1, 2, 3]
    const ys = [0, 4, 1]
    const received = functional(xs, ys)
    const expected = original(xs, ys)

    expect(received).toEqual(expected)
  })
})
