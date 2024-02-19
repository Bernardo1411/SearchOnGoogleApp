import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { postSearch, getSearches } from '../API/api';

const useApi = (locale: string) => {
  const [searches, setSearches] = useState<object | null>(null);
  const [keywords, setKeywords] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | unknown>(null);
  const [allSearches, setAllSearches] = useState<object | null>(null);

  const setSearch = async (data: object) => {
    setLoading(true);
    try {
      const response = await postSearch(data);

      setSearches(response);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      toast.error('Um erro ocorreu. Tente novamente.', {
        autoClose: 4000,
        hideProgressBar: true,
      });
    }
  };

  // Return the state and the function to call the API
  const getAllSearches = async () => {
    setLoading(true);
    try {
      const response = await getSearches();
      setAllSearches(response);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      toast.error('Um erro ocorreu. Tente novamente.');
    }
  };

  const handleClick = () => {
    if (locale && frequency && keywords) {
      setSearch({ locale, frequency, keywords });
    } else {
      toast.error('Preencha todos os campos.');
    }
  };

  useEffect(() => {
    getAllSearches();
  }, [searches]);

  return {
    searches,
    allSearches,
    loading,
    keywords,
    frequency,
    error,
    handleClick,
    setSearch,
    setKeywords,
    setFrequency,
  };
};

export default useApi;
