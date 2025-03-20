import { Image, StyleSheet, Platform, View, ScrollView } from 'react-native';
import CourseCard from '@/components/docentify-components/CourseCard';
import GreetingSection from '@/components/docentify-components/GreetingSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      
      <View style={styles.navHeader}>

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
                <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={6} mandatory={true} />
                <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={6} mandatory={true} />
                <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={100} mandatory={false} />
                <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={100} mandatory={false} />
                <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={50} mandatory={false} />
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
                <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={6} mandatory={true} />
                <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={6} mandatory={true} />
                <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={100} mandatory={false} />
                <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={100} mandatory={false} />
                <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphoness" progress={50} mandatory={false} />
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
                <CourseCard style={styles.cards} title="Fotografia Profissionaaaal com Smartphone" progress={6} mandatory={true} />
                <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={6} mandatory={true} />
                <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={100} mandatory={false} />
                <CourseCard style={styles.cards} title="Fotografia Profissionaaal com Smartphone" progress={100} mandatory={false} />
                <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={50} mandatory={false} />
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
    marginTop: 20,
    marginBottom: 10,
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
    marginTop: 24
  },
 
  viewBody: {
    padding: 16
  },

  navHeader:{

  },

  icon: {
    fontSize: 32,
  },
  
});
