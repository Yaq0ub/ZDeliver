import {StyleSheet } from 'react-native'
import Colors from '../constants/Colors';
const styles = StyleSheet.create({
  fullFlex:{
    flex: 1
  },  
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
    header:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
      marginBottom: 10,
      padding: 5,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      
    },
    mapContainer: {
      height: 300, // Set to desired value
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    closeMapButton: {
      position: 'absolute', // Place the button over the map
      top: 10,
      right: 10,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 20,
    },
    addAddressForm: {
      padding: 20,
      // If your form is in a ScrollView, you might not need a large vertical padding
      paddingBottom: 10, // Adjust based on your layout
      paddingTop: 10, // Adjust based on your layout
    },
    button: {
      backgroundColor: Colors.primary, // Use your primary color here
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    listContainer: {
      flex:1,
    }
  });

export default styles