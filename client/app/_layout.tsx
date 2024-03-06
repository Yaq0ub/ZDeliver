import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';

import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import { store } from '../redux/store'



import Colors from '../constants/Colors';

import { auth, db } from '../firebase/firebaseConfig'


let persistor = persistStore(store)

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
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(auth.currentUser ? true : false)

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Michroma: require('../assets/fonts/Michroma-Regular.ttf'),
    ...FontAwesome.font,
  });
  useEffect(() => {
    // auth.onAuthStateChanged((user: any) => {
    //   //setIsLoading(false);
    //   if (!user) {
    //     setIsAuthed(false)
    //   }
    // })
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoading(false);
      setIsAuthed(!!user);
    });
    return unsubscribe;
  }, [])
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
     // Remember to unsubscribe on component unmount
  }, [loaded]);
  if (!loaded) {
    return null;
  }
  
  console.log(isAuthed)

  return <RootLayoutNav />;
}
function RootLayoutNav() {
  return (
  //<ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Stack screenOptions={
        {
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: Colors.light
        }
      }>

        <Stack.Screen name="(tabs)" options={{ headerShown: false, }} />
        <Stack.Screen name="[...missing]" options={{ headerShown: false, }} />

        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ presentation: "modal", title: '' }} />
        <Stack.Screen name="register" options={{ presentation: "modal", title: '' }} />

      </Stack>
    </PersistGate>
  </Provider>
  //</ThemeProvider>
  );
}