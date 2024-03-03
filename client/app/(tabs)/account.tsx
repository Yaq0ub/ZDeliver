import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router'

import Shadows from '../../constants/Shadows';
import Colors from '../../constants/Colors';

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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    //paddingHorizontal: paddingVerticalPercentage, // Adjust container padding to prevent overflow
    //paddingTop: paddingVerticalPercentage, // Add padding at the top if necessary
  },
  tab: {
    flexDirection: 'row',
    justifyContent: 'center', // Center content within each tab
    alignItems: 'center', // Center items vertically within the tab
    width: '100%', // Ensure tabs take up the full width
    //paddingVertical: paddingVerticalPercentage, // Inner padding for tab content, adjusted for better touch area
    backgroundColor: Colors.primary, // Use a color from the constants for consistency
    borderRadius: 15, // Rounded corners for tabs
    ...Shadows.medium,
    marginBottom: 20, // Add space between tabs
  },
  text: {
    textAlign: 'center', // Ensure text is centered within the tab
    color: Colors.light
  },
});