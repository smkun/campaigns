import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as campaignService from './services/campaignService';
import * as characterService from './services/characterService';
import * as placeService from './services/placeService';
import NavBar from "./components/NavBar/NavBar";
import Home from './components/Home/Home';
import Campaigns from './components/Campaigns/Campaigns';
import CreateCampaign from './components/Campaigns/CreateCampaign';
import EditCampaign from './components/Campaigns/EditCampaign';
import CreateCharacter from './components/Characters/CreateCharacter';
import Characters from './components/Characters/Characters';
import EditCharacter from './components/Characters/EditCharacter';
import CreatePlace from './components/Places/CreatePlace';
import Places from './components/Places/Places';
import EditPlace from './components/Places/EditPlace';
import Dice from './components/Dice/Dice';
import Notes from './components/Notes/Notes';
import './App.css';

function App() {
  const [campaignList, setCampaignList] = useState([]);
  const [characterList, setCharacterList] = useState([]);
  const [placeList, setPlaceList] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const getAllCampaigns = async () => {
    try {
      const allCampaigns = await campaignService.indexCampaigns();
      setCampaignList(allCampaigns);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllCharacters = async () => {
    try {
      const allCharacters = await characterService.indexCharacters();
      setCharacterList(allCharacters);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllPlaces = async () => {
    try {
      const allPlaces = await placeService.indexPlaces();
      setPlaceList(allPlaces);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCampaigns();
    getAllCharacters();
    getAllPlaces();
  }, []);

  const handleCreateCharacter = async (character) => {
    await characterService.createCharacter(character);
    getAllCharacters();
  };

  const handleCreatePlace = async (place) => {
    await placeService.createPlace(place);
    getAllPlaces();
  };

  const handleCreateCampaign = async (campaign) => {
    await campaignService.createCampaign(campaign);
    getAllCampaigns();
  };

  const handleUpdateCharacter = async (character) => {
    await characterService.updateCharacter(character, character._id);
    getAllCharacters();
  };

  const handleUpdatePlace = async (place) => {
    await placeService.updatePlace(place, place._id);
    getAllPlaces();
  };

  const handleUpdateCampaign = async (campaign) => {
    await campaignService.updateCampaign(campaign, campaign._id);
    getAllCampaigns();
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaigns" element={<Campaigns campaignList={campaignList} setCampaignList={setCampaignList} setSelectedCampaign={setSelectedCampaign} />} />
        <Route path="/createCampaign" element={<CreateCampaign handleCreate={handleCreateCampaign} characters={characterList} places={placeList} />} />
        <Route path="/editCampaign" element={<EditCampaign campaign={selectedCampaign} handleUpdate={handleUpdateCampaign} characters={characterList} places={placeList} />} />
        <Route path="/createCharacter" element={<CreateCharacter handleCreate={handleCreateCharacter} />} />
        <Route path="/characters" element={<Characters characters={characterList} setCharacters={setCharacterList} setSelectedCharacter={setSelectedCharacter} />} />
        <Route path="/editCharacter" element={<EditCharacter character={selectedCharacter} handleUpdate={handleUpdateCharacter} />} />
        <Route path="/createPlace" element={<CreatePlace handleCreate={handleCreatePlace} />} />
        <Route path="/places" element={<Places places={placeList} setPlaces={setPlaceList} setSelectedPlace={setSelectedPlace} />} />
        <Route path="/editPlace" element={<EditPlace place={selectedPlace} handleUpdate={handleUpdatePlace} />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/dice" element={<Dice />} />
        
      </Routes>
    </Router>
  );
}

export default App;
