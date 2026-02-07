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
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#94aeb8',
          letterSpacing: '2px',
          fontSize: '14px',
          marginBottom: '10px',
          transition: '0.3s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = '#dff6ff';
          e.currentTarget.style.textShadow =
            '0 0 10px rgba(180,230,255,0.7)';
          e.currentTarget.style.transform = 'scale(1.06)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = '#94aeb8';
          e.currentTarget.style.textShadow = 'none';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        BACK
      </button>

      <h2 style={{ textTransform: 'lowercase' }}>{category}</h2>

      {/* SORT */}
      <select
        value={sort}
        onChange={e => setSort(e.target.value as 'name' | 'price')}
        style={{
          marginTop: '10px',
          marginBottom: '30px',
          padding: '8px 16px',
          borderRadius: '10px',
          border: '1px solid #eef7fb',
          background: 'white',
          fontSize: '14px',
          color: '#94aeb8',
          outline: 'none',
          transition: '0.25s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow =
            '0 0 10px rgba(180,230,255,0.45)';
          e.currentTarget.style.border = '1px solid #dff4ff';
          e.currentTarget.style.transform = 'scale(1.04)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.border = '1px solid #eef7fb';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <option value="name">By name</option>
        <option value="price">By price</option>
      </select>

      <div className="catalog-grid">
        {visible.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div
          style={{
            marginTop: '40px',
            display: 'flex',
            justifyContent: 'center',
            gap: '18px',
          }}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: p === page ? '#dff6ff' : '#94aeb8',
fontSize: '14px',
                letterSpacing: '2px',
                transition: '0.25s',
                textShadow:
                  p === page
                    ? '0 0 10px rgba(180,230,255,0.7)'
                    : 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#dff6ff';
                e.currentTarget.style.textShadow =
                  '0 0 10px rgba(180,230,255,0.7)';
                e.currentTarget.style.transform = 'scale(1.15)';
              }}
              onMouseLeave={e => {
                if (p !== page) {
                  e.currentTarget.style.color = '#94aeb8';
                  e.currentTarget.style.textShadow = 'none';
                }
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};