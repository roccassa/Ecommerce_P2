import React from 'react';
import { useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const CartScreen = ({ navigation }) => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    createOrder,
    getCartItemsCount,
  } = useCart();

  useEffect(() => {
    // Este useEffect ayuda a que la pantalla se actualice al volver al tab
  }, [cart]);

  const handleCreateOrder = () => {
    if (cart.length === 0) return;

    const newOrder = createOrder();

    Alert.alert(
      '✅ Pedido realizado',
      `Tu pedido ha sido generado exitosamente.\n\nTotal: $${newOrder.total.toFixed(2)}`,
      [
        {
          text: 'Ver mis pedidos',
          onPress: () => navigation.navigate('MainTabs', { screen: 'OrdersTab' }),
        },
        { text: 'OK', style: 'cancel' },
      ]
    );
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />

      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

        {/* Controles de cantidad */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Ionicons name="remove" size={20} color="#629766" />
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Ionicons name="add" size={20} color="#629766" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => {
              Alert.alert(
                'Eliminar producto',
                '¿Estás seguro de eliminar este producto del carrito?',
                [
                  { text: 'Cancelar', style: 'cancel' },
                  {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => removeFromCart(item.id),
                  },
                ]
              );
            }}
          >
            <Ionicons name="trash-outline" size={22} color="#dc3545" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={80} color="#ccc" />
        <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
        <Text style={styles.emptySubtitle}>
          Agrega productos desde la tienda para comenzar
        </Text>
        <TouchableOpacity
          style={styles.shopButton}
          onPress={() => navigation.navigate('MainTabs', { screen: 'HomeTab' })}
        >
          <Text style={styles.shopButtonText}>Ir a la tienda</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Carrito de Compras</Text>
        <Text style={styles.itemCount}>
          {getCartItemsCount()} {getCartItemsCount() === 1 ? 'producto' : 'productos'}
        </Text>
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* resumen del pedido  */}
      <View style={styles.summaryContainer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total a pagar:</Text>
          <Text style={styles.totalAmount}>${getCartTotal().toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCreateOrder}
        >
          <Text style={styles.checkoutButtonText}>Generar Pedido</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#358a3c',
    paddingVertical: 16,
    paddingTopop: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: '700',
    color: '#fff',
  },
  itemCount: {
    fontSize: 15,
    color: '#fff',
    opacity: 0.9,
  },
  listContent: {
    padding: 15,
    paddingBottom: 180, 
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 6,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#28a745',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#f1f3f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    marginLeft: 'auto',
    padding: 6,
  },
  summaryContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '700',
    color: '#28a745',
  },
  checkoutButton: {
    backgroundColor: '#629766',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#666',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 30,
  },
  shopButton: {
    backgroundColor: '#629766',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 10,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default CartScreen;