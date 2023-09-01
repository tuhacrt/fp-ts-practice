import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'

export const head = <T>(xs: ReadonlyArray<T>): O.Option<T> => xs.length ? O.some(xs[0]) : O.none

export const toUpperCase = (s: string): string => s.toUpperCase()

export const addPrefix = (prefix: string) => (s: string): string => prefix.concat(s)

export const getBestMovie = (titles: ReadonlyArray<string>): O.Option<string> =>
  pipe(
    titles,
    head,
    O.map(toUpperCase),
    O.map(addPrefix('Best - ')),
  )

export const inverse = (n: number): O.Option<number> => n ? O.some(1 / n) : O.none

export const inverseHead = (xs: ReadonlyArray<number>): O.Option<number> =>
  pipe(
    xs,
    head,
    O.chain(inverse),
  )
