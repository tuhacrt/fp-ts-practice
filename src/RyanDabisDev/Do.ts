import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'

export interface User {}

export interface UserScore {}

const getUser = () => O.none

const getUserScore = (_user: User) => O.none

const getUserLevel = (_user: User, _userScore: UserScore) => 0

export const level = () => pipe(
  getUser(),
  O.bindTo('user'),
  O.bind('score', ({ user }) => getUserScore(user)),
  O.map(({ user, score }) => getUserLevel(user, score)),
)
