import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
//import { SafeAreaView } from 'react-native-safe-area-context'

const ManageAccount = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <View style={styles.inputRow}>
          <TextInput 
            placeholder="Name" 
            style={styles.input} 
          />  
        </View>

        
        <Text style={styles.label}>Mobile#:</Text>
        <View style={styles.inputRow}>
          <TextInput 
            placeholder="Phone Number" 
            style={styles.input} 
          />
        </View>

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputRow}>
          
          <TextInput 
            placeholder="Email" 
            style={styles.input} 
          />
        </View>

        {/* Password Change Section */}
        <Text style={styles.sectionTitle}>Change Password</Text>

        <Text style={styles.label}>Old Password</Text>
        <View style={styles.inputRow}>
          <TextInput 
            placeholder="Old Password" 
            secureTextEntry={true}
            style={styles.input} 
          />
        </View>

        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputRow}>
          <TextInput 
            placeholder="New Password" 
            secureTextEntry={true}
            style={styles.input} 
          />
        </View>

        <Text style={styles.label}>Repeat Password</Text>
        <View style={styles.inputRow}>
          <TextInput 
            placeholder="Repeat Password" 
            secureTextEntry={true}
            style={styles.input} 
          />
        </View>
      </View>

      <View style={styles.botContainer}>
        <Button 
          title="Change Password" 
          onPress={() => {}} 
        />
      </View>
    </View>
  );
};
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


export default ManageAccount;