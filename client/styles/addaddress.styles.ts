import { StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
    fullFlex: {
        flex: 1,
    },
    container: {
        padding: 20,
        justifyContent: 'space-around',
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: Colors.light,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        paddingLeft: 10,
        marginVertical: "2%",
        marginBottom: "4%"
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    closeButton: {
        backgroundColor: 'red',
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
});

export default styles