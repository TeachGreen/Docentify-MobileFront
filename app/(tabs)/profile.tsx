import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Platform, View, ScrollView, SafeAreaView, StatusBar, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router';

const router = useRouter();

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {

    const buscarNomeeEmail = async () => {
      const nome = await AsyncStorage.getItem('name');
      if (nome) setName(nome);
      const email = await AsyncStorage.getItem('email');
      if (email) setEmail(email);
    };
    buscarNomeeEmail();
  }, []);


  const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('email');

    // ou limpa tudo se quiser remover tudo:
    // await AsyncStorage.clear();

    router.replace('/'); // ou para onde você quiser redirecionar
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    Alert.alert('Erro', 'Não foi possível sair da conta.');
  }
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111111' }}>
          <StatusBar  backgroundColor="#111111" barStyle="light-content"/>
          <ScrollView showsVerticalScrollIndicator={false} style = {{backgroundColor: '#f6f6f6'}}>
           
           <View style={styles.container}>
              <ImageBackground
                source={require('../../assets/images/pfp.png')}
                style={styles.profileImage}
                resizeMode="cover"/>
              <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                <ThemedText style={{fontFamily: 'Poppins-SemiBold', fontSize: 24 , paddingTop: 24}}>{name}</ThemedText>
                <ThemedText style={{fontFamily: 'Poppins-Medium', fontSize: 16}}>{email}</ThemedText>
              </View>
            </View>
           
           
           <View style={styles.choicesProfile}>
               

                <TouchableOpacity style={styles.choiceContainer} onPress={() => router.push('/docentify-screens/settings')}>
                   <View style={styles.choiceIconInfo}>
                      <IconSymbol size={32} name='gear' color='#263238' />
                      <Text style={{fontFamily: 'Poppins-Medium', fontSize: 16}}>Configurações</Text>
                   </View>
                   <View>
                      <IconSymbol size={32} name='arrow-right' color='#263238' />
                   </View>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.choiceContainer} onPress={() => router.push('/docentify-screens/chatbot')}>
                   <View style={styles.choiceIconInfo}>
                      <IconSymbol size={32} name='message' color='#263238' />
                      <Text style={{fontFamily: 'Poppins-Medium', fontSize: 16}}>Chat</Text>
                   </View>
                   <View>
                      <IconSymbol size={32} name='arrow-right' color='#263238' />
                   </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.choiceContainer}>
                   <View style={styles.choiceIconInfo}>
                      <IconSymbol size={32} name='shield' color='#263238' />
                      <Text style={{fontFamily: 'Poppins-Medium', fontSize: 16}}>Suporte</Text>
                   </View>
                   <View>
                      <IconSymbol size={32} name='arrow-right' color='#263238' />
                   </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.choiceContainer} onPress={handleLogout}>
                   <View style={styles.choiceIconInfo}>
                      <IconSymbol size={32} name='door-open' color='#263238' />
                      <Text style={{fontFamily: 'Poppins-Medium', fontSize: 16}}>Encerrar sessão</Text>
                   </View>
                   <View>
                      <IconSymbol size={32} name='arrow-right' color='#263238' />
                   </View>
                </TouchableOpacity>
           </View>


          </ScrollView>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  
  container: {
    flexDirection: "row", 
    alignItems: "center",
    gap: 24,
    paddingVertical: 10,
    marginLeft: 24,
    marginTop: 40,
    marginBottom: 36
  },

  cards: {
    marginHorizontal: 6
  },
  
  trainTitleContainers: {
    flexDirection: "row", 
    justifyContent: "space-between",
    borderBottomWidth: 1.5,
    borderColor: "#263238",
    padding: 10,
    marginBottom: 16
  },

  courseContainers :{
    marginTop: 24
  },
 
  viewBody: {
    padding: 16
  },

  navHeader:{

  },

  icon: {
    fontSize: 32,
  },
  
  choiceContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E9E9E9',
    marginBottom: 16,
    marginHorizontal: 16,
    
  },

  choiceIconInfo:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, 
    overflow: 'hidden', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 50, 
  },
  
});

/* <TouchableOpacity onPress={() => router.push('/docentify-screens/updateInfo')} style={styles.choiceContainer} >
                   <View style={styles.choiceIconInfo}>
                      <IconSymbol size={32} name='id-badge' color='#263238' />
                      <Text style={{fontFamily: 'Poppins-Medium', fontSize: 16}}>Informações pessoais</Text>
                   </View>
                   <View>
                      <IconSymbol size={32} name='arrow-right' color='#263238' />
                   </View>
                </TouchableOpacity>,
                
                
                
                */