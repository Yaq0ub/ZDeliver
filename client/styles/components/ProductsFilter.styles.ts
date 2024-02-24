import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    filterContainer: {
      flexDirection: "row",
      alignItems: 'center',
      margin: 4  
    },
    filterField: {
      backgroundColor: "#e0e0e0",
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 4,
      marginRight: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    selected: {
      backgroundColor: Colors.lightBlue,
    },
    filterText: {
      color: "#000",
      fontSize: 12
    },
  });
  export default styles