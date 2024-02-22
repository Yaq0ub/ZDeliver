import { Text, View } from '../../components/Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router'

import { ACCOUNT_ROUTES } from '../../constants/consts';

import styles from  '../../styles/account.styles';

export default function AccountScreen() {

  const handleNavigation = (link:any) => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <View style={styles.container}>
      {ACCOUNT_ROUTES.map((item, index) => (

        <TouchableOpacity
          key={index}
          style={styles.tab}
          onPress={() => handleNavigation(item.route)} 
          disabled={!item.route}
        >
          <Text style={styles.text}>{item.label}</Text>
        </TouchableOpacity>

      ))}
    </View>
  );
}