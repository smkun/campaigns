import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateCampaign({ handleCreate, characters, places }) {
  const [campaign, setCampaign] = useState({
    name: '',
    system: '',
    characters: [],
    places: [],
  });
  const navigate = useNavigate();

  const [availableCharacters, setAvailableCharacters] = useState([]);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    setAvailableCharacters(characters);
    setAvailablePlaces(places);
  }, [characters, places]);

  const handleChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const handleAddCharacter = (e) => {
    const selectedCharacter = availableCharacters.find(
      (char) => char._id === e.target.value
    );
    setCampaign({
      ...campaign,
      characters: [...campaign.characters, selectedCharacter],
    });
    setAvailableCharacters(
      availableCharacters.filter((char) => char._id !== e.target.value)
    );
  };

  const handleRemoveCharacter = (id) => {
    const removedCharacter = campaign.characters.find((char) => char._id === id);
    setCampaign({
      ...campaign,
      characters: campaign.characters.filter((char) => char._id !== id),
    });
    setAvailableCharacters([...availableCharacters, removedCharacter]);
  };

  const handleAddPlace = (e) => {
    const selectedPlace = availablePlaces.find((place) => place._id === e.target.value);
    setCampaign({
      ...campaign,
      places: [...campaign.places, selectedPlace],
    });
    setAvailablePlaces(availablePlaces.filter((place) => place._id !== e.target.value));
  };

  const handleRemovePlace = (id) => {
    const removedPlace = campaign.places.find((place) => place._id === id);
    setCampaign({
      ...campaign,
      places: campaign.places.filter((place) => place._id !== id),
    });
    setAvailablePlaces([...availablePlaces, removedPlace]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreate(campaign);
    navigate('/campaigns'); // Redirect to campaigns page after creation
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Campaign Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          value={campaign.name}
        />
        <label htmlFor="system">Campaign System:</label>
        <input
          type="text"
          name="system"
          id="system"
          onChange={handleChange}
          value={campaign.system}
        />
        
        <div>
          <h3>Characters</h3>
          <select onChange={handleAddCharacter} defaultValue="">
            <option value="" disabled>Select a character</option>
            {availableCharacters.map((char) => (
              <option key={char._id} value={char._id}>
                {char.name}
              </option>
            ))}
          </select>
          <ul>
            {campaign.characters.map((char) => (
              <li key={char._id}>
                {char.name}
                <button type="button" onClick={() => handleRemoveCharacter(char._id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Places</h3>
          <select onChange={handleAddPlace} defaultValue="">
            <option value="" disabled>Select a place</option>
            {availablePlaces.map((place) => (
              <option key={place._id} value={place._id}>
                {place.name}
              </option>
            ))}
          </select>
          <ul>
            {campaign.places.map((place) => (
              <li key={place._id}>
                {place.name}
                <button type="button" onClick={() => handleRemovePlace(place._id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CreateCampaign;
