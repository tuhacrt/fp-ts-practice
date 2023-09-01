import { flow, pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import * as J from 'fp-ts/lib/Json'

export type Response = Readonly<{
  body: string
  contentLength: number
}>

export type JsonStringifyError = Readonly<{
  type: 'JsonStringifyError'
  error: Error
}>

const jsonStringify = flow(
  J.stringify,
  E.mapLeft((err): JsonStringifyError => ({
    type: 'JsonStringifyError',
    error: E.toError(err),
  })),
)

export const createResponseBasic = (payload: unknown):
E.Either<JsonStringifyError, Response> =>
  pipe(
    payload,
    J.stringify, // E.Either<unknown, string>
    E.map(s => ({
      body: s,
      contentLength: s.length,
    })), // E.Either<unknown, Response>
    E.mapLeft(err => ({
      type: 'JsonStringifyError',
      error: E.toError(err),
    })), // E.Either<JsonStringifyError, Response>
  )

export const createResponse = (payload: unknown):
E.Either<JsonStringifyError, Response> =>
  pipe(
    payload,
    J.stringify, // E.Either<unknown, string>
    E.bimap(
      err => ({
        type: 'JsonStringifyError',
        error: E.toError(err),
      }), // E.Either<JsonStringifyError, _>
      s => ({
        body: s,
        contentLength: s.length,
      }),
    ), // E.Either<_, Response>
  )

export const createResponseRight = (payload: unknown):
E.Either<JsonStringifyError, Response> =>
  pipe(
    payload,
    jsonStringify, // E.Either<JsonStringifyError, string>
    E.map(s => ({
      body: s,
      contentLength: s.length,
    })), // E.Either<_, Response>

  )
