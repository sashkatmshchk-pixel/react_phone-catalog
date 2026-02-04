import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getCart, removeFromCart } from '../store/cart';
import type { CartItem } from '../store/cart';

import { loadProducts } from '../data/products';
import type { Product } from '../types/Product';

import { getProductPrice } from '../utils/price';
import { resolveImage } from '../utils/image';

type CartView = {
  item: CartItem;
  product: Product;
  image: string;
  price: number;
};

export const Cart = () => {
  const [items, setItems] = useState<CartView[]>([]);

  useEffect(() => {
    const update = async () => {
      const cart = getCart();
      const products = await loadProducts();

      const resolved = cart
        .map(item => {
          const product = products.find(p => p.id === item.id);
          if (!product) return null;

          const baseImg = product.images[0];
          const parts = baseImg.split('/');
          if (parts.length >= 3) {
            parts[parts.length - 2] = item.color;
          }

          return {
            item,
            product,
            image: resolveImage(parts.join('/')),
            price: getProductPrice(product, item.capacity),
          };
        })
        .filter(Boolean) as CartView[];

      setItems(resolved);
    };

    update();
    window.addEventListener('storage-update', update);
    return () => window.removeEventListener('storage-update', update);
  }, []);

  return (
    <div>
      <Link to="/catalog" className="hero-back">Back</Link>

      <h1>Cart</h1>

      {items.length === 0 && <p>Your cart is empty</p>}

      {items.map(({ item, product, image, price }) => (
        <div
          key={`${item.id}-${item.color}-${item.capacity}`}
          style={{
            border: '1px solid #ccc',
            padding: 12,
            marginBottom: 12,
          }}
        >
          <img src={image} width={120} />

          <h3>
            {product.name} {item.capacity} {item.color.replace('-', ' ')}
          </h3>

          <p>Color: {item.color}</p>
          <p>Capacity: {item.capacity}</p>
          <p>Qty: {item.quantity}</p>
          <p>${price * item.quantity}</p>

          <button
            onClick={() =>
              removeFromCart(item.id, item.color, item.capacity)
            }
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};