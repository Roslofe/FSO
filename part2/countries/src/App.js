import { useState, useEffect } from 'react'
import countryService from './services/countries'
import { Search, SearchStatus} from './components/search'
import { CountryData } from './components/countries'

const App = () => {

  /**
   * States concerning various aspects of the app:
   * All available countries, the current search term,
   * countries matching the search, and an informative text
   * about the state of the search.
   */
  const [countries, setCountries] = useState([])
  const [currSearch, setSearch] = useState('')
  const [matching, setMatching] = useState([])
  const [matchStatus, setStatus] = useState('')
  
  /**
   * Fetches all the country data from the api.
   * Only completed once.
   */
  useEffect(() => {
    countryService
      .getCountries()
      .then(countries => {
        setCountries(countries)
        setMatching(countries)
      })
  }, [])

  /**
   * Changes the search status text.
   */
  const handleStatusChange = () => {
    let msg = ''
    if (matching.length > 10) {
      msg = 'Too many matches, specify another filter'
    } else if (matching.length === 0) {
      msg = 'No matches, specify another filter'
    } 
    setStatus(msg)
  }

  /**
   * Updates the list of matching countries whenever the 
   * search keyword changes
   */
  useEffect(() => {
    setMatching(countries.filter(country => country.name.common.toLowerCase().includes(currSearch.toLowerCase())))
    handleStatusChange()
  }, [currSearch])
  
  /**
   * Sets the status text to update whenever the matching countries
   * change.
   */
  useEffect(() => {
    handleStatusChange()
  }, [matching])

  /**
   * Updates the state of the search based on the input. 
   */
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }  

  return (
    <div>
      <h1>Countries</h1>
      <Search value={currSearch} change={handleSearchChange} />
      <SearchStatus text={matchStatus} />
      <CountryData countries={matching} />
    </div>
  )
}

export default App;
