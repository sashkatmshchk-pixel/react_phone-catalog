import { Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCartCount } from '../store/cart';
import { getFavoritesCount } from '../store/favorites';

export const Layout = () => {
  const [cart, setCart] = useState(0);
  const [fav, setFav] = useState(0);

  useEffect(() => {
    const update = () => {
      setCart(getCartCount());
      setFav(getFavoritesCount());
    };
    update();
    window.addEventListener('storage-update', update);
    return () => window.removeEventListener('storage-update', update);
  }, []);

  return (
    <>
      <header>
        <Link to="/">Home</Link>{' '}
        <Link to="/catalog">Catalog</Link>{' '}
        <Link to="/favorites">Favorites ({fav})</Link>{' '}
        <Link to="/cart">Cart ({cart})</Link>
      </header>
      <Outlet />
    </>
  );
};
