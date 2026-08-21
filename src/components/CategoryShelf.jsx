import { useEffect, useState } from 'react'
import BookList from './BookList'

function normalize(work) {
  return {
    key: work.key,
    title: work.title,
    cover_i: work.cover_id,
    author_name: work.authors?.map((a) => a.name),
    first_publish_year: work.first_publish_year,
    edition_count: work.edition_count,
  }
}

function CategoryShelf({ title, subject, onSelect }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)

    fetch(`https://openlibrary.org/subjects/${subject}.json?limit=5`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Request failed')
        return res.json()
      })
      .then((data) => setBooks((data.works || []).map(normalize)))
      .catch((err) => { if (err.name !== 'AbortError') setBooks([]) })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [subject])

  if (!loading && books.length === 0) return null

  return (
    <section className="shelf">
      <h2 className="shelf-title">{title}</h2>
      {loading ? (
        <div className="shelf-grid">
          {Array.from({ length: 5 }).map((_, i) => (
            <div className="shelf-skeleton" key={i} />
          ))}
        </div>
      ) : (
        <BookList books={books} onSelect={onSelect} gridClassName="shelf-grid" />
      )}
    </section>
  )
}

export default CategoryShelf
