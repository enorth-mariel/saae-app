import { View, Text, Image, TouchableOpacity,StyleSheet, Platform, PermissionsAndroid } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '@/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/src/components/Button'
import { Link, useRouter } from 'expo-router'
import * as Location from "expo-location";
import { useGeolocationStore } from '@/src/useStore'


const index = () => {
    const [location, setLocation] = React.useState<Location.LocationObject | null>(null);
    const [grantedLocation, setPerms ] = React.useState<Boolean>(false)
    const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
    const [address, setAddress] = React.useState<any>(null);
    const { requestLocationPerms, locationPermsGranted, getCurrentLocation } = useGeolocationStore()

    const router = useRouter()

    useEffect(()=>{
        getLocation()
    }, [])

    const getLocation = async () => {
        await requestLocationPerms()
    }
    
    const goHome = ()=>{
        router.replace('/home');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top_container}>
                <Image style={styles.img} resizeMode="contain"
                    source={require("../assets/images/logo_colorida.png")}/>
            </View>

            <View style={styles.bottom_container}>

                    <View style={{alignItems: 'center', justifyContent:'center'}}>
                        
                    </View>

                    { locationPermsGranted && 
                        <View style={{height: 65, }}>
                            <Button type='primary' text='Entrar' fullWidth={true} onPress={goHome}/>
                        </View>
                    }

                    { !locationPermsGranted && 
                        <Text>É necessário permitir localização</Text>
                    }



            </View>

    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:15,
        alignItems: "center", 
        justifyContent:"space-around", 
        backgroundColor: Colors.white_txt,
    },
    top_container: {
        width: 400, 
        height: 300,
    },
    bottom_container:{
        flex:1, 
        width: "100%",
        justifyContent: "flex-end", 
    },
    text:{
        color: Colors.primary,
        fontFamily: "OpenSans",
        marginTop: 8, 
        marginLeft: 10,
        fontSize: 20, 
    },
    img: {
        width: "100%",
        height: "100%",
    },
})

export default index