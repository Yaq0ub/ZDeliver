import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'space-between',
    },
    topContainer: {
      flex: 1,
      height: '70%'
    },
    botContainer: {
      marginBottom: 20,
      height: '10%'
    },
    input: {
      flex: 1,
      height: 35,
      borderColor: 'gray',
      borderWidth: 1,
      marginRight: 10,
      paddingLeft: 10,
      borderRadius: 7
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    button: {
      marginTop: 20,
      width: "100%",
      height: 50,
      backgroundColor: Colors.primary,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText:{
      color: Colors.light
    },
    fieldContainer: {
      marginTop: 10,
    },
    fieldText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    fieldInput: {
      marginTop: 10,
      width: "100%",
      height: 50,
      backgroundColor: Colors.light,
      borderWidth: 1,
      borderColor: Colors.light,
      borderRadius: 8,
      paddingLeft: 10,
    },
  });

  export default styles