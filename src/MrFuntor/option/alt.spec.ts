import { describe, expect, it } from 'vitest'

import { getMovieHighlight } from './alt'
import type { Movie } from './alt'

describe('getMovieHighlight()', () => {
  describe('Given: a movie with an award, and it is in top 10', () => {
    const movie: Movie = {
      title: 'The Shawshank Redemption',
      releaseYear: 1994,
      ratingPosition: 1,
      award: 'Oscar',
    }
    describe('When: getMovieHighlight', () => {
      const received = getMovieHighlight(movie)
      it('Then: return `Awarded With {movie.award}`', () => {
        const expected = `Awarded with ${movie.award}`
        expect(received).toEqual(expected)
      })
    })
  })

  describe('Given: a movie has no award, and it is in top 10', () => {
    const movie: Movie = {
      title: 'The Godfather',
      releaseYear: 1972,
      ratingPosition: 3,
    }
    describe('When: getMovieHighlight', () => {
      const received = getMovieHighlight(movie)
      it('Then: return `In Top 10 movies at {movie.ratingPosition}`', () => {
        const expected = `In Top 10 movies at ${movie.ratingPosition}`
        expect(received).toEqual(expected)
      })
    })
  })

  describe('Given: a movie has no award, and it is not in top 10', () => {
    const movie: Movie = {
      title: 'The Dark Knight',
      releaseYear: 2008,
      ratingPosition: 62,
    }
    describe('When: getMovieHighlight', () => {
      const received = getMovieHighlight(movie)
      it('Then: return `Released in {movie.releaseYear}`', () => {
        const expected = `Released in ${movie.releaseYear}`
        expect(received).toEqual(expected)
      })
    })
  })
})
