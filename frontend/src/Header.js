import React from 'react';
// eslint-disable-next-line import/no-unresolved
import logo from 'url:../assets/logo.png';

const Header = () => (
  <header className="container mx-auto p-4 min-w-full bg-ee-blue flex flex-row">
    <span className="md:w-1/3">
      <img src={logo} alt="EE logo" />
    </span>
  </header>
);

export default Header;
