import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    filterPickerContainer: {
      //height: '4%', // Make the filter picker occupy 5% of the screen
      width: '100%', // Ensure it spans the full width
      justifyContent: 'center', // Center the filters vertically within the picker
      marginVertical: 5,
    },
    productListContainer:{
      //height: '95%', // Make the filter picker occupy 5% of the screen
      width: '100%', // Ensure it spans the full width
      justifyContent: 'center', // Center the filters vertically within the picker
      //marginVertical: 10,
      flex: 1
    }
  });

  export default styles;