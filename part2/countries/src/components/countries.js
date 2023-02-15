import Weather from "./weather"

/**
 * A button that toggles the showing of an individual country vs a list
 * @param country The country it is attached to
 * @param view A boolean determining if a single country is shown
 * @param onClick A function for pressing the button
 * @returns A rendering of a button
 */
const Button = ({ country, view, onClick}) => (
    <button onClick={() => onClick(country.name.common)}>{!view ? 'Show' : 'Hide'}</button>   
)
/**
 * Renders the information of a single country.
 * Provides information on the capital, area, official languages,
 * and the flag of the country
 * @param country An object containing the data 
 * @param view A boolean determining if a single country is shown
 * @param onClick A function for pressing a button
 * @param weather The weather data for the country's capital
 * @returns The rendering of the data
 */
const CountryInfo = ({ country, view, onClick, weather }) => {
    return (
        <div>
            <Button country={country} view={view} onClick={onClick} />
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
            <Weather weatherData={weather} />
        </div>
    )
}
  

/**
 * Renders information about countries. The information provided
 * depends on the number of countries. With less than 11 countries,
 * the names of each country are shown. If there is only one, more detailed
 * information is provided. Otherwise the function renders nothing.
 * @param countries An array of countries 
 * @param view A boolean determining if a single country is shown
 * @param onClick A function for pressing a button
 * @param weather Weather data for the most recently shown capital
 * @returns A rendering which depends on the input.
 */
const CountryData = ({ countries, view, onClick, weather }) => {
    if (countries.length > 10) {
        return null
    } else if (!view){
        return (
        <div>
            {countries.map(country => (
                <div key={country.name.common}>
                    <span>{country.name.common}</span>
                    <Button country={country} view={view} onClick={onClick} />
                </div>
            ))}
        </div>
        )
    } else {
        return (
        <CountryInfo country={countries[0]} view={view} onClick={onClick} weather={weather}/>
        )
    }
}
  
export { CountryData }