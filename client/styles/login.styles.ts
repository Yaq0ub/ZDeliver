import { StyleSheet, Dimensions, Platform } from "react-native";

import Colors from "../constants/Colors";
const { height } = Dimensions.get("window");
let top;
if (Platform.OS === "ios") {
  top = height * 0.02;
} else {
  top = 0;
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 15,
      marginTop: height * 0.05,
    },
    arrowContainer: {
      width: 40,
      height: 40,
      borderTopLeftRadius: 8,
      borderBottomRightRadius: 8,
      backgroundColor: Colors.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      marginTop: 20,
    },
    headerText: {
      fontSize: 36,
      fontWeight: "bold",
    },
    infoContainer: {
      marginTop: 20,
    },
    fieldContainer: {
      marginTop: 20,
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
    forgotContainer: {
      marginTop: 20,
      alignItems: "flex-end",
    },
    forgotText: {
      fontSize: 16,
      fontWeight: "bold",
      color: Colors.primary,
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
    buttonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: Colors.white,
    },
    signupGroup: {
      flexDirection: "row",
      marginTop: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    signup: {
      color: Colors.primary,
      fontSize: 16,
      fontWeight: "bold",
      marginRight: 5,
    },
    new: {
      fontSize: 16,
      fontWeight: "500",
      marginRight: 5,
    },
  });

export default styles