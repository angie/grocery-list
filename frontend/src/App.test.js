import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Grocery list frontend tests', () => {
  beforeEach(() => {
    jest.spyOn(window, 'fetch');
  });

  it('should initially render a loading state', () => {
    render(<App />);

    expect(screen.getByText('Loading grocery list…')).toBeInTheDocument();
  });

  it('should render a grocery list', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: '805af327-d3bc-4cd4-8157-4ab0962ba34f',
          label: 'cheese',
          isPurchased: false,
        },
      ],
    });
    render(<App />);

    expect(await screen.findByText(/cheese/)).toBeInTheDocument();
  });

  it('should render a message if the list is empty', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });
    render(<App />);

    expect(await screen.findByText('No items found')).toBeInTheDocument();
  });

  it('should display feedback if there is an error fetching list', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });
    render(<App />);

    expect(await screen.findByText('Error loading grocery list.')).toBeInTheDocument();
  });
});
