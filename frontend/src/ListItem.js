import PropTypes from 'prop-types';
import React from 'react';
import DeleteItem from './DeleteItem';
import useMutateAndRefresh from './useMutateAndRefetch';

const ListItem = ({ id, label, isPurchased }) => {
  const mutation = useMutateAndRefresh({ method: 'put', url: `http://localhost:3017/items/${id}` });
  return (
    <div className="flex items-center justify-between mb-4">
      <span>
        <input
          type="checkbox"
          id={id}
          checked={isPurchased}
          name={label}
          className="form-checkbox h-6 w-6 border-ee-blue border-2 mr-3 text-ee-blue"
          onChange={() => mutation.mutate({ isPurchased: !isPurchased })}
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
