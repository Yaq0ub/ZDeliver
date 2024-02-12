import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router'

export default function AccountScreen() {

  const handleNavigation = (link:any) => {
    if (link) {
      router.push("/(tabs)/" + link as any);
    }
  };
  const TabItemsProps = [
    { label: 'Manage account', route: "manage" },
    { label: 'Orders', route: "orders" },
    { label: 'Payment', route: "payments" },
    { label: 'Addresses', route: "addresses" },
    { label: 'Privacy', route: "privacy" },
    { label: 'Notifications', route: "notifications" },
    { label: 'Logout', route: "logout" },];

  return (
    <View style={styles.container}>
      {TabItemsProps.map((item, index) => (

        <TouchableOpacity
          key={index}
          style={styles.tab}
          onPress={() => handleNavigation(item.route)} // Call handleNavigation with navTo as parameter
          disabled={!item.route}
        >
          <Text style={styles.tabText}>{item.label}</Text>
          {item.route && (<Text >X</Text>)}
        </TouchableOpacity>

      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    //justifyContent: "space-between",
    alignItems: 'center',
    //paddingHorizontal: 16,
    //paddingTop: 16,
    //padding: SIZES.medium,
    //backgroundColor: COLORS.white
  },
  header: {
    //fontFamily: FONT.DMregular,
    //fontSize: SIZES.xLarge,
    //fontWeight: 'bold',
    //marginBottom: 16,
  },
  divider: {
    //height: 1,
    //backgroundColor: '#CCCCCC',
    //marginBottom: 16,
  },
  tab: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    //alignItems: 'center',
    //marginBottom: 16,
    //width: '100%', // Ensure the tab takes up the full width
  },
  tabText: {
    //fontSize: 18,
  },
});
