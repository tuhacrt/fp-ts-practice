export declare type Option<A> = None | Some<A>

type None = Readonly<{
  readonly _tag: 'None'
}>

type Some<A> = Readonly<{
  readonly _tag: 'Some'
  readonly value: A
}>
