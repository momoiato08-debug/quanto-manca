import { onAuthChange, signOutUser } from "./auth.js";
function findAuthLink() {
  const links = Array.from(document.querySelectorAll('.navbar a'));
  return links.find(a => (a.getAttribute('href') || '').includes('accedi') || /Accedi/i.test(a.textContent));
}

function createLogoutItem() {
  const li = document.createElement('li');
  const btn = document.createElement('button');
  btn.className = 'btn btn-ghost';
  btn.id = 'btnLogout';
  btn.type = 'button';
  btn.textContent = 'Esci';
  li.appendChild(btn);
  return li;
}

function setLoggedIn(link, user) {
  if (!link) return;
  link.innerHTML = `Accesso <span class="check" aria-hidden="true">✓</span>`;
  link.setAttribute('title', (user && user.email) ? `Loggato come ${user.email}` : 'Loggato');

  const ul = link.closest('ul');
  if (!ul) return;
  if (!ul.querySelector('#btnLogout')) {
    const logoutItem = createLogoutItem();
    ul.appendChild(logoutItem);
    logoutItem.querySelector('#btnLogout').addEventListener('click', async () => {
      const res = await signOutUser();
      if (res && res.ok) {
        location.href = '/index.html';
      } else {
        console.error('Logout failed', res.error);
        alert('Errore durante il logout');
      }
    });
  }
}

function setLoggedOut(link) {
  if (!link) return;
  link.textContent = 'Accedi / Registrati';
  link.removeAttribute('title');
  const ul = link.closest('ul');
  if (!ul) return;
  const logout = ul.querySelector('#btnLogout');
  if (logout) logout.closest('li').remove();
}
document.addEventListener('DOMContentLoaded', () => {
  const authLink = findAuthLink();
  onAuthChange(user => {
    window.currentUser = user || null;
    window.authStateReady = true;
    if (user) setLoggedIn(authLink, user);
    else setLoggedOut(authLink);
  });
});
