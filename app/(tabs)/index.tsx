import { Image, StyleSheet, Platform, View, ScrollView } from 'react-native';
import CourseCard from '@/components/docentify-components/CourseCard';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: 'red' }}>
      
    <View id="ongoingCourses">
      <View style={styles.trainTitleContainers}>
        <ThemedText style={styles.typeCourseView}>Meus treinamentos</ThemedText>
        <ThemedText style={styles.moreCourses}> VER MAIS</ThemedText>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={6} mandatory={true} />
          <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={6} mandatory={true} />
          <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={100} mandatory={false} />
          <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={100} mandatory={false} />
          <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={50} mandatory={false} />
        </View>
      </ScrollView>
    </View>

    <View id="newCourses">
      <View style={styles.trainTitleContainers}>
        <ThemedText style={styles.typeCourseView}>Novos na plataforma</ThemedText>
        <ThemedText style={styles.moreCourses}> VER MAIS</ThemedText>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      
        <View style={styles.container}>
          <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={6} mandatory={true} />
          <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={6} mandatory={true} />
          <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={100} mandatory={false} />
          <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={100} mandatory={false} />
          <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={50} mandatory={false} />
        </View>
      </ScrollView>
    </View>
      
    <View id="recommendationCourses">
      <View style={styles.trainTitleContainers}>
        <ThemedText style={styles.typeCourseView}>Com base no seu perfil</ThemedText>
        <ThemedText style={styles.moreCourses}> VER MAIS</ThemedText>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={6} mandatory={true} />
          <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={6} mandatory={true} />
          <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={100} mandatory={false} />
          <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={100} mandatory={false} />
          <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={50} mandatory={false} />
        </View>
      </ScrollView>
    </View>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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

  leftFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 50, // Adjust the width of the fade on the left
  },
});
