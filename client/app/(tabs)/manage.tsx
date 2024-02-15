import React from 'react';
import { View, Text, TextInput, Button} from 'react-native';
//import { SafeAreaView } from 'react-native-safe-area-context'

import styles from '../../styles/manage.styles'

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

export default ManageAccount;