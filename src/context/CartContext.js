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
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. CARGAR DATOS AL INICIAR
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        const savedOrders = await AsyncStorage.getItem('orders');
        const savedUser = await AsyncStorage.getItem('user');

        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedOrders) setOrders(JSON.parse(savedOrders));
        if (savedUser) setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // 2. GUARDAR DATOS AUTOMÁTICAMENTE
  useEffect(() => {
    AsyncStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    AsyncStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // --- FUNCIONES DE USUARIO ---
  const loginUser = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  // --- FUNCIONES DEL CARRITO ---
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(item => item.id === product.id);
      if (existingProduct) {
        return currentCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...currentCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((currentCart) =>
      currentCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = () => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      products: [...cart],
      total: parseFloat(total.toFixed(2)),
      status: 'pending',
    };

    setOrders((currentOrders) => [newOrder, ...currentOrders]);
    clearCart();
    return newOrder;
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // 3. EL VALOR DEL CONTEXTO (Se define al final para que todas las funciones existan)
  const value = {
    user,
    cart,
    orders,
    loading,
    loginUser,
    logoutUser,
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