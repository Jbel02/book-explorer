# Book Explorer

A simple React app for searching books using the [Open Library Search API](https://openlibrary.org/dev/docs/api/search). Type a title or author, get a grid of matching books with cover art, and click any book to see more details.

## Features

- **Search** — controlled text input for searching by title or author (e.g. "dune")
- **Results grid** — each result card shows cover image, title, author, and first publish year
- **Loading state** — shown while a search is in flight
- **Empty state** — "No books found." when a search returns no matches
- **Error state** — shown if the API request fails
- **Book details** — clicking a card opens a modal with subject/genre tags and edition count

## Tech stack

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) — dev server & build tool
- No UI libraries, no state management libraries, no router — just React's built-in `useState`/`useEffect` and the browser's `fetch`

## API

- Search: `https://openlibrary.org/search.json?q={query}`
- Book details (subjects): `https://openlibrary.org{work_key}.json`
- Cover images: `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`

No API key required.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

## Project structure

```
src/
├─ components/
│  ├─ SearchBar.jsx     # controlled search input
│  ├─ BookList.jsx      # renders a BookCard per result
│  ├─ BookCard.jsx      # cover, title, author, year; opens details on click
│  └─ BookDetails.jsx   # modal with subjects + edition count
├─ App.jsx              # owns app state, fetches search results
└─ App.css
```

## React concepts demonstrated

- **State** — search query, results, loading, error, and selected-book state all live in `App`
- **Props** — `App` passes data and callbacks down to `SearchBar`, `BookList`, `BookCard`, and `BookDetails`
- **useEffect** — one effect in `App` fetches search results when a search is submitted; a second effect in `BookDetails` fetches subject/genre data when a book is selected
- **Conditional rendering** — loading, error, empty, and results states are rendered conditionally based on app state
