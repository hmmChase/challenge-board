import { useState } from 'react';
import { BASE_URL, API_VERSION, errorCodeToMessage } from '../config';
import instance from '../api/baseApi';

// const handleErrorArray = errCodeArray => errCodeArray.map(handleErrors);

const handleErrors = errorCode => {
  const loginErrorMessage = errorCodeToMessage[errorCode];

  if (loginErrorMessage) return loginErrorMessage;

  return errorCodeToMessage.default;
};

const request = async (pathName, body) => {
  const url = `${BASE_URL}/api/${API_VERSION}${pathName}`;

  try {
    let response;

    if (body) response = await instance.post(url, body);
    else response = await instance.get(url);

    return response.data;
  } catch (err) {
    // console.error(err);
  }
};

const useFetch = (pathName, options) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async body => {
    setLoading(true);

    try {
      const response = await request(pathName, body);

      if (response && response.error) {
        const errorMessage = handleErrors(response.error);

        setError(errorMessage);
      }

      setLoading(false);

      // console.log('pathName: ', pathName, 'response: ', response);

      return response;
    } catch (error) {
      setError(error);

      setLoading(false);
    }
  };

  return [getData, loading, error];
};

export default useFetch;
