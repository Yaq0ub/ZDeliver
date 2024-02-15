import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'space-between',
    },
    title: {
      //fontSize: SIZES.xLarge,
      fontWeight: 'bold',
      //marginBottom: SIZES.xxSmall,
    },
    topContainer: {
      flex: 1,
    },
    botContainer: {
      marginBottom: 20,
    },
    inputRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center', //Centered horizontally
      marginBottom: 20,
    },
    label: {
      //fontSize: SIZES.small,
      marginBottom: 5,
      justifyContent: 'center', //Centered vertically
      //alignItems: 'center', //Centered horizontally
      //flex:1
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
  });

  export default styles