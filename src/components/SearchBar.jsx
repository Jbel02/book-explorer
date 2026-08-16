function SearchBar({ query, onQueryChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input value={query} onChange={(e) => onQueryChange(e.target.value)} placeholder="Search books..." />
      <button type="submit">Search</button>
    </form>
  )
}
export default SearchBar