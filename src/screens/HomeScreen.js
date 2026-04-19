import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert, ScrollView, } from 'react-native';

import { localProducts } from '../screens/data/LocalProducts';

const HomeScreen = ({ navigation }) => {  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // cargar productos de la API + locales
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('No se pudo conectar con la API');

      const apiProducts = await response.json();

      // Combinamos API + productos locales
      const allProducts = [...apiProducts, ...localProducts];
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    } catch (err) {
      setError(err.message);
      Alert.alert('Error de conexión', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Obtener categorias unicas (incluye "local")
  const getCategories = () => {
    const categoriesSet = new Set(products.map((p) => p.category));
    return ['all', ...Array.from(categoriesSet)];
  };

  // Filtrar por categoria
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) => p.category === category);
      setFilteredProducts(filtered);
    }
  };

  // Renderizar cada producto en grid de 2 columnas
const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => {
        navigation.navigate('ProductDetail', { product: item }); 
      }}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#358a3c" />
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProducts}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}> Mi Tienda Online</Text>
      </View>

      {/* Filtros de categoria (scroll horizontal) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {getCategories().map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => filterByCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category === 'all' ? 'Todos' : category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista de productos */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    backgroundColor: '#629766',
    paddingVertical: 18,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 16,
    color: '#fff',
  },
  categoryScroll: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#e0e0e0',
  },
categoryButton: {
  height: 36, // 
  paddingHorizontal: 16,
  marginRight: 10,
  backgroundColor: '#f1f3f5',
  borderRadius: 20,
  justifyContent: 'center', 
},
  categoryButtonActive: {
    backgroundColor: '#358a3c',
  },
  categoryText: {
    fontSize: 14,
    color: '#555',
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  listContent: {
    padding: 10,
    paddingBottom: 30,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  productImage: {
    width: '100%',
    height: 160,
    resizeMode: 'contain',
    backgroundColor: '#f8f9fa',
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    height: 52,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#28a745',
    marginTop: 4,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#629766',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default HomeScreen;