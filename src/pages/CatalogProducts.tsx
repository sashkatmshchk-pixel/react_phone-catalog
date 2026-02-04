import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { loadProducts } from '../data/products';
import type { Product } from '../types/Product';
import { ProductCard } from '../components/ProductCard';

const PER_PAGE = 16;

export const CatalogProducts = () => {
  const { category = '' } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<'name' | 'price'>('name');

  useEffect(() => {
    loadProducts().then(setProducts);
  }, []);

  const filtered = useMemo(() => {
    return products.filter(product => product.category === category);
  }, [products, category]);

  const sorted = useMemo(() => {
    const copy = [...filtered];

    if (sort === 'name') {
      copy.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === 'price') {
      copy.sort((a, b) => {
        const aPrice = a.priceDiscount ?? a.priceRegular;
        const bPrice = b.priceDiscount ?? b.priceRegular;
        return aPrice - bPrice;
      });
    }

    return copy;
  }, [filtered, sort]);

  const start = (page - 1) * PER_PAGE;
  const visible = sorted.slice(start, start + PER_PAGE);
  const totalPages = Math.ceil(sorted.length / PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [category]);

  return (
    <div className="catalog">
      <button className="hero-back" onClick={() => navigate(-1)}>
        Back
      </button>

      <h2>{category}</h2>

      <select
        value={sort}
        onChange={e => setSort(e.target.value as 'name' | 'price')}
      >
        <option value="name">By name</option>
        <option value="price">By price</option>
      </select>

      <div className="catalog-grid">
        {visible.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              className={p === page ? 'active' : ''}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};