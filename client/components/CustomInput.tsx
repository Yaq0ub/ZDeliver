// CustomInput.tsx
import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import styles from '../styles/components/CustomInput.styles'; // Ensure this path is correct

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

export default CustomInput;
