import {StyleSheet, Dimensions} from 'react-native'
import Colors from '../constants/Colors'; // Import theme colors
import Shadows from '../constants/Shadows'; // Import Shadows

// Calculate dynamic padding based on screen height
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
      marginTop: 20,
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
    iconContainer: {
      ...Shadows.medium,
      borderRadius: 25,
      //width:"50%",
      //height:"50%",
      //overflow:'hidden'
    },
    icon: {
      width: 300, // Set the width of the icon
      height: 300, // Set the height of the icon
      // Ensure the icon itself does not cut off any applied shadows
      borderRadius: 25,
      borderWidth: 5,
      borderColor: Colors.primary
      
    },
  });
export default styles;