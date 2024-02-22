import { StyleSheet } from "react-native";
import Shadows from "../../constants/Shadows";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Changed to row to align items horizontally
      margin: 10,
      alignItems: 'center', // Align items vertically in the center
      backgroundColor: '#fff', // Optional: Adds background color to each item
      borderRadius: 15, // Optional: Rounds the corners of the item container
      overflow: 'hidden', // Keeps the child views within the bounds of the rounded corners
      //...Shadows.medium,
      height: 50,
      width: 80
  },
  button: {
      //margin: 5,
      overflow: 'hidden',
     
  },
  text: {
    fontSize: 25,
  },
  count: {
    fontSize: 20,
    margin: 5,
    textAlign: 'centered'
  },
});
export default styles