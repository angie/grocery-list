import React from 'react';
import { useQuery } from 'react-query';
import { getGroceryList } from './api/list';

const List = () => {
  const { isLoading, isError, data } = useQuery('items', () => getGroceryList(), { retry: false });
  return (
    <main className="container p-4">
      <h1 className="font-montserrat text-ee-blue text-2xl">Grocery list</h1>

      {isError ? 'Error loading grocery list.' : null}
      {isLoading ? 'Loading grocery list…' : null}
      <ul>
        {data?.length ? data.map((item) => <li key={item.id}>{item.label}</li>) : 'No items found'}
      </ul>
    </main>
  );
};

export default List;
