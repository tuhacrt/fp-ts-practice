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
