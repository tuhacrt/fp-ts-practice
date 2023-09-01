import { describe, expect, it } from 'vitest'
import { pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'

import { type Account, checkout, pay } from './basic'

describe('pay()', () => {
  it(`Given: an account with balance: 70 and frozen: false
      When: pay 50 dollars
      Then: return E.right({ balance: 20, frozen: false })`, () => {
    const account: Account = { balance: 70, frozen: false }
    const received = pipe(account, pay(50))
    const expected = E.right({ balance: 20, frozen: false })

    expect(received).toEqual(expected)
  })

  it(`Given: an account with balance: 30 and frozen: false
      When: pay 50 dollars
      Then: return E.left("NotEnoughBalance")`, () => {
    const account: Account = { balance: 30, frozen: false }
    const received = pipe(account, pay(50))
    const expected = E.left({
      type: 'NotEnoughBalance',
      message: 'Cannot pay 50 with a balance of 30!',
    })

    expect(received).toEqual(expected)
  })

  it(`Given: an account with balance: 100 and frozen: true
      When: pay 50 dollars
      Then: return E.left("AccountFrozen")`, () => {
    const account: Account = { balance: 100, frozen: true }
    const received = pipe(account, pay(50))
    const expected = E.left({
      type: 'AccountFrozen',
      message: 'Cannot pay with a frozen account!',
    })

    expect(received).toEqual(expected)
  })
})

describe('checkout()', () => {
  describe('Given: a cart with items: [{ name: "apple", price: 10 }, { name: "banana", price: 20 }] and total: 30', () => {
    const cart = { items: [{ name: 'apple', price: 10 }, { name: 'banana', price: 20 }], total: 30 }
    it(`When: checkout with an account with balance: 70 and frozen: false
        Then: return { balance: 40, frozen: false }`, () => {
      const account: Account = { balance: 70, frozen: false }
      const received = pipe(account, checkout(cart))
      const expected = { balance: 40, frozen: false }

      expect(received).toEqual(expected)
    })

    it(`When: checkout with an account with balance: 30 and frozen: false
        Then: return 'Not Enough Balance'`, () => {
      const account: Account = { balance: 30, frozen: false }
      const received = pipe(account, checkout(cart))
      const expected = 'Not Enough Balance'

      expect(received).toEqual(expected)
    })

    it(`When: checkout with an account with balance: 100 and frozen: true
        Then: return 'Account Frozen'`, () => {
      const account: Account = { balance: 100, frozen: true }
      const received = pipe(account, checkout(cart))
      const expected = 'Account Frozen'

      expect(received).toEqual(expected)
    })
  })
})
