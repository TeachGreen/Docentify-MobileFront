import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';

import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';

const BASE_URL =
  'https://wa-docentify-api-c8cddtecgqgueudb.brazilsouth-01.azurewebsites.net/api';

export default function NotSubscribedCourse() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [courseData, setCourseData] = useState<any>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch(`${BASE_URL}/Course/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error('Erro ao buscar curso:', await response.text());
          return;
        }

        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error('Erro de rede:', error);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const countByType = (type: number) =>
    courseData?.steps?.filter((step: any) => step.type === type).length || 0;

  const enrollInCourse = async () => {
    if (isEnrolling) return;
    setIsEnrolling(true);

    const token = await AsyncStorage.getItem('token');
    if (!token || !id) return;

    try {
      const response = await fetch(`${BASE_URL}/Course/Enroll/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const msg = await response.text();
        console.error('Erro ao matricular:', response.status, msg);
        Alert.alert('Erro', msg || 'Não foi possível realizar a matrícula.');
        return;
      }

      Alert.alert('Sucesso', 'Matrícula realizada com sucesso!');
      router.replace(`/docentify-screens/insideCourse?id=${id}`);
    } catch (error) {
      console.error('Erro de rede ao matricular:', error);
      Alert.alert('Erro', 'Erro de rede ao tentar se matricular.');
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleActionButton = () => {
    if (courseData?.isEnrolled) {
      router.replace(`/docentify-screens/insideCourse?id=${id}`);
    } else {
      enrollInCourse();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111111' }}>
      <StatusBar backgroundColor="#111111" barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#f6f6f6' }}
      >
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
          <TouchableOpacity
            style={styles.enrollButton}
            onPress={handleActionButton}
            disabled={isEnrolling}
          >
            <Text style={styles.enrollText}>
              {isEnrolling
                ? 'Matriculando...'
                : courseData?.isEnrolled
                ? 'Continuar curso'
                : 'Realizar minha matrícula'}
            </Text>
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.content}>
          <Text style={styles.title}>{courseData?.name || 'Carregando...'}</Text>
          <Text style={styles.description}>
            {courseData?.description ||
              'Design Thinking é uma abordagem centrada no ser humano para a resolução de problemas...'}
          </Text>

          <Text style={styles.sectionTitle}>Resumo do curso</Text>

          <View style={styles.item}>
            <IconSymbol size={24} name="video" color="#263238" />
            <Text style={styles.itemText}>
              Vídeo-aulas ({countByType(1)} vídeo{countByType(1) !== 1 ? 's' : ''})
            </Text>
          </View>

          <View style={styles.item}>
            <IconSymbol size={24} name="book-bookmark" color="#263238" />
            <Text style={styles.itemText}>
              Leituras ({countByType(0)} leitura{countByType(0) !== 1 ? 's' : ''})
            </Text>
          </View>

          <View style={styles.item}>
            <IconSymbol size={24} name="image" color="#263238" />
            <Text style={styles.itemText}>
              Imagens ({countByType(2)} imagem{countByType(2) !== 1 ? 's' : ''})
            </Text>
          </View>

          <View style={styles.item}>
            <IconSymbol size={24} name="file-text" color="#263238" />
            <Text style={styles.itemText}>
              Atividades ({countByType(3)} atividade{countByType(3) !== 1 ? 's' : ''})
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    height: 250,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  enrollButton: {
    backgroundColor: '#A8E063',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 20,
  },
  enrollText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 14,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
});
