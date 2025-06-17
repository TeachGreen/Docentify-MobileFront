import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const data = [
    { id: '1', position: '1º' , name: 'Pedro Tejon', points: '100', email: 'pedrohtejon@gmail.com' },
    { id: '2', position: '2º' , name: 'Giovanna Andreoli', points: '67', email: 'gibsandreoli@gmail.com' },
    { id: '3', position: '3º' , name: 'Fabiana Gonçalves', points: '33', email: 'fabigonca336@gmail.com' },
    { id: '4', position: '4º' , name: 'Ana Cristina', points: '30', email: 'analuciocristina345@gmail.com' },
    { id: '5', position: '5º' , name: 'Bruno Varani', points: '25', email: 'varaninbruno12@gmail.com' },
    { id: '6', position: '6º' , name: 'André Duarte', points: '0', email: 'duarteandre258@gmail.com' },
    { id: '7', position: '7º' , name: 'Luiz Flávio', points: '0', email: 'luizflavioa65@gmail.com' },
    { id: '8', position: '8º' , name: 'Patrícia Queiroga', points: '0', email: 'patriciapontes258@outlook.com' },
    { id: '9', position: '9º' , name: 'Ana Giulia', points: '0', email: 'nagiuxcontact@gmail.com' },
    { id: '10', position: '10º' , name: 'Renan Victor', points: '0', email: 'renanv086@gmail.com' },
];

const Table = () => {
  return (
    <View style={styles.container}>
     
      <View style={[styles.row, styles.headerBackground]}>
        <Text style={styles.header}>Colocação</Text>
        <Text style={styles.header}>Nome</Text>
        <Text style={styles.header}>Pontuação</Text>
        <Text style={styles.header}>E-mail</Text>
      </View>

   
      <FlatList nestedScrollEnabled={true}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.position}</Text>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.points}</Text>
            <Text style={styles.cell}>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 10,
    marginBottom: 24
  },

  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    paddingVertical: 8, 
    borderLeftWidth: 1, 
    borderRightWidth: 1 
  },

  header: { 
    flex: 1, 
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    
  },

  headerBackground: {
    backgroundColor: '#CBF1A5',
    paddingTop: 16,
    borderTopWidth: 1
  },

  cell: { 
    flex: 1, 
    textAlign: 'center' 
  },

});

export default Table;
