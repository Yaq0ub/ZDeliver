import React, { useState } from "react"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, Text, useColorScheme } from 'react-native';
import { router } from 'expo-router';

import Colors from '../../constants/Colors';

//import { useColorScheme } from "@/components/useColorScheme";
//import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { auth } from "../../firebase/firebaseConfig";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
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
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const BackButton = () => {
    return (
      <Link href="/(tabs)/account" asChild>
        <Pressable>
          {({ pressed }) => (
            <Ionicons
              name="chevron-back"
              size={25}
              color={Colors.light}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </Link>
    )
  }
  // Show landing screen if logged out
  auth.onAuthStateChanged((user: any) => {
    setIsLoading(false);
    if (!user) {
      router.replace("/landing");
    }
  })

  // Show Loading if isLoading is true
  if (isLoading) return <Text style={{}}> Loading...</Text>

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
        headerTintColor: Colors.light
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

      <Tabs.Screen
        name="addresses"
        options={{
          href: null,
          headerTitle: 'Addresses',
          headerTitleAlign: 'center',
          headerLeft: () => (<BackButton />),
        }}
      />
      
      <Tabs.Screen
        name="logout"
        options={{
          href: null,
          headerTitle: 'Logout',
          headerTitleAlign: 'center',
          headerLeft: () => (<BackButton />),
          headerStyle:{backgroundColor:Colors.primary},
          headerTintColor: Colors.light
        }}
      />
      <Tabs.Screen
        name="manage"
        options={{
          href: null,
          headerTitle: 'Manage',
          headerTitleAlign: 'center',
          headerLeft: () => (<BackButton />)
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          href: null,
          headerTitle: 'Notifications',
          headerTitleAlign: 'center',
          headerLeft: () => (<BackButton />)
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          href: null,
          headerTitle: 'Orders',
          headerTitleAlign: 'center',
          headerLeft: () => (<BackButton />)
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          href: null,
          headerTitle: 'Payments',
          headerTitleAlign: 'center',
          headerLeft: () => (<BackButton />)
        }}
      />
      <Tabs.Screen
        name="privacy"
        options={{
          href: null,
          headerTitle: 'Privacy',
          headerTitleAlign: 'center',
          headerLeft: () => (<BackButton />)
        }}
      />
    </Tabs>
  );
}
