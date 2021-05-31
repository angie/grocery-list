import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './Header';
import List from './List';
import './main.css';

const App = () => (
  <QueryClientProvider client={new QueryClient()}>
    <Header />
    <List />
  </QueryClientProvider>
);

export default App;
