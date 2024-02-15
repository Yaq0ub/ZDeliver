import { StyleSheet, Dimensions, Platform } from 'react-native';
import Colors from '../constants/Colors';
import Shadows from '../constants/Shadows';
const screenHeight = Dimensions.get('window').height;
const paddingVerticalPercentage = screenHeight * 0.03;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    topContainer: {
      width: '100%',
      height: '70%',
      //backgroundColor: '#000000',
      alignItems: 'center', // Center horizontally
      justifyContent: 'center', // Center vertically
    },
    botContainer: {
      width: '100%',
      //backgroundColor: '#EEE00E',
      alignItems: 'center',
      justifyContent: 'center',
      padding: paddingVerticalPercentage,
    },
    title: {
      // Add title styles if needed
    },
    button: {
      width: 200,
      height: 50,
      backgroundColor: Colors.primary,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      ...Shadows.medium,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color:Colors.light,
    },
  });

  export default styles