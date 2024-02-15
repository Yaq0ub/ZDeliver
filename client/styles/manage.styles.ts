import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
const styles = StyleSheet.create({
  fullFlex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'space-around',
  },
  topContainer: {
    // Removed fixed height
  },
  fieldContainer: {
    marginTop: 10,
  },
  fieldText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  fieldInput: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.light,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  buttonText: {
    color: Colors.light,
    fontSize: 16,
    fontWeight: "bold",
  },
});

  export default styles