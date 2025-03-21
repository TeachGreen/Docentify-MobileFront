import { StyleSheet, Image, Platform, StatusBar, View, ScrollView, Text } from 'react-native';
import CourseGreetingSection from '@/components/docentify-components/CourseGreetingSection';
import CourseCard from '@/components/docentify-components/CourseCard';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';

const router = useRouter();

export default function CoursesScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111111' }}>
          <StatusBar  backgroundColor="#111111" barStyle="light-content"/>
            <ScrollView showsVerticalScrollIndicator={false} style = {{backgroundColor: '#f6f6f6'}}>

              <View style={styles.navHeader}>
                <View style={styles.leftContent}>
                  <IconSymbol size={32} name='gear' color='#263238' onPress={() => router.push('/docentify-screens/settings')}/>
                </View>
                <View style={styles.rightContent}>
                  <IconSymbol size={32} name='magnifying-glass' color='#263238'/>
                  <IconSymbol size={32} name='bell' color='#263238' />
                </View>
              </View>

              <View>
                <CourseGreetingSection/>
              </View>


              <View style={styles.viewBody}>
                  <View style={styles.filterSection}>
                    <View style={styles.filterTitle}>
                      <Text style={{fontSize: 24, fontFamily: 'Poppins-Medium'}}>Filtragem de treinamentos</Text>
                      <IconSymbol size={24} name='filter' color='#263238'/>
                    </View>
                    <Text style={{fontSize: 16, fontFamily: 'Poppins-Regular', color: '#53646D'}}>Utilize os filtros ou a barra de pesquisa abaixo para encontrar os treinamentos desejados.</Text>
                  </View>
              </View>

              <View style={styles.container}>
                <CourseCard style={styles.cards} title="Fotografia Profissionaaaal com Smartphone" progress={6} mandatory={true} />
                <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={6} mandatory={true} />
                <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={100} mandatory={false} />
                <CourseCard style={styles.cards} title="Fotografia Profissionaaal com Smartphone" progress={100} mandatory={false} />
                <CourseCard style={styles.cards} title="Fotografia Profissional com Smartphone" progress={50} mandatory={false} />
              </View>
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
    gap: 16
  },

  cards: {
    width: '47%'
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

  },

  viewBody: {
    padding: 24
  },

  filterTitle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },

  filterSection:{
    marginBottom: 8,
    
  }

});
