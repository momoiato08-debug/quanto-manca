import { register, login, onAuthChange, signInWithGoogle } from "./auth.js";

document.addEventListener('DOMContentLoaded', () => {
  console.log('[main.js] DOMContentLoaded');
  const btnRegister = document.getElementById('btnRegister');
  const btnLogin = document.getElementById('btnLogin');
  const emailEl = document.getElementById('email');
  const passwordEl = document.getElementById('password');
  const status = document.getElementById('status');

  if (!emailEl || !passwordEl) {
    console.error('[main.js] email or password input not found', { emailEl, passwordEl });
  }

  const setStatus = (txt) => { 
    console.log('[main.js] status ->', txt);
    if(status) status.textContent = txt; 
  };

  if (btnRegister) btnRegister.addEventListener('click', async () => {
    const email = emailEl.value;
    const password = passwordEl.value;
    console.log('[main.js] register click', { email });
    setStatus('Registrazione in corso...');
    try {
      const res = await register(email, password);
      if (res && res.user) {
        setStatus('Registrato: ' + (res.user.email || res.user.uid));
        console.log('[main.js] register success', res.user);
  const sanitizeNext = (n) => {
    if (!n) return 'index.html';
    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(n) || n.startsWith('//')) return 'index.html';
  const allowed = ['index.html','crea.html','accedi.html','quanto-manca-alle-vacanze.html','quanto-manca-a-natale.html','quanto-manca-a-pasqua.html','quanto-manca-ad-halloween.html'];
    let clean = n.replace(/^\//, '');
    clean = clean.split('?')[0].split('#')[0];
    if (allowed.includes(clean)) return n;
    return 'index.html';
  };
  const params = new URLSearchParams(window.location.search);
  const nextRaw = params.get('next') || 'index.html';
  const next = sanitizeNext(nextRaw);
  setTimeout(() => { location.href = next; }, 700);
      } else if (res && res.error) {
        setStatus('Registrazione fallita: ' + (res.error.message || 'Errore'));
        console.error('[main.js] register error', res.error);
      } else {
        setStatus('Registrazione fallita. Controlla console.');
        console.error('[main.js] register unknown result', res);
      }
    } catch (err) {
      setStatus('Registrazione fallita: ' + (err.message || 'Errore'));
      console.error('[main.js] register exception', err);
    }
  });

  if (btnLogin) btnLogin.addEventListener('click', async () => {
    const email = emailEl.value;
    const password = passwordEl.value;
    console.log('[main.js] login click', { email });
    setStatus('Accesso in corso...');
    try {
      const res = await login(email, password);
      if (res && res.user) {
        setStatus('Loggato: ' + (res.user.email || res.user.uid));
        console.log('[main.js] login success', res.user);
  const params = new URLSearchParams(window.location.search);
  const nextRaw = params.get('next') || 'index.html';
  const next = (typeof sanitizeNext === 'function') ? sanitizeNext(nextRaw) : (nextRaw || 'index.html');
  setTimeout(() => { location.href = next; }, 700);
      } else if (res && res.error) {
        setStatus('Login fallito: ' + (res.error.message || 'Errore'));
        console.error('[main.js] login error', res.error);
      } else {
        setStatus('Login fallito. Controlla console.');
        console.error('[main.js] login unknown result', res);
      }
    } catch (err) {
      setStatus('Login fallito: ' + (err.message || 'Errore'));
      console.error('[main.js] login exception', err);
    }
  });

  const btnGoogle = document.getElementById('btnGoogle');
  if (btnGoogle) btnGoogle.addEventListener('click', async () => {
    console.log('[main.js] google sign-in click');
    setStatus('Accesso con Google...');
    try {
      const res = await signInWithGoogle();
      if (res && res.user) {
        setStatus('Loggato: ' + (res.user.email || res.user.uid));
        console.log('[main.js] google login success', res.user);
  // sanitize redirect target to avoid open-redirects (see above)
  const params = new URLSearchParams(window.location.search);
  const nextRaw = params.get('next') || 'index.html';
  const next = (typeof sanitizeNext === 'function') ? sanitizeNext(nextRaw) : (nextRaw || 'index.html');
  setTimeout(() => { location.href = next; }, 700);
      } else if (res && res.error) {
        setStatus('Login Google fallito: ' + (res.error.message || 'Errore'));
        console.error('[main.js] google login error', res.error);
      }
    } catch (err) {
      setStatus('Login Google error: ' + (err.message || 'Errore'));
      console.error('[main.js] google exception', err);
    }
  });

  onAuthChange(user => {
    if (user) {
      setStatus('Utente attivo: ' + (user.email || user.uid));
      console.log('[main.js] onAuthChange -> logged in', user);
    }
    else {
      setStatus('Nessun utente loggato');
      console.log('[main.js] onAuthChange -> no user');
    }
  });
});
