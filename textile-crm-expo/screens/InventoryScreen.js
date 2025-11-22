import React, {useState} from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput, Alert } from 'react-native';
import db from '../data/db';

export default function InventoryScreen() {
  const [products, setProducts] = useState(db.products);
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const addProduct = () => {
    if(!name || !sku) { Alert.alert('Error','Ingrese nombre y SKU'); return; }
    const newProduct = { id: db.nextIds.product++, sku, name, stock: parseInt(stock||0), price: parseFloat(price||0) };
    db.products.push(newProduct);
    setProducts([...db.products]);
    setName(''); setSku(''); setPrice(''); setStock('');
  };

  const removeProduct = (id) => {
    const idx = db.products.findIndex(p=>p.id===id);
    if(idx>=0) {
      db.products.splice(idx,1);
      setProducts([...db.products]);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={{fontWeight:'bold'}}>{item.name} ({item.sku})</Text>
      <Text>Stock: {item.stock}   Precio: {item.price}</Text>
      <View style={{flexDirection:'row', marginTop:8}}>
        <Button title="Eliminar" onPress={() => removeProduct(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventario</Text>
      <FlatList data={products} keyExtractor={p=>p.id.toString()} renderItem={renderItem} />
      <View style={{height:12}} />
      <Text style={{fontWeight:'bold'}}>Agregar producto</Text>
      <TextInput placeholder="SKU" value={sku} onChangeText={setSku} style={styles.input} />
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Precio" value={price} onChangeText={setPrice} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Stock" value={stock} onChangeText={setStock} style={styles.input} keyboardType="numeric" />
      <Button title="Agregar" onPress={addProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:16 },
  title:{ fontSize:22, fontWeight:'bold', marginBottom:8 },
  item:{ padding:10, borderWidth:1, borderRadius:6, marginBottom:8 },
  input:{ borderWidth:1, padding:8, marginBottom:8, borderRadius:6 }
});
