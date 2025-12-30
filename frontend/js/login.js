const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (res.ok) {
      // Save token in localStorage
      localStorage.setItem('token', data.token);
      // Redirect to products page
      window.location.href = 'products.html';
    } else {
      alert(data.msg || 'Login failed');
    }
  } catch (err) {
    console.error(err);
    alert('Server error');
  }
});
