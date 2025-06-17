// ✅ insideExam.tsx
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://wa-docentify-api-c8cddtecgqgueudb.brazilsouth-01.azurewebsites.net/api';

export default function InsideExam() {
  const { id: activityId } = useLocalSearchParams();
  const router = useRouter();
  const [activity, setActivity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(600);
  const [selectedOptions, setSelectedOptions] = useState<{ [questionId: string]: string }>({});

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60).toString().padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  useEffect(() => {
    const fetchActivity = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token || !activityId) return;

      try {
        const response = await fetch(`${BASE_URL}/Activity/${activityId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Erro ao carregar atividade:', errorText);
          return;
        }

        const data = await response.json();
        setActivity(data);
      } catch (error) {
        console.error('Erro ao carregar atividade:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [activityId]);

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const calculateScore = (): number => {
    let correctCount = 0;
    activity.questions.forEach((q: any) => {
      const selected = selectedOptions[q.id];
      const correctOption = q.options.find((opt: any) => opt.isCorrect);
      if (selected && correctOption?.id === selected) {
        correctCount++;
      }
    });
    const score = (correctCount / activity.questions.length) * 10;
    return Math.round(score * 10) / 10;
  };

  const handleSubmit = async () => {
    if (!activity) return;

    const score = calculateScore();
    const attemptNumber = activity.attempts?.length + 1 || 1;
    const updatedAttempts = [...(activity.attempts || []), { number: attemptNumber, score }];
    const highest = Math.max(...updatedAttempts.map((a: any) => a.score));

    const finalAttempts =
      updatedAttempts.length >= 2 && highest < 5 ? [] : updatedAttempts;

    const updatedActivity = {
      ...activity,
      attempts: finalAttempts,
    };

    setActivity(updatedActivity);
    setSelectedOptions({});

    if (finalAttempts.length >= 2 && highest >= 5) {
      alert('Atividade concluída com sucesso! Nota mantida: ' + highest);
    } else if (finalAttempts.length >= 2 && highest < 5) {
      alert('Você não atingiu a nota mínima. Suas tentativas foram reiniciadas. Tente novamente.');
    } else {
      alert(`Tentativa ${attemptNumber} enviada! Nota: ${score}`);
    }

    router.replace({
      pathname: '/docentify-screens/examActivity',
      params: { id: activityId },
    });
  };

  if (loading || !activity) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.loading}>Carregando atividade...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />



      <ScrollView style={styles.scrollContent}>
        {activity.questions?.map((question: any, index: number) => (
          <View key={index} style={styles.questionBlock}>
            <Text style={styles.questionText}>Questão {index + 1}</Text>
            <Text style={styles.statement}>{question.statement}</Text>
            {question.options?.map((option: any, idx: number) => {
              const isSelected = selectedOptions[question.id] === option.id;
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() => handleOptionSelect(question.id, option.id)}
                  style={[styles.optionButton, isSelected && styles.optionSelected]}
                >
                  <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                    {option.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Enviar avaliação</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loading: { fontSize: 16, color: '#333' },
  header: { padding: 16, borderBottomWidth: 1, borderColor: '#eee', backgroundColor: '#f9f9f9' },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  timer: { fontSize: 14, color: '#555' },
  attemptInfo: { fontSize: 13, color: '#888', marginTop: 4 },
  scrollContent: { padding: 16, marginBottom: 100 },
  questionBlock: { marginBottom: 24 },
  questionText: { fontWeight: 'bold', fontSize: 15, marginBottom: 4 },
  statement: { fontSize: 14, color: '#222', marginBottom: 12 },
  optionButton: { backgroundColor: '#eee', padding: 12, borderRadius: 8, marginBottom: 8 },
  optionSelected: { backgroundColor: '#cdeccd', borderWidth: 1, borderColor: '#5cb85c' },
  optionText: { fontSize: 14 },
  optionTextSelected: { color: '#1b5e20', fontWeight: 'bold' },
  submitButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#80ED99',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    elevation: 2,
  },
  submitText: { fontWeight: 'bold', fontSize: 16, color: '#000' },
});
