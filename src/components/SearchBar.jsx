function SearchBar({ query, onQueryChange, onSubmit }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <div className="search-field">
        <svg className="search-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          className="search-input"
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by title or author"
        />
        {query && (
          <button
            type="button"
            className="search-clear"
            aria-label="Clear search"
            onClick={() => onQueryChange('')}
          >
            ✕
          </button>
        )}
      </div>
      <button type="submit" className="search-submit" disabled={!query.trim()}>
        Search
      </button>
    </form>
  )
}

export default SearchBar
