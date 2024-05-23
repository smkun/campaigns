import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as placeService from '../../services/placeService';

function Places({ places, setPlaces, setSelectedPlace }) {

  useEffect(() => {
    async function fetchPlaces() {
      const places = await placeService.indexPlaces();
      setPlaces(places);
    }
    fetchPlaces();
  }, [setPlaces]);

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
  };

  const handleDelete = async (id) => {
    await placeService.deletePlace(id);
    const updatedPlaces = await placeService.indexPlaces();
    setPlaces(updatedPlaces);
  };

  return (
    <div>
      <h2>Places</h2>
      <Link to="/createPlace">Create New Place</Link>
      <ul>
        {places.map((place) => (
          <li key={place._id}>
            {place.name} - {place.type}
            <Link to="/editPlace">
              <button onClick={() => handlePlaceClick(place)}>Edit</button>
            </Link>
            <button onClick={() => handleDelete(place._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Places;
