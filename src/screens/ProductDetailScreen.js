import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert,SafeAreaView,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useCart();

  if (product == false) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Producto no encontrado</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert(
      'Producto agregado',
      `${product.title} se ha añadido al carrito`,
      [
        { text: 'Ver carrito', onPress: () => navigation.navigate('MainTabs', { 
            screen: 'CartTab'}) },
        { text: 'Seguir comprando', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Imagen del producto */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Información del producto */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.rating && (
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={18} color="#ffc107" />
                <Text style={styles.rating}>
                  {product.rating.rate} ({product.rating.count})
                </Text>
              </View>
            )}
          </View>

          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {product.category.toUpperCase()}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Información adicional */}
          {product.id <= 20 && ( // Productos de Fake Store API suelen tener id <= 20
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                ✓ Envío gratis en compras mayores a $50
              </Text>
              <Text style={styles.infoText}>
                ✓ Devolución gratuita en 30 días
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Botón fijo para agregar al carrito */}
      <View style={styles.addToCartContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart-outline" size={24} color="#fff" />
          <Text style={styles.addToCartText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productImage: {
    width: '90%',
    height: 280,
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
    color: '#222',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  price: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#28a745',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3cd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  rating: {
    marginLeft: 6,
    fontSize: 15,
    fontWeight: '600',
    color: '#856404',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1976d2',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  infoBox: {
    marginTop: 25,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
  },
  infoText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 6,
  },
  addToCartContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addToCartButton: {
    backgroundColor: '#629766',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#dc3545',
  },
});

export default ProductDetailScreen;