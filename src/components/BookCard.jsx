function BookCard({ book, onClick }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null

  return (
    <button className="book-card" onClick={onClick}>
      <div className="book-card-cover">
        {coverUrl ? (
          <img src={coverUrl} alt="" loading="lazy" />
        ) : (
          <div className="book-card-cover-placeholder" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 4.5A1.5 1.5 0 0 1 5.5 3H12v18H5.5A1.5 1.5 0 0 1 4 19.5v-15Z M12 3h6.5A1.5 1.5 0 0 1 20 4.5v15a1.5 1.5 0 0 1-1.5 1.5H12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
      <h3 className="book-card-title">{book.title}</h3>
      <p className="book-card-meta">{book.author_name?.join(', ') || 'Unknown author'}</p>
      <p className="book-card-meta">{book.first_publish_year || 'Year unknown'}</p>
    </button>
  )
}

export default BookCard
