import { Link } from 'react-router-dom';
import { Assistant } from '../components/Assistant';

export const Home = () => (
  <div>
    <h1>Phone Catalog</h1>
    <Link to="/catalog">Go to catalog</Link>
    <Assistant />
  </div>
);
