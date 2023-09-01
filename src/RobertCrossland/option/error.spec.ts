import { describe, expect, it } from 'vitest'
import * as O from 'fp-ts/lib/Option'

import { getSearchType } from './error'

describe('getSearchType()', () => {
  it(`Given: a bookSearch with {
        book: O.some("Job")
        chapter: O.none
        verse: O.none
      }
      When: getSearchType
      Then: return "Book"`, () => {
    const bookSearch = {
      book: O.some('Job'),
      chapter: O.none,
      verse: O.none,
    }
    const received = getSearchType(bookSearch)
    const expected = 'Book'

    expect(received).toEqual(expected)
  })

  it(`Given: a bookSearch with {
    book: O.some("Job")
    chapter: O.some(1)
    verse: O.none
  }
  When: getSearchType
  Then: return "Chapter"`, () => {
    const bookSearch = {
      book: O.some('Job'),
      chapter: O.some(1),
      verse: O.none,
    }
    const received = getSearchType(bookSearch)
    const expected = 'Chapter'

    expect(received).toEqual(expected)
  })

  it(`Given: a bookSearch with {
    book: O.some("Job")
    chapter: O.some(1)
    verse: O.some(2)
  }
  When: getSearchType
  Then: return "Verse"`, () => {
    const bookSearch = {
      book: O.some('Job'),
      chapter: O.some(1),
      verse: O.some(2),
    }
    const received = getSearchType(bookSearch)
    const expected = 'Verse'

    expect(received).toEqual(expected)
  })

  it(`Given: a bookSearch with {
    book: O.none
    chapter: O.some(1)
    verse: O.some(2)
  }
  When: getSearchType
  Then: return "None"`, () => {
    const bookSearch = {
      book: O.none,
      chapter: O.some(1),
      verse: O.some(2),
    }
    const received = getSearchType(bookSearch)
    const expected = 'None'

    expect(received).toEqual(expected)
  })
})

describe('O.tryCatch()', () => {
  it(`Given: a function would throw an error
      When: O.tryCatch
      Then: { _tag: "None" }`, () => {
    const throwThings = () => {
      throw new Error('error')
    }
    const received = O.tryCatch(throwThings)
    const expected = { _tag: 'None' }

    expect(received).toEqual(expected)
  })

  it(`Given: a function would return a string "Hello"
      When: O.tryCatch
      Then: { _tag: "Some", value: "Hello" }`, () => {
    const hello = () => 'Hello'
    const received = O.tryCatch(hello)
    const expected = { _tag: 'Some', value: 'Hello' }

    expect(received).toEqual(expected)
  })
})
