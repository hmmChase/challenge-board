import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import InputLabel from '../../REUSEABLE/InputLabel/InputLabel';
import * as sc from './ResetPassRequest.style';

const ResetPassRequest = props => {
  const [email, setEmail] = useState('');

  const [issubmitted, setIsSubmitted] = useState(false);

  const handleChange = e => {
    const cleanValue = DOMPurify.sanitize(e.target.value);

    setEmail(cleanValue);
  };

  return (
    <sc.Form>
      <sc.Back onClick={props.toggleShowPassReset}>{'< Back'}</sc.Back>

      <sc.Heading>
        <sc.HRule />

        <sc.HeadingTitle3>Reset Password</sc.HeadingTitle3>

        <sc.HRule />
      </sc.Heading>

      <InputLabel htmlFor='email'>Email</InputLabel>

      <sc.Inputt required type='email' value={email} onChange={handleChange} />

      <sc.BtnReqPasss email={email} setIsSubmitted={setIsSubmitted} />

      {issubmitted && <p>Check your email for a password reset link.</p>}
    </sc.Form>
  );
};

export default ResetPassRequest;
