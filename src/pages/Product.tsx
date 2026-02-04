import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import type { Product } from '../types/Product';
import { loadProducts } from '../data/products';

import { addToCart, isInCart } from '../store/cart';
import { toggleFavorite, isFavorite } from '../store/favorites';

import { getProductPrice } from '../utils/price';
import { resolveImage } from '../utils/image';

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);

  const [color, setColor] = useState('');
  const [capacity, setCapacity] = useState('');

  const [images, setImages] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState(0);

  const [inCart, setInCart] = useState(false);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    loadProducts().then(list => {
      const found = list.find(p => p.id === id) || null;
      setProduct(found);

      if (found) {
        setColor(found.colorsAvailable[0]);
        setCapacity(found.capacityAvailable[0]);
        setImages(found.images.map(resolveImage));
        setImageIndex(0);
      }
    });
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const update = () => {
      setInCart(isInCart(product.id, color, capacity));
      setFav(isFavorite(product.id, color, capacity));
    };

    update();
    window.addEventListener('storage-update', update);
    return () =>
      window.removeEventListener('storage-update', update);
  }, [product, color, capacity]);

  useEffect(() => {
  if (!product) return;

  const recolored = product.images.map(img => {
    const parts = img.split('/');

    if (parts.length >= 3) {
      parts[parts.length - 2] = color;
    }

    return parts.join('/');
  });

  setImages(recolored.map(resolveImage));
  setImageIndex(0);
}, [color, product]);

  if (!product) {
    return <p>Not found</p>;
  }

  const price = getProductPrice(product, capacity);

  return (
    <div className="product-page">
      <Link to="/catalog" className="hero-back">
        Back
      </Link>

      <div className="product-images">
        {images.length > 0 && (
          <>
            <img
              src={images[imageIndex]}
              alt={product.name}
              width={340}
            />

            <div className="thumbs">
              {images.map((img, i) => (
                <img
                  key={img}
                  src={img}
                  width={60}
                  onClick={() => setImageIndex(i)}
                  style={{
                    cursor: 'pointer',
                    border:
                      i === imageIndex
                        ? '2px solid black'
                        : '1px solid #ccc',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <h1>{product.name}</h1>
      <p>${price}</p>

      <div>
        <h4>Color</h4>
        {product.colorsAvailable.map(c => (
          <button
            key={c}
            disabled={c === color}
            onClick={() => setColor(c)}
          >
            {c.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div>
        <h4>Capacity</h4>
        {product.capacityAvailable.map(c => (
          <button
            key={c}
            disabled={c === capacity}
            onClick={() => setCapacity(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <button
          disabled={inCart}
          onClick={() =>
addToCart(product.id, color, capacity)
          }
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          style={{ marginLeft: 12 }}
          onClick={() =>
            toggleFavorite(product.id, color, capacity)
          }
        >
          {fav ? '★ Added to favorites' : '☆ Add to favorites'}
        </button>
      </div>
    </div>
  );
};