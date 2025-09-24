// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
  import FlashMessage from "react-native-flash-message";
// import { useColorScheme } from '@/components/useColorScheme';
import CustomHeader from '@/src/components/Header';
import { HeaderRightDownloadBtn } from '@/src/components/Nav';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NativeStackHeaderRightProps } from "@react-navigation/native-stack";

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
			SplashScreen.hideAsync();
		}
	}, [ loaded ]);

	if (!loaded) {
		return ;
	}

  	return <RootLayoutNav />;
}

function RootLayoutNav() {
	// const colorScheme = useColorScheme();
	// <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

	return (<>
	
    <BottomSheetModalProvider>

		<Stack initialRouteName="index">
			
			<Stack.Screen name="index" options={{
				headerShown:false
			}} />

			<Stack.Screen name="home" options={{ 
				header: () => <CustomHeader/>
			}} />
			
			<Stack.Screen name="(modal)/menu" 
				
				options={{
					headerStyle: {
						backgroundColor: Colors.default,
					},
					headerTransparent: true,
					headerTintColor: "#FFF",
					headerTitle: "Contato",
					headerTitleStyle: {
						fontFamily: "OpenSans",
						fontSize: 18,
						fontWeight: 'bold',
						color: "#FFF",
					},

					presentation: 'modal',
					// headerShadowVisible:false,
				// headerLeft: ()=>(
				// 	<TouchableOpacity onPress={()=>{router.back()}} style={{marginRight:10}}>
				// 	<Ionicons name='close-outline' size={28} color={Colors.white_txt}/>
				// 	</TouchableOpacity>
				// )
				}}/>
				
			

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
			headerRight: () => <HeaderRightDownloadBtn/>        
			}}/>


		</Stack>
			
		<FlashMessage position="top" />   
	</BottomSheetModalProvider>
	</>
	);
}

{/* </ThemeProvider> */}