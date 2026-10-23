# Hacker News with Vue.js

A read-only clone of [Hacker News](https://news.ycombinator.com/news) built with Vue 3, TypeScript, Vite, Vue Router and Pinia. It follows HN's layout and URLs, and reads from the official [HN Firebase API](https://github.com/HackerNews/API) and the [Algolia HN Search API](https://hn.algolia.com/api).

## Setup

```sh
npm install
npm run dev        # start the dev server
npm run build      # type-check and build for production
npm run preview    # serve the production build
npm test           # run unit and component tests (Vitest)
npm run lint       # ESLint
npm run format     # Prettier
```

## Pages

| URL | Page | Data |
|---|---|---|
| `/`, `/news` | Top stories | Firebase `topstories` |
| `/newest`, `/best`, `/ask`, `/show`, `/jobs` | Story lists | Firebase |
| `/item?id=` | Story, poll or comment with its thread | Firebase |
| `/user?id=` | User profile | Firebase |
| `/submitted?id=`, `/threads?id=` | A user's submissions and comments | Algolia |
| `/newcomments` | Newest comments | Algolia |
| `/front?day=YYYY-MM-DD` | Past: top stories of a day | Algolia |
| `/from?site=` | Stories from a domain | Algolia |
| `/search?q=` | Story search | Algolia |

Lists show 30 items per page; `?p=2` selects the page, as on HN.

## Layout

```
src/
  api/          hn.ts (Firebase), algolia.ts (search)
  stores/       items.ts: caches items and lists so Back is instant
  composables/  usePaged.ts: ?p= paging with loading and error state
  components/   StoryRow, StoryList, CommentItem, CommentTree, CommentFeed, ...
  views/        one view per page above
  utils/        format.ts (timeAgo, domain, ...), sanitize.ts (DOMPurify)
```

Comment threads load one level at a time, in batches of 30, and collapsed threads are not fetched. All HTML from the APIs is sanitized before rendering.
