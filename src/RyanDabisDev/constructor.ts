import { pipe } from 'fp-ts/lib/function'
import type * as O from 'fp-ts/lib/Option'
import * as E from 'fp-ts/lib/Either'

export const example1 = (obj: Record<string, number>) =>
  pipe(
    obj?.param,
    E.fromNullable(() => 'No param'),
  )
  // obj?.param ? E.right(obj.param) : E.left('No param')

export const example2 = (obj: O.Option<number>) =>
  pipe(
    obj,
    E.fromOption(() => 'No param'),
  )
  // O.isSome(obj) ? E.right(obj.value) : E.left('No param')

interface User {
  verified: boolean
}

export const validateUserIsVerified = (user: User) =>
  pipe(
    user,
    E.fromPredicate(({ verified }) => verified, () => 'User must be verified'),
  )
  // user.verified ? E.right(user) : E.left('User must be verified')
