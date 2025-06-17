import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from 'react-native';

import Checkbox from 'expo-checkbox';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

const BASE_URL = 'https://wa-docentify-api-c8cddtecgqgueudb.brazilsouth-01.azurewebsites.net/api';

export default function VideoActivity() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [isChecked, setChecked] = useState(false);
  const [stepData, setStepData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStep = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token || !id) return;

      try {
        const response = await fetch(`${BASE_URL}/Step/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error('Erro ao buscar etapa:', await response.text());
          return;
        }

        const data = await response.json();
        setStepData(data);
        setChecked(data.isCompleted);
      } catch (error) {
        console.error('Erro de rede:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStep();
  }, [id]);

  const handleCheckboxChange = async (newValue: boolean) => {
    setChecked(newValue);

    if (newValue && !stepData?.isCompleted) {
      const token = await AsyncStorage.getItem('token');
      try {
        const response = await fetch(`${BASE_URL}/Step/Complete/${stepData.id}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseText = await response.text();
        if (!response.ok) {
          console.error('Erro ao concluir a etapa:', responseText);
          return;
        }

        alert('Etapa concluída com sucesso!');
      } catch (error) {
        console.error('Erro de rede ao concluir etapa:', error);
      }
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#111' }}>
        <StatusBar backgroundColor="#111111" barStyle="light-content" />
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 50 }}>
          Carregando vídeo...
        </Text>
        <ActivityIndicator size="large" color="#80ED99" style={{ marginTop: 20 }} />
      </SafeAreaView>
    );
  }

  if (!stepData) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#111' }}>
        <StatusBar backgroundColor="#111111" barStyle="light-content" />
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 50 }}>
          Vídeo não encontrado.
        </Text>
      </SafeAreaView>
    );
  }

  const videoUrl = `https://www.youtube.com/embed/${stepData.content}`;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111111' }}>
      <StatusBar backgroundColor="#111111" barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#f6f6f6', paddingLeft: 24, paddingRight: 24 }}
      >
        <View style={styles.activityHeader}>

          <Text style={styles.titulo}>{stepData.title}</Text>
        </View>

        <View style={styles.videoContainer}>
          <WebView
            allowsFullscreenVideo
            javaScriptEnabled
            domStorageEnabled
            source={{ uri: videoUrl }}
            style={styles.video}
          />
        </View>

        <Text style={styles.subtitulo}>Descrição:</Text>
        <Text style={styles.descricao}>{stepData.description}</Text>

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={handleCheckboxChange}
            color={isChecked ? '#4630EB' : undefined}
          />
          <Text style={styles.checkboxLabel}>Confirmo que assisti ao vídeo.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  activityHeader: {
    paddingTop: 20,
    paddingBottom: 20,

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
});
