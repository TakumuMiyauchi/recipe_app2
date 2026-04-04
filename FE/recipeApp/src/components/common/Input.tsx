import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({ label, error, id, className = '', ...props }: InputProps) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <input
      id={id}
      className={`
        w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors
        border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100
        disabled:bg-gray-50 disabled:text-gray-400
        ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}
        ${className}
      `}
      {...props}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

export default Input;
