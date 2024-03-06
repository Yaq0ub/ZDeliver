import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet } from 'react-native'
import { router } from 'expo-router';

import CustomInput from '../../components/CustomInput';

import { addToPaymentsAsync } from '../../redux/features/account/payments/paymentsSlice';
import { useAppDispatch } from '../../redux/hooks';

import { PaymentType } from '../../constants/types';

import Colors from '../../constants/Colors';


export default function AddPayment() {
    const [payment, setPayment] = useState<PaymentType>({
        id: '-1',
        name: '',
        cardno: '',
        expiration: '',
        cvc: '',
        zipcode: '',
        last4: '444'
    });
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false); // State for indicating loading

    const handleTextChange = (field: keyof PaymentType) => (text: string) => {
        setPayment((prevPayment) => ({
            ...prevPayment,
            [field]: text,
        }));
    };

    const handleAddPayment = async () => {
        setLoading(true); // Set loading state to true when processing starts

        // Check if any field in the payment is empty or null
        const isAnyFieldEmpty = false;//Object.values(payment).some((value) => value.trim() === '');
        if (isAnyFieldEmpty) {
            alert('Please fill in all fields.');
            setLoading(false); // Reset loading state
        } else {
            try {
                console.log('handling payment add')
                // All fields are filled, proceed with adding the payment
                dispatch(addToPaymentsAsync(payment));
                // Reset the form after successful addition
                setPayment({id: '',name: '',cardno: '',expiration: '',cvc: '',zipcode: '',last4: ''});
                router.replace('payments' as any) 
            } catch (error) {
                console.error('Error adding payment:', error);
                // Handle error scenario, show alert or error message
            } finally {
                setLoading(false); // Reset loading state after operation completes
            }
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAwareScrollView style={styles.fullFlex} contentContainerStyle={styles.container}>
                <CustomInput label="Name" value={payment.name} onChangeText={handleTextChange('name')} />
                <CustomInput label="Card Number" value={payment.cardno} onChangeText={handleTextChange('cardno')} keyboardType="numeric" />
                <CustomInput label="Expiration Date" value={payment.expiration} onChangeText={handleTextChange('expiration')} keyboardType="numeric" />
                <CustomInput label="CVC" value={payment.cvc} onChangeText={handleTextChange('cvc')} keyboardType="numeric" />
                <CustomInput label="Zipcode" value={payment.zipcode} onChangeText={handleTextChange('zipcode')} keyboardType="numeric" />
                <TouchableOpacity onPress={handleAddPayment} style={styles.button}>
                    {loading ? (
                        <ActivityIndicator size="small" color={Colors.primary} />
                    ) : (
                        <Text style={styles.buttonText}>Add</Text>
                    )}
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    );
}

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
    indicator:{
        color: Colors.primary,
        size: 'small'
    }
});
