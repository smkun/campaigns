import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as campaignService from '../../services/campaignService';
import * as characterService from '../../services/characterService';

function EditPlace({ place, handleUpdate }) {
  const [campaigns, setCampaigns] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [updatedPlace, setUpdatedPlace] = useState(place);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const campaigns = await campaignService.indexCampaigns();
      setCampaigns(campaigns);
      const characters = await characterService.indexCharacters();
      setCharacters(characters);
    }
    fetchData();
    setUpdatedPlace(place);
  }, [place]);

  const handleChange = (e) => {
    setUpdatedPlace({ ...updatedPlace, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdate(updatedPlace);
    navigate('/places'); // Redirect to places page after update
  };

  const handleCharactersChange = (e) => {
    const selectedCharacters = Array.from(e.target.selectedOptions, option => option.value);
    setUpdatedPlace({ ...updatedPlace, charactersPresent: selectedCharacters });
  };

  const handleCampaignChange = (e) => {
    const selectedCampaigns = Array.from(e.target.selectedOptions, option => option.value);
    setUpdatedPlace({ ...updatedPlace, campaigns: selectedCampaigns });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Place Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={handleChange}
        value={updatedPlace.name}
        required
      />
      <label htmlFor="type">Type:</label>
      <input
        type="text"
        name="type"
        id="type"
        onChange={handleChange}
        value={updatedPlace.type}
        required
      />
      <label htmlFor="charactersPresent">Characters Present:</label>
      <select
        name="charactersPresent"
        id="charactersPresent"
        multiple
        onChange={handleCharactersChange}
        value={updatedPlace.charactersPresent}
      >
        {characters.map((character) => (
          <option key={character._id} value={character._id}>
            {character.name}
          </option>
        ))}
      </select>
      <label htmlFor="campaigns">Campaigns:</label>
      <select
        name="campaigns"
        id="campaigns"
        multiple
        onChange={handleCampaignChange}
        value={updatedPlace.campaigns}
      >
        {campaigns.map((campaign) => (
          <option key={campaign._id} value={campaign._id}>
            {campaign.name}
          </option>
        ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default EditPlace;
