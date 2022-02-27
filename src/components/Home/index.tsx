import { FC, createElement } from 'react';
import { Movies } from '../Movies';
import { Card } from '../UI/Card';
import './styles/home.css';

export const Home: FC = () => {
  return (
    <Card className="home">
      <h1>Welcome back!</h1>
      <Movies />
    </Card>
  );
};

export default Home;
