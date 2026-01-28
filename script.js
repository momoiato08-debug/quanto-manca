function countdown(targetDate, ids) {
  const elDays = document.getElementById(ids.days);
  const elHours = document.getElementById(ids.hours);
  const elMinutes = document.getElementById(ids.minutes);
  const elSeconds = document.getElementById(ids.seconds);

  if (!elDays || !elHours || !elMinutes || !elSeconds) return;

  const setAll = (d, h, m, s) => {
    elDays.textContent = String(d).padStart(2, '0');
    elHours.textContent = String(h).padStart(2, '0');
    elMinutes.textContent = String(m).padStart(2, '0');
    elSeconds.textContent = String(s).padStart(2, '0');
  };

  let timer;
  function update() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      clearInterval(timer);
      setAll(0, 0, 0, 0);
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff / 3600000) % 24);
    const minutes = Math.floor((diff / 60000) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setAll(days, hours, minutes, seconds);
  }

  update();
  timer = setInterval(update, 1000);
}
function countup(startDate, ids) {
  const elDays = document.getElementById(ids.days);
  const elHours = document.getElementById(ids.hours);
  const elMinutes = document.getElementById(ids.minutes);
  const elSeconds = document.getElementById(ids.seconds);

  if (!elDays || !elHours || !elMinutes || !elSeconds) return;

  const setAll = (d, h, m, s) => {
    elDays.textContent = String(d).padStart(2, '0');
    elHours.textContent = String(h).padStart(2, '0');
    elMinutes.textContent = String(m).padStart(2, '0');
    elSeconds.textContent = String(s).padStart(2, '0');
  };

  let timer;
  function update() {
    const now = Date.now();
    let diff = now - startDate;
    if (diff < 0) diff = 0; 

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff / 3600000) % 24);
    const minutes = Math.floor((diff / 60000) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setAll(days, hours, minutes, seconds);
  }

  update();
  timer = setInterval(update, 1000);
}

const vacanzeDate = new Date("June 15, 2026 00:00:00").getTime();
const vacanzeLastDate = new Date("June 15, 2025 00:00:00").getTime();
const nataleDate = new Date("December 25, 2026 00:00:00").getTime();
const nataleLastDate = new Date("December 25, 2025 00:00:00").getTime();
const pasquaDate = new Date("April 5, 2026 00:00:00").getTime();
const pasquaLastDate = new Date("April 20, 2025 00:00:00").getTime();
const halloweenDate = new Date("October 31, 2026 00:00:00").getTime();
const halloweenLastDate = new Date("October 31, 2025 00:00:00").getTime();

countdown(vacanzeDate, {
    days: "vacanze-days",
    hours: "vacanze-hours",
    minutes: "vacanze-minutes",
    seconds: "vacanze-seconds"
});
countup(vacanzeLastDate, {
  days: "vacanze-last-days",
  hours: "vacanze-last-hours",
  minutes: "vacanze-last-minutes",
  seconds: "vacanze-last-seconds"
});

countdown(nataleDate, {
    days: "natale-days",
    hours: "natale-hours",
    minutes: "natale-minutes",
    seconds: "natale-seconds"
});
countup(nataleLastDate, {
  days: "natale-last-days",
  hours: "natale-last-hours",
  minutes: "natale-last-minutes",
  seconds: "natale-last-seconds"
});
countdown(pasquaDate, {
  days: "pasqua-days",
  hours: "pasqua-hours",
  minutes: "pasqua-minutes",
  seconds: "pasqua-seconds"
});
countup(pasquaLastDate, {
  days: "pasqua-last-days",
  hours: "pasqua-last-hours",
  minutes: "pasqua-last-minutes",
  seconds: "pasqua-last-seconds"
});

countdown(halloweenDate, {
  days: "halloween-days",
  hours: "halloween-hours",
  minutes: "halloween-minutes",
  seconds: "halloween-seconds"
});
countup(halloweenLastDate, {
  days: "halloween-last-days",
  hours: "halloween-last-hours",
  minutes: "halloween-last-minutes",
  seconds: "halloween-last-seconds"
});
function getMyCountdowns() {
  try { return JSON.parse(localStorage.getItem('my_countdowns') || '[]'); }
  catch { return []; }
}

function saveMyCountdowns(list) {
  localStorage.setItem('my_countdowns', JSON.stringify(list));
}

function renderMyCountdowns() {
  const container = document.getElementById('my-countdowns');
  if (!container) return;

  const list = getMyCountdowns();
  container.innerHTML = '';
if (!list.length) {
  const card = document.createElement('div');
  card.className = 'countdown-card empty-state is-large';
  card.innerHTML = `
    <div class="empty-emoji" aria-hidden="true">📝</div>
    <h2>Ancora nessun countdown</h2>
    <p class="subtitle">Crea il tuo primo countdown col pulsante qui sopra.</p>
  `;
  container.appendChild(card);
  return;
}
  list.forEach((item, idx) => {
    const base = `my-${idx}`;
    const card = document.createElement('div');
    card.className = 'countdown-card is-large';

    const title = document.createElement('h2');
    title.textContent = item.title || 'Countdown';
    card.appendChild(title);

    const time = document.createElement('div');
    time.className = 'time';
    time.innerHTML = `
      <span id="${base}-days">00</span> giorni
      <span id="${base}-hours">00</span> ore
      <span id="${base}-minutes">00</span> min
      <span id="${base}-seconds">00</span> sec
    `;
    card.appendChild(time);

    const actions = document.createElement('div');
    actions.className = 'card-actions';

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'btn-icon delete-btn';
    delBtn.setAttribute('aria-label', 'Elimina countdown');
    delBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" stroke-width="2"/>
        <path d="M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`;

    delBtn.addEventListener('click', () => {
      const next = getMyCountdowns();
      next.splice(idx, 1);
      saveMyCountdowns(next);
      renderMyCountdowns();
    });

    actions.appendChild(delBtn);
    card.appendChild(actions);

    container.appendChild(card);

    countdown(item.target, {
      days: `${base}-days`,
      hours: `${base}-hours`,
      minutes: `${base}-minutes`,
      seconds: `${base}-seconds`,
    });
  });
}

function attachCreateFormHandler() {
  const form = document.getElementById('create-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = (document.getElementById('title')?.value || '').trim();
    const dtValue = document.getElementById('datetime')?.value;
    if (!title || !dtValue) return;

    const target = new Date(dtValue).getTime();
    if (isNaN(target)) return;

    const list = getMyCountdowns();

    const isLogged = (window.currentUser) ? true : false;
    if (!isLogged && list.length >= 2) {
      const go = confirm('Hai già 2 countdown salvati localmente. Per salvarne di più e sincronizzarli su più dispositivi effettua l\'accesso (Email o Google). Vuoi accedere ora?');
      if (go) {
        window.location.href = 'accedi.html?next=crea.html';
      }
      return;
    }

    list.push({ title, target });
    saveMyCountdowns(list);

    window.location.href = 'index.html#miei';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderMyCountdowns();     
  attachCreateFormHandler();  
});

