import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as campaignService from '../../services/campaignService';

function EditCharacter({ character, handleUpdate }) {
  const [campaigns, setCampaigns] = useState([]);
  const [updatedCharacter, setUpdatedCharacter] = useState(character);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCampaigns() {
      const campaigns = await campaignService.indexCampaigns();
      setCampaigns(campaigns);
    }
    fetchCampaigns();
    setUpdatedCharacter(character);
  }, [character]);

  const handleChange = (e) => {
    setUpdatedCharacter({ ...updatedCharacter, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdate(updatedCharacter);
    navigate("/characters"); // Redirect to characters page after update
  };

  const handleCampaignChange = (e) => {
    const selectedCampaigns = Array.from(e.target.selectedOptions, option => option.value);
    setUpdatedCharacter({ ...updatedCharacter, campaigns: selectedCampaigns });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="player">Player:</label>
      <input
        type="text"
        name="player"
        id="player"
        onChange={handleChange}
        value={updatedCharacter.player}
        required
      />
      <label htmlFor="name">Character Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={handleChange}
        value={updatedCharacter.name}
        required
      />
      <label htmlFor="class">Class:</label>
      <input
        type="text"
        name="class"
        id="class"
        onChange={handleChange}
        value={updatedCharacter.class}
        required
      />
      <label htmlFor="race">Race:</label>
      <input
        type="text"
        name="race"
        id="race"
        onChange={handleChange}
        value={updatedCharacter.race}
        required
      />
      <label htmlFor="pronoun">Pronoun:</label>
      <input
        type="text"
        name="pronoun"
        id="pronoun"
        onChange={handleChange}
        value={updatedCharacter.pronoun}
        required
      />
      <label htmlFor="level">Level:</label>
      <input
        type="number"
        name="level"
        id="level"
        onChange={handleChange}
        value={updatedCharacter.level}
        min="1"
        required
      />
      <label htmlFor="campaigns">Campaigns:</label>
      <select
        name="campaigns"
        id="campaigns"
        multiple
        onChange={handleCampaignChange}
        value={updatedCharacter.campaigns}
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

export default EditCharacter;
