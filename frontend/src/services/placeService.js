const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/places`;

const indexPlaces = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}, message: ${await res.text()}`);
    }
    return res.json();
  } catch (err) {
    console.error(err);
  }
};

const createPlace = async (place) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(place),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}, message: ${await res.text()}`);
    }
    return res.json();
  } catch (err) {
    console.error(err);
  }
};

const updatePlace = async (place, placeId) => {
  try {
    const res = await fetch(`${BASE_URL}/${placeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(place),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}, message: ${await res.text()}`);
    }
    return res.json();
  } catch (err) {
    console.error(err);
  }
};

const deletePlace = async (placeId) => {
  try {
    const res = await fetch(`${BASE_URL}/${placeId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}, message: ${await res.text()}`);
    }
    return res.json();
  } catch (err) {
    console.error(err);
  }
};

export { indexPlaces, createPlace, updatePlace, deletePlace };
