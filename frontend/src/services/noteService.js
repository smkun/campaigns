//service/noteService.js
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/notes`;

const handleResponse = async (res) => {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
  }
  return res.json();
};

const indexNotes = async () => {
  try {
    const res = await fetch(BASE_URL);
    return handleResponse(res);
  } catch (err) {
    console.error('Error fetching notes:', err);
  }
};

const createNote = async (note) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    return handleResponse(res);
  } catch (err) {
    console.error('Error creating note:', err);
  }
};

const updateNote = async (note, noteId) => {
  try {
    const res = await fetch(`${BASE_URL}/${noteId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    return handleResponse(res);
  } catch (err) {
    console.error('Error updating note:', err);
  }
};

const deleteNote = async (noteId) => {
  try {
    const res = await fetch(`${BASE_URL}/${noteId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(res);
  } catch (err) {
    console.error('Error deleting note:', err);
  }
};

export { indexNotes, createNote, updateNote, deleteNote };
