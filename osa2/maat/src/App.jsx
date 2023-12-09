import { useState, useEffect } from 'react'
import axios from 'axios'
import Show from './components/Show'

function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountries(response.data)}, [])
    })

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(newFilter.toLowerCase())
  )

  return (
    <div>
    find countries: <input value={newFilter} onChange={handleFilterChange} />
    <Show countries={filteredCountries} setNewFilter={setNewFilter} />
    </div>
  )
}

export default App
