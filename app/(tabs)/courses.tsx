import { StyleSheet, StatusBar, View, ScrollView, Text, SafeAreaView } from 'react-native';
import CourseGreetingSection from '@/components/docentify-components/CourseGreetingSection';
import CourseCard from '@/components/docentify-components/CourseCard';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const router = useRouter();

const BASE_URL = 'https://wa-docentify-api-c8cddtecgqgueudb.brazilsouth-01.azurewebsites.net/api';

type Course = {
  id: number;
  name: string;
  isRequired: boolean;
  isEnrolled: boolean;
  progress: number;
};

export default function CoursesScreen() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCourses = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token não encontrado');
        return [];
      }

      const response = await fetch(`${BASE_URL}/Course/User`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`Erro ${response.status}: ${msg}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Erro ao buscar cursos:', error.message);
      return [];
    }
  };

  const fetchCourseWithSteps = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token não encontrado');
        return null;
      }

      const response = await fetch(`${BASE_URL}/Course/${id}/with-steps`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        console.error('Erro ao buscar curso com etapas:', await response.text());
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro de rede:', error);
      return null;
    }
  };

  const calculateProgress = (steps: any[]) => {
    if (!steps?.length) return 0;
    const completedSteps = steps.filter((s) => s.isCompleted).length;
    return Math.round((completedSteps / steps.length) * 100);
  };

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      const allCourses = await fetchCourses();

      const coursesWithProgress = await Promise.all(
        allCourses.map(async (course: any) => {
          const detailed = await fetchCourseWithSteps(course.id);
          const progress = detailed ? calculateProgress(detailed.steps) : 0;
          return {
            id: course.id,
            name: course.name,
            isRequired: course.isRequired,
            isEnrolled: course.isEnrolled,
            progress,
          };
        })
      );

      setCourses(coursesWithProgress);
      setLoading(false);
    };

    loadCourses();
  }, []);

  const renderCourses = (courses: Course[]) =>
    courses.map((course) => (
      <CourseCard
        key={course.id}
        style={styles.cards}
        title={course.name}
        progress={course.progress}
        mandatory={course.isRequired}
        onPress={() =>
          router.push(
            `/docentify-screens/${
              course.progress > 0 || course.isEnrolled ? 'insideCourse' : 'notSubscribedCourse'
            }?id=${course.id}`
          )
        }
      />
    ));

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#111' }}>
        <StatusBar backgroundColor="#111111" barStyle="light-content" />
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 50 }}>Carregando cursos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111111' }}>
      <StatusBar backgroundColor="#111111" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#f6f6f6' }}>
        <View style={styles.navHeader}>
          <View style={styles.leftContent}>
            <IconSymbol size={32} name="gear" color="#263238" onPress={() => router.push('/docentify-screens/settings')} />
          </View>
          <View style={styles.rightContent}>
            <IconSymbol size={32} name="magnifying-glass" color="#263238" />
          </View>
        </View>

        <View>
          <CourseGreetingSection />
        </View>

        <View style={styles.viewBody}>
          <View style={styles.filterSection}>
            <View style={styles.filterTitle}>
              <Text style={{ fontSize: 24, fontFamily: 'Poppins-Medium' }}>Todos os treinamentos</Text>
            </View>
            <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', color: '#53646D' }}>
              Navegue pelos treinamentos disponíveis para sua instituição.
            </Text>
          </View>
        </View>

        <View style={styles.container}>{renderCourses(courses)}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },

  cards: {
    width: '47%',
  },

  navHeader: {
    width: '100%',
    backgroundColor: '#E9E9E9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },

  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },

  viewBody: {
    padding: 24,
  },

  filterTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  filterSection: {
    marginBottom: 8,
  },
});
