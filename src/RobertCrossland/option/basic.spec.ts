import { describe, expect, it } from 'vitest'
import { formatName, getBirthdayGreeting } from './basic'

describe('formatName()', () => {
  it(`Given: "Robert"
      When: formatName
      Then: "Robert"`, () => {
    const first = 'Robert'
    const received = formatName(first)
    const expected = 'Robert'

    expect(received).toEqual(expected)
  })

  it(`Given: "Robert", "Crossland"
      When: formatName
      Then: "Crossland, Robert"`, () => {
    const first = 'Robert'
    const last = 'Crossland'
    const received = formatName(first, last)
    const expected = 'Crossland, Robert'

    expect(received).toEqual(expected)
  })
})

describe('getBirthdayGreeting()', () => {
  it(`Given: "Robert", Date(today)
      When: getBirthdayGreeting
      Then: "Happy birthday, Robert! You are 0 years old today!"`, () => {
    const name = 'Robert'
    const today = new Date()
    const received = getBirthdayGreeting(name, today)
    const expected = 'Happy birthday, Robert! You are 0 years old today!'

    expect(received).toEqual(expected)
  })

  it(`Given: "Robert", Date(not today)
      When: getBirthdayGreeting
      Then: "Not your birthday, Robert!"`, () => {
    const name = 'Robert'
    const today = new Date(1990, 1, 1)
    const received = getBirthdayGreeting(name, today)
    const expected = 'Not your birthday, Robert!'

    expect(received).toEqual(expected)
  })
})
