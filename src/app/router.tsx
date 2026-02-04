import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Home } from '../pages/Home';
import { Catalog } from '../pages/Catalog';
import { CatalogProducts } from '../pages/CatalogProducts';
import { ProductPage } from '../pages/Product';
import { Cart } from '../pages/Cart';
import { Favorites } from '../pages/Favorites';
import { NotFound } from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'catalog', element: <Catalog /> },
      { path: 'catalog/:category', element: <CatalogProducts /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'cart', element: <Cart /> },
      { path: 'favorites', element: <Favorites /> },
    ],
  },
]);