// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
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
import Colors from '@/constants/Colors';
import LoadingPage from '@/src/components/LoadingPage';

export {
  	ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
	initialRouteName: 'index',
	navigationPersistenceKey: null,
};




SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		OpenSans: require('../assets/fonts/OpenSans-Regular.ttf'),
		// ...FontAwesome.font,
	});

	useEffect(() => {
		if (error) throw error;
	}, [ error ]);

	useEffect(() => {
		if (loaded) {
			// SplashScreen.hideAsync();
		}
	}, [ loaded ]);

	if (loaded) {
		// return <LoadingPage/>;
	}

  	return <RootLayoutNav />;
}

function RootLayoutNav() {
	// const colorScheme = useColorScheme();
	// <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

	return (<>
		<Stack initialRouteName="index">
			<Stack.Screen name="index" options={{ 
				header: () => <CustomHeader/>
			}} />
			

			<Stack.Screen
				name="segunda_via"     
				options={{
				headerStyle: {
					backgroundColor: Colors.default,
				},
				headerTransparent: true,
				headerTintColor: "#FFF",
				headerTitle: "Segunda via",
				headerTitleStyle: {
					fontFamily: "OpenSans",
					fontSize: 18,
					fontWeight: 'bold',
					color: "#FFF",
				},
				// headerLeft: HeaderLeft,        
			}}/>

			<Stack.Screen 
			name="pdf"
			options={{
				headerStyle: {
				backgroundColor: Colors.default,
				},
				headerTransparent: true,
			headerTintColor: "#FFF",
			headerTitle: "Visualizador de PDF",
			headerTitleStyle: {
				fontFamily: "OpenSans",
				fontSize: 18,
				fontWeight: 'bold',
				color: "#FFF",
			},
			headerRight: HeaderRight,        
			}}/>
		</Stack>
			
		<FlashMessage position="top" />   
	</>
	);
}

{/* </ThemeProvider> */}