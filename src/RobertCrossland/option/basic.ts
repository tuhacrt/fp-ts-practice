import { flow, pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'

export const formatNameDefault = (first: string, last?: string) => {
  if (last) return `${last}, ${first}`
  return first
}

export const formatName = (first: string, last?: string) =>
  pipe(
    last,
    O.fromNullable,
    O.map(last => `${last}, ${first}`),
    O.getOrElse(() => first),
  )

export const getDateParts = (date: Date) => [date.getFullYear(), date.getMonth(), date.getDate()]

export const getBirthdayGreetingDefault = (name: string, birthday?: Date) => {
  if (birthday) {
    const [year, month, day] = getDateParts(new Date())
    const [birthYear, birthMonth, birthDay] = getDateParts(birthday)

    if (month === birthMonth && day === birthDay) {
      const age = year - birthYear
      return `Happy birthday, ${name}! You are ${age} years old today!`
    }
  }

  return `Not your birthday, ${name}!`
}

export const birthdayPredicate = (birthday: Date) => {
  const [, month, day] = getDateParts(new Date())
  const [, birthMonth, birthDay] = getDateParts(birthday)

  return month === birthMonth && day === birthDay
}

export const getBirthdayGreeting = (name: string, birthday?: Date) =>
  pipe(
    birthday,
    O.fromNullable,
    O.flatMap(flow(
      O.fromPredicate(birthdayPredicate),
      O.map((birthday) => {
        const age = new Date().getFullYear() - birthday.getFullYear()
        return `Happy birthday, ${name}! You are ${age} years old today!`
      }),
    )),
    O.getOrElse(() => `Not your birthday, ${name}!`),
  )
