const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/characters`;

const indexCharacters = async () => {
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

const createCharacter = async (character) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(character),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}, message: ${await res.text()}`);
    }
    return res.json();
  } catch (err) {
    console.error(err);
  }
};

const updateCharacter = async (character, characterId) => {
  try {
    const res = await fetch(`${BASE_URL}/${characterId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(character),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}, message: ${await res.text()}`);
    }
    return res.json();
  } catch (err) {
    console.error(err);
  }
};

const deleteCharacter = async (characterId) => {
  try {
    const res = await fetch(`${BASE_URL}/${characterId}`, {
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

export { indexCharacters, createCharacter, updateCharacter, deleteCharacter };
