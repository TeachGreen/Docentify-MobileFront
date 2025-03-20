import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CourseGreetingSection(){
    return(
        <LinearGradient
            colors={['#C8F061', '#81C995']}
            style={styles.card}
        >
            
            <Text style={styles.greeting}>
                Treinamentos
            </Text>
                
            <Text style={styles.subText}>
              Encontre os treinamentos que mais se encaixam com seu objetivo e necessidade atuais
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
  
  