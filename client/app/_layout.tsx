import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import Colors from '../constants/Colors';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    //<ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false, }} />
      <Stack.Screen name="cart" options={{
        presentation: "modal",
        title: 'Cart',
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.light

      }} />
      <Stack.Screen name="checkout" options={{ 
        presentation: "modal", 
        title: "Checkout",
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.light 
        }} />
      <Stack.Screen name="landing" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{
        presentation: "modal",
        headerTintColor: Colors.light,
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        title: ''
      }} />
      <Stack.Screen name="register" options={{
        presentation: "modal",
        headerTintColor: Colors.light,
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        title: ''
      }} />
      <Stack.Screen name="placed" options={{
        presentation: "modal",
        headerTintColor: Colors.light,
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        title: ''
      }} />

    </Stack>
    //</ThemeProvider>
  );
}