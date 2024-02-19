import React from 'react';
import { ClipLoader } from 'react-spinners';

interface ButtonProps {
  onClick: () => void;
  label: string | JSX.Element;
  loading: boolean;
}

function Button({ onClick, loading, label }: ButtonProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-12 rounded-lg"
    >
      {!loading ? label : <ClipLoader color="white" size={20} />}
    </button>
  );
}

export default Button;
