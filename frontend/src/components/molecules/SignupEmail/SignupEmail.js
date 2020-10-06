import React, { useState, useContext } from 'react';
import DOMPurify from 'dompurify';
import { CurrentUser } from '../../../context/contexts';
import { useSignup } from '../../../api/userApi';
import * as sc from './SignupEmail.style';

const SignupEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { setCurrentUser } = useContext(CurrentUser);

  const [signup] = useSignup({ onSuccess: data => setCurrentUser(data.data) });

  const handleChange = e => {
    const cleanValue = DOMPurify.sanitize(e.target.value);

    if (e.target.id === 'username') setUsername(cleanValue);

    if (e.target.id === 'email') setEmail(cleanValue);

    if (e.target.id === 'password') setPassword(cleanValue);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    await signup({ username, email, password });
  };

  return (
    <sc.Form onSubmit={handleSubmit}>
      <sc.Label>
        Username:
        <sc.Input
          required
          id='username'
          type='text'
          value={username}
          placeholder='Username'
          onChange={handleChange}
        />
      </sc.Label>

      <sc.Label>
        Email:
        <sc.Input
          required
          id='email'
          type='email'
          value={email}
          placeholder='Email'
          onChange={handleChange}
        />
      </sc.Label>

      <sc.Label>
        Password:
        <sc.Input
          required
          id='password'
          minLength='8'
          type='password'
          value={password}
          placeholder='Password'
          onChange={handleChange}
        />
      </sc.Label>

      <sc.Buttonn type='submit'>Sign Up</sc.Buttonn>
    </sc.Form>
  );
};

export default SignupEmail;
