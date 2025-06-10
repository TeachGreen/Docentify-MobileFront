// ChatbotScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  KeyboardAvoidingView, Platform, StyleSheet, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Message {
  id: string;
  text: string;
  from: 'user' | 'bot';
}

export default function ChatbotScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [context, setContext] = useState({ tentativas: 0 });
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const name = await AsyncStorage.getItem('name');
        if (name) {
          setUserName(name);
          setMessages([{
            id: 'welcome',
            text: `Olá ${name.split(' ')[0]}! Como posso te ajudar hoje?`,
            from: 'bot'
          }]);
        }
      } catch (error) {
        console.error('Erro ao carregar nome do usuário:', error);
      }
    };

    loadUserName();
  }, []);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmedInput,
      from: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    flatListRef.current?.scrollToEnd({ animated: true });

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token não encontrado');

      const requestBody = {
  user_message: trimmedInput,
  context,
};

console.log('Enviando para o servidor:', requestBody);

        const response = await fetch('https://docentify-python-microservice-763843155433.us-east1.run.app/chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJlbWFpbCI6InBlZHJvaHRlam9uQGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiUGVkcm8gVGVqb24iLCJhdWQiOlsiVXNlcnMiLCJVc2VycyJdLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VycyIsImV4cCI6MTc0ODE3OTcyNiwiaXNzIjoiRG9jZW50aWZ5In0`,
        },
        body: JSON.stringify(requestBody),
        });

      if (!response.ok) throw new Error('Erro ao se comunicar com o servidor');

      const data = await response.json();

    


      const botMessage: Message = {
        id: Date.now().toString() + '_bot',
        text: data.message || 'Não entendi sua pergunta.',
        from: 'bot',
      };

      setMessages((prev) => [...prev, botMessage]);
      setContext(data.context || { tentativas: 0 });
      flatListRef.current?.scrollToEnd({ animated: true });

   
      
    } catch (error) {
      console.error('Erro no chatbot:', error);
      Alert.alert('Erro', 'Não foi possível obter resposta do chatbot.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.from === 'user' ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Escreva sua mensagem aqui"
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={styles.sendButton}
            disabled={loading}
          >
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eee' },
  innerContainer: { flex: 1 },
  messageList: { padding: 16, paddingBottom: 100 },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  userBubble: {
    backgroundColor: '#b2ff59',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#ccc',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#8BC34A',
    borderRadius: 20,
    padding: 10,
  },
});
