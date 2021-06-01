import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './Header';
import List from './List';
import './main.css';

const App = () => (
  <QueryClientProvider client={new QueryClient()}>
    <Header />
    <main className="container p-6 md:p-10">
      <h1 className="font-montserrat text-ee-blue text-2xl">Grocery list</h1>
      <List />
    </main>
  </QueryClientProvider>
);

export default App;
