import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({navigation, route}) {
  const user = route.params?.user;
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bienvenido, {user?.name || 'Usuario'}</Text>
      <View style={{height:12}} />
      <Button title="Inventario" onPress={() => navigation.navigate('Inventory')} />
      <View style={{height:8}} />
      <Button title="Ventas" onPress={() => navigation.navigate('Sales')} />
      <View style={{height:8}} />
      <Button title="Cerrar sesión" onPress={() => navigation.replace('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, justifyContent:'center', padding:20 },
  welcome:{ fontSize:20, textAlign:'center', marginBottom:20 }
});
