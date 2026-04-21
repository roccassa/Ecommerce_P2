import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {
  // --- ESTADOS GLOBALES ---
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        
        const [sCart, sOrders, sUser] = await Promise.all([
          AsyncStorage.getItem('cart'),
          AsyncStorage.getItem('orders'),
          AsyncStorage.getItem('user'),
        ]);

        if (sCart) setCart(JSON.parse(sCart));
        if (sOrders) setOrders(JSON.parse(sOrders));
        if (sUser) setUser(JSON.parse(sUser));
      } catch (e) {
        console.error("Error en la sincronización de datos:", e);
      } finally {
        setLoading(false);
      }
    };
    bootstrapAsync();
  }, []);

  
  useEffect(() => { AsyncStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { AsyncStorage.setItem('orders', JSON.stringify(orders)); }, [orders]);

  // --- MÉTODOS DE USUARIO ---
  const loginUser = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  // --- MÉTODOS DEL CARRITO ---
  const addToCart = (product) => {
    setCart(curr => {
      const exists = curr.find(i => i.id === product.id);
      return exists 
        ? curr.map(i => i.id === product.id ? {...i, quantity: i.quantity + 1} : i)
        : [...curr, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, q) => {
    setCart(curr => curr.map(i => i.id === id ? {...i, quantity: Math.max(1, q)} : i));
  };

  const removeFromCart = (id) => {
    setCart(curr => curr.filter(i => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const createOrder = () => {
    if (cart.length === 0) return;
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      products: [...cart],
      total: cart.reduce((s, i) => s + i.price * i.quantity, 0),
      status: 'pending'
    };
    setOrders(curr => [newOrder, ...curr]);
    clearCart();
    return newOrder;
  };

  const getCartTotal = () => cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const getCartItemsCount = () => cart.reduce((s, i) => s + i.quantity, 0);

  // --- VALORES EXPUESTOS ---
  const value = {
    user, cart, orders, loading,
    loginUser, logoutUser,
    addToCart, updateQuantity, removeFromCart,
    clearCart, createOrder, getCartTotal, getCartItemsCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};