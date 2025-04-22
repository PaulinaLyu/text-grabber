interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  optionClassName?: string;
  id?: string;
  ariaLabel?: string;
}

export const Select = ({
  value,
  options,
  onChange,
  placeholder,
  disabled = false,
  className = '',
  optionClassName = '',
  id,
  ariaLabel,
}: SelectProps) => {
  return (
    <select
      id={id}
      aria-label={ariaLabel}
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      className={`text-sm text-gray-700 dark:text-gray-300 bg-transparent border-none focus:ring-0 cursor-pointer outline-none ${className}`}>
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map(option => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          className={optionClassName}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
