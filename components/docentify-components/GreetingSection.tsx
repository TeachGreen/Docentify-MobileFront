import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function GreetingSection() {
  const [icon, setIcon] = useState('sun');
  const [greet, setGreet] = useState('Bom dia');

  useEffect(() => {
    const currentHour = new Date().getHours();
    setIcon(currentHour >= 6 && currentHour < 18 ? 'sun' : 'moon');
    setGreet(currentHour >= 6 && currentHour < 18? 'Bom dia' : 'Boa noite');
  }, []);

  return (
    <LinearGradient
      colors={['#C8F061', '#81C995']}
      style={styles.card}
    >
      <View style={styles.greetingsIcon}>
        <Text style={styles.greeting}>
          {greet}, <Text style={styles.bold}>usuário!</Text>
        </Text>
        <FontAwesome6 name={icon} size={24} color="#142304" style={styles.icon} />
      </View>
      <Text style={styles.subText}>
        <Text style={styles.bold}>Inicie</Text> ou <Text style={styles.bold}>continue</Text> seu aprendizado em um único lugar!
      </Text>
      
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  card: {
    padding: 20,
    height: 230,
    justifyContent: 'center',
    
   
  },
  greeting: {
    fontSize: 32,
    fontWeight: '400',
    fontFamily: 'Poppins-Medium'
  },
  bold: {
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold'
  },
  subText: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'Poppins-Medium'
  },
  icon: {
    fontSize: 32,
    marginLeft: 10,
  },
  greetingsIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }	
});

