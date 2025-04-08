import { LucideIcon } from 'lucide-react';
import { PropsWithChildren } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export function Button({
  variant = 'secondary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const baseStyles =
    'inline-flex items-center font-medium rounded-md transition-all duration-200 hover:scale-105';

  const variants = {
    primary: 'text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600',
    secondary:
      'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600',
    danger:
      'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50',
  };

  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const iconSpacing = iconPosition === 'left' ? 'mr-2' : 'ml-2';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled || isLoading}
      {...props}>
      {isLoading ? (
        <>
          <svg
            className={`animate-spin ${iconSizes[size]} ${iconSpacing}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {children}
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className={`${iconSizes[size]} ${iconSpacing}`} />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className={`${iconSizes[size]} ${iconSpacing}`} />}
        </>
      )}
    </button>
  );
}
