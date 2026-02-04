function updateCountdowns() {
  const now = Date.now();

  // Helper to update elements
  const updateElements = (container, days, hours, minutes, seconds) => {
    const elDays = container.querySelector('.days');
    const elHours = container.querySelector('.hours');
    const elMinutes = container.querySelector('.minutes');
    const elSeconds = container.querySelector('.seconds');

    if (elDays) elDays.textContent = String(days).padStart(2, '0');
    if (elHours) elHours.textContent = String(hours).padStart(2, '0');
    if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
    if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');
  };

  // Process Countdowns
  document.querySelectorAll('[data-countdown]').forEach(el => {
    const targetDate = new Date(el.dataset.countdown).getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      updateElements(el, 0, 0, 0, 0);
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff / 3600000) % 24);
    const minutes = Math.floor((diff / 60000) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    updateElements(el, days, hours, minutes, seconds);
  });

  // Process Countups
  document.querySelectorAll('[data-countup]').forEach(el => {
    const startDate = new Date(el.dataset.countup).getTime();
    let diff = now - startDate;

    if (diff < 0) diff = 0;

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff / 3600000) % 24);
    const minutes = Math.floor((diff / 60000) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    updateElements(el, days, hours, minutes, seconds);
  });
}

function renderMyCountdowns() {
  const container = document.getElementById('my-countdowns');
  if (!container) return;

  const saved = JSON.parse(localStorage.getItem('myCountdowns') || '[]');
  
  if (saved.length === 0) {
    container.innerHTML = `
      <div class="countdown-card empty-state">
        <span class="empty-emoji">✨</span>
        <p>Non hai ancora creato nessun countdown.</p>
        <a href="/crea.html" class="btn btn-primary" style="margin-top:10px;">Crea il primo</a>
      </div>`;
    return;
  }

  container.innerHTML = saved.map(item => `
    <div class="countdown-card">
      <div class="card-actions">
        <button class="btn-icon delete-btn" data-id="${item.id}" aria-label="Elimina">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
          </svg>
        </button>
      </div>
      <h2>${item.title}</h2>
      <div class="time" data-countdown="${item.date}">
        <span class="days">00</span> giorni
        <span class="hours">00</span> ore
        <span class="minutes">00</span> min
        <span class="seconds">00</span> sec
      </div>
    </div>
  `).join('');

  // Re-attach listeners for delete buttons
  container.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.dataset.id;
      const newSaved = saved.filter(x => x.id !== id);
      localStorage.setItem('myCountdowns', JSON.stringify(newSaved));
      renderMyCountdowns(); // Re-render
    });
  });

  // Force update immediately
  updateCountdowns();
}

function initCreateForm() {
  const form = document.getElementById('create-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = form.title.value;
    const datetime = form.datetime.value;

    if (!title || !datetime) {
      alert('Inserisci titolo e data');
      return;
    }

    const newCountdown = {
      id: Date.now().toString(),
      title: title,
      date: datetime
    };

    const saved = JSON.parse(localStorage.getItem('myCountdowns') || '[]');
    saved.push(newCountdown);
    localStorage.setItem('myCountdowns', JSON.stringify(saved));

    // Redirect to home/my-countdowns
    window.location.href = '/index.html#miei';
  });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  renderMyCountdowns();
  initCreateForm();
  
  // Start the timer loop
  updateCountdowns();
  setInterval(updateCountdowns, 1000);
});
