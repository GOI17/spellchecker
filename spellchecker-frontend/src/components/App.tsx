import React, {useState, ChangeEvent} from 'react';
import Request from '../interfaces/requests.interface';
import useGetRequests from '../services/get.history.service';
import usePostRequest from '../services/post.spellchecker.service';

const App: React.FC<{}> = () => {
  const initialRequestState: Request = {
    host: '',
    method: '',
    input: ''
  };
  const [ request, setRequest ] = useState<Request>(initialRequestState);
  const fetchedData = useGetRequests(request);
  const { service, publishRequest } = usePostRequest();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setRequest(prevRequest => ({
      ...prevRequest,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    publishRequest(request).then(() => setRequest(initialRequestState));
  };

  return (
    <>
      <nav className='navbar navbar-light bg-light'>
        <span className='navbar-brand mb-0 h1'>SpellChecker App</span>
      </nav>
      <div className='container'>
        <div className='row p-2'>
          <div className='col-4'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label>Enter your message</label>
                <input id='input_message'
                      type='text'
                      name='input'
                      className='form-control'
                      onChange={handleChange}
                      value={request.input}
                      placeholder='Ex. un lgar para la hopinion' />
              </div>
              <button type='submit'
                      className='btn btn-primary'>
                      Test button
              </button>
            </form>
          </div>
          <div className='col-8'>
            <h4>Requests History</h4>
            { fetchedData.status === 'loading' && <div>Fetching data...</div>}
            { fetchedData.status === 'loaded' && (
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Host</th>
                    <th scope='col'>Method</th>
                    <th scope='col'>Message</th>
                  </tr>
                </thead>
                <tbody>
                { fetchedData.payload.results.map((request, i) => (
                  <tr key={i}>
                    <th scope='row'>{i}</th>
                    <td>{request.host}</td>
                    <td>{request.method}</td>
                    <td>{request.input}</td>
                  </tr>))
                }
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
