import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router'


import styles from  '../../styles/account.styles';

const ACCOUNT_ROUTES=[
  { label: 'Manage account', route: "/(tabs)/manage" },
  { label: 'Orders', route: "/(tabs)/orders" },
  { label: 'Payments', route: "/(tabs)/payments" },
  { label: 'Addresses', route: "/(tabs)/addresses" },
  { label: 'Privacy', route: "/(tabs)/privacy" },
  { label: 'Notifications', route: "/(tabs)/notifications" },
  { label: 'Logout', route: "/(tabs)/logout" },];

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