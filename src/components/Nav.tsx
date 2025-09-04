import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
// import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Link, useNavigation, useRouter } from 'expo-router'
import Colors from '@/constants/Colors'
import Feather from '@expo/vector-icons/Feather';
import { ErrorMessage } from '../utils'


export const HeaderLeft = () => {
    const router = useRouter();
    // const navigation = useNavigation()
  return (
    <TouchableOpacity style={styles.roundIconContainer} onPress={()=> router.back()}>
        <Ionicons name="arrow-back" size={24} color={"#fff"}/>  
    </TouchableOpacity>
  )
}


export const HeaderRight = () => {
    return (
// <View style={styles.rightContainer}>
            // <ion-icon name="camera-outline"></ion-icon>]
              // <Link href={'/home'} asChild>
                      
                <TouchableOpacity style={styles.roundIconContainer} onPress={()=>ErrorMessage("Não implementado", "", 'danger')}>
                  <Feather name="download" size={24} color={Colors.secondary} />
                  {/* <Ionicons name="camera-outline" size={24} color={Colors.secondary}  /> */}
                </TouchableOpacity>
              // </Link>

    )
}


const styles = StyleSheet.create({
        
  roundIconContainer:{
    width:40,
    height:40,
    borderRadius: 20,
    marginHorizontal: 5,
    // backgroundColor: Colors.light_grey,
    alignItems: 'center',
    justifyContent: 'center'
  },

})
// export default Nav
