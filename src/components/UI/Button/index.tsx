import { FC, createElement } from 'react';
import './styles/button.css';

export const Button: FC<{
  type: string;
  buttonText: string;
  onClick: (e: any) => void;
  className?: string;
  disabled?: boolean;
}> = ({ type, buttonText, onClick, className, disabled }) => {
  return (
    <button
      className={`button` || className}
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
}