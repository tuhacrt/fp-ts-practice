import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'

export const a = () => {
  const userSetting = O.none
  const companySetting = O.none
  const defaultSetting = 'default'

  return pipe(
    userSetting,
    O.alt(() => companySetting),
    O.getOrElse(() => defaultSetting),
  )
}
