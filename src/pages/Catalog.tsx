import { Link } from 'react-router-dom';
import './Catalog.css';

export const Catalog = () => {
  return (
    <div className="catalog-page">
      <h1 className="catalog-title">FullStack Portfolio page</h1>

      <div className="catalog-categories">
        <Link to="/catalog/phones" className="catalog-card">
          <img
            src="/img/catalog/phone-outline.svg"
            alt="Phones"
          />
          <span>PHONES</span>
        </Link>

        <Link to="/catalog/tablets" className="catalog-card">
          <img
            src="/img/catalog/tablet-outline.svg"
            alt="Tablets"
          />
          <span>TABLETS</span>
        </Link>

        <Link to="/catalog/accessories" className="catalog-card">
          <img
            src="/img/catalog/watch-outline.svg"
            alt="Accessories"
          />
          <span>ACCESSORIES</span>
        </Link>
      </div>
      
      <div className="catalog-footer">
        sashkatmshchk@gmail.com
      </div>
    </div>
  );
};