import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { FavoriteItem } from '../store/favorites';
import { getFavorites, toggleFavorite } from '../store/favorites';
import { loadProducts } from '../data/products';
import { getProductPrice } from '../utils/price';
import { resolveImage } from '../utils/image';
import type { Product } from '../types/Product';

type FavView = {
  product: Product;
  color: string;
  capacity: string;
};

export const Favorites = () => {
  const [items, setItems] = useState<FavView[]>([]);

  useEffect(() => {
    const update = async () => {
      const favs: FavoriteItem[] = getFavorites();
      const products = await loadProducts();

      const resolved = favs
        .map(f => {
          const product = products.find(p => p.id === f.id);
          if (!product) return null;

          return {
            product,
            color: f.color,
            capacity: f.capacity,
          };
        })
        .filter(Boolean) as FavView[];

      setItems(resolved);
    };

    update();
    window.addEventListener('storage-update', update);
    return () => window.removeEventListener('storage-update', update);
  }, []);

  return (
    <div>
      <Link to="/catalog" className="hero-back">Back</Link>

      <h1>Favorites</h1>

      {items.length === 0 && <p>No favorites yet</p>}

      {items.map(({ product, color, capacity }) => {
        const baseImg = product.images[0];
const parts = baseImg.split('/');
if (parts.length >= 3) {
  parts[parts.length - 2] = color;
}
const image = resolveImage(parts.join('/'));
        const price = getProductPrice(product, capacity);

        return (
          <div
            key={`${product.id}-${color}-${capacity}`}
            style={{
              border: '1px solid #ccc',
              padding: 12,
              marginBottom: 12,
            }}
          >
            <img src={image} width={120} />

            <h3>
  {product.name} {capacity} {color.replace('-', ' ')}
           </h3>
            <p>Color: {color}</p>
            <p>Capacity: {capacity}</p>
            <p>${price}</p>

            <button
              onClick={() =>
                toggleFavorite(product.id, color, capacity)
              }
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};