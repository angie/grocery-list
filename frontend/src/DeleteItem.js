import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { invalidateCache } from './utils';

const DeleteItem = ({ id, label }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(() => axios.delete(`http://localhost:3017/items/${id}`), {
    onSuccess: async () => invalidateCache(queryClient),
  });

  return (
    <button
      type="button"
      aria-label={`Delete ${label}`}
      onClick={() => {
        mutation.mutate();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-400 hover:text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  );
};

DeleteItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default DeleteItem;
