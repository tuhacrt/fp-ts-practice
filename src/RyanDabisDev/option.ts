import parseUrl from 'parse-url'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import * as A from 'fp-ts/lib/Array'
import * as R from 'ramda'

export const url = 'https://docs.nestjs.com/first-steps'

export const isDotCom = (url: string): boolean => {
  try {
    const { resource } = parseUrl(url)
    const parts = resource.split('.')
    const len = parts.length

    if (len) {
      const tld = parts[len - 1]

      if (tld === 'com') {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  } catch {
    return false
  }
}

export const tryParsingUrl = (url: string) => O.tryCatch(() => parseUrl(url))

export const getTld = (resource: string): O.Option<string> =>
  pipe(resource, r => r.split('.'), A.last)

export const isDotComFunctional = (url: string): boolean =>
  pipe(
    url,
    tryParsingUrl,
    O.chain(({ resource }) => getTld(resource)),
    O.map(R.equals('com')),
    O.getOrElse(() => false),
  )
