import React, { useEffect } from 'react';
import ProductCardSkeleton from '../../components/ProductCard/Skeleton';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import styles from './styles.module.css';
import { fetchProducts } from '../../features/product/productSlice';
import { selectAllProducts, selectProductsStatus, selectProductsError } from '../../features/product/productSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const [filteredProducts, setFilteredProducts] = React.useState([]);

  useEffect(() => {
    const category = searchParams.get('category');
    const _searchQuery = searchParams.get('search');
    
    if (category && category !== 'all') {
      dispatch(fetchProducts(category));
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      const filtered = products.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchParams]);

  if (status === 'loading') {
    return (
      <div className={styles.container}>
        <h1>Featured Products</h1>
        <div className={styles.products}>
          {[...Array(6)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className={styles.error}>
        <h1>Error loading products</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Featured Products</h1>
      <div className={styles.products}>
        {/* {filteredProducts?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))} */}
        {filteredProducts?.map(product => (
  product && <ProductCard key={product.id} product={product} />
))}
      </div>
    </div>
  );
};

export default HomePage;
