import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-Italic': require('../assets/fonts/Poppins-Italic.ttf'),
    'Poppins-LightItalic': require('../assets/fonts/Poppins-LightItalic.ttf'),
    'Poppins-MediumItalic': require('../assets/fonts/Poppins-MediumItalic.ttf'),
    'Poppins-SemiBoldItalic': require('../assets/fonts/Poppins-SemiBoldItalic.ttf'),
    'Poppins-ThinItalic': require('../assets/fonts/Poppins-ThinItalic.ttf'),
    'Poppins-BoldItalic': require('../assets/fonts/Poppins-BoldItalic.ttf'),
    'Poppins-ExtraBoldItalic': require('../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
    'Poppins-ExtraLightItalic': require('../assets/fonts/Poppins-ExtraLightItalic.ttf'),
    'Poppins-BlackItalic': require('../assets/fonts/Poppins-BlackItalic.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (

    
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />


      //Configurações
      <Stack.Screen 
        name="docentify-screens/settings" 
        options={{ headerShown: true, title: 'Configurações' }} 
      />

      //Definições de segurança
      <Stack.Screen 
        name="docentify-screens/safety" 
        options={{ headerShown: true, title: 'Definições de segurança' }}
      />

      //Redefinir senha
      <Stack.Screen 
        name="docentify-screens/redefinePassword" 
        options={{ headerShown: true, title: 'Redefinir senha' }}
      />


      //Resumo de curso opcional - não matriculado
      <Stack.Screen 
        name="docentify-screens/notSubscribedCourse" 
        options={{ headerShown: true, title: 'Resumo curso fotografia' }} 
      />

      //Dentro de curso
      <Stack.Screen 
        name="docentify-screens/insideCourse" 
        options={{ headerShown: true, title: 'Fotografia' }} 
      />

      //Atividade do tipo leitura
      <Stack.Screen 
        name="docentify-screens/readingActivity" 
        options={{ headerShown: true, title: 'Leitura introdutória' }} 
      />

      //Atividade do tipo video
      <Stack.Screen 
        name="docentify-screens/videoActivity" 
        options={{ headerShown: true, title: 'Video introdutório' }}
      />

      //Atividade do tipo infográfico
      <Stack.Screen 
        name="docentify-screens/imageActivity" 
        options={{ headerShown: true, title: 'Infográfico introdutório' }}
      />

      //Atividade do tipo questionário
      <Stack.Screen 
        name="docentify-screens/examActivity" 
        options={{ headerShown: true, title: 'Atividade avaliativa' }}
      />

      //Chatbot
      <Stack.Screen 
        name="docentify-screens/chatbot" 
        options={{ headerShown: true, title: 'Conversa com IPzinho' }}
      />

      //Atualizar informações
      <Stack.Screen 
        name="docentify-screens/updateInfo" 
        options={{ headerShown: true, title: 'Atualizar informações' }}
      />



    </Stack>
  );
}
