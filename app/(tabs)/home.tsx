import { StyleSheet, View, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import CourseCard from '@/components/docentify-components/CourseCard';
import GreetingSection from '@/components/docentify-components/GreetingSection';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

const BASE_URL = 'https://wa-docentify-api-c8cddtecgqgueudb.brazilsouth-01.azurewebsites.net/api';

const router = useRouter();

type Course = {
  id: string | number;
  name: string;
  isRequired: boolean;
  isEnrolled: boolean;
  progress: number;
};

export default function HomeScreen() {
  const [mandatoryCourses, setMandatoryCourses] = useState<Course[]>([]);
  const [optionalCourses, setOptionalCourses] = useState<Course[]>([]);

  const fetchCourses = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error("Token não encontrado");
      return [];
    }

    const response = await fetch(
      `${BASE_URL}/Course/User`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    );

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





 useEffect(() => {
  const loadCourses = async () => {
    const allCourses = await fetchCourses();
    setMandatoryCourses(allCourses.filter(course => course.isRequired));
    setOptionalCourses(allCourses.filter(course => !course.isRequired));
  };
  loadCourses();
}, []);


  const renderCourses = (courses: Course[]) =>
    courses.map((course) => (
      <CourseCard
        key={course.id}
        style={styles.cards}
        title={course.name}
        progress={course.progress || 0}
        mandatory={course.isRequired}
        onPress={() =>
  router.push(
    `/docentify-screens/${course.progress > 0 || course.isEnrolled ? 'insideCourse' : 'notSubscribedCourse'}?id=${course.id}`
  )
}

      />
    ));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111111' }}>
      <StatusBar backgroundColor="#111111" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#f6f6f6' }}>
        <View style={styles.navHeader}>
          <View style={styles.leftContent}>
            <IconSymbol size={32} name='gear' color='#263238' onPress={() => router.push('/docentify-screens/settings')} />
          </View>
          <View style={styles.rightContent}>
            <IconSymbol size={32} name='magnifying-glass' color='#263238' />
          </View>
        </View>

        <GreetingSection />

        <View style={styles.viewBody}>
          {/* Meus treinamentos */}
          <View style={styles.courseContainers}>
            <View style={styles.trainTitleContainers}>
              <ThemedText style={styles.typeCourseView}>Meus treinamentos</ThemedText>
              <ThemedText style={styles.moreCourses}>VER MAIS</ThemedText>
            </View>
            <View>
              <LinearGradient colors={["#F6F6F6", "transparent"]} style={styles.fadeLeft} />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.container}>{renderCourses(mandatoryCourses)}</View>
              </ScrollView>
              <LinearGradient colors={["transparent", "#F6F6F6"]} style={styles.fadeRight} />
            </View>
          </View>

          {/* Novos na plataforma */}
          <View style={styles.courseContainers}>
            <View style={styles.trainTitleContainers}>
              <ThemedText style={styles.typeCourseView}>Novos na plataforma</ThemedText>
              <ThemedText style={styles.moreCourses}>VER MAIS</ThemedText>
            </View>
            <View>
              <LinearGradient colors={["#F6F6F6", "transparent"]} style={styles.fadeLeft} />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.container}>{renderCourses(optionalCourses)}</View>
              </ScrollView>
              <LinearGradient colors={["transparent", "#F6F6F6"]} style={styles.fadeRight} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fadeRight: { position: "absolute", right: 0, top: 0, bottom: 0, width: 30, zIndex: 1 },
  fadeLeft: { position: "absolute", left: 0, top: 0, bottom: 0, width: 30, zIndex: 1 },
  viewBody: { padding: 24 },
  courseContainers: { marginBottom: 16 },
  container: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  cards: { marginHorizontal: 6 },
  trainTitleContainers: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1.5,
    borderColor: "#263238",
    padding: 10,
    marginBottom: 16
  },
  typeCourseView: { fontFamily: 'Poppins-SemiBold' },
  moreCourses: { fontFamily: 'Poppins-Medium' },
  navHeader: {
    width: '100%',
    backgroundColor: '#E9E9E9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24
  },
  leftContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  rightContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 32 }
});
