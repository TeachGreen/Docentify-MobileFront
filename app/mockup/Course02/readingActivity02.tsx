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

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar  backgroundColor="#111111" barStyle="light-content"/>
            <ScrollView showsVerticalScrollIndicator={false} style = {{backgroundColor: '#f6f6f6', paddingLeft: 24, paddingRight: 24}}>
                <View style ={styles.activityHeader}>
                    <Text style={styles.etiqueta}>Opcional</Text>
                    <Text style={styles.titulo}>Fotografia com Smartphone</Text>
                </View>
            
                <Text style={styles.subtitulo}>Utilizando editores de imagem</Text>
                <Text style={styles.descricao}>
                   Depois de capturar uma boa foto, a edição é a etapa que transforma um bom clique em uma imagem incrível. Os editores de imagem são ferramentas essenciais para realçar cores, ajustar a iluminação, corrigir imperfeições e até dar um toque artístico às suas fotos.
                                       {'\n'}
                                       Hoje em dia, há diversos aplicativos acessíveis e fáceis de usar diretamente no smartphone, como Snapseed, Lightroom Mobile, VSCO e até o próprio editor nativo da galeria. Com eles, você pode controlar aspectos como brilho, contraste, saturação, nitidez e aplicar filtros que reforçam o estilo da sua imagem.
                                       {'\n'}
                                       Mas é importante lembrar: a edição deve valorizar a foto, e não esconder seus elementos. Por isso, o ideal é sempre começar com pequenos ajustes, observando como cada alteração afeta o resultado final. Com a prática, você desenvolverá um olhar mais apurado e descobrirá seu próprio estilo de edição.
                </Text>


                <View style={styles.checkboxContainer}>
                    <Checkbox 
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined} />
                    <Text style={styles.checkboxLabel}>Confirmo que realizei a leitura do conteúdo.</Text>
                </View>

                <TouchableOpacity disabled={!isChecked} onPress={() => router.push('/mockup/Course02/readingActivity03')}>
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