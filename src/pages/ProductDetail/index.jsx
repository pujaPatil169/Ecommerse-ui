import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../../features/cart/cartSlice';
import { fetchProductDetails, selectProductDetails, selectProductsStatus } from '../../features/product/productSlice';
import styles from './styles.module.css';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProductDetails);
  const status = useSelector(selectProductsStatus);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity: 1
    }));
  };

  if (status === 'loading') {
    return <div className={styles.loading}>Loading product details...</div>;
  }

  if (status === 'failed' || !product) {
    return <div className={styles.error}>Product not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.gallery}>
        <div className={styles.mainImage}>
          <img 
            src={product.images[0]} 
            alt={product.title} 
            className={styles.image}
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
        </div>
        <div className={styles.thumbnails}>
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.title} - ${index + 1}`}
              className={`${styles.thumbnail} ${
                index === 0 ? styles.active : ''
              }`}
              onClick={(e) => {
                const mainImg = document.querySelector(`.${styles.mainImage} img`);
                const thumbnails = document.querySelectorAll(`.${styles.thumbnail}`);
                
                if (mainImg) {
                  mainImg.src = image;
                }
                
                thumbnails.forEach(thumb => thumb.classList.remove(styles.active));
                e.currentTarget.classList.add(styles.active);
              }}
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg';
              }}
            />
          ))}
        </div>
      </div>
      <div className={styles.details}>
        <h1>{product.title}</h1>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        {product.category?.name && (
          <p className={styles.category}>Category: {product.category.name}</p>
        )}
        <p className={styles.description}>{product.description}</p>
        <button 
          onClick={handleAddToCart}
          className={styles.addButton}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
