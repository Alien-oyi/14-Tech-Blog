const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#usersignup').value.trim();
  const email = document.querySelector('#emailsignup').value.trim();
  const password = document.querySelector('#passwordsignup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert('Failed to sign up.');
    }
  }
};



document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);