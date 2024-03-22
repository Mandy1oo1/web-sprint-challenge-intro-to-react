import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Character from './Character'

const urlPlanets = 'http://localhost:9009/api/planets'
const urlPeople = 'http://localhost:9009/api/people'

function App() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    // Fetch data from both endpoints concurrently
    Promise.all([axios.get(urlPeople), axios.get(urlPlanets)])
      .then(([peopleResponse, planetsResponse]) => {
        const peopleData = peopleResponse.data
        const planetsData = planetsResponse.data

        // Combine data from both endpoints
        const combinedData = peopleData.map(person => {
          const homeworld = planetsData.find(planet => planet.id === person.homeworld)
          return { ...person, homeworld }
        })

        // Set the combined data to state
        setCharacters(combinedData)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, []) // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div>
      <h2>Star Wars Characters</h2>
      {characters.map(character => (
        <Character key={character.id} character={character} />
      ))}
    </div>
  )
}

export default App

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App
