import { useState } from 'react';
import { Service } from '../interfaces/serviceResponse.interface';
import Request from '../interfaces/requests.interface';

const usePostRequest = () => {
  const [ service, setService ] = useState<Service<Request>>({ status: 'init' });

  const publishRequest = (request: Request) => {
    setService({ status: 'loading' });

    return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/dev/spellcheck', {
      method: 'POST',
      body: `{"text": "${request.input}"}`
    })
      .then(response => response.json())
      .then(response => {
        setService({ status: 'loaded', payload: response });
        resolve(response);
      })
      .catch(error => {
        setService({ status: 'error', error });
        reject(error);
      });
    });
  };

  return {
    service,
    publishRequest
  };
};

export default usePostRequest;
