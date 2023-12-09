const Country = ( {country} ) => {
    const languages = Object.values(country.languages)
    const flag = country.flags.png

    return(
        <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area} </p>
        <p>languages:</p>
        <ul>
        {languages.map(language => 
            <li key={language}> 
              {language} 
            </li>
        )}
        </ul>
        <img src={flag} width="100px" height="auto"></img>
        </div>
    )
}

export default Country