import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { signOut, getAuth } from "firebase/auth";

import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
const logout = () => {
  const { currentUser } = getAuth();
  const handleSignOut = () =>{signOut(getAuth())}
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