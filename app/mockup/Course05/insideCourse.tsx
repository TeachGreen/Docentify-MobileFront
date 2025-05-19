import { StyleSheet, View, ScrollView, StatusBar, ImageBackground, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

const router = useRouter();

const courseStructure = [
  {
    title: 'Introdução ao Docentify: sua plataforma de aprendizado',
    type: 'Vídeo',
    icon: 'video',
    completed:false,
    onPress: () => router.push('/mockup/Course05/videoActivity'),
  },
  /*{
    title: 'Atividade introdutória X',
    type: 'Atividade (opcional)',
    icon: 'file-text',
  },*/
 
   /*{
    title: 'Atividade introdutória X',
    type: 'Atividade (obrigatória)',
    icon: 'file-text',
  },*/
];

export default function CourseStructure() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111111' }}>
      <StatusBar backgroundColor="#111111" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#f6f6f6' }}>
        <ImageBackground
          source={{uri: 'https://s2-g1.glbimg.com/-RlCvn2pdPU21J3kGIOaDN8ddbc=/0x0:1000x667/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/f/g/vwxqkpSHCtN9ZnKvHTXQ/sesi-abre-vagas-para-cursos-ead.jpeg'}}
          style={styles.imageBackground}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
            style={styles.gradient}
          />
          <View style={styles.overlayContent}>
            <Text style={styles.moduleType}>Obrigatório</Text>
            <Text style={styles.courseTitle}>Introdução ao Docentify</Text>
            <Text style={styles.progressText}>0% concluído</Text>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Estrutura do curso</Text>

           {courseStructure.map((item, index) => {
            const Touchable = item.onPress ? TouchableOpacity : View;
            return (
              <Touchable
                key={index}
                onPress={item.onPress}
                style={styles.itemBox}
              >
                <View style={styles.iconWrapper}>
                  <IconSymbol
                    size={24}
                    name={item.completed ? 'check-circle' : item.icon}
                    color={item.completed ? '#4CAF50' : '#0288D1'}
                  />
                </View>
                <View style={styles.itemTextWrapper}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSubtitle}>{item.type}</Text>
                </View>
              </Touchable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    height: 200,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayContent: {
    zIndex: 2,
  },
  moduleType: {
    backgroundColor: '#FFA726',
    color: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
  },
  itemBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconWrapper: {
    marginRight: 16,
  },
  itemTextWrapper: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#263238',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#757575',
  },
});
