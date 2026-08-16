import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import BookList from './components/BookList'
import BookDetails from './components/BookDetails'

function App() {
  const [query, setQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedBook, setSelectedBook] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmittedQuery(query.trim())
  }

  useEffect(() => {
    if (!submittedQuery) return

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(submittedQuery)}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Request failed')
        return res.json()
      })
      .then((data) => setBooks(data.docs))
      .catch((err) => { if (err.name !== 'AbortError') setError(err.message) })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [submittedQuery])

  return (
    <div className="app">
      <SearchBar query={query} onQueryChange={setQuery} onSubmit={handleSubmit} />

      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong: {error}</p>}
      {!loading && !error && submittedQuery && books.length === 0 && <p>No books found.</p>}
      {!loading && !error && books.length > 0 && <BookList books={books} onSelect={setSelectedBook} />}

      {selectedBook && <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />}
    </div>
  )
}

export default App