import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as characterService from '../../services/characterService';

function Characters({ characters, setCharacters, setSelectedCharacter }) {

  useEffect(() => {
    async function fetchCharacters() {
      const characters = await characterService.indexCharacters();
      setCharacters(characters);
    }
    fetchCharacters();
  }, [setCharacters]);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const handleDelete = async (id) => {
    await characterService.deleteCharacter(id);
    const updatedCharacters = await characterService.indexCharacters();
    setCharacters(updatedCharacters);
  };

  return (
    <div>
      <h2>Characters</h2>
      <Link to="/createCharacter">Create New Character</Link>
      <ul>
        {characters.map((character) => (
          <li key={character._id}>
            {character.name} - {character.class}
            <Link to="/editCharacter">
              <button onClick={() => handleCharacterClick(character)}>Edit</button>
            </Link>
            <button onClick={() => handleDelete(character._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Characters;
