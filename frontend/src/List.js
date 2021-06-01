import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import ListItem from './ListItem';

const List = () => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    'items',
    () => axios.get('http://localhost:3017/items'),
    { retry: false }
  );

  if (isError) {
    return <div className="mt-4">Error loading grocery list.</div>;
  }

  if (isLoading) {
    return <div className="mt-4">Loading grocery list…</div>;
  }

  return (
    <div className="mt-4 max-w-sm">
      <ul>
        {isSuccess && data?.data?.length
          ? data.data.map(({ id, isPurchased, label }) => (
              <ListItem key={id} id={id} label={label} isPurchased={isPurchased} />
            ))
          : 'No items found'}
      </ul>
    </div>
  );
};

export default List;
