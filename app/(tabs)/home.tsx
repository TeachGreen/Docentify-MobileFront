import {StyleSheet, View, ScrollView, StatusBar, Pressable } from 'react-native';
import CourseCard from '@/components/docentify-components/CourseCard';
import GreetingSection from '@/components/docentify-components/GreetingSection';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const router = useRouter();
const BASE_URL = 'http://wa-docentify-api-c8cddtecgqgueudb.brazilsouth-01.azurewebsites.net/api';

export default function HomeScreen() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          console.warn('Token não encontrado');
          return;
        }

        const response = await fetch(`${BASE_URL}/Course/User?page=1&amount=10`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar cursos');
        }

        const data = await response.json();
        setCourses(data); // Verifique se precisa usar data.items ou algo semelhante

      } catch (error) {
        console.error('Erro ao carregar cursos:', error);
      }
    };

    fetchCourses();
  }, []);


  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111111' }}>
      <StatusBar  backgroundColor="#111111" barStyle="light-content"/>
      <ScrollView showsVerticalScrollIndicator={false} style = {{backgroundColor: '#f6f6f6'}}>
        
        <View style={styles.navHeader}>
          <View style={styles.leftContent}>
            <IconSymbol size={32} name='gear' color='#263238' onPress={() => router.push('/docentify-screens/settings')}/>
          </View>
          <View style={styles.rightContent}>
              <IconSymbol size={32} name='magnifying-glass' color='#263238' />

          </View>
        </View>
        
        <View>
            <GreetingSection />
        </View>
        
        <View style={styles.viewBody}>
          <View id="ongoingCourses" style={styles.courseContainers}>
            <View style={styles.trainTitleContainers}>
              <ThemedText style={styles.typeCourseView}>Meus treinamentos</ThemedText>
              <ThemedText style={styles.moreCourses}> VER MAIS</ThemedText>
            </View>

            <View>
              <LinearGradient 
                  colors={["#F6F6F6", "rgba(246, 246, 246, 0)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.fadeLeft}
                />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.container}>
                  <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={6} mandatory={true} onPress={() => router.push('/docentify-screens/videoActivity')}/>
                  
                  <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={6} mandatory={true} onPress={() => router.push('/docentify-screens/notSubscribedCourse')} />
                  <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={100} mandatory={false} onPress={() => router.push('/(tabs)/home')}/>
                  <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={100} mandatory={false} onPress={() => router.push('/(tabs)/home')}/>
                  <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={50} mandatory={false} onPress={() => router.push('/(tabs)/home')}/>
                </View>
              </ScrollView>
              <LinearGradient colors={["rgba(246, 246, 246, 0)", "#F6F6F6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.fadeRight} />
            </View>
          </View>

          <View id="newCourses" style={styles.courseContainers}>
            <View style={styles.trainTitleContainers}>
              <ThemedText style={styles.typeCourseView}>Novos na plataforma</ThemedText>
              <ThemedText style={styles.moreCourses}> VER MAIS</ThemedText>
            </View>

            <View>
              <LinearGradient 
                  colors={["#F6F6F6", "rgba(246, 246, 246, 0)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.fadeLeft}
                />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              
                <View style={styles.container}>
                  
                </View>
              </ScrollView>
              <LinearGradient colors={["rgba(246, 246, 246, 0)", "#F6F6F6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.fadeRight} />
            </View>
          </View>
            
          <View id="recommendationCourses" style={styles.courseContainers}>
            <View style={styles.trainTitleContainers}>
              <ThemedText style={styles.typeCourseView}>Com base no seu perfil</ThemedText>
              <ThemedText style={styles.moreCourses}> VER MAIS</ThemedText>
            </View>

            <View>
              <LinearGradient 
                  colors={["#F6F6F6", "rgba(246, 246, 246, 0)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.fadeLeft}
                />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.container}>
                  <CourseCard style={styles.cards} title="Fotografia Profissionaaaal com Smartphone" progress={6} mandatory={true} onPress={() => router.push('/(tabs)/home')}/>
                  <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={6} mandatory={true} onPress={() => router.push('/(tabs)/home')}/>
                  <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={100} mandatory={false} onPress={() => router.push('/(tabs)/home')}/>
                  <CourseCard style={styles.cards} title="Fotografia Profissionaaal com Smartphone" progress={100} mandatory={false} onPress={() => router.push('/(tabs)/home')}/>
                  <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={50} mandatory={false} onPress={() => router.push('/(tabs)/home')}/>
                </View>
              </ScrollView>
              <LinearGradient colors={["rgba(246, 246, 246, 0)", "#F6F6F6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.fadeRight} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fadeRight: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 30,
    zIndex: 1,
  },

  greetingContainer: {
    marginHorizontal: 16,
  },

  fadeLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 30,
    zIndex: 1,
  },

  trainTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    
  },

  typeCourseView: {
    fontFamily: 'Poppins-SemiBold'
  },

  moreCourses:{
    fontFamily: 'Poppins-Medium'
  },


  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  
  container: {
    flexDirection: "row", 
    alignItems: "center",
    
    paddingVertical: 10
  },

  cards: {
    marginHorizontal: 6
  },
  
  trainTitleContainers: {
    flexDirection: "row", 
    justifyContent: "space-between",
    borderBottomWidth: 1.5,
    borderColor: "#263238",
    padding: 10,
    marginBottom: 16
  },

  courseContainers :{
    marginBottom: 16
  },
 
  viewBody: {
    padding: 24
  },

  navHeader:{
    width: '100%',
    backgroundColor: '#E9E9E9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24
    
  },

  icon: {
    fontSize: 32,
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

  }
  
});
