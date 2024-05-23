import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditCampaign({ campaign, handleUpdate, characters, places }) {
    const [updatedCampaign, setUpdatedCampaign] = useState(campaign);
    const navigate = useNavigate();

    useEffect(() => {
        if (campaign) {
            setUpdatedCampaign({
                ...campaign,
                characters: campaign.characters.map((charId) =>
                    characters.find((char) => char._id === charId)
                ),
                places: campaign.places.map((placeId) =>
                    places.find((place) => place._id === placeId)
                ),
            });
        }
    }, [campaign, characters, places]);

    const handleChange = (e) => {
        setUpdatedCampaign({
            ...updatedCampaign,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddCharacter = (e) => {
        const selectedCharacter = characters.find(
            (char) => char._id === e.target.value
        );
        setUpdatedCampaign({
            ...updatedCampaign,
            characters: [...updatedCampaign.characters, selectedCharacter],
        });
    };

    const handleRemoveCharacter = (id) => {
        setUpdatedCampaign({
            ...updatedCampaign,
            characters: updatedCampaign.characters.filter(
                (char) => char._id !== id
            ),
        });
    };

    const handleAddPlace = (e) => {
        const selectedPlace = places.find(
            (place) => place._id === e.target.value
        );
        setUpdatedCampaign({
            ...updatedCampaign,
            places: [...updatedCampaign.places, selectedPlace],
        });
    };

    const handleRemovePlace = (id) => {
        setUpdatedCampaign({
            ...updatedCampaign,
            places: updatedCampaign.places.filter((place) => place._id !== id),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedCampaignData = {
            ...updatedCampaign,
            characters: updatedCampaign.characters.map((char) => char._id),
            places: updatedCampaign.places.map((place) => place._id),
        };
        await handleUpdate(updatedCampaignData);
        navigate("/campaigns");
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
                    value={updatedCampaign.name}
                />
                <label htmlFor="system">Campaign System:</label>
                <input
                    type="text"
                    name="system"
                    id="system"
                    onChange={handleChange}
                    value={updatedCampaign.system}
                />

                <div>
                    <h3>Characters</h3>
                    <select
                        onChange={handleAddCharacter}
                        defaultValue="">
                        <option
                            value=""
                            disabled>
                            Select a character
                        </option>
                        {characters.map((char) => (
                            <option
                                key={char._id}
                                value={char._id}>
                                {char.name}
                            </option>
                        ))}
                    </select>
                    <ul>
                        {updatedCampaign.characters.map((char) => (
                            <li key={char._id}>
                                {char.name}
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleRemoveCharacter(char._id)
                                    }>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3>Places</h3>
                    <select
                        onChange={handleAddPlace}
                        defaultValue="">
                        <option
                            value=""
                            disabled>
                            Select a place
                        </option>
                        {places.map((place) => (
                            <option
                                key={place._id}
                                value={place._id}>
                                {place.name}
                            </option>
                        ))}
                    </select>
                    <ul>
                        {updatedCampaign.places.map((place) => (
                            <li key={place._id}>
                                {place.name}
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleRemovePlace(place._id)
                                    }>
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

export default EditCampaign;
