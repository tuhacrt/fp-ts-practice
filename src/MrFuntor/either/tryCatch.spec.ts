import { describe, expect, it } from 'vitest'
import * as E from 'fp-ts/lib/Either'

import { jsonParse } from './tryCatch'

describe('jsonParse()', () => {
  it(`Given: a valid JSON string '{"foo": "bar"}'
      When: jsonParse
      Then: return E.right({ foo: 'bar' })`, () => {
    const text = '{"foo": "bar"}'
    const received = jsonParse(text)
    const expected = E.right({ foo: 'bar' })

    expect(received).toEqual(expected)
  })

  it(`Given: a invalid JSON string '{invalid}'
      When: jsonParse
      Then: return E.left({
        type: 'JsonParseError',
        error: SyntaxError('Unexpected token i in JSON at position 1'),
      })`, () => {
    const text = '{invalid}'
    const received = jsonParse(text)
    const expected = E.left({
      type: 'JsonParseError',
      error: SyntaxError('Unexpected token i in JSON at position 1'),
    })

    expect(received).toEqual(expected)
  })
})
