import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { CurrentUserContext } from '../../../context/contexts';
import QuestionDetail from '../../domains/question/QuestionDetail/QuestionDetail';
import Questions from '../../domains/question/Questions/Questions';
import Label from '../../reuseable/Label/Label';
import * as sc from './Discussion.style';

const Discussion = props => {
  const { currentUser } = useContext(CurrentUserContext);

  const { questionId } = useParams();

  return (
    <sc.Container className={props.className}>
      <sc.Heading>
        <div>
          <Label>DISCUSSION</Label>

          <sc.Titlee>
            {currentUser.role === 'TEACHER'
              ? 'Challenge Questions'
              : 'Ask a Question'}
          </sc.Titlee>
        </div>

        {currentUser.role === 'STUDENT' && !questionId && <sc.QuestionNeww />}
      </sc.Heading>

      {questionId && <sc.BtnBackk />}

      {questionId ? <QuestionDetail questionId={questionId} /> : <Questions />}
    </sc.Container>
  );
};

Discussion.propTypes = {
  className: PropTypes.string
};

export default React.memo(Discussion);