import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RankingGreetingSection(){
    return(
        <LinearGradient
            colors={['#C8F061', '#81C995']}
            style={styles.card}
        >
            
            <Text style={styles.greeting}>
                Ranking
            </Text>
                
            <Text style={styles.subText}>
              Visualize os professores mais participativos da plataforma e encontre sua posição
            </Text>
              
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    card: {
      padding: 20,
      height: 230,
      justifyContent: 'center',
      
     
    },
    greeting: {
      fontSize: 32,
      fontWeight: '400',
      fontFamily: 'Poppins-Medium'
    },
 
    subText: {
      fontSize: 16,
      marginTop: 5,
      fontFamily: 'Poppins-Medium'
    },
    
});
  
  