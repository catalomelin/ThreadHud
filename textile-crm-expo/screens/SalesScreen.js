import React, {useState} from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput, Alert } from 'react-native';
import db from '../data/db';

export default function SalesScreen() {
  const [products] = useState(db.products);
  const [cart, setCart] = useState([]);
  const [sales, setSales] = useState(db.sales);
  const [productId, setProductId] = useState('');
  const [qty, setQty] = useState('');

  const addToCart = () => {
    const pid = parseInt(productId);
    const q = parseInt(qty||0);
    const product = db.products.find(p=>p.id===pid);
    if(!product) { Alert.alert('Error','Producto no encontrado'); return; }
    if(q<=0) { Alert.alert('Error','Cantidad inválida'); return; }
    if(product.stock < q) { Alert.alert('Error','Stock insuficiente'); return; }
    const item = { productId: pid, qty: q, price: product.price, name: product.name };
    setCart([...cart, item]);
    setProductId(''); setQty('');
  };

  const checkout = () => {
    if(cart.length===0) { Alert.alert('Carrito vacío'); return; }
    let total = 0;
    cart.forEach(it => {
      const p = db.products.find(pp=>pp.id===it.productId);
      p.stock -= it.qty;
      total += it.qty * it.price;
    });
    const sale = { id: db.nextIds.sale++, items: cart, total, date: new Date().toISOString().slice(0,10) };
    db.sales.push(sale);
    setSales([...db.sales]);
    setCart([]);
    Alert.alert('Venta registrada', `Total: ${total}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ventas</Text>
      <Text style={{fontWeight:'bold'}}>Productos disponibles</Text>
      <FlatList data={products} keyExtractor={p=>p.id.toString()} renderItem={({item})=>(
        <View style={{padding:8, borderWidth:1, marginVertical:4, borderRadius:6}}>
          <Text>{item.name} ({item.sku}) - Stock: {item.stock} - Precio: {item.price}</Text>
        </View>
      )} />
      <View style={{height:12}} />
      <Text style={{fontWeight:'bold'}}>Agregar al carrito (usar id)</Text>
      <TextInput placeholder="Product ID" value={productId} onChangeText={setProductId} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Cantidad" value={qty} onChangeText={setQty} style={styles.input} keyboardType="numeric" />
      <Button title="Agregar" onPress={addToCart} />
      <View style={{height:12}} />
      <Text style={{fontWeight:'bold'}}>Carrito</Text>
      <FlatList data={cart} keyExtractor={(_,i)=>i.toString()} renderItem={({item})=>(
        <Text>{item.name} x {item.qty} = {item.qty * item.price}</Text>
      )} />
      <View style={{height:8}} />
      <Button title="Registrar venta" onPress={checkout} />
      <View style={{height:12}} />
      <Text style={{fontWeight:'bold'}}>Historial de ventas</Text>
      <FlatList data={sales} keyExtractor={s=>s.id.toString()} renderItem={({item})=>(
        <View style={{padding:8, borderWidth:1, marginVertical:4, borderRadius:6}}>
          <Text>Venta #{item.id} - {item.date} - Total: {item.total}</Text>
          {item.items.map((it,idx)=> <Text key={idx}> - {it.name} x{it.qty}</Text>)}
        </View>
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:12 },
  title:{ fontSize:22, fontWeight:'bold', marginBottom:8 },
  input:{ borderWidth:1, padding:8, marginBottom:8, borderRadius:6 }
});
