// ✅ examActivity.tsx
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';

import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://wa-docentify-api-c8cddtecgqgueudb.brazilsouth-01.azurewebsites.net/api';

export default function AssessmentIntro() {
  const router = useRouter();
  const { id: stepId } = useLocalSearchParams();
  const [activity, setActivity] = useState<any>(null);

  useEffect(() => {
    const fetchActivityFromStep = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token || !stepId) return;

      try {
        const response = await fetch(`${BASE_URL}/Activity/Step/${stepId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) return;
        const data = await response.json();
        return data?.id;
      } catch (error) {
        console.error('Erro ao buscar activityId:', error);
        return null;
      }
    };

    const fetchActivityData = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token || !stepId) return;

      const activityId = await fetchActivityFromStep();
      if (!activityId) return;

      const response = await fetch(`${BASE_URL}/Activity/${activityId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setActivity(data);
    };

    fetchActivityData();
  }, [stepId]);

  if (!activity) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando atividade...</Text>
      </SafeAreaView>
    );
  }

  const nota1 = activity.attempts?.find((a: any) => a.number === 1)?.score ?? '-';
  const nota2 = activity.attempts?.find((a: any) => a.number === 2)?.score ?? '-';
  const notaFinal = Math.max(nota1 !== '-' ? nota1 : 0, nota2 !== '-' ? nota2 : 0);
  const isCompleted = activity.attempts?.length >= 2 && notaFinal >= 5;

  const handleStart = () => {
    if (activity && !isCompleted) {
      router.push({
        pathname: '/docentify-screens/insideExam',
        params: { id: activity.id },
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>{activity.title}</Text>
        <Text style={styles.subtitulo}>Atividade avaliativa</Text>

        <Text style={styles.descricao}>
          Essa é uma atividade de um treinamento. Há duas tentativas para cada atividade. A maior nota entre as duas tentativas é mantida.
        </Text>

        <View style={styles.tabela}>
          <View style={styles.tabelaCabecalho}>
            <Text style={styles.tabelaCelulaCabecalho}>1ª tentativa</Text>
            <Text style={styles.tabelaCelulaCabecalho}>2ª tentativa</Text>
            <Text style={styles.tabelaCelulaCabecalho}>Nota mantida</Text>
          </View>
          <View style={styles.tabelaLinha}>
            <Text style={styles.tabelaCelula}>{nota1}</Text>
            <Text style={styles.tabelaCelula}>{nota2}</Text>
            <Text style={styles.tabelaCelula}>{notaFinal}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.botao, isCompleted && { backgroundColor: '#ccc' }]}
          onPress={handleStart}
          disabled={isCompleted}
        >
          <Text style={[styles.botaoTexto, isCompleted && { color: '#888' }]}>Iniciar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#333', fontSize: 16 },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  subtitulo: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  descricao: { fontSize: 14, color: '#444', marginBottom: 16 },
  tabela: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 24 },
  tabelaCabecalho: { flexDirection: 'row', backgroundColor: '#f0f0f0' },
  tabelaLinha: { flexDirection: 'row' },
  tabelaCelulaCabecalho: { flex: 1, padding: 10, fontWeight: 'bold', textAlign: 'center' },
  tabelaCelula: { flex: 1, padding: 10, textAlign: 'center' },
  botao: { backgroundColor: '#80ED99', paddingVertical: 14, borderRadius: 24, alignItems: 'center' },
  botaoTexto: { color: '#000', fontWeight: 'bold', fontSize: 16 },
});
