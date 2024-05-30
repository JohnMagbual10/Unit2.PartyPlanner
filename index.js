const COHORT = "2401-ftb-mt-web-pt";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  events: [],
};

const eventList = document.getElementById("events");
const addEventForm = document.getElementById("addEvent");

addEventForm.addEventListener("submit", addEvent);

async function render() {
  await getEvents();
  renderEvents();
}
render();

async function getEvents() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    if (json.success) {
      state.events = json.data;
    } else {
      throw new Error(json.error.message);
    }
  } catch (error) {
    console.error('Error fetching events:', error.message);
  }
}

function renderEvents() {
  eventList.innerHTML = '';
  state.events.forEach(event => {
    const card = document.createElement('div');
    const name = document.createElement('h2');
    const description = document.createElement('p');
    const date = document.createElement('p');
    const location = document.createElement('p');
    const deleteButton = document.createElement('button');

    name.textContent = event.name;
    description.textContent = event.description;
    date.textContent = event.date;
    location.textContent = event.location;
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.dataset.id = event.id;

    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(date);
    card.appendChild(location);
    card.appendChild(deleteButton);

    eventList.appendChild(card);
  });
}

async function addEvent(event) {
  event.preventDefault();

  const formData = new FormData(addEventForm);
  const name = formData.get('name');
  const description = formData.get('description');
  const rawDate = formData.get('date');
  const date = new Date(rawDate).toISOString(); // Convert date to ISO-8601 format
  const location = formData.get('location');

  const newEvent = { name, description, date, location };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEvent)
    });

    const json = await response.json();
    if (!json.success) {
      throw new Error(json.error.message);
    }

    await render();
  } catch (error) {
    console.error('Error adding event:', error.message);
  }
}

eventList.addEventListener('click', async (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const eventId = event.target.dataset.id;
    try {
      const response = await fetch(`${API_URL}/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted event from the state
        state.events = state.events.filter(event => event.id !== eventId);
        // Render the updated event list
        renderEvents();
      } else {
        // Log the error details if DELETE request fails
        const errorData = await response.json();
        console.error('Failed to delete event:', errorData.error.message);
      }
    } catch (error) {
      console.error('Error deleting event:', error.message);
    }
  }
});
