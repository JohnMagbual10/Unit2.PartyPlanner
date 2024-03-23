const COHORT = "REPLACE_ME!";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/artists`;

const state = {
  artists: [],
};

const artistList = document.querySelector("#artists");

const addArtistForm = document.querySelector("#addArtist");
addArtistForm.addEventListener("submit", addArtist);

/**
 * Sync state with the API and rerender
 */
async function render() {
  await getArtists();
  renderArtists();
}
render();

/**
 * Update state with artists from API
 */
async function getArtists() {
  // TODO
  async function getArtists() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch artists');
        }
        const data = await response.json();
        state.artists = data;
    } catch (error) {
        console.error('Error fetching artists:', error);
    }
}

}

/**
 * Render artists from state
 */
function renderArtists() {
  // TODO
  function renderArtists() {
    artistList.innerHTML = ''; // Clear the artist list
    state.artists.forEach(artist => {
        const li = document.createElement('li');
        li.textContent = artist.name;
        artistList.appendChild(li);
    });
}

}

/**
 * Ask the API to create a new artist based on form data
 * @param {Event} event
 */
async function addArtist(event) {
  event.preventDefault();

  // TODO
  try {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: artistName })
    });
    if (!response.ok) {
        throw new Error('Failed to add artist');
    }
    // Refresh the artist list after adding the new artist
    render();
} catch (error) {
    console.error('Error adding artist:', error);
}
}

