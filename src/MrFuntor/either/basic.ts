import { P, match } from 'ts-pattern'
import { pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'

export type Item = Readonly<{
  name: string
  price: number
}>

export type Account = Readonly<{
  balance: number
  frozen: boolean
}>

export type AccountFrozen = Readonly<{
  type: 'AccountFrozen'
  message: string
}>

export type NotEnoughBalance = Readonly<{
  type: 'NotEnoughBalance'
  message: string
}>

export type Cart = Readonly<{
  items: Item[]
  total: number
}>

export const pay = (amount: number) => (account: Account): E.Either<AccountFrozen | NotEnoughBalance, Account> =>
  match(account)
    .with({ frozen: true }, () =>
      E.left(<const>{
        type: 'AccountFrozen',
        message: 'Cannot pay with a frozen account!',
      }))
    .with({ balance: P.number.lte(amount) }, ({ balance }) =>
      E.left(<const>{
        type: 'NotEnoughBalance',
        message: `Cannot pay ${amount} with a balance of ${balance}!`,
      }))
    .otherwise(() => E.right(<const>{ ...account, balance: account.balance - amount }))

export const checkout = (cart: Cart) => (account: Account) =>
  pipe(
    account,
    pay(cart.total),
    E.matchW(
      error => match(error)
        .with({ type: 'AccountFrozen' }, () => 'Account Frozen')
        .with({ type: 'NotEnoughBalance' }, () => 'Not Enough Balance')
        .exhaustive(),
      account => account,
    ),
  )
