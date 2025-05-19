import {StyleSheet, View, ScrollView, StatusBar, ImageBackground, TouchableOpacity, SafeAreaView, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';


export default function NotSubscribedCourse(){
    const router = useRouter();
    return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111111' }}>
        <StatusBar  backgroundColor="#111111" barStyle="light-content"/>
          <ScrollView showsVerticalScrollIndicator={false} style = {{backgroundColor: '#f6f6f6'}}>

            <ImageBackground
                    source={require('../../assets/images/pencil.jpg')}
                    style={styles.imageBackground}
                    >

                        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.7)']} // gradiente do transparente até escuro
          style={styles.gradient}
        />
                <TouchableOpacity style={styles.enrollButton}>
                    <Text style={styles.enrollText}>Realizar minha matrícula</Text>
                </TouchableOpacity>
            </ImageBackground>
           
            <View style={styles.content}>
                <Text style={styles.title}>Design Thinking em sala de aula</Text>
                <Text style={styles.description}>
                Design Thinking é uma abordagem centrada no ser humano para a resolução de problemas, amplamente utilizada em processos de inovação...
                </Text>

                <Text style={styles.sectionTitle}>Resumo do curso</Text>

                <View style={styles.item}>
                    <IconSymbol size={24} name='video' color='#263238' />
                    <Text style={styles.itemText}>Vídeo-aulas (2 vídeos)</Text>
                </View>

                <View style={styles.item}>
                    <IconSymbol size={24} name='book-bookmark' color='#263238' />
                    <Text style={styles.itemText}>Leituras (2 leituras)</Text>
                </View>

                <View style={styles.item}>
                    <IconSymbol size={24} name='image' color='#263238' />
                    <Text style={styles.itemText}>Imagens (1 imagem)</Text>
                </View>

                <View style={styles.item}>
                    <IconSymbol size={24} name='file-text' color='#263238' />>
                    <Text style={styles.itemText}>Atividades (10 atividades)</Text>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
)}

const styles = StyleSheet.create({
   container: {
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
  },
  imageBackground: {
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  enrollButton: {
    backgroundColor: '#A8E063',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 20,
  },
  enrollText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 14,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
});