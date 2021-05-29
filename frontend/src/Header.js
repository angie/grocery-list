import React from 'react';
import EELogo from '../assets/logo.svg';

const Header = () => (
  <header className="container mx-auto p-4 min-w-full bg-ee-blue flex flex-row">
    <span className="w-1/2 sm:w-1/4 md:w-1/5">
      <EELogo />
    </span>
  </header>
);

export default Header;
