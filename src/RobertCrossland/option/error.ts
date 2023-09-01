import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import type { Predicate } from 'fp-ts/lib/Predicate'

/* O.alt() */
export type SearchType = 'Book' | 'Chapter' | 'Verse' | 'None'

export type BibleSearch = Readonly<{
  book: O.Option<string>
  chapter: O.Option<number>
  verse: O.Option<number>
}>

export const bookPredicate: Predicate<BibleSearch>
= ({ book, chapter }) => O.isSome(book) && O.isNone(chapter)

export const chapterPredicate: Predicate<BibleSearch>
= ({ book, chapter, verse }) =>
  O.isSome(book) && O.isSome(chapter) && O.isNone(verse)

export const versePredicate: Predicate<BibleSearch>
= ({ book, chapter, verse }) =>
  O.isSome(book) && O.isSome(chapter) && O.isSome(verse)

export const getFromPredicate
= (search: BibleSearch, pred: Predicate<BibleSearch>, type: SearchType):
O.Option<SearchType> => pipe(
  search,
  O.fromPredicate(pred),
  O.map<BibleSearch, SearchType>(() => type),
)

export const getBook = (search: BibleSearch): O.Option<SearchType> =>
  getFromPredicate(search, bookPredicate, 'Book')

export const getChapter = (search: BibleSearch): O.Option<SearchType> =>
  getFromPredicate(search, chapterPredicate, 'Chapter')

export const getVerse = (search: BibleSearch): O.Option<SearchType> =>
  getFromPredicate(search, versePredicate, 'Verse')

export const getSearchType = (search: BibleSearch): SearchType =>
  pipe(
    getBook(search),
    O.alt(() => getChapter(search)),
    O.alt(() => getVerse(search)),
    O.getOrElse<SearchType>(() => 'None'),
  )
