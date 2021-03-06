import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { QuestionContext } from '../../../context';
import { useGetQuestions } from '../../../hooks/question';
import * as sc from './Questions.style';

const Questions = props => {
  const { className } = props;

  const { questions, setQuestions } = useContext(QuestionContext);

  const { challengePath } = useParams();

  useGetQuestions({
    variables: { challengePath },

    onSuccess: async data => {
      const resolvedData = await data;

      setQuestions(resolvedData.data);
    }
  });

  const questionCards = questions.map(question => {
    const answerCount = question.comments.reduce((total, comment) => {
      if (comment.isAnswer) total++;

      return total;
    }, 0);

    const commentCount = question.comments.reduce((total, comment) => {
      if (!comment.isAnswer) total++;

      return total;
    }, 0);

    return (
      <sc.QuestionCardd
        key={question.id}
        question={question}
        commentCount={commentCount}
        answerCount={answerCount}
        isAnswered={!!answerCount}
      />
    );
  });

  return (
    <sc.Container className={className}>
      <sc.QuestionsList>
        {questions && questions.length > 0 && questionCards}
      </sc.QuestionsList>
    </sc.Container>
  );
};

Questions.propTypes = {
  className: PropTypes.string
};

export default Questions;
