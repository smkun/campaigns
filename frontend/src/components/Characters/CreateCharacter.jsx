import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as campaignService from '../../services/campaignService';

function CreateCharacter({ handleCreate }) {
  const [campaigns, setCampaigns] = useState([]);
  const [character, setCharacter] = useState({
    player: '',
    name: '',
    class: '',
    race: '',
    pronoun: '',
    level: 1,
    campaigns: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCampaigns() {
      const campaigns = await campaignService.indexCampaigns();
      setCampaigns(campaigns);
    }
    fetchCampaigns();
  }, []);

  const handleChange = (e) => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  const handleCampaignChange = (e) => {
    const selectedCampaigns = Array.from(e.target.selectedOptions, option => option.value);
    setCharacter({ ...character, campaigns: selectedCampaigns });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreate(character);
    navigate('/characters'); // Redirect to characters page after creation
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="player">Player:</label>
      <input
        type="text"
        name="player"
        id="player"
        onChange={handleChange}
        value={character.player}
        required
      />
      <label htmlFor="name">Character Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={handleChange}
        value={character.name}
        required
      />
      <label htmlFor="class">Class:</label>
      <input
        type="text"
        name="class"
        id="class"
        onChange={handleChange}
        value={character.class}
        required
      />
      <label htmlFor="race">Race:</label>
      <input
        type="text"
        name="race"
        id="race"
        onChange={handleChange}
        value={character.race}
        required
      />
      <label htmlFor="pronoun">Pronoun:</label>
      <input
        type="text"
        name="pronoun"
        id="pronoun"
        onChange={handleChange}
        value={character.pronoun}
        required
      />
      <label htmlFor="level">Level:</label>
      <input
        type="number"
        name="level"
        id="level"
        onChange={handleChange}
        value={character.level}
        min="1"
        required
      />
      <label htmlFor="campaigns">Campaigns:</label>
      <select
        name="campaigns"
        id="campaigns"
        multiple
        onChange={handleCampaignChange}
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

export default CreateCharacter;
