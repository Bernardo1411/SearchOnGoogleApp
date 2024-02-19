import React, { ChangeEvent } from 'react';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  handleClick: () => void;
}

function Input({ value, handleClick, onChange }: InputProps): JSX.Element {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full h-12 rounded-lg p-5"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleClick();
        }
      }}
    />
  );
}

export default Input;
