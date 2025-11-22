import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import db from '../data/db';

export default function LoginScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = db.users.find(u => u.username === username && u.password === password);
    if(user) {
      navigation.replace('Home', { user });
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos. Usa admin / admin123');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hilo Enredado</Text>
      <TextInput placeholder="Usuario" value={username} onChangeText={setUsername} style={styles.input} autoCapitalize="none" />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Entrar" onPress={handleLogin} />
      <View style={{height:10}} />
      <Button title="Entrar como invitado" onPress={() => navigation.replace('Home', { user: {name:'Invitado'} })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, justifyContent:'center', padding:20 },
  title:{ fontSize:28, fontWeight:'bold', textAlign:'center', marginBottom:20 },
  input:{ borderWidth:1, padding:10, marginBottom:12, borderRadius:6 }
});
