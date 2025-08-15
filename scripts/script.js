document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form from submitting normally

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const errorMsg = document.getElementById('error-msg');

  // Simulated credentials
  const validUsername = 'admin';
  const validPassword = '123456';

  if (username === validUsername && password === validPassword) {
    errorMsg.style.color = 'green';
    errorMsg.textContent = 'Login successful! Redirecting...';

    setTimeout(() => {
      window.location.href = 'dashboard.html'; // Redirect to dashboard
    }, 1000);
  } else {
    errorMsg.style.color = 'red';
    errorMsg.textContent = 'Invalid username or password.';
  }
});