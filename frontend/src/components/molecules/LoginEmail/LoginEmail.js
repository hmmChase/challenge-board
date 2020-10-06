import React, { useState, useContext } from 'react';
import DOMPurify from 'dompurify';
import { CurrentUser } from '../../../context/contexts';
import { useLoginEmail } from '../../../api/userApi';
import * as sc from './LoginEmail.style';

const LoginEmail = () => {
  const [email, setEmail] = useState('student1@email.com');
  const [password, setPassword] = useState('student1');
  const { setCurrentUser } = useContext(CurrentUser);

  const [loginEmail] = useLoginEmail({
    onSuccess: data => setCurrentUser(data.data)
  });

  const handleChange = e => {
    const cleanValue = DOMPurify.sanitize(e.target.value);

    if (e.target.id === 'email') setEmail(cleanValue);

    if (e.target.id === 'password') setPassword(cleanValue);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await loginEmail({ email, password });
    } catch (error) {
      // console.log('LoginEmail error: ', error);
    }
  };

  return (
    <sc.Form onSubmit={handleSubmit}>
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
          type='password'
          value={password}
          placeholder='Password'
          onChange={handleChange}
        />
      </sc.Label>

      {/* {error && error.error && <p>{error.error}</p>} */}

      <sc.Buttonn type='submit'>Log in</sc.Buttonn>
    </sc.Form>
  );
};

export default LoginEmail;
