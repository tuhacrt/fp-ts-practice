import * as O from 'fp-ts/lib/Option'

export const isEven = (x: number) => x % 2 === 0
export const getEven = O.fromPredicate(isEven)
