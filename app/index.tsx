import { useState } from 'react';
import {StyleSheet, View, ScrollView, StatusBar, Text, ImageBackground, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode';

const router = useRouter();

export default function HomeScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  try {
    const response = await fetch('http://wa-docentify-api-c8cddtecgqgueudb.brazilsouth-01.azurewebsites.net/api/Authentication/Login/User', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('E-mail ou senha inválidos');
    }

    const data = await response.json();
    const token = data.jwt;
    console.log('Token JWT:', data.jwt);

    const decoded: any = jwtDecode(token);
    const name = decoded?.unique_name || 'Usuário';


    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('email', email);



    router.push('/(tabs)/home'); // Navegação para a tela inicial após o login bem-sucedido
   

  } catch (error) {
    console.error(error);
    Alert.alert('Erro', 'Falha no login.');
  }
};

  return (

     <SafeAreaView style={{ flex: 1, backgroundColor: '#111111' }}>
              <StatusBar  backgroundColor="#111111" barStyle="light-content"/>
              <ScrollView showsVerticalScrollIndicator={false} style = {{backgroundColor: '#f6f6f6'}}>
               
    <View style={styles.imageContainer}>
      <ImageBackground
                      source={require('../assets/images/loginImage.png')}
                      style={styles.loginImage}
                      resizeMode="cover"/>
    </View>
    <View style={styles.containerLogin}>
    

    <Text style={styles.welcome}>Bem, vindo(a)!</Text>
        <Text style={styles.title}>Entre em sua conta</Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira seu e-mail"
          keyboardType="email-address"
          value = {email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira sua senha"
          secureTextEntry
          value = {password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
          <LinearGradient
            colors={['#A3E635', '#65A30D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.orText}>OU</Text>

        <TouchableOpacity>
          <Text style={styles.registerText}>Cadastrar conta</Text>
        </TouchableOpacity>

      </View>
      </ScrollView>
    </SafeAreaView>
  
)};

const styles = StyleSheet.create({
  loginImage:{
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer:{
    height: 256
  }, 

  containerLogin:{
    
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 32,
    paddingRight: 32,
    marginTop: 94,
  },

  welcome:{
    color: '#263238',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },

  title:{
    color: '#263238',
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 24,
  },

  label:{
    color: '#263238',
    marginBottom: 8
  },

  input:{
    height: 40,
    color: '#263238',
    borderColor: '#263238',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 16,
    width: '100%'
  },

  buttonContainer: {
    borderRadius: 22,
    overflow: 'hidden',
  },

  button: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 22,
    marginTop: 16
  },

  buttonText: {
    color: '#2D3921',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 16,
    color: '#777',
  },

  registerText: {
    textAlign: 'center',
    color: '#65A30D',
    fontWeight: 'bold',
    fontSize: 16
  },

  
});
