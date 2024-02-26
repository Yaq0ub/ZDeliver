import { StyleSheet } from 'react-native';
import Shadows from '../../constants/Shadows';
import Colors from '../../constants/Colors'

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row', // Align items horizontally
    margin: 10,
    alignItems: 'center', // Vertically center the content in the row
    backgroundColor: Colors.light, // Background color for the item container
    borderRadius: 20, // Round the corners of the item container
    overflow: 'hidden', // Ensure child views are within the bounds of rounded corners
    ...Shadows.medium, // Apply medium shadow from your constants
    padding: 10, // Add padding around the contents
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50, // Fully round the corners of the square image
    marginRight: 15, // Space between the image and the text content
  },
  textContainer: {
    flex: 1, // Fill available space
    justifyContent: 'center', // Center content vertically in the container
  },
  text: {
    textAlign: 'left', // Align text to the left
    marginBottom: 5, // Add some space between text lines
  },
  counterContainer: {
    flexDirection: 'row', // Align counter elements horizontally
    alignItems: 'center', // Align items vertically in the center
    justifyContent: 'center', // Distribute space between elements
    width: 120, // Fixed width to ensure consistency
    height: 40, // Fixed height to ensure consistency
    backgroundColor: Colors.grey, // Slightly different background to distinguish area
    borderRadius: 20, // Round the corners of the counter container
    //paddingHorizontal: 20, // Padding inside the counter container
  },
  counterButton: {
    padding: 2, // Add padding to make the touchable area larger
  },
  counterCount: {
    fontSize: 20, // Increase font size for better readability
    marginHorizontal: "18%"
  },
  iconColor: {
    color: Colors.primary
  },
});

export default styles;
