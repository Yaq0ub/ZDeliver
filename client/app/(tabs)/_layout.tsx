import React, { useState, useEffect } from "react"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, Text} from 'react-native';

import { router } from 'expo-router';
import { auth } from "../../firebase/firebaseConfig";

import Colors from '../../constants/Colors';
import { setAuthenticatedFalse, setAuthenticatedTrue } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  // const [isLoading, setIsLoading] = useState(true);
  
  // // Show Loading if isLoading is true
  // //if (isLoading) return <Text style={{}}> Loading...</Text>
  return (

    <Tabs
      
      screenOptions={{
        tabBarActiveTintColor: Colors.light,
        tabBarActiveBackgroundColor: Colors.primary,
        tabBarInactiveBackgroundColor: Colors.primary,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        //headerShown: useClientOnlyValue(false, true),
        headerStyle:{backgroundColor:Colors.primary},
        headerTintColor: Colors.light,
        tabBarHideOnKeyboard: true
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/cart" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="shopping-cart"
                    size={25}
                    color={Colors.light}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),

        }}
      />
      <Tabs.Screen 
        name="account" 
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
        }}
      />
      <Tabs.Screen name="addresses"options={{href: null,headerTitle: 'Addresses',}}/>
      <Tabs.Screen name="logout" options={{href: null, headerTitle: 'Logout'}}/>
      <Tabs.Screen name="manage" options={{href: null, headerTitle: 'Manage',}}/>
      <Tabs.Screen name="notifications" options={{ href: null, headerTitle: 'Notifications',}}/>
      <Tabs.Screen name="orders" options={{ href: null,headerTitle: 'Orders',}}/>
      <Tabs.Screen name="payments"options={{ href: null,headerTitle: 'Payments',}}/>
      <Tabs.Screen name="privacy" options={{ href: null,headerTitle: 'Privacy',}}/>

      <Tabs.Screen name="addaddress" options={{ href: null,headerTitle: 'Add Address',}}/>
      <Tabs.Screen name="addpayment" options={{ href: null,headerTitle: 'Add Payment',}}/>
      
      <Tabs.Screen name="cart" options={{ href: null,headerTitle: 'Cart',}}/>
      <Tabs.Screen name="checkout" options={{ href: null,headerTitle: 'Checkout',}}/>
      <Tabs.Screen name="placed" options={{ href: null,headerTitle: 'Placed',}}/>
      
    </Tabs>
  );
}
