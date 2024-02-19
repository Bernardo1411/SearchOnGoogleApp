import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './toastify-dark.css';

import './App.css';

import Button from './components/button';
import Input from './components/input';
import Dropdown from './components/dropdown';
import ListComponent from './components/list';

import useApi from './hooks/useAPI';
import useLocale from './hooks/useLocale';

interface ListItem {
  Title: string;
  Description: string;
  Link: string;
}

interface ListItems {
  _id: string;
  keywords: string;
  results: ListItem[];
}

function App(): JSX.Element {
  const { locale } = useLocale();
  const {
    searches,
    allSearches,
    keywords,
    frequency,
    loading,
    handleClick,
    setKeywords,
    setFrequency,
  } = useApi(locale);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <ToastContainer />
      <header className="bg-gray-800 dark:bg-gray-900 text-white py-4">
        <h1 className="text-3xl font-bold text-center">Buscar</h1>
      </header>
      <main className="container mx-auto py-8 flex items-center justify-center">
        <div className=" mr-2">
          <Dropdown
            options={[
              { value: 'h', label: 'hora' },
              { value: 'd', label: 'dia' },
              { value: 'w', label: 'semana' },
              { value: 'm', label: 'mês' },
              { value: 'y', label: 'ano' },
            ]}
            onChange={(option: string) => setFrequency(option)}
            value={frequency}
          />
        </div>
        <Input
          value={keywords}
          onChange={setKeywords}
          handleClick={() => handleClick()}
        />
        <div className="ml-2">
          <Button
            onClick={handleClick}
            label={<FaSearch />}
            loading={loading}
          />
        </div>
      </main>
      <section className="container mx-auto py-8">
        {/* error && <div className="text-red-500">{error}</div> */}
        {searches && <ListComponent items={Object.values(searches)} />}
        <h1 className="text-3xl font-bold text-center text-white mb-4">
          Pesquisas Anteriores
        </h1>
        {/* eslint-disable-next-line */}
        {allSearches &&
          Object.values(allSearches)
            .slice(-5)
            .map((elementSearch: ListItems) => {
              const { _id: id, keywords: keywordsElement } = elementSearch;
              return (
                <div key={id}>
                  <h2 className="text-gray-100 mb-2">{keywordsElement}</h2>
                  <ListComponent items={elementSearch.results} />
                </div>
              );
            })}
      </section>
    </div>
  );
}

export default App;
