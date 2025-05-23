import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Configurações</Text>

      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}

/*
 - Internacionalização
 - Dark mode


*/
