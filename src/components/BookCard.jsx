function BookCard({ book, onClick }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null

  return (
    <div className="book-card" onClick={onClick}>
      {coverUrl && <img src={coverUrl} alt={book.title} />}
      <h3>{book.title}</h3>
      <p>{book.author_name?.join(', ') || 'Unknown author'}</p>
      <p>{book.first_publish_year || 'Year unknown'}</p>
    </div>
  )
}

export default BookCard