import React, { useState, useEffect } from 'react'

const Country = ( {country} ) => {
    const languages = Object.values(country.languages)
    const flag = country.flags.png
    const api_key = import.meta.env.VITE_SOME_KEY
    const [weather, setWeather] = useState(null)
    const [weatherIcon, setWeatherIcon] = useState('')

    useEffect(() => {
        const fetchWeather = async () => {
          try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}&units=metric`)
            if (response.ok) {
              const data = await response.json()
              setWeather(data)

              if (data.weather && data.weather.length > 0) {
                const iconCode = data.weather[0].icon
                setWeatherIcon(`https://openweathermap.org/img/wn/${iconCode}.png`)}            
            }}
              
          catch (error) {
            console.log('Error fetching weather data:', error)}
        }
      
        if (country.capital[0] && api_key) {
          fetchWeather()
        }
      }, [country.capital[0], api_key])      
        

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
        <h2>Weather in {country.capital[0]}</h2>
        {weather && weather.main && (
            <div>
            <p>Temperature: {weather.main.temp} °C</p>
            {weatherIcon && (<img src={weatherIcon} alt="Weather Icon" />)}
            <p>Wind: {weather.wind.speed} m/s</p>
            </div>)}
        </div>
    )
}

export default Country