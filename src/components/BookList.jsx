import BookCard from './BookCard'

function BookList({ books, onSelect }) {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.key} book={book} onClick={() => onSelect(book)} />
      ))}
    </div>
  )
}

export default BookList