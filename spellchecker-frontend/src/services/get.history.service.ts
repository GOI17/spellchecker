import { useEffect, useState } from 'react';
import { Service } from '../interfaces/serviceResponse.interface';
import Request from '../interfaces/requests.interface';

export interface Requests {
  results: Request[];
}

const useGetRequests = () => {
  const [ result, setResult ] = useState<Service<Requests>>({ status: 'loading' });

  useEffect(() => {
    fetch('http://localhost:3000/dev/history')
      .then(response => response.json())
      .then(response => setResult({ status: 'loaded', payload: response }))
      .catch(error => setResult({ status: 'error', error }));
  }, []);

  return result;
};

export default useGetRequests;
