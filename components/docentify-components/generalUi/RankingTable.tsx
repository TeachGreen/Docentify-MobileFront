import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const data = [
    { id: '1', position: '1º' , name: 'Pedro Tejon', points: '0', email: 'pedrohtejon@gmail.com' },
    { id: '2', position: '2º' , name: '', points: '0', email: '' },
    { id: '3', position: '3º' , name: '', points: '0', email: '' },
    { id: '4', position: '4º' , name: '', points: '0', email: '' },
    { id: '5', position: '5º' , name: '', points: '0', email: '' },
    { id: '6', position: '6º' , name: '', points: '0', email: '' },
    { id: '7', position: '7º' , name: '', points: '0', email: '' },
    { id: '8', position: '8º' , name: '', points: '0', email: '' },
    { id: '9', position: '9º' , name: '', points: '0', email: '' },
    { id: '10', position: '10º' , name: '', points: '0', email: '' },
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
