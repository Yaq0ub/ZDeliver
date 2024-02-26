import { View, Text} from 'react-native'
import React from 'react'
import { signOut, getAuth } from "firebase/auth";
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from '../../styles/logout.styles'
import { useAppDispatch } from '../../redux/hooks';
import { setAuthenticatedFalse } from '../../redux/features/auth/authSlice';

const logout = () => {
  const { currentUser } = getAuth();
  const dispatch = useAppDispatch();
  const handleSignOut = () =>{
    signOut(getAuth())
    dispatch(setAuthenticatedFalse())
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

export default logout