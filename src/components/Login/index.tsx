import { FC, useState, useEffect, createElement } from 'react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';

import './styles/login.css';

export const Login: FC<{
  onLogin: (enteredEmail: string, enteredPassword: string) => void;
}> = ({ onLogin }) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);

  const emailChangeHandler = (event: any) => setEnteredEmail(event.target.value);
  
  const passwordChangeHandler = (event: any) => setEnteredPassword(event.target.value);
  
  const validateEmailHandler = () => {
  /**
   * Here, we are violating the rule of updating the state that
   * depends on the previous state snapshot.
   * setEmailIsValid has the previous snapshot for its own state(emailIsValid) only
   * not the enteredEmail state.
   * So technically, we are updating one state based on the input of another state,
   * which is not recommended as the state update may get delayed.
   */
    setEmailIsValid(enteredEmail.includes('@'));
  }
  
  const validatePasswordHandler = () => setPasswordIsValid(enteredPassword.trim().length > 6);

  const submitHandler = (event: any) => {
    event.preventDefault();
    onLogin(enteredEmail, enteredPassword);
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
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [enteredEmail, enteredPassword]);

  return (
    <Card className="login">
      <form onSubmit={submitHandler}>
        <div
          className={`control ${
            emailIsValid === false ? "invalid" : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`control ${
            passwordIsValid === false ? "invalid" : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className="actions">
          <Button
            type="submit"
            className="btn"
            disabled={!formIsValid}
            buttonText="Login"
            onClick={() => window.console.log('clicked!')}
          />
        </div>
      </form>
    </Card>
  );
};
