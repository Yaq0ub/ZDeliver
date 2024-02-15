import { Platform, Dimensions, StyleSheet } from "react-native";
import Colors from '../constants/Colors';

const screenHeight = Dimensions.get('window').height; // Get screen height
const paddingVerticalPercentage = screenHeight * 0.03; // Calculate 3% of screen height
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      paddingHorizontal: paddingVerticalPercentage, // Adjust container padding to prevent overflow
      paddingTop: paddingVerticalPercentage, // Add padding at the top if necessary
    },
    tab: {
      flexDirection: 'row',
      justifyContent: 'center', // Center content within each tab
      alignItems: 'center', // Center items vertically within the tab
      width: '100%', // Ensure tabs take up the full width
      paddingVertical: paddingVerticalPercentage, // Inner padding for tab content, adjusted for better touch area
      backgroundColor: Colors.primary, // Use a color from the constants for consistency
      borderRadius: 15, // Rounded corners for tabs
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
        },
        android: {
          elevation: 20, // Adjust elevation for shadow intensity
        },
      }),
      marginBottom: 20, // Add space between tabs
    },
    text: {
      textAlign: 'center', // Ensure text is centered within the tab
      color: Colors.light
    },
  });
export default styles