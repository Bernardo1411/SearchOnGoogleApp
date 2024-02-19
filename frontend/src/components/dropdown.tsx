import React, { ChangeEvent } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

function Select({ options, value, onChange }: SelectProps) {
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as unknown as string;
    onChange(selectedValue);
  };

  return (
    <select
      value={value}
      onChange={handleSelectChange}
      className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-100 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-none h-12"
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-md hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
