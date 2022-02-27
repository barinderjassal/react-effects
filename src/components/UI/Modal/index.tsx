import { createElement, FC, Fragment } from 'react';
import { Button } from '../Button';
import { Card } from '../Card';
import './styles/modal.css';

export const ErrorModal: FC<{
  title: string;
  message: string;
  onConfirm: () => void;
}> = ({ title, message, onConfirm }) => {
  return (
    <Fragment>
      <div className="backdrop" onClick={onConfirm} ></div>
      <Card className="modal">
        <header className="header">
          <h2>{title}</h2>
        </header>
        <div className="content">
          <p>
            {message}
          </p>
        </div>
        <footer className="actions">
          <Button buttonText="Okay" type="submit" onClick={onConfirm}/>
        </footer>
      </Card>
    </Fragment>
  )
}