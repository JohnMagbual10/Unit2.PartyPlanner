document.addEventListener('DOMContentLoaded', function () {
  const partyForm = document.getElementById('partyForm');
  const partyList = document.getElementById('partyList');

  // Load parties from local storage on page load
  let parties = JSON.parse(localStorage.getItem('parties')) || [];

  // Render parties
  function renderParties() {
    partyList.innerHTML = '';
    parties.forEach((party, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span>${party.name} - ${party.date} ${party.time} at ${party.location}</span>
        <button data-index="${index}">Delete</button>
        <p>${party.description}</p>
      `;
      partyList.appendChild(listItem);
    });
  }

  // Render initial parties
  renderParties();

  // Add party
  partyForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = partyForm.querySelector('#name').value;
    const date = partyForm.querySelector('#date').value;
    const time = partyForm.querySelector('#time').value;
    const location = partyForm.querySelector('#location').value;
    const description = partyForm.querySelector('#description').value;
    const newParty = { name, date, time, location, description };
    parties.push(newParty);
    localStorage.setItem('parties', JSON.stringify(parties));
    renderParties();
    partyForm.reset();
  });

  // Delete party
  partyList.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
      const index = event.target.dataset.index;
      parties.splice(index, 1);
      localStorage.setItem('parties', JSON.stringify(parties));
      renderParties();
    }
  });
});
