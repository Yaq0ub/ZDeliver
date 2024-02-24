import { StyleSheet } from 'react-native'
import Shadows from '../../constants/Shadows';
const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: 'row', // Changed to row to align items horizontally
      margin: 10,
      alignItems: 'center', // Align items vertically in the center
      backgroundColor: '#fff', // Optional: Adds background color to each item
      borderRadius: 30, // Optional: Rounds the corners of the item container
      overflow: 'hidden', // Keeps the child views within the bounds of the rounded corners
      ...Shadows.medium,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 5, // Optional: Rounds the corners of the image
      marginRight: 10, // Adds some space between the image and the text
    },
    textContainer: {
      flex: 1, // Takes up the remaining space in the item container
    },
    text: {
      textAlign: 'left', // Adjusts text alignment to the left
    },
    counterContainer: {
      
    }
  });

export default styles