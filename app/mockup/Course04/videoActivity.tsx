import {StyleSheet, View, ScrollView, StatusBar, SafeAreaView, TouchableOpacity, Dimensions, Text } from 'react-native';
import Checkbox from 'expo-checkbox';

import CourseCard from '@/components/docentify-components/CourseCard';
import GreetingSection from '@/components/docentify-components/GreetingSection';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { useState } from 'react';

const router = useRouter();


export default function videoActivity(){
     const [isChecked, setChecked] = useState(false);
  
    const videoUrl = 'https://www.youtube.com/embed/S9uPNppGsGo?si=OVI7HMjrVm-LnEYh';

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar  backgroundColor="#111111" barStyle="light-content"/>
            <ScrollView showsVerticalScrollIndicator={false} style = {{backgroundColor: '#f6f6f6', paddingLeft: 24, paddingRight: 24}}>
                <View style ={styles.activityHeader}>
                    <Text style={styles.etiqueta}>Opcional</Text>
                    <Text style={styles.titulo}>Python básico</Text>
                </View>
               
                <View style={styles.videoContainer}>
                    <WebView
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: videoUrl }}
                    style={styles.video}
                    />
                </View>

                <Text style={styles.subtitulo}>Descrição de vídeo:</Text>
                <Text style={styles.descricao}>
                    Introdução a Python
                </Text>


                <View style={styles.checkboxContainer}>
                    <Checkbox 
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined} />
                    <Text style={styles.checkboxLabel}>Confirmo que realizei a leitura do conteúdo.</Text>
                </View>

                <TouchableOpacity disabled={!isChecked} onPress={() => router.push('/mockup/Course04/videoActivity02')}>
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
    backgroundColor: '#d4f5b3',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: 'bold',
    color: '#68BE12',
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
});