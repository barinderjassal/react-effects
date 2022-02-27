import * as React from 'react';
import { FC, createElement, useRef, useImperativeHandle } from 'react';
import './styles/input.css';

interface InputElement {
  isValid?: boolean | null;
  label: string;
  type: string;
  id: string;
  value: string;
  ref: any;
  onChangeHandler: (event: any) => void;
  onValidateHandler: () => void;
}

export const Input: FC<InputElement> = React.forwardRef(({
  isValid,
  label,
  type,
  id,
  value,
  onChangeHandler,
  onValidateHandler
}, ref) => {
  const inputRef = useRef({} as any);

  const activate = () => {
    inputRef.current && inputRef.current.focus();
  }

  useImperativeHandle(ref, () => {
    return {
      focus: activate
    }
  });

  return (
    <div
      className={`control ${
        isValid === false ? "invalid" : ''
      }`}
    >
      <label htmlFor="email">{label}</label>
      <input
        ref={inputRef}
        type={type}
        id={id}
        value={value}
        onChange={onChangeHandler}
        onBlur={onValidateHandler}
      />
    </div>
  );
});