import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ChallengeContext } from '../../../context';
import { useGetChallenge } from '../../../hooks/challenge';
import Label from '../../REUSEABLE/Label/Label';
import Desc from '../../REUSEABLE/Desc/Desc';
import * as sc from './Challenge.style';

const Challenge = props => {
  const { challengePath } = useParams();

  const { challenge, setChallenge } = useContext(ChallengeContext);

  useGetChallenge({
    variables: { challengePath },
    onSuccess: async data => {
      const gotData = await data;

      setChallenge(gotData.data);
    }
  });

  return (
    <sc.Container className={props.className}>
      <Label>CHALLENGE</Label>

      <sc.Titlee>{challenge.title}</sc.Titlee>

      <sc.Video>
        <iframe
          title='challenge'
          src={challenge.videoUrl}
          frameBorder='0'
          allow='autoplay; encrypted-media'
          allowFullScreen
        />
      </sc.Video>

      <Desc>{challenge.desc}</Desc>
    </sc.Container>
  );
};

Challenge.propTypes = {
  className: PropTypes.string
};

export default Challenge;
