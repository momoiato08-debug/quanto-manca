
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

// Start the loop
updateCountdowns(); // Initial run
setInterval(updateCountdowns, 1000);
