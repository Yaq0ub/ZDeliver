import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { signOut, getAuth } from "firebase/auth";

const logout = () => {
  const { currentUser } = getAuth();
  return (
    <View>
      <Text style={styles.title}>{currentUser?.email}</Text>
      <Button title="Sign Out" onPress={() => signOut(getAuth())} />
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
})
export default logout