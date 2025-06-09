import {StyleSheet, View, ScrollView, StatusBar, SafeAreaView, TouchableOpacity, Dimensions, Text, ImageBackground } from 'react-native';
import Checkbox from 'expo-checkbox';

import CourseCard from '@/components/docentify-components/CourseCard';
import GreetingSection from '@/components/docentify-components/GreetingSection';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { useState } from 'react';

const router = useRouter();

import { useLocalSearchParams } from 'expo-router';
const { id } = useLocalSearchParams();



export default function videoActivity(){
     const [isChecked, setChecked] = useState(false);

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar  backgroundColor="#111111" barStyle="light-content"/>
            <ScrollView showsVerticalScrollIndicator={false} style = {{backgroundColor: '#f6f6f6', paddingLeft: 24, paddingRight: 24}}>
                <View style ={styles.activityHeader}>
                    <Text style={styles.etiqueta}>Obrigatório</Text>
                    <Text style={styles.titulo}>Design Thinking em sala de aula</Text>
                </View>

                <ImageBackground
                                    source={{uri: 'https://unintese.com.br/wp-content/uploads/2023/07/Design-thinking3.png'}}
                                    style={styles.imageBackground}
                ></ImageBackground>
            
            


                <View style={styles.checkboxContainer}>
                    <Checkbox 
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined} />
                    <Text style={styles.checkboxLabel}>Confirmo que realizei a leitura do conteúdo.</Text>
                </View>

                <TouchableOpacity disabled={!isChecked} onPress={() => router.push('/')}>
                    <LinearGradient
                        colors={['#B4F757', '#80ED99']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[styles.botao, !isChecked && { opacity: 0.5 }]}
                    >
                        <Text style={styles.botaoTexto}>Próximo</Text>
                    </LinearGradient>
                </TouchableOpacity>
                
        </ScrollView>
        </SafeAreaView>
 
  )
};

const styles = StyleSheet.create({
   activityHeader: {
    paddingTop: 20,
    paddingBottom: 20,

  },
  etiqueta: {
    backgroundColor: '#FECF9F',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: 'bold',
    color: '#6B3D00',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#000',
    width: '100%',
    height: 200,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  subtitulo: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  descricao: {
    color: '#444',
    fontSize: 14,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
  },
  botao: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#1E1E1E',
    fontWeight: 'bold',
    fontSize: 16,
  },

  imageBackground:{
    height: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});