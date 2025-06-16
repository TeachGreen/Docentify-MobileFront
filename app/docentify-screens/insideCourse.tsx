import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL =
  'https://wa-docentify-api-c8cddtecgqgueudb.brazilsouth-01.azurewebsites.net/api';

export default function InsideCourse() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchCourseWithSteps = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token || !id) return;

        try {
          const response = await fetch(`${BASE_URL}/Course/${id}/with-steps`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            console.error('Erro ao buscar curso com etapas:', await response.text());
            return;
          }

          const data = await response.json();
          setCourseData(data);
        } catch (error) {
          console.error('Erro de rede:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchCourseWithSteps();
    }, [id])
  );

  const navigateToActivity = (type: number, id: number) => {
    if (!id) {
      console.warn('Sem activityId');
      return;
    }

    switch (type) {
      case 1:
        router.push(`/docentify-screens/readingActivity?id=${id}`);
        break;
      case 2:
        router.push(`/docentify-screens/videoActivity?id=${id}`);
        break;
      case 3:
        router.push(`/docentify-screens/examActivity?id=${id}`);
        break;
      default:
        console.warn('Tipo desconhecido:', type);
        break;
    }
  };

  const getProgressPercentage = () => {
    if (!courseData?.steps?.length) return 0;
    const completedSteps = courseData.steps.filter((s: any) => s.isCompleted).length;
    const totalSteps = courseData.steps.length;
    return Math.round((completedSteps / totalSteps) * 100);
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#111' }}>
        <StatusBar backgroundColor="#111111" barStyle="light-content" />
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 50 }}>
          Carregando curso...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111111' }}>
      <StatusBar backgroundColor="#111111" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#f6f6f6' }}>
        <ImageBackground
          source={
            courseData?.image
              ? { uri: courseData.image }
              : require('../../assets/images/pencil.jpg')
          }
          style={styles.imageBackground}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
            style={styles.gradient}
          />
          <View style={styles.overlayContent}>
            <Text style={styles.moduleType}>
              {courseData?.isRequired ? 'Obrigatório' : 'Opcional'}
            </Text>
            <Text style={styles.courseTitle}>{courseData?.name}</Text>
            <Text style={styles.progressText}>
              Progresso do curso: {getProgressPercentage()}%
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Estrutura do curso</Text>

          {courseData?.steps?.map((step: any, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigateToActivity(step.type, step.id)}
              style={styles.itemBox}
            >
              <View style={styles.iconWrapper}>
                <IconSymbol
                  size={24}
                  name={step.isCompleted ? 'check-circle' : mapStepIcon(step.type)}
                  color={step.isCompleted ? '#4CAF50' : '#0288D1'}
                />
              </View>
              <View style={styles.itemTextWrapper}>
                <Text style={styles.itemTitle}>{step.title}</Text>
                <Text style={styles.itemSubtitle}>{mapStepType(step.type)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Traduz tipo numérico para nome
const mapStepType = (type: number) => {
  switch (type) {
    case 1: return 'Leitura';
    case 2: return 'Vídeo';
    case 3: return 'Atividade';
    default: return 'Desconhecido';
  }
};

// Mapeia tipo numérico para ícone
const mapStepIcon = (type: number) => {
  switch (type) {
    case 1: return 'book-bookmark';
    case 2: return 'video';
    case 3: return 'file-text';
    default: return 'file';
  }
};

const styles = StyleSheet.create({
  imageBackground: {
    height: 200,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayContent: {
    zIndex: 2,
  },
  moduleType: {
    backgroundColor: '#FFA726',
    color: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
  },
  itemBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconWrapper: {
    marginRight: 16,
  },
  itemTextWrapper: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#263238',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#757575',
  },
});
