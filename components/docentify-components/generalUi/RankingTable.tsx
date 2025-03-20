import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const data = [
    { id: '1', position: '1º' , name: 'Pietra Ferreira', points: '250', email: 'pietra.ferreira@dom.com' },
    { id: '2', position: '2º' , name: 'Pietra Ferreira', points: '250', email: 'pietra.ferreira@dom.com' },
    { id: '3', position: '3º' , name: 'Pietra Ferreira', points: '250', email: 'pietra.ferreira@dom.com' },
    { id: '4', position: '4º' , name: 'Pietra Ferreira', points: '250', email: 'pietra.ferreira@dom.com' },
    { id: '5', position: '5º' , name: 'Pietra Ferreira', points: '250', email: 'pietra.ferreira@dom.com' },
    { id: '6', position: '6º' , name: 'Pietra Ferreira', points: '250', email: 'pietra.ferreira@dom.com' },
    { id: '7', position: '7º' , name: 'Pietra Ferreira', points: '250', email: 'pietra.ferreira@dom.com' },
    { id: '8', position: '8º' , name: 'Pietra Ferreira', points: '250', email: 'pietra.ferreira@dom.com' },
    { id: '9', position: '9º' , name: 'Pietra Ferreira', points: '250', email: 'pietra.ferreira@dom.com' },
    { id: '10', position: '10º' , name: 'Pietra Ferreira', points: '250', email: 'pietra.ferreira@dom.com' },
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
