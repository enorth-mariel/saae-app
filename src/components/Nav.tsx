import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
// import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Link, useNavigation, useRouter } from 'expo-router'
import Colors from '@/constants/Colors'
import Feather from '@expo/vector-icons/Feather';
import { ErrorMessage } from '../utils'
import { useSegViaStore } from '../useStore'
import { goBack } from 'expo-router/build/global-state/routing'


export const HeaderLeft = () => {
    const router = useRouter();
    const navigation = useNavigation()
  return (
    <TouchableOpacity style={styles.roundIconContainer} onPress={()=> router.back()}>
        <Ionicons name="arrow-back" size={24} color={"#fff"}/>  
    </TouchableOpacity>
  )
}


export const HeaderRightDownloadBtn = () => {
    const { 
        matricula,
        id_conta,
        downloadPdf,
	} = useSegViaStore();

    const onPressDownload = async () =>{
      	if (matricula && id_conta){
        	await downloadPdf(matricula, id_conta)
			return
      	}
		else{
			console.log(matricula, id_conta)
			ErrorMessage("Não foi possível baixar arquivo", "Tente novamente mais tarde", 'danger')
			goBack()
		}
    }	  

    return (
		<Pressable  style={styles.roundIconContainer} onPressIn={onPressDownload}>
			<Feather name="download" size={24} color={Colors.secondary} />
		</Pressable >
    )
}


const styles = StyleSheet.create({  
	roundIconContainer:{
		width:40,
		// backgroundColor: Colors.success,
		height:40,
		// padding: 20,
		borderRadius: 20,
		marginHorizontal: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
})
