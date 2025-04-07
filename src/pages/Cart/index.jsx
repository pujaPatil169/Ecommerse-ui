import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from '../../features/cart/cartSlice';
import styles from './styles.module.css';

const CartPage = () => {
  const { items, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    } else {
      dispatch(removeItem(id));
    }
  };

  return (
    <div className={styles.container}>
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className={styles.items}>
            {items.map(item => (
              <div key={item.id} className={styles.item}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className={styles.image}
                />
                <div className={styles.details}>
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                  <div className={styles.quantity}>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => dispatch(removeItem(item.id))}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.summary}>
            <h2>Total: ${total.toFixed(2)}</h2>
            <button 
              onClick={() => dispatch(clearCart())}
              className={styles.clearButton}
            >
              Clear Cart
            </button>
            <button className={styles.checkoutButton}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
