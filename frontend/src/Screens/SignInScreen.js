import React, { useState } from 'react';

// Simple demo account storage using localStorage.
// Users are stored as an array under the key 'vegmazon_users'.
function SignInScreen(props) {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const USERS_KEY = 'vegmazon_users';

  const getStoredUsers = () => {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  };

  const saveUsers = (users) => {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (e) {
      // ignore storage errors in demo
    }
  };

  const redirectUrl = new URLSearchParams(props.location?.search).get('redirect') || '/';

  const submitHandler = (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (isCreatingAccount && !name) {
      setError('Please enter your name to create an account.');
      return;
    }
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    const users = getStoredUsers();

    if (isCreatingAccount) {
      // check if email already registered
      const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        setError('An account with this email already exists. Please sign in.');
        return;
      }

      const newUser = { name: name.trim(), email: email.trim().toLowerCase(), password };
      const updated = [...users, newUser];
      saveUsers(updated);
      setSuccess('Account created and signed in.');
      if (props.onSignIn) props.onSignIn({ name: newUser.name });
      if (props.history && props.history.push) props.history.push(redirectUrl);
      return;
    }

    // Sign-in flow: require matching email & password
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      setError('No account found with this email. You can create one.');
      return;
    }
    if (found.password !== password) {
      setError('Incorrect password.');
      return;
    }

    // success
    if (props.onSignIn) props.onSignIn({ name: found.name });
    if (props.history && props.history.push) props.history.push(redirectUrl);
  };

  const toggleMode = () => {
    setIsCreatingAccount((current) => !current);
    setError('');
    setSuccess('');
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        <h1>{isCreatingAccount ? 'Create Account' : 'Sign In'}</h1>
        <p>
          {isCreatingAccount
            ? 'Create your account with any email and password for this demo.'
            : 'Use your registered email and password to sign in.'}
        </p>
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
        <form onSubmit={submitHandler} className="signin-form">
          {isCreatingAccount && (
            <label>
              Full Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </label>
          )}
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </label>
          <button className="primary-button" type="submit">
            {isCreatingAccount ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        <div className="signin-toggle">
          {isCreatingAccount ? (
            <>
              Already have an account?{' '}
              <button type="button" className="link-button" onClick={toggleMode}>
                Sign In
              </button>
            </>
          ) : (
            <>
              New to Vegmazon?{' '}
              <button type="button" className="link-button" onClick={toggleMode}>
                Create Account
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignInScreen;
