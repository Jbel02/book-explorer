import { useState, useEffect } from 'react'

function BookDetails({ book, onClose }) {
  const [subjects, setSubjects] = useState([])
  const [loadingSubjects, setLoadingSubjects] = useState(true)

  useEffect(() => {
    setLoadingSubjects(true)
    fetch(`https://openlibrary.org${book.key}.json`)
      .then((res) => res.json())
      .then((data) => setSubjects(data.subjects || []))
      .catch(() => setSubjects([]))
      .finally(() => setLoadingSubjects(false))
  }, [book.key])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>Close</button>
        <h2>{book.title}</h2>
        <p>{book.author_name?.join(', ')}</p>
        <p>Editions: {book.edition_count ?? 'N/A'}</p>
        {loadingSubjects && <p>Loading subjects...</p>}
        {!loadingSubjects && (
          <p>Subjects: {subjects.length > 0 ? subjects.slice(0, 8).join(', ') : 'None listed'}</p>
        )}
      </div>
    </div>
  )
}

export default BookDetails