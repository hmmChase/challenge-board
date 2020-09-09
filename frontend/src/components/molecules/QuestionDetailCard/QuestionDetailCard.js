import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../../utils/dateTime';
import AppContext from '../../../context/app';
import DropdownEllipsis from '../DropdownQuestion/DropdownQuestion';
import * as sc from './QuestionDetailCard.style';

const QuestionDetailCard = props => {
  const { currentUser } = useContext(AppContext);

  return (
    <sc.Container>
      <sc.Row>
        <sc.Group>
          <sc.Author>{props.question.author.username}</sc.Author>

          <sc.Created>{formatDate(props.question.createdAt)}</sc.Created>
        </sc.Group>

        {currentUser.role === 'TEACHER' && (
          <DropdownEllipsis
            questionId={props.questionId}
            handleDeleteQuestion={props.handleDeleteQuestion}
          />
        )}
      </sc.Row>

      <sc.Title>{props.question.title}</sc.Title>

      <sc.Body>{props.question.body}</sc.Body>
    </sc.Container>
  );
};

QuestionDetailCard.propTypes = {
  createdAt: PropTypes.any,
  authorName: PropTypes.string,
  body: PropTypes.string
};

export default React.memo(QuestionDetailCard);