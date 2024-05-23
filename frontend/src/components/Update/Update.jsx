//component/Update/Update.jsx
import React, { useState, useEffect } from 'react';

function Update({ handleUpdateCampaign, selectedCampaign }) {
  const [campaign, setCampaign] = useState(selectedCampaign);

  useEffect(() => {
    setCampaign(selectedCampaign);
  }, [selectedCampaign]);

  const handleChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateCampaign(campaign);
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
        <button type="submit">Update</button>
      </form>
    </>
  );
}

export default Update;
