import {StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    searchBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 5,
    },
    input: {
      flex: 1,
      marginLeft: 10,
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
  });

export default styles