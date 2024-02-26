import { StyleSheet } from 'react-native';
import Shadows from '../../constants/Shadows';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 5,
    //alignItems: 'center', // Vertically center the content in the row
    backgroundColor: Colors.light, // Background color for the item container
    borderRadius: 20, // Round the corners of the item container
    overflow: 'hidden', // Ensure child views are within the bounds of rounded corners
    ...Shadows.medium, // Apply medium shadow from your constants
    padding: 20, // Add padding around the contents
  },
  name: {
    fontWeight: 'bold',
    //marginBottom: 5,
  },
  address: {

  },
  phone: {

  },
  trashIconContainer: {
    //position: 'absolute',
    //bottom: 10,
    //right: 10,
  },
  icon:{
    color: Colors.primary
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent:'space-between'
  }
});

export default styles