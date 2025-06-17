import { StyleSheet, View, ScrollView, StatusBar, SafeAreaView, Text } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IconSymbol } from '@/components/ui/IconSymbol';
import GreetingSection from '@/components/docentify-components/GreetingSection';
import CourseCard from '@/components/docentify-components/CourseCard';
import { ThemedText } from '@/components/ThemedText';

const BASE_URL = 'https://wa-docentify-api-c8cddtecgqgueudb.brazilsouth-01.azurewebsites.net/api';

type Course = {
  id: number;
  name: string;
  isRequired: boolean;
  isEnrolled: boolean;
  progress: number;
};

export default function HomeScreen() {
  const router = useRouter();
  const [mandatoryCourses, setMandatoryCourses] = useState<Course[]>([]);
  const [optionalCourses, setOptionalCourses] = useState<Course[]>([]);
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

    setMandatoryCourses(coursesWithProgress.filter((c) => c.isRequired));
    setOptionalCourses(coursesWithProgress.filter((c) => !c.isRequired));
    setLoading(false);
  };

  // Atualiza sempre que volta pra tela
  useFocusEffect(
    useCallback(() => {
      loadCourses();
    }, [])
  );

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
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 50 }}>
          Carregando cursos...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111111' }}>
      <StatusBar backgroundColor="#111111" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#f6f6f6' }}>
        <View style={styles.navHeader}>
          <View style={styles.leftContent}>
            <IconSymbol
              size={32}
              name="gear"
              color="#263238"
              onPress={() => router.push('/docentify-screens/settings')}
            />
          </View>
          <View style={styles.rightContent}>
            
          </View>
        </View>

        <GreetingSection />

        <View style={styles.viewBody}>
          <View style={styles.courseContainers}>
            <View style={styles.trainTitleContainers}>
              <ThemedText style={styles.typeCourseView}>Meus treinamentos obrigatórios</ThemedText>
              <ThemedText style={styles.moreCourses} onPress={() => router.push('/(tabs)/courses')}>
                VER MAIS
              </ThemedText>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.container}>{renderCourses(mandatoryCourses)}</View>
            </ScrollView>
          </View>

          <View style={styles.courseContainers}>
            <View style={styles.trainTitleContainers}>
              <ThemedText style={styles.typeCourseView}>Outros cursos na plataforma</ThemedText>
              <ThemedText style={styles.moreCourses} onPress={() => router.push('/(tabs)/courses')}>
                VER MAIS
              </ThemedText>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.container}>{renderCourses(optionalCourses)}</View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fadeRight: { position: 'absolute', right: 0, top: 0, bottom: 0, width: 30, zIndex: 1 },
  fadeLeft: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 30, zIndex: 1 },
  viewBody: { padding: 24 },
  courseContainers: { marginBottom: 16 },
  container: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  cards: { marginHorizontal: 6 },
  trainTitleContainers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderColor: '#263238',
    padding: 10,
    marginBottom: 16,
  },
  typeCourseView: { fontFamily: 'Poppins-SemiBold' },
  moreCourses: { fontFamily: 'Poppins-Medium' },
  navHeader: {
    width: '100%',
    backgroundColor: '#E9E9E9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  leftContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  rightContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 32 },
});
