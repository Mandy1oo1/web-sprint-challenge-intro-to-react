import React, { useState } from 'react'

function Character({ character }) {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(prevState => !prevState)
  }
    return (
      <div className="character-card" onClick={toggleDetails}>
      <h3 className="character-name">{character.name}</h3>
      {showDetails && (
        <>
          {character.homeworld && (
            <p className="character-planet">Homeworld: {character.homeworld.name}</p>
          )}
        </>
      )}
    </div>
  )
}
export default Character
