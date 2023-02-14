/**
 * Displays different text.
 * @param text A text that indicates the current state of the search 
 * @returns A rendering of the text.
 */
const SearchStatus = ({ text }) => <p>{text}</p>

/**
 * Allows users to search for countries
 * @param value The value that the input has
 * @param change A function that determines the actions that happen when
 * the input changes 
 * @returns A rendering of a form.
 */
const Search = ({ value, change}) => (
  <form>
    <div>
      Find countries: 
      <input value={value} onChange={change} />
    </div>
  </form>
)

export { Search, SearchStatus}