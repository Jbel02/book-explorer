import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import BookList from './components/BookList'
import BookDetails from './components/BookDetails'
import ThemeToggle from './components/ThemeToggle'
import BackToTop from './components/BackToTop'
import CategoryShelf from './components/CategoryShelf'
import './App.css'

const CATEGORIES = [
  { title: 'Fiction', subject: 'fiction' },
  { title: 'Fantasy', subject: 'fantasy' },
  { title: 'Mystery', subject: 'mystery' },
  { title: 'Romance', subject: 'romance' },
  { title: 'Science Fiction', subject: 'science_fiction' },
]

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
      <header className="app-header">
        <div className="app-title-row">
          <h1 className="app-title">Book Explorer</h1>
          <ThemeToggle />
        </div>
        <SearchBar query={query} onQueryChange={setQuery} onSubmit={handleSubmit} />
      </header>

      <main className="app-main">
        {loading && (
          <div className="state">
            <div className="spinner" />
          </div>
        )}

        {error && (
          <div className="state">
            <span className="state-icon">⚠️</span>
            <p className="state-title">Something went wrong</p>
            <p className="state-subtitle">{error}</p>
          </div>
        )}

        {!loading && !error && submittedQuery && books.length === 0 && (
          <div className="state">
            <span className="state-icon">📚</span>
            <p className="state-title">No books found.</p>
          </div>
        )}

        {!loading && !error && !submittedQuery && (
          <div className="dashboard">
            {CATEGORIES.map((category) => (
              <CategoryShelf
                key={category.subject}
                title={category.title}
                subject={category.subject}
                onSelect={setSelectedBook}
              />
            ))}
          </div>
        )}

        {!loading && !error && books.length > 0 && (
          <BookList books={books} onSelect={setSelectedBook} />
        )}
      </main>

      {selectedBook && <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />}

      <BackToTop />
    </div>
  )
}

export default App