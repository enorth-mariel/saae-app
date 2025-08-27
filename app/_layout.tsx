import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
  import FlashMessage from "react-native-flash-message";
import { useColorScheme } from '@/components/useColorScheme';
import CustomHeader from '@/src/components/Header';
import { HeaderLeft, HeaderRight } from '@/src/components/Nav';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    OpenSans: require('../assets/fonts/OpenSans-Regular.ttf'),
    ...FontAwesome.font,
  });

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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName='home'>
        <Stack.Screen name="home" options={{ 
          // headerShown: false 
          
          header: () => <CustomHeader/>
          }} />
        {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
        <Stack.Screen 
          name="index"
          options={{
            headerTransparent: false,
            headerTitle: "",
            headerTintColor: "#000",
            headerLeft: HeaderLeft,        
          }}/>
      </Stack>
        
      <FlashMessage position="top" /> 
    </ThemeProvider>
  );
}
