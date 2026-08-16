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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-handle" />

        <div className="modal-header">
          <div>
            <h2 className="modal-title">{book.title}</h2>
            <p className="modal-author">{book.author_name?.join(', ') || 'Unknown author'}</p>
          </div>
          <button className="modal-close" aria-label="Close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-section">
          <p className="modal-section-label">Editions</p>
          <p className="modal-stat">{book.edition_count ?? 'N/A'}</p>
        </div>

        <div className="modal-section">
          <p className="modal-section-label">Subjects</p>
          {loadingSubjects && <div className="spinner" />}
          {!loadingSubjects && (
            subjects.length > 0 ? (
              <div className="subjects">
                {subjects.slice(0, 8).map((subject) => (
                  <span className="subject-chip" key={subject}>{subject}</span>
                ))}
              </div>
            ) : (
              <p className="modal-stat">None listed</p>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default BookDetails
