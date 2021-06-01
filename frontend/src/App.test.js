import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import App from './App';

jest.mock('axios');

describe('Grocery list frontend tests', () => {
  it('should initially render a loading state', () => {
    render(<App />);

    expect(screen.getByText('Loading grocery list…')).toBeInTheDocument();
  });

  it('should render a grocery list', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: [
          {
            id: '805af327-d3bc-4cd4-8157-4ab0962ba34f',
            label: 'cheese',
            isPurchased: false,
          },
        ],
      })
    );

    render(<App />);

    expect(await screen.findByText(/cheese/)).toBeInTheDocument();
  });

  it('should render a message if the list is empty', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: [] }));

    render(<App />);

    expect(await screen.findByText('No items found')).toBeInTheDocument();
  });

  it('should display feedback if there is an error fetching list', async () => {
    /* eslint-disable no-console */
    const original = console.error;
    console.error = jest.fn();
    axios.get.mockImplementationOnce(() => Promise.reject(new Error('failed to fetch')));

    render(<App />);

    expect(await screen.findByText('Error loading grocery list.')).toBeInTheDocument();
    console.error = original;
    /* eslint-enable no-console */
  });

  it('should allow user to mark item as purchased', async () => {
    axios.put.mockImplementationOnce(() => Promise.resolve({ data: {} }));
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: [
          {
            id: '805af327-d3bc-4cd4-8157-4ab0962ba34f',
            label: 'cheese',
            isPurchased: true,
          },
        ],
      })
    );

    render(<App />);

    const cheese = await screen.findByText(/cheese/);
    userEvent.click(cheese);

    expect(
      screen.getByRole('checkbox', {
        name: /cheese/i,
      })
    ).toBeChecked();
  });

  it('should let a user add a new item to their grocery list', async () => {
    const newItem = {
      id: 'id-2',
      label: 'milk',
      isPurchased: true,
    };

    // initial fetch
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: [] }));
    // create new item
    axios.post.mockImplementationOnce(() => Promise.resolve({ newItem }));
    // refetch list on success
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: [newItem],
      })
    );

    render(<App />);

    const addInput = screen.getByRole('textbox', {
      name: /add new item to grocery list/i,
    });

    userEvent.type(addInput, 'milk');
    userEvent.click(
      screen.getByRole('button', {
        name: /add/i,
      })
    );

    expect(
      await screen.findByRole('checkbox', {
        name: /milk/i,
      })
    ).toBeInTheDocument();
  });
});
