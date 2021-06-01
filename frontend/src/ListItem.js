import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import { invalidateCache } from './utils';
import DeleteItem from './DeleteItem';

const ListItem = ({ id, label, isPurchased }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ status }) => axios.put(`http://localhost:3017/items/${id}`, { isPurchased: status }),
    {
      onSuccess: async () => invalidateCache(queryClient),
    }
  );

  return (
    <div className="flex items-center justify-between mb-4">
      <span>
        <input
          type="checkbox"
          id={id}
          checked={isPurchased}
          name={label}
          className="form-checkbox h-6 w-6 border-ee-blue border-2 mr-3 text-ee-blue"
          onChange={() => mutation.mutate({ id, status: !isPurchased })}
        />
        <label className={`${isPurchased ? 'line-through text-gray-400' : ''}`} htmlFor={id}>
          {label}
        </label>
      </span>
      <DeleteItem id={id} label={label} />
    </div>
  );
};

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isPurchased: PropTypes.bool.isRequired,
};

export default ListItem;
