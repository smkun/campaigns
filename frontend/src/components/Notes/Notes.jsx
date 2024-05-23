//component/Notes/Notes.jsx
import React, { useState, useEffect } from "react";
import * as noteService from "../../services/noteService";
import * as campaignService from "../../services/campaignService";

function Notes() {
    const [notes, setNotes] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [places, setPlaces] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState("");
    const [newNote, setNewNote] = useState({
        name: "",
        campaign: "",
        characters: [],
        places: [],
        content: "",
    });

    useEffect(() => {
        const fetchNotes = async () => {
            const allNotes = await noteService.indexNotes();
            setNotes(allNotes);
        };

        const fetchCampaigns = async () => {
            const allCampaigns = await campaignService.indexCampaigns();
            setCampaigns(allCampaigns);
        };

        fetchNotes();
        fetchCampaigns();
    }, []);

    useEffect(() => {
        if (selectedCampaign) {
            const fetchCharactersAndPlaces = async () => {
                const allCharacters = await campaignService.indexCharacters();
                const allPlaces = await campaignService.indexPlaces();
                setCharacters(
                    allCharacters.filter(
                        (character) => character.campaign === selectedCampaign
                    )
                );
                setPlaces(
                    allPlaces.filter(
                        (place) => place.campaign === selectedCampaign
                    )
                );
            };

            fetchCharactersAndPlaces();
        }
    }, [selectedCampaign]);

    const handleChange = (e) => {
        setNewNote({
            ...newNote,
            [e.target.name]: e.target.value,
        });
    };

    const handleCampaignChange = (e) => {
        const campaignId = e.target.value;
        setSelectedCampaign(campaignId);
        setNewNote({
            ...newNote,
            campaign: campaignId,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await noteService.createNote(newNote);
        const allNotes = await noteService.indexNotes();
        setNotes(allNotes);
        setNewNote({
            name: "",
            campaign: "",
            characters: [],
            places: [],
            content: "",
        });
    };

    const handleCharacterSelect = (e) => {
        const selectedCharacters = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setNewNote({
            ...newNote,
            characters: selectedCharacters,
        });
    };

    const handlePlaceSelect = (e) => {
        const selectedPlaces = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setNewNote({
            ...newNote,
            places: selectedPlaces,
        });
    };

    return (
        <div>
            <h2>Notes</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={newNote.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Campaign:
                    <select
                        name="campaign"
                        value={newNote.campaign}
                        onChange={handleCampaignChange}
                        required>
                        <option value="">Select a campaign</option>
                        {campaigns.map((campaign) => (
                            <option
                                key={campaign._id}
                                value={campaign._id}>
                                {campaign.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Characters:
                    <select
                        name="characters"
                        value={newNote.characters}
                        onChange={handleCharacterSelect}
                        multiple>
                        {characters.map((character) => (
                            <option
                                key={character._id}
                                value={character._id}>
                                {character.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Places:
                    <select
                        name="places"
                        value={newNote.places}
                        onChange={handlePlaceSelect}
                        multiple>
                        {places.map((place) => (
                            <option
                                key={place._id}
                                value={place._id}>
                                {place.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Content:
                    <textarea
                        name="content"
                        value={newNote.content}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Save Note</button>
            </form>
            <h3>All Notes</h3>
            <ul>
                {notes.map((note) => (
                    <li key={note._id}>
                        <h4>{note.name}</h4>
                        <p>{note.content}</p>
                        <p>
                            <strong>Campaign:</strong>{" "}
                            {note.campaign ? note.campaign.name : ""}
                        </p>
                        <p>
                            <strong>Characters:</strong>{" "}
                            {note.characters
                                ? note.characters
                                      .map((character) => character.name)
                                      .join(", ")
                                : ""}
                        </p>
                        <p>
                            <strong>Places:</strong>{" "}
                            {note.places
                                ? note.places
                                      .map((place) => place.name)
                                      .join(", ")
                                : ""}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Notes;
