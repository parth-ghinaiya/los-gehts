/* Sign-in form: posts the passphrase, then opens the app. The server answers with an
   HttpOnly session cookie, so the passphrase is never stored by this page. */
(function () {
  'use strict';

  const form = document.getElementById('form');
  const input = document.getElementById('passphrase');
  const button = document.getElementById('submit');
  const message = document.getElementById('message');

  const waitText = (seconds) => {
    const minutes = Math.ceil(seconds / 60);
    return 'Too many attempts. Try again in ' + minutes + (minutes === 1 ? ' minute.' : ' minutes.');
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const passphrase = input.value;
    if (!passphrase) { message.textContent = 'Enter your passphrase.'; input.focus(); return; }

    button.disabled = true;
    message.textContent = '';
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passphrase }),
        cache: 'no-store',
      });
      if (response.ok) { location.replace('/'); return; }

      if (response.status === 401) {
        message.textContent = 'Wrong passphrase.';
      } else if (response.status === 429) {
        const body = await response.json().catch(() => ({}));
        message.textContent = waitText(Number(body.retryAfter) || 900);
      } else {
        message.textContent = 'Sign-in is not available right now. Try again later.';
      }
    } catch (error) {
      message.textContent = 'Could not reach the server. Check your connection.';
    }
    button.disabled = false;
    input.select();
  });
})();
