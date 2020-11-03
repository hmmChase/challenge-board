import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Label from '../../../reuseable/Label/Label';
import Title from '../../../reuseable/Title/Title';
import Desc from '../../../reuseable/Desc/Desc';
import ProjectNew from '../ProjectNew/ProjectNew';
import { formatDate, timestamp } from '../../../../utils/dateTime';
import * as sc from './SubmissionSubmit.style';

const SubmissionSubmit = props => {
  const [submittedDate, setSubmittedDate] = useState('');

  return (
    <sc.Container className={props.className}>
      <Label>SUBMISSION</Label>

      <Title>Submit Your Project</Title>

      <Desc>When you're ready, submit your Github link here for review.</Desc>

      <sc.Row>
        <ProjectNew setSubmittedDate={setSubmittedDate} />

        {submittedDate && (
          <sc.SubmittedText>{`Project submitted at ${timestamp(
            submittedDate
          )} on ${formatDate(submittedDate)}`}</sc.SubmittedText>
        )}
      </sc.Row>
    </sc.Container>
  );
};

SubmissionSubmit.propTypes = {
  className: PropTypes.string
};

export default SubmissionSubmit;