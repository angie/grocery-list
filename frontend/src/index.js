import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import List from './List';
import './main.css';

const App = () => (
  <>
    <Header />
    <List />
  </>
);

ReactDOM.render(<App />, document.getElementById('app'));
