import * as E from 'fp-ts/lib/Either'

export type JsonParseError = Readonly<{
  type: 'JsonParseError'
  error: Error
}>

export const oldJsonParse = (json: string): E.Either<Error, unknown> => {
  try {
    const result = JSON.parse(json)
    return E.right(result)
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err))
    return E.left(error)
  }
}

export const basicJsonParse = (text: string): E.Either<Error, unknown> =>
  E.tryCatch(
    () => JSON.parse(text),
    E.toError,
  )

export const jsonParse: (text: string) => E.Either<JsonParseError, unknown>
= E.tryCatchK(
  JSON.parse,
  err => ({
    type: 'JsonParseError',
    error: E.toError(err),
  }),
)
