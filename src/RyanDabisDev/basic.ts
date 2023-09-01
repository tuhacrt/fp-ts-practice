import { pipe } from 'fp-ts/lib/function'
import * as A from 'fp-ts/lib/Array'

export const original = (xs: number[], ys: number[]) => {
  const len = Math.min(xs.length, ys.length)
  let total = 0

  for (let i = 0; i < len; i++) {
    total += Math.max(xs[i], ys[i])
  }

  return total
}

export const functional = (xs: number[], ys: number[]) => pipe(
  xs,
  A.zip(ys),
  A.map(([x, y]) => Math.max(x, y)),
  A.reduce(0, (acc, x) => acc + x),
)
