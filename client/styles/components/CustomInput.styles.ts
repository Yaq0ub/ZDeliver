import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    fieldContainer: {
        marginTop: 10,
    },
    fieldText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        color: Colors.dark
    },
    fieldInput: {
        width: "100%",
        height: 50,
        backgroundColor: Colors.light,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        paddingLeft: 10,
    },
})

export default styles;