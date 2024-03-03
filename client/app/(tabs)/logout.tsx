import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import { signOut, getAuth } from "firebase/auth";
import { TouchableOpacity } from 'react-native-gesture-handler';


import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

import Colors from "../../constants/Colors"

const logout = () => {
  const { currentUser } = getAuth();
  //const dispatch = useAppDispatch();
  const clearStorage = async () => {
    try {
      //signOut(getAuth())
      //dispatch(clearAddressesState())
      //dispatch(clearPaymentsState())
      //dispatch(clearOrdersState())
      //dispatch(clearAuthState())
      await AsyncStorage.clear();
      AsyncStorage.removeItem('persist:root')
      await storage.clear();
      console.log('Storage successfully cleared!');
      
    } catch (e) {
      console.log('Failed to clear the async storage.');
    }
  };
  const handleSignOut = () =>{
    try{
      signOut(getAuth())
      clearStorage();
      console.log("Logout successful!")
      router.replace('/');
    }catch(error){
      console.error("failed to logout", error)
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentUser?.email}</Text>
      <View style={styles.button}>
          <TouchableOpacity onPress={handleSignOut}>
            <Text style={styles.buttonText}>
              Sign out
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
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
    }
  })
export default logout