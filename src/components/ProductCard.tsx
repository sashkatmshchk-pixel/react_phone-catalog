import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import type { Product } from '../types/Product';
import { resolveImage } from '../utils/image';
import { getProductPrice } from '../utils/price';

import { addToCart, isInCart } from '../store/cart';
import { toggleFavorite, isFavorite } from '../store/favorites';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {

  const color = product.color;
  const capacity = product.capacity;

  const [inCart, setInCart] = useState(false);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const update = () => {
      setInCart(isInCart(product.id, color, capacity));
      setFav(isFavorite(product.id, color, capacity));
    };

    update();
    window.addEventListener('storage-update', update);
    return () =>
      window.removeEventListener('storage-update', update);
  }, [product.id, color, capacity]);

  const image = resolveImage(product.images[0]);
  const price = getProductPrice(product, capacity);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img
          src={image}
          alt={product.name}
          width={200}
          loading="lazy"
        />

        <h3>{product.name}</h3>
      </Link>

      <p>${price}</p>

      <button
        disabled={inCart}
        onClick={() =>
          addToCart(product.id, color, capacity)
        }
      >
        {inCart ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        onClick={() =>
          toggleFavorite(product.id, color, capacity)
        }
      >
        {fav ? '★ Added to favorites' : '☆ Add to favorites'}
      </button>
    </div>
  );
};