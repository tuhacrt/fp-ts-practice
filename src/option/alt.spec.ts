import { describe, expect, it } from 'vitest'

import { getMovieHighlight } from './alt'
import type { Movie } from './alt'

describe('When: getMovieHighlight', () => {
  it(`Given:
        a movie with an award, and it is in top 10
      Then:
        return \`Awarded With \${movie.award}\``, () => {
    const movie: Movie = {
      title: 'The Shawshank Redemption',
      releaseYear: 1994,
      ratingPosition: 1,
      award: 'Oscar',
    }
    const received = getMovieHighlight(movie)
    const expected = `Awarded with ${movie.award}`

    expect(received).toEqual(expected)
  })

  it(`Given:
        a movie has no award, and it is in top 10
      Then:
        return \`In Top 10 movies at \${movie.ratingPosition}\``, () => {
    const movie: Movie = {
      title: 'The Godfather',
      releaseYear: 1972,
      ratingPosition: 3,
    }
    const received = getMovieHighlight(movie)
    const expected = `In Top 10 movies at ${movie.ratingPosition}`

    expect(received).toEqual(expected)
  })

  it(`Given:
        a movie has no award, and it is out of top 10
      Then:
        return \`Released in \${movie.releaseYear}\``, () => {
    const movie: Movie = {
      title: 'The Dark Knight',
      releaseYear: 2008,
      ratingPosition: 62,
    }
    const received = getMovieHighlight(movie)
    const expected = `Released in ${movie.releaseYear}`

    expect(received).toEqual(expected)
  })
})
