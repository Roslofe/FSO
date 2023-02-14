import { useState, useEffect } from 'react'
import countryService from './services/countries'
import { Search, SearchStatus} from './components/search'
import { CountryData } from './components/countries'

const App = () => {

  /**
   * States concerning various aspects of the app:
   * All available countries, the current search term,
   * countries matching the search, an informative text
   * about the state of the search, whether a singular country 
   * is shown, and it's cca2 code.
   */
  const [countries, setCountries] = useState([])
  const [currSearch, setSearch] = useState('')
  const [matching, setMatching] = useState([])
  const [matchStatus, setStatus] = useState('')
  const [singleView, setView] = useState(false)
  const [singleId, setId] = useState(null)
  
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
  
  /**
   * Handles pressing the button by updating the 
   * view variable
   * @param cca2 The 'id' of the country whose button was pressed
   */
  const handleButtonPress = (cca2) => {
    setView(!singleView)
    setId(cca2)
  }

  /**
   * Changes the view between a singular country or a list
   * based on the value of singleView
   * @param cca2 The id of the country that would be shown alone
   */
  const changeView = (cca2) => {
    if (singleView) {
      const singleCountry = [
        countries.find(country => country.cca2 === cca2),
      ]
      setMatching(singleCountry)
    } else {
      setMatching(countries.filter(country => country.name.common.toLowerCase().includes(currSearch.toLowerCase())))
    }
  }

  /**
   * Changes the view each time the view variable changes
   */
  useEffect(() => {
    changeView(singleId)
  }, [singleView])

  return (
    <div>
      <h1>Countries</h1>
      <Search value={currSearch} change={handleSearchChange} />
      <SearchStatus text={matchStatus} />
      <CountryData countries={matching} view={singleView} onClick={handleButtonPress} />
    </div>
  )
}

export default App;
