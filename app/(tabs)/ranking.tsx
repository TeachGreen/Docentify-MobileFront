import { StyleSheet, StatusBar, ScrollView, View, Text, FlatList } from 'react-native';
import RankingGreetingSection from '@/components/docentify-components/RankingGreetingSection';
import Table from '@/components/docentify-components/generalUi/RankingTable';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const router = useRouter();

const data = [
  { id: '1', name: 'React Native', duration: '4 weeks' },
  { id: '2', name: 'JavaScript', duration: '6 weeks' },
  { id: '3', name: 'UI/UX Design', duration: '3 weeks' },
];


export default function RankingScreen() {
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
          <RankingGreetingSection/>
        </View>

        <View style={styles.viewBody}>
          <View style={styles.filterSection}>
            <View style={styles.filterTitle}>
              <Text style={{fontSize: 24, fontFamily: 'Poppins-Medium'}}>Filtragem de ranking</Text>
              <IconSymbol size={24} name='filter' color='#263238'/>
            </View>
            <Text style={{fontSize: 16, fontFamily: 'Poppins-Regular', color: '#53646D'}}>Utilize o filtros ou a barra de pesquisa abaixo para navegar pelo ranking de professores mais participativos na plataforma.</Text>
          </View>
        </View>

        <Table/>

        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navHeader:{
    width: '100%',
    backgroundColor: '#E9E9E9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24
    
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
    gap:32,
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
    
  },

  

 

});
