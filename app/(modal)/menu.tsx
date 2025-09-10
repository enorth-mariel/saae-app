	import { View, Text, TouchableOpacity, StyleSheet, ListRenderItem, FlatList, Linking } from 'react-native'
	import React, { useState,  } from 'react'
	import { useNavigation } from 'expo-router';
	import { Ionicons } from '@expo/vector-icons';
	import Colors from '@/constants/Colors';
	import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
	import { Menu } from '@/src/utils';
	import AntDesign from '@expo/vector-icons/AntDesign';
	import FontAwesome from '@expo/vector-icons/FontAwesome';
	import Fontisto from '@expo/vector-icons/Fontisto';
	import { SafeAreaView } from 'react-native-safe-area-context';



const menu = () => {
	const MenuData: Menu[] = [
	{
		title: "Instagram",
		link: "https://www.instagram.com/saaejuazeiro/",
		icon: <AntDesign name="instagram" size={24} color="white" />,
	},
	{
		title: "Whatsapp",
		link: "https://api.whatsapp.com/send/?phone=557436149800&text=Olá&type=phone_number&app_absent=0",
		icon: <FontAwesome name="whatsapp" size={24} color="white" />,
	},
	{
		title: "Site Oficial",
		link: "http://www.saaejuazeiro.ba.ipmbrasil.org.br/home",
		icon: <Fontisto name="world-o" size={24} color="white" />
	},
	{
		title: "(74) 3614-9800",
		icon: <FontAwesome name="phone" size={24} color="white" />
	}];

	// const navigation = useNavigation()
	// const [items, setItems] = React.useState<Menu[]>(MenuData);

	const openLink = (url:string) => {
		Linking.openURL(url);
	};

	const ItemHeader = ()=>(
		<>
			<Text style={styles.header}>Contato</Text>
		</>
	)

	const renderItem: ListRenderItem<Menu> = ({item, index}) => {
		let OnPress = ()=>{}

		if (item.link !== undefined){
		OnPress = ()=>{
			openLink(item.link as string)
		}

		}
		return (
			<TouchableOpacity style={styles.itemContainer} onPress={OnPress} >
				<View style={styles.row}>
					{item.icon && <View style={{ marginRight: 10 }}>{item.icon}</View>}
					<Text style={styles.itemText}>{item.title} </Text>
				</View>
			</TouchableOpacity>
		)
	}

	return (
		<SafeAreaView style={styles.container}>
			<FlatList 
				data={MenuData} 
				renderItem={renderItem}
				ListHeaderComponent={<ItemHeader/>} />

			<View style={{height:85}}></View>
		</SafeAreaView>
	)
}

const styles= StyleSheet.create({
	container: {
		flex:1,
		padding:24,
		marginTop: 60,
		backgroundColor: Colors.default
		// Colors.light_grey
	},
	// item box
	itemContainer:{
		backgroundColor: "#737aa32c",
		padding: 8,
		borderRadius:8,
		marginBottom: 16,

	},

	header: {
		color: Colors.white_txt,
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 16
	},

	item: {
		flexDirection: 'row',
		gap: 10,
		alignItems:'center',
		backgroundColor: '#fff',
		paddingVertical: 16,
		borderColor: Colors.light_grey,
		borderBottomWidth:1
		
	},

	// render item
	row:{
		flexDirection:'row',
		alignItems: 'center',
		padding: 10,
		// backgroundColor: '#fff'
	},

	itemText: {
		flex:1,
		color: '#fff'
	},

	// footer
	footer: {
		position:'absolute',
		bottom:0,
		left:0,
		right:0,
		height:100,
		padding: 10,
		backgroundColor:"#fff",
		elevation: 10,
		shadowColor: '#000',
		shadowRadius:10,
		shadowOpacity:.1,
		shadowOffset:{
		width:0,
		height: -10
		}
	},

	btnContainer: {
		flexDirection:'row',
		gap: 12,
		justifyContent:'center'
	},

	outlinedBtn:{
		borderColor: Colors.primary,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		// padding:16,
		height:56
	},

	outlinedBtnText:{
		color: Colors.primary,
		fontWeight: 'bold',
		fontSize: 16
	},

	fullBtn:{
		backgroundColor:Colors.primary ,
		padding:16,
		marginRight:20,
		alignItems: 'center',
		borderRadius: 8,
		flex:1,
		height:56
	},

	footerText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16
	}
})


export default menu