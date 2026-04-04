import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variantClass = {
  primary: 'bg-orange-400 hover:bg-orange-500 text-white',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-600',
};

const sizeClass = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) => (
  <button
    className={`
      inline-flex items-center justify-center gap-1.5 rounded-lg font-medium
      transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
      ${variantClass[variant]} ${sizeClass[size]} ${className}
    `}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

export default Button;
