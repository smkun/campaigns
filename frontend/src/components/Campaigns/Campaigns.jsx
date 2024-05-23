import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as campaignService from '../../services/campaignService';

function Campaigns({ campaignList, setCampaignList, setSelectedCampaign }) {

  useEffect(() => {
    async function fetchCampaigns() {
      const campaigns = await campaignService.indexCampaigns();
      setCampaignList(campaigns);
    }
    fetchCampaigns();
  }, [setCampaignList]);

  const handleEditClick = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleDelete = async (id) => {
    await campaignService.deleteCampaign(id);
    const updatedCampaigns = await campaignService.indexCampaigns();
    setCampaignList(updatedCampaigns);
  };

  return (
    <div>
      <h2>Campaigns</h2>
      <Link to="/createCampaign">Create New Campaign</Link>
      <ul>
        {campaignList && campaignList.length > 0 ? (
          campaignList.map((campaign) => (
            <li key={campaign._id}>
              {campaign.name} ({campaign.system})
              <Link to="/editCampaign">
                <button onClick={() => handleEditClick(campaign)}>Edit</button>
              </Link>
              <button onClick={() => handleDelete(campaign._id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No campaigns available</li>
        )}
      </ul>
    </div>
  );
}

export default Campaigns;
