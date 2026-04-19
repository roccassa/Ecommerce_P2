import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // cargar carrito y pedidos desde AsyncStorage al iniciar
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        const savedOrders = await AsyncStorage.getItem('orders');

        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedOrders) setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Guardar carrito en AsyncStorage cada vez que cambie
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error guardando carrito:', error);
      }
    };
    saveCart();
  }, [cart]);

  // Guardar pedidos en AsyncStorage cada vez que cambie
  useEffect(() => {
    const saveOrders = async () => {
      try {
        await AsyncStorage.setItem('orders', JSON.stringify(orders));
      } catch (error) {
        console.error('Error guardando pedidos:', error);
      }
    };
    saveOrders();
  }, [orders]);

  // Agregar producto al carrito
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(item => item.id === product.id);

      if (existingProduct) {
        // Si ya existe, aumentar cantidad
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no existe, agregarlo con cantidad 1
        return [...currentCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Modificar cantidad de un producto
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCart((currentCart) =>
      currentCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter(item => item.id !== productId));
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Crear un pedido a partir del carrito actual
  const createOrder = () => {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      products: [...cart],
      total: parseFloat(total.toFixed(2)),
      status: 'pending', // pending, completed, cancelled
    };

    setOrders((currentOrders) => [newOrder, ...currentOrders]);
    clearCart(); // Vaciar carrito después de crear el pedido

    return newOrder;
  };

  // Calcular total del carrito
  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Calcular cantidad total de items en el carrito
  const getCartItemsCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const value = {
    cart,
    orders,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    createOrder,
    getCartTotal,
    getCartItemsCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};