import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'

export interface Movie {
  title: string
  releaseYear: number
  ratingPosition: number
  award?: string
}

export const getMovieAwardHighlight = (movie: Movie): O.Option<string> =>
  pipe(
    movie.award,
    O.fromNullable,
    O.map(award => `Awarded with ${award}`),
  )

export const getMovieTop10Highlight = (movie: Movie): O.Option<string> =>
  pipe(
    movie,
    O.fromPredicate(({ ratingPosition }) => ratingPosition <= 10),
    O.map(({ ratingPosition }) => `In Top 10 movies at ${ratingPosition}`),
  )

export const getMovieHighlight = (movie: Movie): string =>
  pipe(
    movie,
    getMovieAwardHighlight,
    O.alt(() => getMovieTop10Highlight(movie)),
    O.getOrElse(() => `Released in ${movie.releaseYear}`),
  )

export const movie1: Movie = {
  title: 'The Shawshank Redemption',
  releaseYear: 1994,
  ratingPosition: 1,
  award: 'Oscar',
}

export const movie2: Movie = {
  title: 'The Godfather',
  releaseYear: 1972,
  ratingPosition: 3,
}

export const movie3: Movie = {
  title: 'The Dark Knight',
  releaseYear: 2008,
  ratingPosition: 62,
}
