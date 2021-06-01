import React, { useState } from 'react';
import useMutateAndRefresh from './useMutateAndRefetch';

const AddItem = () => {
  const [value, setValue] = useState('');

  const mutation = useMutateAndRefresh({ method: 'post', url: 'http://localhost:3017/items' });

  return (
    <form
      className="w-full max-w-sm"
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate({ label: value });
        setValue('');
        e.target.reset();
      }}
    >
      <div className="flex items-center border-b border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Add new item"
          aria-label="Add new item to grocery list"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="flex-shrink-0 bg-ee-blue hover:bg-blue-600 border-ee-blue hover:border-blue-600 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddItem;
