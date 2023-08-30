import { describe, expect, it } from 'vitest'
import { getMovieHighlight, movie1, movie2, movie3 } from './movie'

describe('getMovieHighlight of movie has award', () => {
  it('exported', () => {
    const example = movie1
    const expected = `Awarded with ${example.award}`
    expect(getMovieHighlight(example)).toEqual(expected)
  })
})

describe('getMovieHighlight of movie is top 10 with no award', () => {
  it('exported', () => {
    const example = movie2
    const expected = `In Top 10 movies at ${example.ratingPosition}`
    expect(getMovieHighlight(example)).toEqual(expected)
  })
})

describe('getMovieHighlight of movie isn\'t top 10 and has no award', () => {
  it('exported', () => {
    const example = movie3
    const expected = `Released in ${example.releaseYear}`
    expect(getMovieHighlight(example)).toEqual(expected)
  })
})
