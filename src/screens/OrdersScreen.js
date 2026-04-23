import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { format } from 'date-fns';

const OrdersScreen = () => {
    //const { orders } = useCart();
    const { orders, deleteOrder, updateOrderStatus } = useCart();

    // 2. Función para confirmar eliminación
    const handleDeleteOrder = (id) => {
        Alert.alert(
            'Eliminar Pedido',
            '¿Estás seguro de que quieres eliminar este pedido del historial?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', style: 'destructive', onPress: () => deleteOrder(id) }
            ]
        );
    };

    const renderOrderItem = ({ item }) => {
        const orderDate = new Date(item.date);

        return (
            <View style={styles.orderCard}>
                <View style={styles.orderHeader}>
                    <View>
                        <Text style={styles.orderId}>Pedido #{item.id.slice(-6)}</Text>
                        <Text style={styles.orderDate}>
                            {format(orderDate, 'dd MMMM yyyy - HH:mm')}
                        </Text>
                    </View>
                    
                    {/* BOTÓN PARA EDITAR ESTADO (Update) */}
                    <TouchableOpacity 
                        style={[
                            styles.statusContainer, 
                            { backgroundColor: item.status === 'pending' ? '#fff3cd' : '#d4edda' }
                        ]}
                        onPress={() => {
                            const nextStatus = item.status === 'pending' ? 'completed' : 'pending';
                            updateOrderStatus(item.id, nextStatus);
                        }}>
                        <Text style={[
                            styles.statusText, 
                            { color: item.status === 'pending' ? '#856404' : '#155724' }]}>
                            {item.status === 'pending' ? 'Pendiente ⏳' : 'Completado ✅'}
                        </Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.productsList}>
                    {item.products.map((product, index) => (
                        <View key={index} style={styles.productRow}>
                            <Text style={styles.productName} numberOfLines={1}>
                                {product.title}
                            </Text>
                            <Text style={styles.productQuantity}>x{product.quantity}</Text>
                            <Text style={styles.productSubtotal}>
                                ${(product.price * product.quantity).toFixed(2)}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.orderFooter}>
                <View>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalAmount}>${item.total.toFixed(2)}</Text>
                </View>

                {/* BOTÓN PARA ELIMINAR (Delete) */}
                <TouchableOpacity 
                    style={styles.deleteOrderButton}
                    onPress={() => handleDeleteOrder(item.id)}
                >
                    <Ionicons name="trash-outline" size={20} color="#dc3545" />
                    <Text style={styles.deleteText}>Eliminar</Text>
                </TouchableOpacity>
            </View>


            </View>
        );
    };

    if (orders.length === 0) {
        return (
            <SafeAreaView style={styles.emptyContainer}>
                <Ionicons name="receipt-outline" size={80} color="#ccc" />
                <Text style={styles.emptyTitle}>No tienes pedidos aún</Text>
                <Text style={styles.emptySubtitle}>
                    Cuando realices tu primer pedido aparecerá aquí
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mis Pedidos</Text>
                <Text style={styles.orderCount}>
                    {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'}
                </Text>
            </View>

            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={renderOrderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        backgroundColor: '#629766',
        paddingVertical: 16,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginTop: 16,
        fontWeight: '700',
        color: '#fff',
    },
    orderCount: {
        fontSize: 15,
        color: '#fff',
        opacity: 0.9,
    },
    listContent: {
        padding: 15,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 15,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 4,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 14,
    },
    orderId: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
    },
    orderDate: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    statusContainer: {
        backgroundColor: '#d4edda',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#155724',
    },
    productsList: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
        paddingVertical: 12,
        marginBottom: 12,
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    productName: {
        flex: 1,
        fontSize: 14,
        color: '#444',
    },
    productQuantity: {
        fontSize: 14,
        color: '#666',
        marginHorizontal: 12,
    },
    productSubtotal: {
        fontSize: 14,
        fontWeight: '600',
        color: '#28a745',
    },
    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: '700',
        color: '#28a745',
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
    },
    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    deleteOrderButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#fff5f5',
    },
    deleteText: {
        color: '#dc3545',
        marginLeft: 5,
        fontWeight: '600',
        fontSize: 14,
    },
    statusContainer: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
});

export default OrdersScreen;
