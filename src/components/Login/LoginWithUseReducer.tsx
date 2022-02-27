import { FC, useState, useEffect, createElement, useReducer, useRef } from 'react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

import './styles/login.css';
import { useAuthenticationContext } from '../../context';

const emailReducer = (
  state: { value: string; isValid: boolean | null; },
  action: { type: string; value?: any; }
) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.value,
      isValid: action.value.includes('@')
    }
  }
  if (action.type === 'USER_INPUT_BLUR') {
    // state has the last updated state snapshot, so we return that in BLUR case
    return {
      value: state.value,
      isValid: state.value.includes('@')
    }
  }

  // returns the initial state if no action matches.
  return {
    value: '',
    isValid: false
  }
};

const passwordReducer = (
  state: { value: string; isValid: boolean | null; },
  action: { type: string; value?: any; }
) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.value,
      isValid: action.value.trim().length > 6
    }
  }
  if (action.type === 'USER_INPUT_BLUR') {
    // state has the last updated state snapshot, so we return that in BLUR case
    return {
      value: state.value,
      isValid: state.value.trim().length > 6
    }
  }

  // returns the initial state if no action matches.
  return {
    value: '',
    isValid: false
  }
};

export const LoginWithUseReducer: FC = () => {
  const { onLogin }  = useAuthenticationContext();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null as any
  });

  const emailInputRef = useRef('' as any);
  const passwordInputRef = useRef('' as any);
  
  const emailChangeHandler = (event: any) => {
    // dispatch email action
    dispatchEmail({
      type: 'USER_INPUT',
      value: event.target.value
    });
    /**
     * NOTE:
     * it is better to use setFormIsValid state in useEffect because, it is
     * dependent on two different states and it may cause potential bugs
     * due to delayed state update reflection in update cycle.
     * Therefore, it is better to use this in useEffect because it guarantees
     * that setFormIsValid(from useEffect) will be called after all state
     * updates/changes are done in a component
     */
    // setFormIsValid(emailState.isValid && passwordState.isValid);
  }
  
  const passwordChangeHandler = (event: any) => {
    // disptach password function when it changes
    dispatchPassword({
      type: 'USER_INPUT',
      value: event.target.value
    })
  }
  
  const validateEmailHandler = () => {
    dispatchEmail({
      type: 'USER_INPUT_BLUR'
    });
  }
  
  const validatePasswordHandler = () => {
    dispatchPassword({
      type: 'USER_INPUT_BLUR'
    });
  }

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const submitHandler = (event: any) => {
    event.preventDefault();
    if (formIsValid) {
      onLogin(emailState.value, passwordState.value);
    } else if (!formIsValid && !emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  useEffect(() => {
    /**
     * Implement deboucing here so that setFormIsValid will be executed 
     * after a specific pause from user.
     * 
     * And in the cleanup function, we clear the previous timer
     * because as long as the user is typing we always clear
     * all other timers.
     * Basically, clear the last timer before setting a new one because
     * on every next execution of useEffect, its cleanup function will
     * run first.
     */
    let timer = setTimeout(() => {
      console.log('form validity in useEffect');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [emailIsValid, passwordIsValid]);

  return (
    <Card className="login">
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          isValid={emailIsValid}
          label="E-Mail"
          type="email"
          id="email"
          value={emailState.value}
          onChangeHandler={emailChangeHandler}
          onValidateHandler={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          isValid={passwordIsValid}
          label="password"
          type="password"
          id="password"
          value={passwordState.value}
          onChangeHandler={passwordChangeHandler}
          onValidateHandler={validatePasswordHandler}
        />
        <div className="actions">
          <Button
            type="submit"
            className="btn"
            buttonText="Login"
            onClick={() => window.console.log('clicked!')}
          />
        </div>
      </form>
    </Card>
  );
};
