import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import * as E from 'fp-ts/lib/Either'

export interface User {
  verified: boolean
}

export interface Time {}

export const parseTime1 = (time: string) => E.left('Invalid time')

export const parseTime2 = (time: string) => O.none

export const isUserVerified = (user: User): E.Either<string, User> =>
  user.verified ? E.right(user) : E.left('User must be verified')

export const isUserHas2FA = (_user: User): E.Either<string, User> =>
  E.left('User must setup 2FA')

export const validateUser1 = (user: User) => pipe(
  user,
  E.of,
  E.chain(isUserVerified),
  E.chain(isUserHas2FA),
)

export const userIsVerified = (user: User) => user.verified

export const userHas2FA = (_user: User) => false

export const validateUser2 = (user: User) => pipe(
  user,
  E.of,
  E.filterOrElse(userIsVerified, () => 'User must be verified'),
  E.filterOrElse(userHas2FA, () => 'User must setup 2FA'),
)

export const main = (user: User) => {
  // const either = validateUser2(user)
  const time = '12:00'

  pipe(time, parseTime2, E.fromOption(() => 'Invalid time'))
}
