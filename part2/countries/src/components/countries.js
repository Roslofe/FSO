
/**
 * Renders the information of a single country.
 * Provides information on the capital, area, official languages,
 * and the flag of the country
 * @param country An object containing the data 
 * @returns The rendering of the data
 */
const CountryInfo = ({ country }) => (
    <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Languages: </h3>
        <ul>
        {Object.values(country.languages).map(lang => (
            <li key={lang}>{lang}</li>
        ))}
        </ul>
        <img src={country.flags.png} />
    </div>
)
  

/**
 * Renders information about countries. The information provided
 * depends on the number of countries. With less than 11 countries,
 * the names of each country are shown. If there is only one, more detailed
 * information is provided. Otherwise the function renders nothing.
 * @param countries An array of countries 
 * @returns A rendering which depends on the input.
 */
const CountryData = ({ countries }) => {
    if (countries.length > 10) {
        return null
    } else if (countries.length !== 1){
        return (
        <>
            {countries.map(country => 
        <p key={country.cca2}>{country.name.common}</p>
        )}
        </>
        )
    } else {
        return (
        <CountryInfo country={countries[0]} />
        )
    }
}
  
export { CountryData }