import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../styles/components/Counter.styles'

import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';
interface CounterProps {
  count: number;
  plusHandler: () => void;
  minusHandler: () => void;
}
function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>['name'];
  color: string;
}) {
  return <AntDesign size={22} {...props} />;
}

const Counter: React.FC<CounterProps> = ({ count, plusHandler, minusHandler }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={minusHandler} style={styles.button}>
        <TabBarIcon name='minuscircle' color={Colors.primary}/>
      </TouchableOpacity>
      <Text style={styles.count}>{count}</Text>
      <TouchableOpacity onPress={plusHandler} style={styles.button}>
        <TabBarIcon name='pluscircle' color={Colors.primary}/>
      </TouchableOpacity>
    </View>
  );
};



export default Counter;
