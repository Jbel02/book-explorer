import BookCard from './BookCard'

function BookList({ books, onSelect, gridClassName = 'book-grid' }) {
  return (
    <div className={gridClassName}>
      {books.map((book) => (
        <BookCard key={book.key} book={book} onClick={() => onSelect(book)} />
      ))}
    </div>
  )
}

export default BookList