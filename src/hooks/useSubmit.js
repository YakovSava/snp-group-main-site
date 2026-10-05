import { useCallback, useState } from 'react';
import { ApiUnavailableError, postRequest } from '../services/api';

export default function useSubmit(endpoint) {
  const [status, setStatus] = useState('idle');

  const submit = useCallback(async (body) => {
    setStatus('sending');
    try {
      await postRequest(endpoint, body);
      setStatus('success');
      return true;
    } catch (error) {
      setStatus(error instanceof ApiUnavailableError ? 'unavailable' : 'error');
      return false;
    }
  }, [endpoint]);

  const reset = useCallback(() => setStatus('idle'), []);

  return { status, submit, reset };
}
