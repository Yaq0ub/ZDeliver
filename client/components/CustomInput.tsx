// CustomInput.tsx
import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

interface CustomInputProps extends TextInputProps {
  label: string;
  onChangeText: (text: string) => void;
  value: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, onChangeText, value, ...props }) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldText}>{label}</Text>
      <TextInput
        placeholder={label}
        value={value}
        onChangeText={onChangeText}
        style={styles.fieldInput}
        {...props} // Spread other TextInputProps for flexibility
      />
    </View>
  );
};


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

export default CustomInput;
